from build_database import parse_allergen_page, get_metadata_from_csv
import firebase_admin
from firebase_admin import credentials, firestore
import uuid


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
    sold_filename = "sold.csv"
    assert get_metadata_from_csv(name, sold_filename) is True
    categories_filename = "categories.csv"
    assert get_metadata_from_csv(name, categories_filename) == "House Dust Mite"
    name = "Mala s 13"
    pdbs_filename = "pdbs.csv"
    assert get_metadata_from_csv(name, pdbs_filename) == "2j23"


def test_write_firestore():
    cred = credentials.Certificate("./firebase_admin_key.json")
    firebase_admin.initialize_app(credential=cred)
    store = firestore.client()
    rand_id = str(uuid.uuid4())
    rand_val = {"test_val": str(uuid.uuid4())}
    rand_doc = store.collection("test").document(rand_id)
    rand_doc.set(rand_val)
    assert rand_doc.get().to_dict() == rand_val
