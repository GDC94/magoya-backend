
CREATE DATABASE bank_db;

Connect to the database:
 psql -U postgres

 \c accounts
 


Ver las tablas en la base de datos:
\dt

Ver detalles
\d accounts


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



CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  accountNumber VARCHAR(255) NOT NULL,
  type VARCHAR(50) CHECK (type IN ('deposito', 'transferencia')) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  transactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO transactions (accountNumber, type, amount) VALUES
  ('1134', 'deposito', 1000),
  ('1135', 'transferencia', 10000),
  ('1434', 'deposito', 1400);





  postgres=#  psql -U postgres
postgres-#  \c transactions




http://localhost:8080/api/transactions


{
  "accountNumber": "1000",
  "type": "transferencia",
  "amount": 100
}