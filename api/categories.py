from .db import get_db
from .utils import output

class Categories:

    @staticmethod
    @output(list)
    def get_categories(ids: list):
        db = get_db()
        iterator = db.execute(f'SELECT * FROM categories '
                              f'WHERE id in ({", ".join("?" for _ in ids)}) '
                              f'ORDER BY title ASC', ids).fetchall()
        return iterator