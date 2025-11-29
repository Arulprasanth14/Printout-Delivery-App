-- Insert dummy data for testing

-- First insert users (no dependencies)
INSERT INTO users (name, email, mobile, password, address) VALUES
('John Doe', 'john.doe@example.com', '9876543210', 'hashed_password1', '123 Main St, City1'),
('Jane Smith', 'jane.smith@example.com', '9876543211', 'hashed_password2', '456 Oak Ave, City2'),
('Bob Johnson', 'bob.johnson@example.com', '9876543212', 'hashed_password3', '789 Pine Rd, City3');

-- Then insert pricing configurations (no dependencies)
-- Insert printout pricing configurations
INSERT INTO printout_pricing (size, color_type, paper_type, side_type, price_per_page) VALUES
-- A4 Black and White
('a4', 'black_and_white', 'standard', 'single', 2.00),
('a4', 'black_and_white', 'standard', 'double', 3.50),
('a4', 'black_and_white', 'thick_matte', 'single', 3.00),
('a4', 'black_and_white', 'thick_matte', 'double', 5.00),
-- A4 Color
('a4', 'color', 'standard', 'single', 10.00),
('a4', 'color', 'standard', 'double', 18.00),
('a4', 'color', 'glossy', 'single', 15.00),
('a4', 'color', 'glossy', 'double', 28.00),
-- A3 Black and White
('a3', 'black_and_white', 'standard', 'single', 4.00),
('a3', 'black_and_white', 'standard', 'double', 7.00),
-- A3 Color
('a3', 'color', 'standard', 'single', 20.00),
('a3', 'color', 'standard', 'double', 36.00);

-- Insert spiral binding pricing configurations
INSERT INTO spiral_binding_pricing (size, color_type, binding_type, side_type, price_per_unit) VALUES
-- A4 Black and White
('a4', 'black_and_white', 'plastic', 'single', 50.00),
('a4', 'black_and_white', 'plastic', 'double', 80.00),
('a4', 'black_and_white', 'metal_wire', 'single', 60.00),
('a4', 'black_and_white', 'metal_wire', 'double', 100.00),
-- A4 Color
('a4', 'color', 'plastic', 'single', 80.00),
('a4', 'color', 'plastic', 'double', 120.00),
('a4', 'color', 'metal_wire', 'single', 100.00),
('a4', 'color', 'metal_wire', 'double', 160.00);

-- Insert lamination pricing configurations
INSERT INTO lamination_pricing (size, color_type, lamination_type, side_type, thickness, price_per_unit) VALUES
-- A4 Black and White
('a4', 'black_and_white', 'matte', 'single', '125mic', 20.00),
('a4', 'black_and_white', 'matte', 'double', '125mic', 35.00),
('a4', 'black_and_white', 'glossy', 'single', '125mic', 25.00),
('a4', 'black_and_white', 'glossy', 'double', '125mic', 45.00),
-- A4 Color
('a4', 'color', 'matte', 'single', '125mic', 30.00),
('a4', 'color', 'matte', 'double', '125mic', 55.00),
('a4', 'color', 'glossy', 'single', '125mic', 40.00),
('a4', 'color', 'glossy', 'double', '125mic', 75.00);

-- Insert photo copy pricing configurations
INSERT INTO photo_copy_pricing (size, paper_type, side_type, price_per_page) VALUES
-- A4 Standard
('a4', 'standard', 'single', 1.00),
('a4', 'standard', 'double', 1.80),
-- A4 Thick Matte
('a4', 'thick_matte', 'single', 1.50),
('a4', 'thick_matte', 'double', 2.70),
-- A3 Standard
('a3', 'standard', 'single', 2.00),
('a3', 'standard', 'double', 3.60);

-- Then insert orders (depends on users)
INSERT INTO orders (user_id, order_type, status, total_amount, number_of_items) VALUES
(1, 'printout', 'order_created', 150.00, 1),
(2, 'spiral_binding', 'owner_accepted_order', 200.00, 1),
(3, 'lamination', 'payment_waiting', 100.00, 1),
(1, 'photo_copy', 'printing_in_process', 50.00, 1);

-- Then insert service items (depends on orders)
-- Insert printouts
INSERT INTO printouts (order_id, size, color_type, paper_type, side_type, copies, file_path) VALUES
(1, 'a4', 'color', 'glossy', 'single', 10, '/files/printout1.pdf');

-- Insert spiral bindings
INSERT INTO spiral_bindings (order_id, size, color_type, binding_type, side_type, front_page_color, file_path) VALUES
(2, 'a4', 'color', 'metal_wire', 'double', 'Blue', '/files/binding1.pdf');

-- Insert laminations
INSERT INTO laminations (order_id, size, color_type, lamination_type, side_type, thickness, special_features, copies, file_path) VALUES
(3, 'a4', 'color', 'glossy', 'single', '125mic', 'UV Protection', 5, '/files/lamination1.pdf');

-- Insert photo copies
INSERT INTO photo_copies (order_id, size, paper_type, side_type, copies, file_path) VALUES
(4, 'a4', 'standard', 'single', 20, '/files/photocopy1.pdf');

-- Then insert invoices (depends on orders and users)
INSERT INTO invoices (order_id, user_id, subtotal, gst_tax, delivery_fee, total_amount) VALUES
(1, 1, 150.00, 22.50, 30.00, 202.50),
(2, 2, 200.00, 30.00, 30.00, 260.00),
(3, 3, 100.00, 15.00, 30.00, 145.00),
(4, 1, 50.00, 7.50, 30.00, 87.50);

-- Finally insert payments (depends on invoices and users)
INSERT INTO payments (invoice_id, user_id, amount, payment_mode, payment_status, upi_id) VALUES
(1, 1, 202.50, 'upi', 'completed', 'john.doe@upi'),
(2, 2, 260.00, 'google_pay', 'completed', 'jane.smith@googlepay'),
(3, 3, 145.00, 'paytm', 'pending', 'bob.johnson@paytm'),
(4, 1, 87.50, 'upi', 'completed', 'john.doe@upi'); 