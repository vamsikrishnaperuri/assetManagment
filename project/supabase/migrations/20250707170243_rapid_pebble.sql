-- Personal Asset Management Database Schema

-- Create database
CREATE DATABASE asset_management;

-- Use the database
\c asset_management;

-- Users table
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Asset Categories table
CREATE TABLE asset_categories (
    id BIGSERIAL PRIMARY KEY,
    category_name VARCHAR(100) UNIQUE NOT NULL
);

-- Asset Statuses table
CREATE TABLE asset_statuses (
    id BIGSERIAL PRIMARY KEY,
    status_name VARCHAR(50) UNIQUE NOT NULL
);

-- Assets table
CREATE TABLE assets (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    asset_name VARCHAR(255) NOT NULL,
    category_id BIGINT NOT NULL REFERENCES asset_categories(id),
    status_id BIGINT NOT NULL REFERENCES asset_statuses(id),
    purchase_date DATE NOT NULL,
    warranty_expiry_date DATE,
    asset_image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default categories
INSERT INTO asset_categories (category_name) VALUES 
('Laptop'),
('Phone'),
('Bike'),
('Furniture'),
('Electronics'),
('Vehicle');

-- Insert default statuses
INSERT INTO asset_statuses (status_name) VALUES 
('Active'),
('Sold'),
('Discarded'),
('Under Repair');

-- Create indexes for better performance
CREATE INDEX idx_assets_user_id ON assets(user_id);
CREATE INDEX idx_assets_category_id ON assets(category_id);
CREATE INDEX idx_assets_status_id ON assets(status_id);
CREATE INDEX idx_assets_created_at ON assets(created_at);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();