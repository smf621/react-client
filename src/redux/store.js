// redux 核心代码模块]
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'  //异步
import {composeWithDevTools} from 'redux-devtools-extension'

import reducers from './reducers'

//向外暴露store对象
export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)))