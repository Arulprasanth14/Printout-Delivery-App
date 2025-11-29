-- Drop existing objects if they exist
DROP TRIGGER IF EXISTS calculate_invoice_total_trigger ON invoices;
DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
DROP TRIGGER IF EXISTS update_printout_pricing_updated_at ON printout_pricing;
DROP TRIGGER IF EXISTS update_spiral_binding_pricing_updated_at ON spiral_binding_pricing;
DROP TRIGGER IF EXISTS update_lamination_pricing_updated_at ON lamination_pricing;
DROP TRIGGER IF EXISTS update_photo_copy_pricing_updated_at ON photo_copy_pricing;

DROP FUNCTION IF EXISTS calculate_invoice_total();
DROP FUNCTION IF EXISTS calculate_printout_price(paper_size, color_type, paper_type, side_type, INTEGER);
DROP FUNCTION IF EXISTS calculate_spiral_binding_price(paper_size, color_type, binding_type, side_type);
DROP FUNCTION IF EXISTS calculate_lamination_price(paper_size, color_type, lamination_type, side_type, VARCHAR(50), INTEGER);
DROP FUNCTION IF EXISTS calculate_photo_copy_price(paper_size, paper_type, side_type, INTEGER);
DROP FUNCTION IF EXISTS update_updated_at_column();

DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS photo_copies;
DROP TABLE IF EXISTS laminations;
DROP TABLE IF EXISTS spiral_bindings;
DROP TABLE IF EXISTS printouts;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS printout_pricing;
DROP TABLE IF EXISTS spiral_binding_pricing;
DROP TABLE IF EXISTS lamination_pricing;
DROP TABLE IF EXISTS photo_copy_pricing;

DROP TYPE IF EXISTS order_status;
DROP TYPE IF EXISTS payment_status;
DROP TYPE IF EXISTS payment_mode;
DROP TYPE IF EXISTS paper_size;
DROP TYPE IF EXISTS color_type;
DROP TYPE IF EXISTS paper_type;
DROP TYPE IF EXISTS side_type;
DROP TYPE IF EXISTS binding_type;
DROP TYPE IF EXISTS lamination_type;

-- Create enum types
CREATE TYPE order_status AS ENUM (
    'order_created',
    'owner_accepted_order',
    'payment_waiting',
    'printing_in_process',
    'waiting_for_delivery',
    'out_for_delivery',
    'delivered'
);

CREATE TYPE payment_status AS ENUM (
    'pending',
    'completed',
    'failed'
);

CREATE TYPE payment_mode AS ENUM (
    'upi',
    'google_pay',
    'paytm'
);

CREATE TYPE paper_size AS ENUM (
    'a2',
    'a3',
    'a4',
    'a5'
);

CREATE TYPE color_type AS ENUM (
    'black_and_white',
    'color'
);

CREATE TYPE paper_type AS ENUM (
    'standard',
    'thick_matte',
    'glossy',
    'textured'
);

CREATE TYPE side_type AS ENUM (
    'single',
    'double'
);

CREATE TYPE binding_type AS ENUM (
    'plastic',
    'metal_wire',
    'double_loop_wire'
);

CREATE TYPE lamination_type AS ENUM (
    'matte',
    'glossy',
    'soft_touch'
);

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    mobile VARCHAR(15) NOT NULL,
    password VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    order_type VARCHAR(50) NOT NULL,
    status order_status DEFAULT 'order_created',
    total_amount DECIMAL(10,2) NOT NULL,
    number_of_items INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create printouts table
