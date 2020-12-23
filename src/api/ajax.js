// 能发送ajax请求的函数模块  
// 函数返回值是promise对象
import axios from 'axios'
export default function ajax (url, data={}, type='GET'){
    if(type === 'GET'){
        let paramsStr = ''
        // data: {username:smf,password:123}
        Object.keys(data).forEach(key=>{
            paramsStr += key + '=' + data[key] + '&'
        })
        if(paramsStr !== ''){
            //去除最后的一个&
            paramsStr = paramsStr.substring(0,paramsStr.length-1)
        }
        return axios.get(url+'?'+paramsStr)
    }else{
        return axios.post(url,data)
    }
}