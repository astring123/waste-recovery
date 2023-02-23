const path = require("path")

//配置请求转发的代理
//定义代理的对象
let proxyObj = {};

//拦截http请求
proxyObj['/'] = {
  ws: false,  //关掉websocket
  target: 'http://localhost:8000', //目标转发的地址
  changeOrigin: true,
  pathRewrite:{  //请求地址重写
    '^/': ''  //拦截到的地址不去修改它
  }
}

module.exports = {
  //基本路径  ---这个千万不能省，不然你的静态资源找不到
  publicPath: "./",
  //输出文件目录
  outputDir: "dist",
  //代理
  devServer:{  //配置开发环境
    host:"localhost",
    port: 8080, //端口号
    open: true, //配置游览器自动访问
    proxy: proxyObj  //代理对象
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.join(__dirname, "./src/assets/style/index.less")],
    },
  }
};



