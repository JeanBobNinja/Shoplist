from ..db import get_db
from ..utils import output

class Categories:

    @staticmethod
    def update(id, name):
        id = int(id)

        db = get_db()
        cursor = db.cursor()
        try:
            cursor.execute('UPDATE categories SET name = ? WHERE id = ?', (name, id,))
        except Exception as e:
            db.rollback()
            raise e
        else:
            db.commit()

        if cursor.rowcount == 0:
            raise Exception(f'Unknown id: {id}')
