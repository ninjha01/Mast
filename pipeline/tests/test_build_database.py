from database.build_database import parse_allergen_page, get_metadata_from_csv


def test_parse_allergen_page():
    url = "http://www.allergen.org/viewallergen.php?aid=1"
    parsed = parse_allergen_page(url)
    expected = {
        "name": "Aca s 13",
        "source": "Animalia Arthropoda",
        "order": "Astigmata",
        "species": "Acarus siro",
        "biochemical_name": "Fatty acid-binding protein",
        "mw": "15 kDa",
        "allergenicity": "3 out of 13 (23%) A. siro RAST-positive patients showed strong IgE binding to rAca s 13 on immunoblot",
        "allergenicity_ref": "10474032",
        "route": "Airway",
    }
    assert parsed == expected


def test_get_metadata_from_csv():
    name = "Der p 10"
    # TODO: Refactor tests to take locations of files
    sold_filename = "./pipeline/database/sold.csv"
    assert get_metadata_from_csv(name, sold_filename) is True
    categories_filename = "./pipeline/database/categories.csv"
    assert get_metadata_from_csv(name, categories_filename) == "House Dust Mite"
    name = "Mala s 13"
    pdbs_filename = "./pipeline/database/pdbs.csv"
    assert get_metadata_from_csv(name, pdbs_filename) == "2j23"
