import time
from flask import Flask, jsonify
from . import db
from .shoplist import Shoplist
from .categories import Categories

app = Flask(__name__, instance_relative_config=True, instance_path='/dev/shm/shoplist')
db.init_app(app)

@app.route('/shoplists')
def get_shoplists():
    data = Shoplist.get_shoplists()
    return jsonify(list(data))

@app.route('/shoplists/<int:id>')
def get_shoplist(id):
    shoplist = Shoplist.get_shoplist(id)
    category_ids = list(set(map(lambda s: s['category'], shoplist)))
    categories = Categories.get_categories(category_ids)
    return {'categories': categories, 'items': shoplist}

