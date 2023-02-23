const dotenv = require('dotenv')
// dotenv读取目录中.env文件，将配置写入process.env中

dotenv.config()

module.exports = process.env
// process指定是当前执行的node进程，env指环境变量