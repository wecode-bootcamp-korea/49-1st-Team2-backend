# Wereads

wereads는 meta 사의 thread 서비스의 주요 기능을 직접 구현해보고 이해하는 프로젝트입니다.

## Author 👥

<table>
  <tr>
    <th>Author</th>
    <th>Author</th>
    <th>Author</th>
  </tr>
  <tr>
    <td>
      <a href="https://github.com/B3lla0">고은채</a>
    </td>
    <td>
      <a href="https://github.com/kroonstazy">이동훈</a>
    </td>
    <td>
      <a href="https://github.com/03290419">이현진</a>
    </td>
  </tr>
</table>


## Skills 🛠️

- `Express.js`
- `TypeORM`
- `JWT`
- `bcrypt`
- `nodemailer`


## Directory tree 🌲

```bash
├── app.js
├── controllers
│   ├── commentController.js
│   ├── index.js
│   ├── threadController.js
│   └── userController.js
├── db
│   ├── migrations
│   │   ├── 20230911064620_create_user_table.sql
│   │   ├── 20230911064804_create_threads_table.sql
│   │   ├── 20230911065003_create_comments_table.sql
│   │   └── 20230911065108_create_threads_likes_table.sql
│   └── schema.sql
├── middlewares
│   └── index.js
├── models
│   ├── commentDao.js
│   ├── dataSource.js
│   ├── index.js
│   ├── threadDao.js
│   └── userDao.js
├── package-lock.json
├── package.json
├── pull_request_template.md
├── readme.md
├── routes
│   ├── commentRouter.js
│   ├── index.js
│   ├── threadRouter.js
│   └── userRouter.js
├── services
│   ├── commentService.js
│   ├── index.js
│   ├── threadService.js
│   └── userService.js
└── utils
    └── index.js

```
