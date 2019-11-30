import pandas as pd
import requests
from bs4 import BeautifulSoup as bs


def parse_allergen_page(url):
    page = requests.get(url)
    soup = bs(page.content, "html.parser")

    name_tag = soup.find_all("span", class_="name")[0]
    source_tag = list(soup.find_all("span", class_="Source")[0].children)[0]
    order_tag = list(soup.find_all("span", class_="Order")[0].children)[0]
    species_tag = list(soup.find_all("span", class_="Species")[0].children)[0]
    biochem_name_tag = soup.find(text="Biochemical name:").parent.findNext("span")
    mw_tag = soup.find(text="MW(SDS-PAGE):").parent.findNext("span")
    a_icity_tag = soup.find(text="Allergenicity:").parent.findNext("span")
    a_ref_tag = soup.find(text="Allergenicity reference:").parent.findNext("span")
    route_tag = soup.find(text="Route of allergen exposure:").parent.findNext("span")

    return {
        "name": name_tag.get_text(),
        "source": source_tag.get_text(),
        "order": order_tag.get_text(),
        "species": species_tag.get_text(),
        "biochemical_name": biochem_name_tag.get_text(),
        "mw": mw_tag.get_text(),
        "allergenicity": a_icity_tag.get_text(),
        "allergenicity_ref": a_ref_tag.get_text(),
        "route": route_tag.get_text(),
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


base_url = "http://www.allergen.org/viewallergen.php?aid=" + str(1)
parse_allergen_page(base_url)
