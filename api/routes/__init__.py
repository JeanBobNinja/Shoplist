from flask import Blueprint

blueprint = Blueprint('blueprint', __name__)
from . import shoplists
from . import categories
from . import items
