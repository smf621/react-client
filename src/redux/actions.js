//  包含n个action creator
//  异步  action
//  同步  action

import { reqRegister, reqLogin, reqUpdateUser, reqUser, reqUserList } from '../api/index'
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST } from './action-type'


//授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
//授权失败的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })
//接收用户的同步action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })
//重置用户的同步action
export const resetUser = (msg) => ({ type: RESET_USER, data: msg })
//接受用户列表的同步action
export const receiveUserList = (userList) => ({ type: RECEIVE_USER_LIST, data: userList })


//注册异步action
export const register = (user) => {
    const { username, password, password2, type } = user
    //// 进行前台表单验证, 如果不合法返回一个同步action 对象, 显示提示信息
    if (!username || !password || !type) {
        return errorMsg('用户名密码必须输入')
    }
    if (password !== password2) {
        return errorMsg('两次密码不一致')
    }
    return async dispatch => {
        const response = await reqRegister({ username, password, type })
        console.log(response);
        const res = response.data
        if (res.code === 0) { //成功
            //分发同步action
            dispatch(authSuccess(res.data))
        } else {
            dispatch(errorMsg(res.msg))
        }
    }
}
//登录异步action
export const login = (user) => {
    const { username, password } = user
    if (!username || !password) {
        return errorMsg('用户密码必须输入')
    }
    return async dispatch => {
        const response = await reqLogin(user)
        const res = response.data
        if (res.code === 0) { //成功
            //分发同步action
            dispatch(authSuccess(res.data))
        } else {
            console.log(res.msg);
            dispatch(errorMsg(res.msg))
        }
    }
}
//异步更新用户action
export const updateUser = (user) => {
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const res = response.data
        if (res.code === 0) {
            dispatch(receiveUser(res.data))
        } else {
            dispatch(resetUser(res.msg))
        }
    }
}
//获取用户异步action
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const res = response.data
        if (res.code === 0) {
            dispatch(receiveUser(res.data))
        } else {
            dispatch(resetUser(res.msg))
        }
    }
}

//获取用户列表的异步action
export const getUserList = (type) => {
    console.log(type);
    return async dispatch => {
        // 执行异步ajax请求
        const response = await reqUserList(type)
        const res = response.data
        console.log(res);
        if (res.code === 0) {
            dispatch(receiveUserList(res.data))
        }
    }
}

