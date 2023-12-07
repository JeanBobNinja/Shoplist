from flask import jsonify, request, abort

from . import blueprint

from ..dal.categories import Categories


@blueprint.route('/shoplists/<int:sid>/categories', methods=['POST'])
def add_category(sid: int):
    data = request.form
    name = data.get('name')
    if not name:
        abort(400, "Missing name")

    new_id = Categories.add(sid, name)
    return {"id": new_id}


@blueprint.route('/shoplists/<int:sid>/categories/<int:cid>', methods=['PATCH'])
def update_category(sid: int, cid: int):
    data = request.form
    name = data.get('name')
    if not name:
        abort(400, "Missing name")

    Categories.update(sid, cid, name)
    return {"status": "ok"}


@blueprint.route('/shoplists/<int:sid>/categories/<int:cid>', methods=['DELETE'])
def delete_category(sid: int, cid: int):
    Categories.delete(sid, cid)
    return {"status": "ok"}
