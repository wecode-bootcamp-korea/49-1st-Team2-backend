# Team 2

```js
// app.js
app.use((err, _, res, next) => {
  res.status(err.status || 500);
  return res.json({
    error: `${err.status ? err.status : ''} ${err.message}`,
  });
});
```

에러 핸들링용 미들웨어로 `route.use` 메서드의 `catch` 에서 잡히는 모든 에러를 공통으로 처리할 수 있습니다.
