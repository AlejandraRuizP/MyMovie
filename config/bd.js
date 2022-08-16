require('dotenv').config()
module.exports = {
    "development": {
      "username": process.env.PGUSER,
      "password": process.env.PGPASSWORD,
      "database": process.env.PGDB,
      "host": process.env.PGHOST,
      "dialect": process.env.APP_DB
    },
    "test": {
      "username": "root",
      "password": null,
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": null,
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
   