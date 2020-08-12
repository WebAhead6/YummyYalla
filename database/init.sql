BEGIN;

DROP TABLE IF EXISTS locations, restaurants, reviews CASCADE;

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  city_name VARCHAR(255) NOT NULL
);

CREATE TABLE restaurants (
  id SERIAL PRIMARY KEY,
  location_id INTEGER REFERENCES locations(id),
restaurant_name VARCHAR(255),
  rating INTEGER,
  menu TEXT
);

CREATE TABLE reviews (
      id SERIAL PRIMARY KEY,
restaurant_id INTEGER REFERENCES restaurants(id),
review_author VARCHAR(255),
review TEXT
);

INSERT INTO locations (city_name) VALUES
('Haifa'),
('Yaffa'),
('Akko'),
('Jerusalem'),
('Nazareth'),
('Tsfat'),
('Kiryat Atta'),
('Magdal Shams'),
('Tamra');

INSERT INTO restaurants(location_id,restaurant_name,rating,menu) VALUES
 (1, 'Fattoush', 4, 'Kabab, Hummus, Tabule'),
 (1, 'Garden', 4, 'Fattush, CesarSalad, Fattuciani'),
 (1, 'Stella Marris', 5, 'Ravioli, Penne, Ceviche'),
 (2, 'Onza', 4, 'Kabab, Hummus, Tabule'),
 (2, 'Abu Hassan', 4, 'Kabab, Hummus, Tabule'),
 (2, 'AL kahle', 4, 'Kabab, Hummus, Tabule')
;

INSERT INTO reviews (restaurant_id, review_author, review) VALUES 
(1, 'Abeer', 'Very welcoming staff and yummy food'),
(1, 'Abeer', 'Very welcoming staff and yummy food'),
(1, 'Mario', 'Very welcoming staff and yummy food'),
(1, 'Abeer', 'Very welcoming staff and yummy food');


COMMIT;