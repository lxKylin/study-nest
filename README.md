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

SERVICE_PORT=1029

JWT_KEY=Kylin
```

## Nestjs基本命令

- `nest g mo posts` 创建一个`posts`模块，文件目录不写，默认创建和文件名一样的`posts`目录，在`posts`目录下创建一个`posts.module.ts`
```ssh
//语法
nest g [文件类型] [文件名] [文件目录]
nest g mo
nest g co
nest g service
```
- 注意创建顺序： 先创建`Module`, 再创建`Controller`和`Service`, 这样创建出来的文件在`Module`中自动注册，反之，后创建`Module`, `Controller`和`Service`,会被注册到外层的`app.module.ts`
- `nest --help`
![nest --help](https://cdn.nlark.com/yuque/0/2022/png/23115285/1669084883170-d53e995e-425b-42da-8acb-167f4d217705.png)