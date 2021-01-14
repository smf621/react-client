//主界面路由组件
import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import {NavBar} from 'antd-mobile'
import { getRedirectTo } from '../../utils/index'
import {getUser} from '../../redux/actions'
import DashenInfo from '../dashen-info/Dashen-info'
import LaobanInfo from '../laoban-info/Laoban-info'
import Dashen from '../dashen/Dashen'
import Laoban from '../laoban/Laoban'
import Message from '../message/Message'
import Personal from '../personal/Personal'
import NotFound from '../../components/not-found/NotFound'
import NavFooter from '../../components/nav-footer/NavFooter'

class Main extends Component {
    // 给组件对象添加属性
  navList = [ // 包含所有导航组件的相关信息数据
    {
      path: '/laoban', // 路由路径
      component: Laoban,
      title: '大神列表',
      icon: 'dashen',
      text: '大神',
    },
    {
      path: '/dashen', // 路由路径
      component: Dashen,
      title: '老板列表',
      icon: 'laoban',
      text: '老板',
    },
    {
      path: '/message', // 路由路径
      component: Message,
      title: '消息列表',
      icon: 'message',
      text: '消息',
    },
    {
      path: '/personal', // 路由路径
      component: Personal,
      title: '用户中心',
      icon: 'personal',
      text: '个人',
    }
  ]

    //登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user
    componentDidMount() {
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if (userid && !_id) {
            // 发送异步请求, 获取user
            // console.log('发送ajax请求获取user')
            this.props.getUser()
        }
    }

    render() {
        //读取cookie中的userid
        const userid = Cookies.get('userid')
        //如果没有 跳转login
        if (!userid) {
            return <Redirect to='/login' />
        }
        //如果有，读取redux中的user状态
        const { user } = this.props
        if (!user._id) {
            return null
        } else {
            //如果请求根路径   根据user的type和header计算出重定向路径
            let path = this.props.location.pathname
            if (path === '/') {
                //得到一个重定向路径
                path = getRedirectTo(user.type, user.header)
                return <Redirect to={path} />
            }
        }
        const {navList} = this
        const path = this.props.location.pathname //请求的路径
        const currentNav = navList.find(nav => nav.path===path) //得到当前的nav   可能没有

        if(currentNav){
            if(user.type==='laoban') {
                // 隐藏数组的第2个
                navList[1].hide = true
              } else {
                // 隐藏数组的第1个
                navList[0].hide = true
              }
        }


        return (
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map(nav => <Route key={nav.path} path={nav.path} component={nav.component}></Route>)
                    }
                    <Route path="/dasheninfo" component={DashenInfo}></Route>
                    <Route path="/laobaninfo" component={LaobanInfo}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
                {currentNav ? <NavFooter navList={navList}/> : null}
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
    {getUser}
)(Main)


/*
1. 实现自动登陆:
  1. componentDidMount()
    登陆过(cookie中有userid), 但没有有登陆(redux管理的user中没有_id) 发请求获取对应的user:
  2. render()
    1). 如果cookie中没有userid, 直接重定向到login
    2). 判断redux管理的user中是否有_id, 如果没有, 暂时不做任何显示
    3). 如果有, 说明当前已经登陆, 显示对应的界面
    4). 如果请求根路径: 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
 */
