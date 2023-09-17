-- migrate:up
CREATE TABLE `threads_likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `thread_id` int NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `thread_id` (`thread_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `thread_likes_ibfk_1` FOREIGN KEY (`thread_id`) REFERENCES `threads` (`id`),
  CONSTRAINT `thread_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- migrate:down
DROP TABLE thread_likes;
