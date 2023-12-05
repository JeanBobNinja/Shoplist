from flask import jsonify, request, abort

from . import blueprint

from ..dal.categories import Categories

@blueprint.route('/categories/<int:id>', methods=['PATCH'])
def update_category(id: int):
    data = request.form
    name = data.get('name')
    if not name:
        abort(400, "Missing name")

    Categories.update(id, name)
    return {"status": "ok"}