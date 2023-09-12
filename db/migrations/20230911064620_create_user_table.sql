-- migrate:up
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nickname` varchar(10) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(500) NOT NULL,
  `profile_image` text NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `birth_day` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- migrate:down
DROP TABLE users;
