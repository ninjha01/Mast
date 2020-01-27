import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("./pipeline/firebase/firebase_admin_key.json")
firebase_admin.initialize_app(cred)
