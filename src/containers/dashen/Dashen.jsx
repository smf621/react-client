// 大神主界面路由容器组件
import React, { Component } from 'react'
import {connect} from 'react-redux'

import UserList from '../../components/user-list/UserList'
import {getUserList} from '../../redux/actions'


class Dashen extends Component {
    componentDidMount(){
        console.log(this.props);
         this.props.getUserList('laoban')
    }
    render() {
        return (
            <UserList userList={this.props.userList}></UserList>
        )
    }
}
export default connect(
    state => ({userList: state.userList}),
  {getUserList}
)(Dashen)