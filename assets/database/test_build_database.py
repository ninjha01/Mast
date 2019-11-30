from build_database import parse_allergen_page


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