CREATE TABLE printouts (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    size paper_size NOT NULL,
    color_type color_type NOT NULL,
    paper_type paper_type NOT NULL,
    side_type side_type NOT NULL,
    copies INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create spiral_bindings table
CREATE TABLE spiral_bindings (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    size paper_size NOT NULL,
    color_type color_type NOT NULL,
    binding_type binding_type NOT NULL,
    side_type side_type NOT NULL,
    front_page_color VARCHAR(50),
    file_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create laminations table
CREATE TABLE laminations (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    size paper_size NOT NULL,
    color_type color_type NOT NULL,
    lamination_type lamination_type NOT NULL,
    side_type side_type NOT NULL,
    thickness VARCHAR(50) NOT NULL,
    special_features TEXT,
    copies INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create photo_copies table
CREATE TABLE photo_copies (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    size paper_size NOT NULL,
    paper_type paper_type NOT NULL,
    side_type side_type NOT NULL,
    copies INTEGER NOT NULL,
    file_path TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create pricing configuration tables
CREATE TABLE printout_pricing (
    id SERIAL PRIMARY KEY,
    size paper_size NOT NULL,
    color_type color_type NOT NULL,
    paper_type paper_type NOT NULL,
    side_type side_type NOT NULL,
    price_per_page DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(size, color_type, paper_type, side_type)
);

CREATE TABLE spiral_binding_pricing (
    id SERIAL PRIMARY KEY,
    size paper_size NOT NULL,
    color_type color_type NOT NULL,
    binding_type binding_type NOT NULL,
    side_type side_type NOT NULL,
    price_per_unit DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(size, color_type, binding_type, side_type)
);

CREATE TABLE lamination_pricing (
    id SERIAL PRIMARY KEY,
    size paper_size NOT NULL,
    color_type color_type NOT NULL,
    lamination_type lamination_type NOT NULL,
    side_type side_type NOT NULL,
    thickness VARCHAR(50) NOT NULL,
    price_per_unit DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(size, color_type, lamination_type, side_type, thickness)
);

CREATE TABLE photo_copy_pricing (
    id SERIAL PRIMARY KEY,
    size paper_size NOT NULL,
    paper_type paper_type NOT NULL,
    side_type side_type NOT NULL,
    price_per_page DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(size, paper_type, side_type)
);

-- Create invoices table
CREATE TABLE invoices (
    id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    subtotal DECIMAL(10,2) NOT NULL,
    gst_tax DECIMAL(10,2) NOT NULL,
    delivery_fee DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create payments table
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    invoice_id INTEGER REFERENCES invoices(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    payment_mode payment_mode NOT NULL,
    payment_status payment_status DEFAULT 'pending',
    upi_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_invoices_order_id ON invoices(order_id);
CREATE INDEX idx_invoices_user_id ON invoices(user_id);
CREATE INDEX idx_payments_invoice_id ON payments(invoice_id);
CREATE INDEX idx_payments_user_id ON payments(user_id);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
    BEFORE UPDATE ON payments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_printout_pricing_updated_at
    BEFORE UPDATE ON printout_pricing
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_spiral_binding_pricing_updated_at
    BEFORE UPDATE ON spiral_binding_pricing
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_lamination_pricing_updated_at
    BEFORE UPDATE ON lamination_pricing
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_photo_copy_pricing_updated_at
    BEFORE UPDATE ON photo_copy_pricing
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to calculate printout price
CREATE OR REPLACE FUNCTION calculate_printout_price(
    p_size paper_size,
    p_color_type color_type,
    p_paper_type paper_type,
    p_side_type side_type,
    p_copies INTEGER
) RETURNS DECIMAL(10,2) AS $$
DECLARE
    v_price_per_page DECIMAL(10,2);
    v_total_price DECIMAL(10,2);
BEGIN
    -- Get the exact price for the combination of fields
    SELECT pp.price_per_page INTO v_price_per_page
    FROM printout_pricing pp
    WHERE pp.size = p_size
    AND pp.color_type = p_color_type
    AND pp.paper_type = p_paper_type
    AND pp.side_type = p_side_type;

    -- If no matching price found, return 0
    IF v_price_per_page IS NULL THEN
        RETURN 0;
    END IF;

    -- Calculate total price based on number of copies
    v_total_price := v_price_per_page * p_copies;
    RETURN v_total_price;
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate spiral binding price
CREATE OR REPLACE FUNCTION calculate_spiral_binding_price(
    p_size paper_size,
    p_color_type color_type,
    p_binding_type binding_type,
    p_side_type side_type
) RETURNS DECIMAL(10,2) AS $$
DECLARE
    v_price_per_unit DECIMAL(10,2);
BEGIN
    -- Get the exact price for the combination of fields
    SELECT sbp.price_per_unit INTO v_price_per_unit
    FROM spiral_binding_pricing sbp
    WHERE sbp.size = p_size
    AND sbp.color_type = p_color_type
    AND sbp.binding_type = p_binding_type
    AND sbp.side_type = p_side_type;

    -- If no matching price found, return 0
    IF v_price_per_unit IS NULL THEN
        RETURN 0;
    END IF;

    RETURN v_price_per_unit;
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate lamination price
CREATE OR REPLACE FUNCTION calculate_lamination_price(
    p_size paper_size,
    p_color_type color_type,
    p_lamination_type lamination_type,
    p_side_type side_type,
    p_thickness VARCHAR(50),
    p_copies INTEGER
) RETURNS DECIMAL(10,2) AS $$
DECLARE
    v_price_per_unit DECIMAL(10,2);
    v_total_price DECIMAL(10,2);
BEGIN
    -- Get the exact price for the combination of fields
    SELECT lp.price_per_unit INTO v_price_per_unit
    FROM lamination_pricing lp
    WHERE lp.size = p_size
    AND lp.color_type = p_color_type
    AND lp.lamination_type = p_lamination_type
    AND lp.side_type = p_side_type
    AND lp.thickness = p_thickness;

    -- If no matching price found, return 0
    IF v_price_per_unit IS NULL THEN
        RETURN 0;
    END IF;

    -- Calculate total price based on number of copies
    v_total_price := v_price_per_unit * p_copies;
    RETURN v_total_price;
END;
$$ LANGUAGE plpgsql;

-- Create function to calculate photo copy price
CREATE OR REPLACE FUNCTION calculate_photo_copy_price(
    p_size paper_size,
    p_paper_type paper_type,
    p_side_type side_type,
    p_copies INTEGER
) RETURNS DECIMAL(10,2) AS $$
DECLARE
    v_price_per_page DECIMAL(10,2);
    v_total_price DECIMAL(10,2);
BEGIN
    -- Get the exact price for the combination of fields
    SELECT pcp.price_per_page INTO v_price_per_page
    FROM photo_copy_pricing pcp
    WHERE pcp.size = p_size
    AND pcp.paper_type = p_paper_type
    AND pcp.side_type = p_side_type;

    -- If no matching price found, return 0
    IF v_price_per_page IS NULL THEN
        RETURN 0;
    END IF;

    -- Calculate total price based on number of copies
    v_total_price := v_price_per_page * p_copies;
    RETURN v_total_price;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically calculate and update invoice total
CREATE OR REPLACE FUNCTION calculate_invoice_total()
RETURNS TRIGGER AS $$
DECLARE
    v_printout_total DECIMAL(10,2) := 0;
    v_spiral_binding_total DECIMAL(10,2) := 0;
    v_lamination_total DECIMAL(10,2) := 0;
    v_photo_copy_total DECIMAL(10,2) := 0;
    v_subtotal DECIMAL(10,2);
    v_gst_tax DECIMAL(10,2);
    v_delivery_fee DECIMAL(10,2) := 50; -- Default delivery fee
    v_total_amount DECIMAL(10,2);
BEGIN
    -- Calculate printout total based on exact field combinations
    SELECT COALESCE(SUM(calculate_printout_price(
        p.size, p.color_type, p.paper_type, p.side_type, p.copies
    )), 0) INTO v_printout_total
    FROM printouts p
    WHERE p.order_id = NEW.order_id;

    -- Calculate spiral binding total based on exact field combinations
    SELECT COALESCE(SUM(calculate_spiral_binding_price(
        sb.size, sb.color_type, sb.binding_type, sb.side_type
    )), 0) INTO v_spiral_binding_total
    FROM spiral_bindings sb
    WHERE sb.order_id = NEW.order_id;

    -- Calculate lamination total based on exact field combinations
    SELECT COALESCE(SUM(calculate_lamination_price(
        l.size, l.color_type, l.lamination_type, l.side_type, l.thickness, l.copies
    )), 0) INTO v_lamination_total
    FROM laminations l
    WHERE l.order_id = NEW.order_id;

    -- Calculate photo copy total based on exact field combinations
    SELECT COALESCE(SUM(calculate_photo_copy_price(
        pc.size, pc.paper_type, pc.side_type, pc.copies
    )), 0) INTO v_photo_copy_total
    FROM photo_copies pc
    WHERE pc.order_id = NEW.order_id;

    -- Calculate total subtotal
    v_subtotal := v_printout_total + v_spiral_binding_total + v_lamination_total + v_photo_copy_total;

    -- Calculate GST (18%)
    v_gst_tax := v_subtotal * 0.18;

    -- Calculate total amount
    v_total_amount := v_subtotal + v_gst_tax + v_delivery_fee;

    -- Update invoice values
    NEW.subtotal := v_subtotal;
    NEW.gst_tax := v_gst_tax;
    NEW.delivery_fee := v_delivery_fee;
    NEW.total_amount := v_total_amount;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_invoice_total_trigger
    BEFORE INSERT ON invoices
    FOR EACH ROW
    EXECUTE FUNCTION calculate_invoice_total(); 