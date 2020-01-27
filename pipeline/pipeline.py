def build_db():
    import database.database as db

    db.main()


def build_assets():
    import assets.build as assets_build

    assets_build.main()


def build_movies():
    import assets.movies as assets_movies

    assets_movies.main()
