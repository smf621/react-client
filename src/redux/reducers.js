// 包含n个reducer函数    根据老的state 和制定的action返回一个新的state

import { combineReducers } from 'redux'

import {AUTH_SUCCESS,ERROR_MSG} from './action-type'

const initUser = {
    username:'', // 用户名
    type:'', //用户类型   dashen/laoban
    msg:'' //错误信息
}
function user (state=initUser, action){
    switch(action.type){
        case AUTH_SUCCESS: //data是user
            //后面的值 把前面的值覆盖
            return {...state,...action.data}
        case ERROR_MSG:    //data是msg
            return {...state,msg:action.data}
        default:
            return state
    }
}

//向外暴露的结构   { user:{} }
export default combineReducers({
    user
})
