//  包含n个action creator
//  异步  action
//  同步  action

import { reqRegister, reqLogin } from '../api/index'
import { AUTH_SUCCESS, ERROR_MSG } from './action-type'


//授权成功的同步action
const authSuccess = (user) => ({ type: AUTH_SUCCESS, data: user })
//授权失败的同步action
const errorMsg = (msg) => ({ type: ERROR_MSG, data: msg })



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
        const res = await reqLogin(user)
        if (res.code === 0) { //成功
            //分发同步action
            dispatch(authSuccess(res.data))
        } else {
            dispatch(errorMsg(res.msg))
        }
    }
}

