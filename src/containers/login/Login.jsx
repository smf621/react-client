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
import Logo from '../../components/logo/logo'

const ListItem = List.Item
export default class Login extends Component {
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
        console.log(this.state);
    }
    toRegister = () => {
        this.props.history.replace('/register')
    }
    render() {
        return (
            <div>
                <NavBar>shenmingfeng</NavBar>
                <Logo />
                <WingBlank>
                    <List>
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
