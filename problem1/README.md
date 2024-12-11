# Сервисы учёта остатков и истории действий

Данный проект включает два взаимосвязанных сервиса:

1. **Сервис учёта остатков**: Управляет остатками товаров, включая уровни запасов в магазинах.
2. **Сервис истории действий**: Логирует и предоставляет данные о событиях, связанных с изменением остатков.

## Требования

- **Node.js** (v16 или выше)
- База данных **MySQL**

## Настройка проекта

1. Клонируйте репозиторий и перейдите в директорию проекта:

   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Установите зависимости:

   ```bash
   npm install
   ```

3. Настройте переменные окружения:

   Создайте файл `.env` в корневой директории и добавьте следующие переменные:

   ```env
   PORT=4603
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

4. Запустите сервер:

   ```bash
   npm run dev
   ```

## Конечные точки API

### Сервис учёта остатков

**Базовый URL**: `/`

#### 1. Создание товара
- **Endpoint**: `POST /products`
- **Описание**: Добавить новый товар.
- **Тело запроса**:
  ```json
  {
    "plu": "12345",
    "name": "Название товара"
  }
  ```

#### 2. Создание записи об остатке
- **Endpoint**: `POST /stocks`
- **Описание**: Добавить данные об остатках товара в конкретном магазине.
- **Тело запроса**:
  ```json
  {
    "plu": "12345",
    "shop_id": 1,
    "shelf_quantity": 100,
    "order_quantity": 50
  }
  ```

#### 3. Обновление уровня остатков
- **Увеличение остатков**: `PUT /stocks/increase`
- **Уменьшение остатков**: `PUT /stocks/decrease`
- **Тело запроса**:
  ```json
  {
    "plu": "12345",
    "shop_id": 1,
    "quantity": 10
  }
  ```

#### 4. Получение информации об остатках
- **Endpoint**: `GET /stocks`
- **Параметры запроса**:
  - `plu`: Артикул товара
  - `shop_id`: Идентификатор магазина
  - `shelf_quantity_min` & `shelf_quantity_max`
  - `order_quantity_min` & `order_quantity_max`

#### 5. Получение списка товаров
- **Endpoint**: `GET /products`
- **Параметры запроса**:
  - `name`: Название товара
  - `plu`: Артикул товара

### Сервис истории действий

**Базовый URL**: `/actions`

#### 1. Логирование действия
- Автоматически логирует любые изменения остатков (например, обновления остатков).

#### 2. Получение истории действий
- **Endpoint**: `GET /actions`
- **Параметры запроса**:
  - `shop_id`: Идентификатор магазина
  - `plu`: Артикул товара
  - `date_from` & `date_to`: Диапазон дат
  - `action`: Тип действия (например, увеличение, уменьшение)
  - Постраничная навигация: `page` и `limit`

## Схема базы данных

### Таблица товаров (Products)
| Колонка      | Тип         | Описание              |
|--------------|-------------|-----------------------|
| `id`         | INT (PK)    | Уникальный идентификатор |
| `plu`        | VARCHAR(50) | Код товара           |
| `name`       | VARCHAR(255)| Название товара      |

### Таблица остатков (Stocks)
| Колонка           | Тип         | Описание                     |
|-------------------|-------------|-----------------------------|
| `id`              | INT (PK)    | Уникальный идентификатор    |
| `product_id`      | INT (FK)    | Ссылка на таблицу товаров   |
| `shop_id`         | INT         | Идентификатор магазина      |
| `shelf_quantity`  | INT         | Количество на полке         |
| `order_quantity`  | INT         | Количество в заказах        |

### Таблица действий (Actions)
| Колонка      | Тип         | Описание                     |
|--------------|-------------|-----------------------------|
| `id`         | INT (PK)    | Уникальный идентификатор    |
| `shop_id`    | INT         | Идентификатор магазина      |
| `plu`        | VARCHAR(50) | Код товара                  |
| `action`     | VARCHAR(50) | Тип действия (например, увеличение) |
| `quantity`   | INT         | Изменённое количество       |
| `timestamp`  | DATETIME    | Время действия              |

## Утилиты

Все SQL-скрипты для создания таблиц и примеры запросов находятся в папке `utilsfiles`.

## Дополнительные заметки

- Убедитесь, что база данных правильно настроена перед запуском приложения.
- Для отладки или тестирования используйте инструменты, такие как Postman или cURL.
- Расширяйте эту документацию по мере добавления новых функций.

---

Если у вас возникнут вопросы или проблемы, свяжитесь с ответственным за проект.











# Inventory and Action History Services

This project contains two interconnected services:

1. **Inventory Service**: Manages product inventory, including stock levels in stores.
2. **Action History Service**: Logs and retrieves events related to inventory changes.

## Requirements

- **Node.js** (v16 or higher)
- **MySQL** database

## Project Setup

1. Clone the repository and navigate to the project directory.

   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=4603
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   ```

