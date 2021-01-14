// 包含n个reducer函数    根据老的state 和制定的action返回一个新的state

import { combineReducers } from 'redux'

import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER,RECEIVE_USER_LIST } from './action-type'
import {getRedirectTo} from '../utils/index'

const initUser = {
    username: '', // 用户名
    type: '', //用户类型   dashen/laoban
    msg: '',//错误信息
    redirectTo: '' //需要自动 重定向的路由路径
}
//产生user状态的raducer
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: //data是user
        const {type,header} = action.data
            //后面的值 把前面的值覆盖
            return { ...action.data, redirectTo: getRedirectTo(type,header) }
        case ERROR_MSG:    //data是msg
            return { ...state, msg: action.data }
        case RECEIVE_USER:    
            return action.data 
        case RESET_USER:    //data是msg
            return { ...initUser, msg: action.data }
        default:
            return state
    }
}

const initUserList = []
// 产生userlist状态的reducer
function userList(state=initUserList, action) {
  switch (action.type) {
    case RECEIVE_USER_LIST:  // data为userList
      return action.data
    default:
      return state
  }
}




//向外暴露的结构   { user:{} }
export default combineReducers({
    user,
    userList
})
