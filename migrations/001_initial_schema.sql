CREATE TABLE IF NOT EXISTS conducta_entries (
  id SERIAL PRIMARY KEY,
  full_name TEXT NOT NULL,
  id_type TEXT NOT NULL,
  id_number TEXT NOT NULL,
  nationality TEXT,
  arrival_date DATE,
  departure_date DATE,
  authorization BOOLEAN NOT NULL,
  signature TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tra_entries (
  id SERIAL PRIMARY KEY,
  apartment TEXT NOT NULL,
  booking_code TEXT NOT NULL,
  id_type TEXT NOT NULL,
  id_number TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  city_residence TEXT NOT NULL,
  city_origin TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  room_number TEXT,
  trip_purpose TEXT,
  num_companions INTEGER DEFAULT 0,
  accommodation_type TEXT,
  check_in DATE NOT NULL,
  check_out DATE NOT NULL,
  amount_paid NUMERIC NOT NULL,
  authorization BOOLEAN NOT NULL,
  guest_signature TEXT NOT NULL,
  host_signature TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tra_companions (
  id SERIAL PRIMARY KEY,
  tra_id INTEGER REFERENCES tra_entries(id) ON DELETE CASCADE,
  id_type TEXT NOT NULL,
  id_number TEXT NOT NULL,
  full_name TEXT NOT NULL
);