4. Start the server:

   ```bash
   npm run dev
   ```

## API Endpoints

### Inventory Service

**Base URL**: `/`

#### 1. Create a Product
- **Endpoint**: `POST /products`
- **Description**: Add a new product.
- **Request Body**:
  ```json
  {
    "plu": "12345",
    "name": "Product Name"
  }
  ```

#### 2. Create a Stock Entry
- **Endpoint**: `POST /stocks`
- **Description**: Add stock details for a product in a specific store.
- **Request Body**:
  ```json
  {
    "plu": "12345",
    "shop_id": 1,
    "shelf_quantity": 100,
    "order_quantity": 50
  }
  ```

#### 3. Update Stock Levels
- **Increase Stock**: `PATCH /stocks/increase`
- **Decrease Stock**: `PATCH /stocks/decrease`
- **Request Body**:
  ```json
  {
    "plu": "12345",
    "shop_id": 1,
    "quantity": 10
  }
  ```

#### 4. Retrieve Stock Details
- **Endpoint**: `GET /stocks`
- **Query Parameters**:
  - `plu`: Product identifier
  - `shop_id`: Store identifier
  - `shelf_quantity_min` & `shelf_quantity_max`
  - `order_quantity_min` & `order_quantity_max`

#### 5. Retrieve Products
- **Endpoint**: `GET /products`
- **Query Parameters**:
  - `name`: Product name
  - `plu`: Product identifier

### Action History Service

**Base URL**: `/actions`

#### 1. Log an Action
- Automatically logs any changes to inventory (e.g., stock updates).

#### 2. Retrieve Action History
- **Endpoint**: `GET /actions`
- **Query Parameters**:
  - `shop_id`: Store identifier
  - `plu`: Product identifier
  - `date_from` & `date_to`: Date range
  - `action`: Type of action (e.g., increase, decrease)
  - Pagination: `page` and `limit`

## Database Schema

### Products Table
| Column     | Type        | Description          |
|------------|-------------|----------------------|
| `id`       | INT (PK)    | Unique identifier   |
| `plu`      | VARCHAR(50) | Product code        |
| `name`     | VARCHAR(255)| Product name        |

### Stocks Table
| Column          | Type        | Description                     |
|-----------------|-------------|---------------------------------|
| `id`            | INT (PK)    | Unique identifier              |
| `product_id`    | INT (FK)    | Linked to Products table       |
| `shop_id`       | INT         | Store identifier               |
| `shelf_quantity`| INT         | Quantity on the shelf          |
| `order_quantity`| INT         | Quantity in orders             |

### Actions Table
| Column      | Type        | Description                     |
|-------------|-------------|---------------------------------|
| `id`        | INT (PK)    | Unique identifier              |
| `shop_id`   | INT         | Store identifier               |
| `plu`       | VARCHAR(50) | Product code                   |
| `action`    | VARCHAR(50) | Action type (e.g., increase)   |
| `quantity`  | INT         | Quantity changed               |
| `timestamp` | DATETIME    | Time of action                 |

## Utility Scripts

All database creation scripts and request examples are located in the `utilsfiles` folder.

## Additional Notes

- Ensure the database is properly set up before running the application.
- For debugging or testing, use tools like Postman or cURL.
- Extend this documentation as needed when adding new features.

---

If you encounter any issues, feel free to contact the project maintainer.

