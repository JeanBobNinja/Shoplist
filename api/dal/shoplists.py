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
    def add(name: str):
        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute('INSERT INTO shoplists (name) VALUES (?)', (name,))
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()
        return cursor.lastrowid

    @staticmethod
    def delete(sid: int):
        sid = int(sid)

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute('DELETE FROM items WHERE shoplist_id = ?', (sid,))
            cursor.execute('DELETE FROM categories WHERE shoplist_id = ?', (sid,))
            cursor.execute('DELETE FROM shoplists WHERE id = ?', (sid,))
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()

        if cursor.rowcount == 0:
            raise Exception(f'Unknown id: {sid}')

    @staticmethod
    def update(sid: int, name: str):
        sid = int(sid)

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute('UPDATE shoplists SET name = ? WHERE id = ?', (name, sid,))
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()

        if cursor.rowcount == 0:
            raise Exception(f'Unknown id: {sid}')
