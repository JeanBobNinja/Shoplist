from flask import Flask
from . import db
from .routes import blueprint


app = Flask(__name__, instance_relative_config=True, instance_path='/dev/shm/shoplist')
app.register_blueprint(blueprint)

db.init_app(app)
