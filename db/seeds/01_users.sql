-- *Users* table seeds here:
INSERT INTO users (name, email, password, is_admin, phone) VALUES
('Alice', 'a@a.com', 'password', FALSE, '123-456-7890'),
('Bob', 'b@b.com', 'password', FALSE, '444-444-7444'),
('Charlie', 'c@c.com', 'password', TRUE, '555-555-5555');


-- *Orders* table seeds here:
INSERT INTO orders (timestamp, is_ready, total_price, taxes, tip, notes, approx_time, dish_id, method_id, user_id)
VALUES
('2022-06-01 00:00:00', FALSE, 100, 10, 10, 'notes 01 here', 10, 1, 1, 1),
('2022-06-02 00:00:00', FALSE, 200, 20, 20, 'notes 02 here', 20, 2, 2, 1),
('2022-06-03 00:00:00', TRUE, 300, 30, 30, 'notes 03 here', 30, 3, 3, 2);

-- *Dishes* table seeds here:
INSERT INTO dishes (title, description, price, has_nuts, is_vegan, is_vegetarian, thumbnail_photo, quantity)
VALUES
('Dish 1', 'Description 1', 100, FALSE, FALSE, FALSE, 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 1),
('Dish 2', 'Description 2', 200, FALSE, FALSE, FALSE, 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 2),
('Dish 3', 'Description 3', 300, TRUE, TRUE, TRUE, 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60', 3);


-- *Payment Methods* table seeds here:
INSERT INTO payment_methods (credit, cash, apple)
VALUES
(TRUE, FALSE, FALSE),
(FALSE, TRUE, FALSE),
(FALSE, FALSE, TRUE);




