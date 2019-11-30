import pandas as pd
import requests
from requests.exceptions import ConnectionError
import json
from bs4 import BeautifulSoup as bs
from multiprocessing import Pool
import multiprocessing as mp
import time


def main():
    start = time.time()
    core_count = mp.cpu_count()
    pool = Pool(processes=core_count)
    queue = [x for x in range(1, 1500)]
    print("Generating database...")
    pool_outputs = pool.map(parse_allergen, queue)
    dataset = [x for x in pool_outputs if x is not None]  # filter out unmapped a_ids
    db_filename = "data.json"
    print(f"Writing to {db_filename}")
    with open(db_filename, "w") as json_file:
        json.dump(dataset, json_file)
    elapsed = round(time.time() - start)
    print(f"Database Generated in {elapsed} seconds")


def parse_allergen(a_id):
    url = f"http://www.allergen.org/viewallergen.php?aid={a_id}"
    entry = parse_allergen_page(url)
    if entry is not None:
        metadata = {
            "pdb_id": get_metadata_from_csv(entry["name"], "pdbs.csv"),
            "sold": get_metadata_from_csv(entry["name"], "sold.csv"),
            "category": get_metadata_from_csv(entry["name"], "categories.csv"),
        }
        entry.update(metadata)
        print(f'a_id: {a_id}, name: {entry["name"]} completed')
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
    elif prefix in d:  # Covers prefix style metadata a la categories.csv
        return d[prefix]
    else:
        return None


if __name__ == "__main__":
    main()
