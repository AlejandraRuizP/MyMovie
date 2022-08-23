const chalk = require('chalk')
const app = require('./app')

require('dotenv').config()

app.listen(process.env.APP_PORT, () => console.log(chalk.green.inverse(`Example app listening on port ${process.env.APP_PORT}!`)))
