ALTER TABLE orders ADD COLUMN userId INT REFERENCES users(id) ON DELETE CASCADE;