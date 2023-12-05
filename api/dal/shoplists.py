from ..db import get_db
from ..utils import output


class Shoplists:

    @staticmethod
    @output(list)
    def find_all():
        db = get_db()
        iterator = db.execute('SELECT * FROM shoplists').fetchall()
        return iterator

    @staticmethod
    @output(list)
    def get_items(id: int):
        id = int(id)

        db = get_db()
        iterator = db.execute('SELECT i.id, i.name, i.category_id FROM shoplists AS s '
                              'INNER JOIN categories AS c on c.shoplist_id = s.id '
                              'INNER JOIN items AS i on i.category_id = c.id '
                              'WHERE s.id = ? '
                              'ORDER BY i.name ASC'
                              , (id,)).fetchall()

        return iterator

    @staticmethod
    @output(list)
    def get_categories(id: int):
        id = int(id)

        db = get_db()
        iterator = db.execute('SELECT c.id, c.name FROM shoplists AS s '
                              'INNER JOIN categories AS c on c.shoplist_id = s.id '
                              'WHERE s.id = ? '
                              'ORDER BY c.name ASC'
                              , (id,)).fetchall()

        return iterator

    @staticmethod
    def add(name: str):
        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute('INSERT INTO shoplists (name) VALUES (?)', (name,))
            s_id = cursor.lastrowid
            cursor.execute('INSERT INTO categories (shoplist_id) VALUES (?)', (s_id, ))
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()
        return cursor.lastrowid

    @staticmethod
    def delete(id: int):
        id = int(id)

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute('DELETE FROM items WHERE shoplist_id = ?', (id,))
            cursor.execute('DELETE FROM categories WHERE shoplist_id = ?', (id,))
            cursor.execute('DELETE FROM shoplists WHERE id = ?', (id,))
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()

        if cursor.rowcount == 0:
            raise Exception(f'Unknown id: {id}')

    @staticmethod
    def update(id: int, name: str):
        id = int(id)

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute('UPDATE shoplists SET name = ? WHERE id = ?', (name, id,))
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()

        if cursor.rowcount == 0:
            raise Exception(f'Unknown id: {id}')
