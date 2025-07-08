-- Insert default categories if they don't exist
INSERT INTO asset_categories (category_name) VALUES ('Laptop') ON CONFLICT (category_name) DO NOTHING;
INSERT INTO asset_categories (category_name) VALUES ('Phone') ON CONFLICT (category_name) DO NOTHING;
INSERT INTO asset_categories (category_name) VALUES ('Bike') ON CONFLICT (category_name) DO NOTHING;
INSERT INTO asset_categories (category_name) VALUES ('Furniture') ON CONFLICT (category_name) DO NOTHING;
INSERT INTO asset_categories (category_name) VALUES ('Electronics') ON CONFLICT (category_name) DO NOTHING;
INSERT INTO asset_categories (category_name) VALUES ('Vehicle') ON CONFLICT (category_name) DO NOTHING;

-- Insert default statuses if they don't exist
INSERT INTO asset_statuses (status_name) VALUES ('Active') ON CONFLICT (status_name) DO NOTHING;
INSERT INTO asset_statuses (status_name) VALUES ('Sold') ON CONFLICT (status_name) DO NOTHING;
INSERT INTO asset_statuses (status_name) VALUES ('Discarded') ON CONFLICT (status_name) DO NOTHING;
INSERT INTO asset_statuses (status_name) VALUES ('Under Repair') ON CONFLICT (status_name) DO NOTHING;