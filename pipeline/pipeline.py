import time
import argparse


def build_db(args):
    import database.database as db

    num_allergens = int(args.num_allergens)
    if num_allergens is None:
        num_allergens = 1500
    start = time.time()
    print("Generating database....")
    data = db.generate_database(num_allergens)
    elapsed = round(time.time() - start)
    print(f"Database Generated in {elapsed} seconds.")

    start = time.time()
    db_filename = "data.json"
    print(f"Writing to {db_filename}...")
    db.write_database(data, db_filename)
    elapsed = round(time.time() - start)
    print(f"Database Written in {elapsed} seconds.")

    import firebase.firebase as firebase

    start = time.time()
    print("Uploading to Firestore...")
    firebase.upload_to_firebase(data)
    elapsed = round(time.time() - start)
    print(f"Uploaded to Firestore in {elapsed} seconds.")


def build_assets():
    import assets.assets as assets

    assets.main()


def main(args=None):
    parser = argparse.ArgumentParser("Mast Pipeline Interface")
    parser.set_defaults(func=None)
    sub = parser.add_subparsers()

    #########################################################
    # Build DB
    #########################################################
    p = sub.add_parser("build_db", help="Build mast db")
    p.add_argument("--num_allergens", help="Override the number of allergens scanned")
    p.set_defaults(func=build_db)

    args = parser.parse_args(args)
    if args.func is not None:
        return args.func(args)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
