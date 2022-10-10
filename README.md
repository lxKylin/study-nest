## 连接本地数据库
- 根据`.env`文件中的内容，在`MySQL`数据库中新建`ccia-nest`数据库（也可修改为其他名字，`.env`文件中的名字也需要修改）

## Installation

```bash
yarn install
```

## Running the app

```bash
# development
yarn start
```

## .env文件
```.env
DATABASE_USER=root
DATABASE_PASSWORD=root
DATABASE_NAME=ccia-nest
DATABASE_PORT=3306
DATABASE_HOST=localhost

SERVICE_PORT=9527

JWT_KEY=Kylin
```
