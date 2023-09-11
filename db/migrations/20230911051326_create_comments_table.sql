-- migrate:up
CREATE TABLE comments (
  id INT NOT NULL PRIMARY KEY,
  content TEXT NOT NULL,
  user_id INT NOT NULL,
  thread_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
DROP TABLE comments;