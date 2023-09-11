# Team 2

## Directory tree

```bash
── app.js
├── controllers
│   └── index.js
├── db
│   ├── migrations
│   └── schema.sql
├── middlewares
│   └── index.js
├── models
│   └── index.js
├── package-lock.json
├── package.json
├── pull_request_template.md
├── readme.md
├── routes
│   └── index.js
├── services
│   └── index.js
└── utils
    └── throwError.js

```

## Error handler

```js
// app.js
app.use((err, _, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: `${err.status ? err.status : ''} ${err.message}`,
  });
});
```

에러 핸들링용 미들웨어로 `route.use` 메서드의 `catch` 에서 잡히는 모든 에러를 `catch`단에 `next(err)`를 호출함으로써 공통으로 처리할 수 있습니다.

    예시

```js
app.delete('/posts', async (req, res, next) => {
  try {
    const { post_id } = req.body;
    const { id } = req.query;
    if (id) {
      await dataSource.query(
        `DELETE FROM posts WHERE posts.id=? AND posts.user_id=?`,
        [post_id, id],
      );
      return res.status(200).json({ message: 'post deleted' });
    }
    throwError(401);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
```
