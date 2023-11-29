import sqlite3
import click
from flask import current_app, g
from pathlib import Path


def get_db():
    if 'db' not in g:
        if not Path(current_app.config['DATABASE']).exists():
            Path(current_app.config['DATABASE']).parent.mkdir(exist_ok=True)
            Path(current_app.config['DATABASE']).touch()

        g.db = sqlite3.connect(
            current_app.config['DATABASE']
        )
        g.db.row_factory = sqlite3.Row
    return g.db


def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()


def init_db():
    db = get_db()
    with current_app.open_resource('sql/schema.sql') as f:
        db.executescript(f.read().decode('utf8'))


def add_samples():
    db = get_db()
    with current_app.open_resource('sql/samples.sql') as f:
        db.executescript(f.read().decode('utf8'))


@click.command('init-db')
def init_db_command():
    init_db()
    click.echo('Database initialized.')


@click.command('add-samples')
def add_samples_command():
    add_samples()
    click.echo('Samples added.')


def init_app(app):
    app.config.from_mapping(DATABASE=Path(app.instance_path, 'shoplist.db'))
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)
    app.cli.add_command(add_samples_command)
