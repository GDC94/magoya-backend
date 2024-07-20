# Magoya Backend

Backend construido con Express, Typescript, zod, Node y Postgres

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [PostgreSQL](https://www.postgresql.org/) (v13 or later)

## Instalacion

1. Clonar el repositorio

   ```bash
   git clone https://github.com/GDC94/magoya-backend.git
   cd your-repo-ubication

   ```

2. Install dependencies:

# Configuración del Proyecto

## Variables de Entorno

Para que la aplicación funcione correctamente, necesitas configurar algunas variables de entorno. Estas variables se almacenan en un archivo `.env` en la raíz del proyecto.

### Crear el archivo `.env`

Crea un archivo `.env` en la raíz de tu proyecto y agrega las siguientes líneas, reemplazando los valores con las credenciales de tu base de datos:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

Ejemplo

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=mysecretpassword
DB_NAME=mydatabase
```

## Crear la DB

Crear base de datos:

En una terminal ejecutar

```json
createdb mydatabase
```

Luego crear las tablas:

```json
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  initialBalance DECIMAL(10, 2) NOT NULL,
  accountNumber VARCHAR(255) NOT NULL
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  accountNumber VARCHAR(255) NOT NULL,
  type VARCHAR(50) CHECK (type IN ('deposito', 'transferencia')) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  transactionDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Ejecutar NPM RUN DEV

La aplicación debería estar corriendo en http://localhost:8080.

# API Endpoints

## 1. Consultar saldo de una cuenta

**Método:** `GET`
**URL:** `http://localhost:8080/api/account-balance/:{id}`
**Respuesta:**

```json
{
  "balance": "1000.00"
}
```

## 2. Crear una cuenta

**Método:** `POST`
**URL:** `http://localhost:8080/api/account`
**Parámetro:**

```json
{
  "name": "Alice",
  "initialBalance": "1000.00",
  "accountNumber": "1224"
}
```

**Respuesta:**

```json
{
  "id": 9,
  "name": "Alice",
  "accountNumber": "1224",
  "initialBalance": "1000.00"
}
```

## 3.

**Método:** `POST`
**URL:** `http://localhost:8080/api/transactions`
**Parámetro "deposito":**

```json
{
  "accountNumber": "1000",
  "type": "deposito",
  "amount": 9000
}
```

**Respuesta:**

```json
{
  "message": "Transaction successful",
  "newBalance": 15000
}
```

**Parámetro "transferencia":**

```json
{
  "accountNumber": "1000",
  "type": "transferencia",
  "amount": 9000
}
```

**Respuesta:**
**El user deja de tener 15000 y se le restan 9000 = "newBalance": 6000**

```json
{
  "message": "Transaction successful",
  "newBalance": 6000
}
```
