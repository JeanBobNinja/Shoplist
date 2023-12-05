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