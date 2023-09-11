-- migrate:up
CREATE TABLE thread_likes (
  id INT NOT NULL PRIMARY KEY,
  thread_id INT NOT NULL,
  user_id INT NOT NULL
);

-- migrate:down
DROP TABLE thread_likes;