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
  menu TEXT,
  imgUrl TEXT
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
('Safed'),
('Kiryat Atta'),
('Magdal Shams'),
('Tamra');

INSERT INTO restaurants(location_id,restaurant_name,rating,menu,imgUrl) VALUES
 (1, 'Fattoush', 4, 'Kabab, Hummus, Tabule','/public/img/fattoush.jpg'),
 (1, 'Garden', 4, 'Fattush, CesarSalad, Fattuciani','/public/img/garden.jpeg'),
 (1, 'Stella Marris', 5, 'Ravioli, Penne, Ceviche','/public/img/stellaMaris.jpeg'),
 (2, 'Onza', 4, 'Kabab, Hummus, Tabule','/public/img/Onza.jpeg'),
 (2, 'Abu Hassan', 4, 'Kabab, Hummus, Tabule','/public/img/AbuHassan.jpg'),
 (2, 'AL kahle', 4, 'Kabab, Hummus, Tabule','/public/img/ALKahle.jpg'),
 (3,'Doniana',4,'Kabab, Hummus, Tabule','/public/img/doniana.jpg'),
 (3,'Uri Buri',4,'Kabab, Hummus, Tabule','/public/img/UriBuri.jpg'),
 (3,'Abu Christo',4,'Kabab, Hummus, Tabule','public/img/AbuChristo.jpeg'),
 (4,'Abu Shanab',5,'Kabab, Hummus, Tabule','public/img/abushnab.jpeg'),
 (4,'Mistabra',5,'Kabab, Hummus, Tabule','public/img/Mistabra.jpeg'),
 (4,'Machneyuda',4,'Kabab, Hummus, Tabule','public/img/Mistabra.jpeg'),
  (5,'Tishreen',5,'Kabab, Hummus, Tabule','public/img/tishreen.jpg'),
 (5,'Ronen',5,'Kabab, Hummus, Tabule','public/img/ronen.jpg'),
 (5,'Bayat',4,'Kabab, Hummus, Tabule','public/img/bayat-restaurant.jpg
 '),
 (6,'Pizza Da Leone',5,'Pepperoni Pizza,Margherita Pizza','public/img/pizza-da-leone.jpg'),
 (6,'HaAri 8',5,'Kabab, Hummus, Tabule','public/img/photo2jpg.jpg'),
 (6,'Bat Yaar',4,'Kabab, Hummus, Tabule','public/img/batyar.jpg
 '),
 (7,'Nisan',5,'Kabab, Hummus, Tabule','public/img/nisan.jpg'),
 (7,'Green Apple B&C',5,'Kabab, Hummus, Tabule','public/img/aa.jpeg'),
 (7,'Al Yasmeen',4,'Kabab, Hummus, Tabule','public/img/img20180929123512-largejpg.jpg
 ');

 


 

 

INSERT INTO reviews (restaurant_id, review_author, review) VALUES 
(1, 'Abeer', 'Very welcoming staff and yummy food'),
(1, 'Abeer', 'Very welcoming staff and yummy food'),
(1, 'Mario', 'Very welcoming staff and yummy food'),
(1, 'Abeer', 'Very welcoming staff and yummy food');


COMMIT;