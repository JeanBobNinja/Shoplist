from flask import jsonify, request, abort

from . import blueprint

from ..dal.items import Items


@blueprint.route('/shoplists/<int:sid>/categories/<int:cid>/items', methods=['POST'])
def add_item(sid: int, cid: int):
    data = request.form
    name = data.get('name')
    if not name:
        abort(400, "Missing name")

    new_id = Items.add(sid, cid, name)
    return {"id": new_id}


@blueprint.route('/shoplists/<int:sid>/categories/<int:cid>/items/<int:iid>', methods=['PATCH'])
def update_item(sid: int, cid: int, iid: int):
    data = request.form
    name = data.get('name')
    if not name:
        abort(400, "Missing name")

    Items.update(sid, cid, iid, name)
    return {"status": "ok"}

@blueprint.route('/shoplists/<int:sid>/categories/<int:cid>/items/<int:iid>', methods=['DELETE'])
def delete_item(sid: int, cid: int, iid: int):
    Items.delete(sid, cid, iid)
    return {"status": "ok"}
