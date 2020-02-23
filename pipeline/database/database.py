# flake8: noqa
import json
import multiprocessing as mp
from multiprocessing import Pool
import time
import requests
from requests.exceptions import ConnectionError
import pandas as pd
from bs4 import BeautifulSoup as bs


def generate_database(num_allergens):
    core_count = mp.cpu_count()
    pool = Pool(processes=core_count - 1)
    queue = [x for x in range(1, num_allergens)]
    pool_outputs = pool.map(parse_allergen, queue)
    # filter out unmapped a_ids
    data = {"allergens": [x for x in pool_outputs if x is not None]}
    data["categories"] = build_category_tree("./database/categories.csv")
    return data


def write_database(data, db_filename):
    with open(db_filename, "w") as json_file:
        json.dump(data, json_file)


def parse_allergen(a_id):
    url = f"http://www.allergen.org/viewallergen.php?aid={a_id}"
    entry = parse_allergen_page(url)
    if entry is not None:
        metadata = {
            "pdb_id": get_metadata_from_csv(entry["name"], "./database/pdbs.csv"),
            "sold": get_metadata_from_csv(entry["name"], "./database/sold.csv"),
        }
        metadata.update(parse_category(entry["name"], "./database/categories.csv"))
        entry.update(metadata)
        print(f'a_id: {a_id}, name: {entry["name"]} completed')
    else:
        print(f"a_id: {a_id}, no allergen found")
    return entry


def parse_allergen_page(url):
    try:
        page = requests.get(url)
    except ConnectionError as e:
        print(e)
        time.sleep(1)
        page = requests.get(url)
    soup = bs(page.content, "html.parser")
    try:
        name_tag = soup.find_all("span", class_="name")[0]
        name = name_tag.get_text()
        if len(name.strip()) == 0:  # Filter out blank pages
            return None
    except AttributeError:
        return None  # If no name, allergen doesn't exist
    try:
        source_tag = list(soup.find_all("span", class_="Source")[0].children)[0]
        source = source_tag.get_text()
    except AttributeError:
        source = ""
    try:
        order_tag = list(soup.find_all("span", class_="Order")[0].children)[0]
        order = order_tag.get_text()
    except AttributeError:
        order = ""
    try:
        species_tag = list(soup.find_all("span", class_="Species")[0].children)[0]
        species = species_tag.get_text()
    except AttributeError:
        species = ""
    try:
        biochem_name_tag = soup.find(text="Biochemical name:").parent.findNext("span")
        biochem_name = biochem_name_tag.get_text()
    except AttributeError:
        biochem_name = ""
    try:
        mw_tag = soup.find(text="MW(SDS-PAGE):").parent.findNext("span")
        mw = mw_tag.get_text()
    except AttributeError:
        mw = ""
    try:
        a_icity_tag = soup.find(text="Allergenicity:").parent.findNext("span")
        a_icity = a_icity_tag.get_text()
    except AttributeError:
        a_icity = ""
    try:
        a_ref_tag = soup.find(text="Allergenicity reference:").parent.findNext("span")
        a_ref = a_ref_tag.get_text()
    except AttributeError:
        a_ref = ""
    try:
        route_tag = soup.find(text="Route of allergen exposure:").parent.findNext(
            "span"
        )
        route = route_tag.get_text()
    except AttributeError:
        route = ""

    return {
        "name": name,
        "source": source,
        "order": order,
        "species": species,
        "biochemical_name": biochem_name,
        "mw": mw,
        "allergenicity": a_icity,
        "allergenicity_ref": a_ref,
        "route": route,
    }


def get_metadata_from_csv(allergen_name, filename):
    d = pd.read_csv(filename, header=None, index_col=0, squeeze=True).to_dict()
    prefix = " ".join((allergen_name.split()[:2]))
    if allergen_name in d:
        return d[allergen_name]
    if prefix in d:  # Covers prefix style metadata a la categories.csv
        return d[prefix]
    return None


def parse_category(allergen_name, filename):
    df = pd.read_csv(filename, header=0, index_col=None, squeeze=True)
    df = df.replace({pd.np.nan: None})
    prefix = " ".join((allergen_name.split()[:2]))
    x = df.loc[df["Prefix"] == prefix]
    try:
        category = x["Category"].values[0]
    except IndexError:
        print("No category for", allergen_name)
        category = None
    try:
        sub_category = x["Subcategory"].values[0]
    except IndexError:
        print("No subcategory for", allergen_name)
        sub_category = None
    try:
        sub_sub_category = x["Subsubcategory"].values[0]
    except IndexError:
        print("No subsubcategory for", allergen_name)
        sub_sub_category = None

    return {
        "category": category,
        "subcategory": sub_category,
        "subsubcategory": sub_sub_category,
    }


def build_category_tree(filename):
    with open(filename) as f:
        x = f.readlines()

    root = {}
    for y in x:
        fields = [f.strip() for f in y.split(",") if f.strip() is not ""]
        fields = fields[1:] + fields[:1]
        fields.reverse()
        curr_level = root
        while fields:
            f = fields.pop()
            if f not in curr_level:  # Have to insert a node
                if not fields:  # child node
                    curr_level[f] = True
                else:
                    curr_level[f] = {}
            curr_level = curr_level[f]  # Go down a level
    return root
