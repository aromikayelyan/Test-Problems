CREATE TABLE `actionsHistory` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_id VARCHAR(255) NOT NULL,
            shop_id VARCHAR(255) NOT NULL,
            actions VARCHAR(255),
			quantity_change INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `markets` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            market_name VARCHAR(255) NOT NULL,
            market_address VARCHAR(255) NOT NULL,
            uid VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `products` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_name VARCHAR(255) NOT NULL,
            product_plu VARCHAR(255) NOT NULL,
            uid VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `stocks` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            product_uid VARCHAR(255) NOT NULL,
            shop_uid VARCHAR(255) NOT NULL,
            quantity_on_shelf INT,
			quantity_on_order INT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
