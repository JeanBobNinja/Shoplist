from ..db import get_db
from ..utils import output


class Categories:

    @staticmethod
    def add(shoplist_id, name):
        shoplist_id = int(shoplist_id)

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute('INSERT INTO categories(name, shoplist_id) VALUES (?,?)',
                           (name, shoplist_id))
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()

        return cursor.lastrowid
    @staticmethod
    def update(shoplist_id, category_id, name):
        category_id = int(category_id)
        shoplist_id = int(shoplist_id)

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute('UPDATE categories SET name = ? WHERE id = ? AND shoplist_id = ?',
                           (name, category_id, shoplist_id))
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()

        if cursor.rowcount == 0:
            raise Exception(f'Unknown id: {id}')
