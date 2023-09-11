-- migrate:up
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nickname VARCHAR(10) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(20) NOT NULL,
  profile_image TEXT NOT NULL,
  phone_number VARCHAR(20) NULL,
  birth_day DATE NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NULL ON UPDATE CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE users;