
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  account_number VARCHAR(4) NOT NULL UNIQUE CHECK (account_number ~ '^\d{1,4}$'),
  balance NUMERIC(15, 2) NOT NULL DEFAULT 0 CHECK (balance > 0 AND balance <= 10000000)
);

INSERT INTO accounts (name, account_number, balance) VALUES
  ('Alice', '1234', 1000),
  ('Bob', '6543', 2000),
  ('Charlie', '1111', 3000);

SELECT * FROM accounts;