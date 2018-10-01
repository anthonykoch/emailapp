const path = require('path')

module.exports = {
  postgres: {
    seeds: {
      directory: path.join(__dirname, '../database/seeds'),
    },
    migrations: {
      directory: path.join(__dirname, '../database/migrations'),
    },
  },
  authentication: {
    // TODO: Change this in production.js
    secret: '7a6f0ecb181290b056b58a409de084e1a5e05c6a49127b27f22e85d43462a5899519f026f520c34798b1479adcb0917e8914c18b83711e352c294df9000e462b41d1b6269278c848297ba2fdd61c350780515fe14804e60cc39a7d17b29b412ff51215b6034ef43dc1ddcacbd9ee9db13ad454e3dc7b0affb5f50b205d92e096d522a347e7f6040b7b40aaf2d748dbbfec1848c963dde975e36ba37425515b43120ddd9966ad40aea3ce7223b3f0d54da7f9365431b441485804b3997cb394d3f86f9a181d6ed1afb037b8eafcb26cb7fbf76c358b3c6e8b4741a67b91cf384aa44f1e835eeeb767d5063626081d7e49ffdd8c6fea52f07df7e71063ba8c43fa',
    strategies: [
      'jwt',
      'local',
    ],
    service: 'users',
    jwt: {
      header: {
        typ: 'access',
      },
      audience: 'https://yourdomain.com',
      subject: 'anonymous',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
    local: {
      entity: 'user',
      usernameField: 'email',
      passwordField: 'password',
    },
    // google: {
    //   clientID: 'your google client id',
    //   clientSecret: 'your google client secret',
    //   successRedirect: '/',
    //   scope: [
    //     'profile openid email',
    //   ],
    // },
    // github: {
    //   clientID: 'your github client id',
    //   clientSecret: 'your github client secret',
    //   successRedirect: '/',
    // },
    cookie: {
      enabled: true,
      name: 'feathers-jwt',
      httpOnly: false,
      secure: false,
    },
  },
}
