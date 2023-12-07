from ..db import get_db
from ..utils import output


class Items:
    @staticmethod
    @output(list)
    def find_all_by_shoplist(id: int):
        id = int(id)

        db = get_db()
        iterator = db.execute('SELECT id, name, category_id FROM items '
                              'WHERE shoplist_id = ? '
                              'ORDER BY name ASC'
                              , (id,)).fetchall()

        return iterator

    @staticmethod
    def add(shoplist_id, category_id, name):
        shoplist_id = int(shoplist_id)
        category_id = int(category_id)

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute('INSERT INTO items(name, category_id, shoplist_id) VALUES (?,?,?)',
                           (name, category_id, shoplist_id))
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()

        return cursor.lastrowid

    @staticmethod
    def update(shoplist_id, category_id, item_id, name):
        category_id = int(category_id)
        shoplist_id = int(shoplist_id)
        item_id = int(item_id)

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute('UPDATE items SET name = ? WHERE id = ? AND shoplist_id = ? and category_id = ?',
                           (name, item_id, category_id, shoplist_id))
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()

        if cursor.rowcount == 0:
            raise Exception(f'Unknown id: {id}')

    @staticmethod
    def delete(shoplist_id, category_id, item_id):
        category_id = int(category_id)
        shoplist_id = int(shoplist_id)
        item_id = int(item_id)

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute('DELETE FROM items WHERE id = ? AND category_id = ? and shoplist_id = ?',
                           (item_id, category_id, shoplist_id))
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()

        if cursor.rowcount == 0:
            raise Exception(f'Unknown id: {id}')
