const CONF = {

  serverHost: 'localhost',
  networkTimeout: 30000,

  port: '5757',
  rootPathname: '',
  /**
   * MySQL 配置，用来存储 session 和用户信息
   * 若使用了腾讯云微信小程序解决方案
   * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
   */
  mysql: {
    host: 'localhost',
    port: 3306,
    user: 'root',
    db: 'cAuth',
    pass: '123456',
    char: 'utf8mb4'
  },
}

module.exports = CONF
