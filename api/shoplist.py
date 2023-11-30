from .db import get_db
from .utils import output

class Shoplist:

    @staticmethod
    @output(list)
    def get_shoplists():
        db = get_db()
        iterator = db.execute('SELECT * FROM shoplists').fetchall()
        return iterator
    @staticmethod
    @output(list)
    def get_shoplist(list_id: int):
        db = get_db()

        id = int(list_id)

        iterator = db.execute('SELECT items.id, items.title, items.category_id as category FROM shoplists '
                              'INNER JOIN shoplists_items ON shoplists.id = shoplists_items.shoplist_id '
                              'INNER JOIN items on shoplists_items.item_id = items.id '
                              'WHERE shoplists.id = ? ORDER BY items.title ASC'
                              , (id,)).fetchall()

        return iterator
