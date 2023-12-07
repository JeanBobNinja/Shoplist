from flask import jsonify, request, abort

from . import blueprint

from api.dal.items import Items
from api.dal.categories import Categories
from api.dal.shoplists import Shoplists


@blueprint.route('/shoplists')
def get_shoplists():
    data = Shoplists.find_all()
    return jsonify(list(data))


@blueprint.route('/shoplists/<int:sid>')
def get_shoplist(sid):
    items = Items.find_by_shoplist(sid)
    categories = Categories.find_by_shoplist(sid)
    return {'categories': categories, 'items': items}


@blueprint.route('/shoplists', methods=['POST'])
def add_shoplist():
    data = request.form

    name = data.get('name')
    if not name:
        abort(400, "Missing name")

    new_id = Shoplists.add(name)
    return {"id": new_id}


@blueprint.route('/shoplists/<int:sid>', methods=['PATCH'])
def update_shoplist(sid: int):
    data = request.form
    name = data.get('name')
    if not name:
        abort(400, "Missing name")

    Shoplists.update(sid, name)
    return {"status": "ok"}


@blueprint.route('/shoplists/<int:sid>', methods=['DELETE'])
def delete_shoplist(sid: int):
    Shoplists.delete(sid)
    return {"status": "ok"}
