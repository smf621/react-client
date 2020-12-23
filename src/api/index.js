import ajax from './ajax'

//登录
export const reqRegister = (user) => ajax('/register',user,'POST')
//注册
export const reqLogin = (user) => ajax('/login',user,'POST')
//修改用户
export const reqUpdateUser = (user) => ajax('/update',user,'POST')