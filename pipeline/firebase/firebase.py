import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("./firebase/firebase_admin_key.json")
firebase_admin.initialize_app(cred)


def upload_to_firebase(data):

    store = firestore.client()
    # Upload Category Tree
    collection_name = "categories"
    for k in data[collection_name].keys():
        store.collection(collection_name).document(k).set(data[collection_name][k])
    # Upload Allergens
    collection_name = "allergens"
    for d in data[collection_name]:
        store.collection(collection_name).document(d["name"]).set(d)
        print(f'{d["name"]} uploaded')
    version_number = store.collection(collection_name).document("version").get()
    version_number = version_number.to_dict()["value"] + 1
    store.collection(collection_name).document("version").set({"value": version_number})
    print(f"Version {version_number}")
