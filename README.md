1.下载依赖项，输入 npx knex init,useNullAsDefault:true
2.npx knex migrate:make create-lessons-table  
3.在 model 下创建 dbhelper.js 写 add 的异步函数，注意这里一定要是异步函数。  
4.查看 knex 官方文档，写好所有 knex 提供的关于数据库的操作函数（添加数据，查找数据，删除数据，更新数据等），然后作为模块引入到对应 api router 中使用（post/get/getbyid/delete/patch 等）  
5.yarn add dotenv,注意 require('dotenv').config()要放在 index.js 的最顶端,设置环境变量 PORT  
6.设置数据库配置文件 dbConfig.js，不需要在.env 文件中设置生产模式的 DB_ENVIRONMENT 变量，而是在部署时在 heroku 的环境变量中设置  
7.到 knexfile.js 中设置 production 模式下的配置  
8.heroku 通过 package.json 中的"start" script 来启动服务器  
9.从 git deploy 到 heroku,选择 auto change 模式，成功后到 setting————Reveal Config Vars  
10.yarn add pg,修改 knexfile 中的 production 模式  
11.从 cli 登录 heroku,在 heroku-cli 输入 heroku run knex migrate:latest -a node-express-db 12.因为 sqlite 和 postgres 的不同，为了去除 post 的错误，需要修改原 knexfile 中的不适用于 postgres 的 add 方法  
12.创建用户 table--knex migrate:make createUsersTable,往 dbhelper 里添加 addUser/findUsers/findUserByUsername 函数,添加 userRoutes 到 server.js  
13.hash password,yarn add bcryptjs,用 bcrypt.hashSync()来 hash，函数接收两个参数，要 hash 的原始 password 和 hash 轮数，登录验证时用 bcrypt.compareSynch(),接收 req.body.password 和数据库中的 hashedpassword  
14.设置 cookies 和 sessions,yarn add express-session,在 server.js 中初始化 express-session,并初始化 sessionConfig  
15.mkdir auth,把 register 和 login 放到 api/auth 路由下面  
16.在 auth 目录下创建 restricted 中间件，到 server.js 在路由间加入 restricted 中间件  
17.如果使用 jwt，需要注释或删除 server.js 里的 session,sessinonConfig 等
18.yarn add jsonwebtoken,在 auth 目录下新建 generateToken.js,设置 generateToken 方法，引入 auth-router.js 中的 login 函数中,注释原先的 express session 版本的 restrict 函数，改写为 jwt 版本
