//数据库初始化
const mysql = require('knex')({
  client: 'mysql', //指明数据库类型，还可以是mysql，sqlite3等等
  connection: { //指明连接参数
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'test'
  },
  debug: false, //指明是否开启debug模式，默认为true表示开启
  pool: { //指明数据库连接池的大小，默认为{min: 2, max: 10}
    min: 2,
    max: 10,
  },
  acquireConnectionTimeout: 30000, //指明连接计时器大小，默认为60000ms
});

const CONF = {
  serverHost: 'localhost',
  networkTimeout: 30000,
  port: '5757',
  rootPathname: '',
  mysql: mysql
};

module.exports = CONF;
