from flask import jsonify, request, abort

from . import blueprint

from ..dal.shoplists import Shoplists


@blueprint.route('/shoplists')
def get_shoplists():
    data = Shoplists.find_all()
    return jsonify(list(data))


@blueprint.route('/shoplists/<int:id>')
def get_shoplist(id):
    items = Shoplists.get_items(id)
    categories = Shoplists.get_categories(id)
    return {'categories': categories, 'items': items}


@blueprint.route('/shoplists', methods=['POST'])
def new_shoplist():
    data = request.form

    name = data.get('name')
    if not name:
        abort(400, "Missing name")

    new_id = Shoplists.add(name)
    return {"id": new_id}


@blueprint.route('/shoplists/<int:id>', methods=['DELETE'])
def delete_shoplist(id: int):
    Shoplists.delete(id)
    return {"status": "ok"}


@blueprint.route('/shoplists/<int:id>', methods=['PATCH'])
def update_shoplist(id: int):
    data = request.form
    name = data.get('name')
    if not name:
        abort(400, "Missing name")

    Shoplists.update(id, name)
    return {"status": "ok"}
