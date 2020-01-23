import uuid
import pytest


@pytest.mark.needs_auth
def test_write_firestore():
    # HACK: Moving import here to pass cicd test suite
    from database.firebase import firestore

    store = firestore.client()
    rand_id = str(uuid.uuid4())
    rand_val = {"test_val": str(uuid.uuid4())}
    rand_doc = store.collection("test").document(rand_id)
    rand_doc.set(rand_val)
    assert rand_doc.get().to_dict() == rand_val
