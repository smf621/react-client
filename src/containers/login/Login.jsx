//登录路由组件
import React, { Component } from 'react'
import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'

import {login} from '../../redux/actions'
import Logo from '../../components/logo/logo'

const ListItem = List.Item
 class Login extends Component {
    state = {
        username: '',
        password: '',
    }
    handleChange = (name, val) => {
        this.setState({
            [name]: val   // 属性名不是name 而是值
        })
    }
    login = () => {
        this.props.login(this.state)
    }
    toRegister = () => {
        this.props.history.replace('/register')
    }
    render() {
        console.log(this.props.user);
        const {msg,redirectTo} = this.props.user
        //redirectTo有值  重定向到 指定路由
        if(redirectTo){
            return (<Redirect to={redirectTo}/>)
        }
        return (
            <div>
                <NavBar>shenmingfeng</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                    {msg ? <div className='error-msg'>{msg}</div>:''}
                        <WhiteSpace />
                        <InputItem onChange={val =>{this.handleChange('username',val)}}>用户名：</InputItem>
                        <WhiteSpace />
                        <InputItem onChange={val =>{this.handleChange('password',val)}} type='password'>密&nbsp;&nbsp;&nbsp;码：</InputItem>
                        <WhiteSpace />

                        <Button type='primary' onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <Button onClick={this.toRegister}>还没有账户</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}

export default connect(
    state=>({user:state.user}),
    {login}
)(Login)
