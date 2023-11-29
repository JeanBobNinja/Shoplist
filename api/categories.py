from .db import get_db
from .utils import output

class Categories:

    @staticmethod
    @output(list)
    def get_categories(ids: list):
        db = get_db()
        iterator = db.execute(f'SELECT * FROM categories WHERE id in ({", ".join("?" for _ in ids)})', ids).fetchall()
        return iterator