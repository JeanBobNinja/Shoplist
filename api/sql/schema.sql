DROP TABLE IF EXISTS shoplists;
DROP TABLE IF EXISTS items;
DROP TABLE IF EXISTS categories;

CREATE TABLE shoplists (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image TEXT
);

CREATE TABLE items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category_id INTEGER,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    image TEXT
);

CREATE TABLE shoplists_items (
    shoplist_id INTEGER NOT NULL,
    item_id INTEGER NOT NULL,
    FOREIGN KEY (shoplist_id) REFERENCES shoplists(id),
    FOREIGN KEY (item_id) REFERENCES items(id)
);