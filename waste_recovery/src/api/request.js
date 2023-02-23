import axios from 'axios'
import {Notification} from 'element-ui'

//响应拦截
axios.interceptors.response.use(success => {
    //success.status: http的响应码
    //success.data.status == 500: 返回json的status
    if(success.status && success.status == 200 && success.data.status == 500 ){
        //把后台的消息打印出来
        console.log(success.data.msg)
        return;
    }
    if(success.data.msg){
        //把操作成功的信息也打印出来
        console.log(success.data.msg)
    }
    return success.data
},error =>{ //失败的处理
    if(error.response.status == 504 || error.response.status == 404){
        Notification({
            title: '错误',
            message: '服务出错',
            type: 'error'
        })
    }else{
        //服务器返回的错误信息
        if(error.response.data.msg){
            Notification({
                title: '错误',
                message: error.response.data.msg,
                type: 'error'
            })
        }else{
            Notification({
                title: '错误',
                message: "未知错误",
                type: 'error'
            })
        }
    }
    return;
})

let base = 'http://localhost:8080'; //请求的服务器地址

//封装请求
const request = (method ,url, params, token) => {

    let headers = { 'Content-Type': 'application/json', 'Authorization' : token }

    return axios({
        method,
        url: `${base}${url}`,
        data: params,
        headers,
    })
}

export default request