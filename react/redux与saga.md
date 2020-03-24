### redux与saga

继续上一篇文章，这篇文章主要是介绍一下`Redux`和`Redux-Saga`的基本使用以及我常在工作中使用的方法，文中如有错误，欢迎指正。本文对其中涉及到的一些概念不做具体介绍，大家可以去[Redux官网](https://www.redux.org.cn/)去查看。文末涉及到的项目，具体代码请查看 [Git仓库](https://github.com/Hdoove/React-Account)。

### 一、Redux

#### 1.什么是Redux。
`Redux` 是 `JavaScript` 状态容器，提供可预测化的状态管理。
#### 2.安装
` npm install redux -S `
#### 3.三大原则

* 单一数据源
* `state`是只读的
* 使用纯函数进行修改

#### 4.使用方法

#### 4.1 Action

通常`state`变化会导致`View`层出现变化，但是用户其实是接触不到`state`的，只能通过`View`层进行修改。`Action`就是`View`层发出的一个通知，通知`state`要发生变化。

`Action`是一个对象，`type`属性是必须的，表示这次通知的名称，其他属性可以自由设置，我一般都是用`payload`属性，大家可以自由发挥。

#### 4.2 Reducer

`Store` 收到 `Action` 以后，必须给出一个新的 `State`，这样 `View` 才会发生变化。这种 `State` 的计算过程就叫做 `Reducer`。

`Reducer` 是一个函数，它接受 `Action` 和当前 `State` 作为参数，返回一个新的 `State。`

`Reducer` 函数最重要的特征是，它是一个纯函数。也就是说，只要是同样的输入，必定得到同样的输出。

#### 4.3 dispatch

store.dispatch()是 `View` 发出 `Action` 的唯一方法。

接收一个`Action`为参数，并发送。

````javascript

// 发送
store.dispatch({
    type: 'TEST',
    payload: 'payload'
});

// 手动触发
const data = {
    name: 'lj'
}

const reducer = (state = data, action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return {...state, action.payload};
    default: 
      return state;
  }
};

const state = reducer(data, {
  type: 'CHANGE_NAME',
  payload: {name: 'hd'}
});

````

#### 4.4 createStore

为了避免每次手动调用`Reducer`函数，`store.dispatch`方法会触发 `Reducer` 的自动执行。为此，`Store` 需要知道 `Reducer` 函数，做法就是在生成 `Store` 的时候，将 `Reducer` 传入`createStore`方法。

````javascript

import { createStore } from 'redux';
const store = createStore(reducer);

````

`createStore`接受 `Reducer` 作为参数，生成一个新的 `Store`。以后每当`store.dispatch`发送过来一个新的 `Action`，就会自动调用 `Reducer`，得到新的 `State`。

#### 4.5 combineReducers

用于 `Reducer` 的拆分。你只要定义各个子 `Reducer` 函数，然后用这个方法，将它们合成一个大的 `Reducer`。

````javascript

import { combineReducers } from 'redux';

const Reducer = combineReducers({
  reducer1,
  reducer2,
  reducer3
})

export default Reducer;

````

#### 4.6 创建

创建的方法其实很简单，我目前使用 `redux-actions`，其实是一个中间件，可以用来简化生成`Action`以及`Reducer`。

安装

`npm install --save redux-actions`

使用

````javascript

./actions/index.js
import { createActions } from 'redux-actions';

const actions = createActions({
    SET_ACCOUNT: data => data
});

./reducer/index.js
import { handleActions } from 'redux-actions';
import actions from '../actions/index';
import Immutable from "seamless-immutable";

const defaultState = Immutable({
    accounts: []
});

const reducer = handleActions(
    new Map([
        [
            actions.setAccount,
            (state, {
                payload
            }) => 
            state.set("accounts", payload)
        ]
    ]),
    defaultState
);

export default reducer;

````

解释一下上面的部分代码


`createActions(actionMap)`

同来创建`action`，`actionMap`是一个对象，操作类型作为键，其值必须是一个函数或者一个数组或者是`actionMap`。



````

createActions({
  ADD_TODO: todo => ({ todo }), // payload creator
  REMOVE_TODO: [
    todo => ({ todo }), // payload creator
    (todo, warn) => ({ todo, warn }) // meta
  ]
});

````


`handleActions(reducerMap, defaultState[, options])`

用来创建多个`reduce`,接收两个参数，第一个参数是一个映射，第二个参数是初始的`state`。

````

//两种写法

1.
const reducer = handleActions(
  {
    INCREMENT: (state, action) => ({
      counter: state.counter + action.payload
    }),

    DECREMENT: (state, action) => ({
      counter: state.counter - action.payload
    })
  },
  { counter: 0 }
);

2.
const reducer = handleActions(
  new Map([
    [
      INCREMENT,
      (state, action) => ({
        counter: state.counter + action.payload
      })
    ],

    [
      DECREMENT,
      (state, action) => ({
        counter: state.counter - action.payload
      })
    ]
  ]),
  { counter: 0 }
);

````





### 二、React-Redux

#### 1.介绍

`Redux` 官方提供的 `React` 绑定库。 具有高效且灵活的特性。

#### 2.安装

` npm install react-redux -S `

#### 3.UI组件和容器组件

`React-Redux` 将所有组件分成两大类：UI 组件和容器组件。

UI组件<br>

* 只负责 `UI` 的呈现，不带有任何业务逻辑。
* 没有状态（不使用this.state这个变量）。
* 所有数据都由参数（this.props）提供。
* 不使用任何 `Redux` 的 `API。`

容器组件<br>

* 负责管理数据和业务逻辑，不负责 `UI` 的呈现。
* 带有内部状态。
* 使用 `Redux` 的 API。

#### 3.1 connect
连接 `React` 组件与 `Redux store`。

连接操作不会改变原来的组件类。

反而返回一个新的已与 `Redux store` 连接的组件类。

`connect`方法接受两个参数：`mapStateToProps`和`mapDispatchToProps`。它们定义了 `UI` 组件的业务逻辑。前者负责输入逻辑，即将state映射到 `UI` 组件的参数（props），后者负责输出逻辑，即将用户对 `UI` 组件的操作映射成 `Action`。

````javascript

import { connect } from 'react-redux';

const Component = connect(
  mapStateToProps,
  mapDispatchToProps
)(Con);

````

#### 3.1.1 mapStateToProps
组件将会监听 `Redux store` 的变化。任何时候，只要 `Redux store` 发生改变，`mapStateToProps` 函数就会被调用。该回调函数必须返回一个纯对象，这个对象会与组件的 `props` 合并。

````javascript

// mapStateToProps是一个函数，它接受state作为参数，返回一个对象。
// mapStateToProps会订阅 Store，每当state更新的时候，就会自动执行，重新计算 UI 组件的参数，从而触发 UI 组件的重新渲染。
const mapStateToProps = state => {
  const { test } = state;
  return {
      test
  };
};

````

#### 3.1.2 mapDispatchToProps
用来建立 `UI` 组件的参数到`store.dispatch`方法的映射。它定义了哪些用户的操作应该当作 `Action`，传给 `Store`。它可以是一个函数，也可以是一个对象。
````javascript

const mapDispatchToProps = dispatch => {
  return {
    onClick: () => {
      dispatch({
        type: 'TEST',
        payload: 'payload'
      });
    }
  };
};

````
#### 3.2 Provider
`connect`方法生成容器组件以后，需要让容器组件拿到`state`对象，才能生成 `UI` 组件的参数。
`React-Redux` 提供`Provider`组件，可以让容器组件拿到`state`。避免容器组件可能在很深的层级，传递`state`造成的麻烦。

````javascript

import { Provider } from 'react-redux'
import { createStore } from 'redux'
import Reducer from './reducers'
import App from './App.jsx'

let store = createStore(Reducer);

render(
  <Provider store={store}> // 包裹整个应用 App下的左右子组件都可以使用store里的数据了
    <App />
  </Provider>,
  document.getElementById('root')
)

````

### 三、Redux-Saga

#### 1.介绍

`redux-saga` 是 redux 一个中间件，用于解决异步问题。

#### 2.安装

` npm install --save redux-saga `

#### 3. 使用

* 使用`createSagaMiddleware`创建一个 `Saga middleware` 和要运行的 `Sagas`。
* 使用`applyMiddleware`将`Saga middleware` 连接至 `Redux store`。

````javascript

// .saga.js
export function* saga() {
    console.log('hello');
}

// ./index.js
import { createStore, applyMiddleware } from 'redux';// applyMiddleware 将中间件连接到store
import createSagaMiddleware from 'redux-saga'; // 用来创建一个saga中间件

import { saga } from './saga';

const store = createStore(
  reducer,
  applyMiddleware(createSagaMiddleware(helloSaga))
);

````

上面这段代码只是简单模拟了一下`saga`使用的基本流程，在实际项目中我们应该这样操作。

````javascript

import { delay } from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';

// ...

export function* incrementAsync() {
  yield delay(1000); // 延迟 模拟异步
  yield put({ type: 'INCREMENT' }); //
}

export function* watchSaga() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

//...

export default function* rootSaga() {
  yield all([
    watchSaga()
  ])
}

````

建议大家先去了解一下[generator](https://www.liaoxuefeng.com/wiki/1022910821149312/1023024381818112)，不然可能会看不懂。

saga其实是基于`generator`实现的,它会 `yield` 对象到 `redux-saga` `middleware`,被 `yield` 的对象都是一类指令，比如 delay(1000)、put({ type: 'INCREMENT' })， 指令可被 `middleware` 解释执行。当 `middleware` 取得一个 `yield` 后的 `Promise`，`middleware` 会暂停 `Saga`，直到 `Promise` 完成。`delay`表示`1s`后执行`resolve()`, `put`其实是`redux-saga/effect` 提供的一个方法，用来发送一个`type`为`type`属性的`Action`，去触发`state`的更新。

我们创建的`watchSaga`，用`takeEvery`进行监听，每当监听到一个名为`INCREMENT_ASYNC`的`Action`，执行所对应的`incrementAsync`任务。

当`saga`数量比较多的时候，为了更好地分类，我们可以使用`all`进行`saga`的合并，更好地进行管理。

看到这里，我们可以把以上代码进行一个整理

````javascript

//createStore.js
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import loggerMiddleware from 'redux-logger'; // 打印
import createRootReducer from '../reducers';

export const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, loggerMiddleware]; // 处理多个saga

export default function configureStore() {
  const store = createStore(
    createRootReducer,
    applyMiddleware(...middlewares)
  );
  return store;
}

//index.js
import configureStore, { sagaMiddleware } from './utilities/appStore';
import rootSaga from './sagas';

const store = configureStore();
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

````

#### 4.常用辅助函数

#### 4.1 takeEvery
在发起（`dispatch`）到 `Store` 并且匹配 `pattern` 的每一个 `action` 上派生一个 `saga`。

#### 4.2 takeLatest
每当一个 `action` 被发起到 `Store`，并且匹配 `pattern` 时，则 `takeLatest` 将会在后台启动一个新的 `saga` 任务。 如果此前已经有一个 `saga` 任务启动了（在当前 `action` 之前发起的最后一个 `action`），并且仍在执行中，那么这个任务将被取消。

#### 4.3 put
创建一个 `Effect` 描述信息，用来命令 `middleware` 向 `Store` 发起一个 `action`。 这个 `effect` 是非阻塞型的，并且所有向下游抛出的错误（例如在 `reducer` 中），都不会冒泡回到 `saga` 当中。

#### 4.4 call
创建一个 `Effect` 描述信息，用来命令 `middleware` 以参数 `args` 调用函数 `fn` 。（一般用来调用接口）

#### 4.5 fork
创建一个 `Effect` 描述信息，用来命令 `middleware` 以 非阻塞调用 的形式执行 `fn`。

实现按顺序调用执行，避免阻塞。

#### 4.6 cancel
创建一个 `Effect` 描述信息，用来命令 `middleware` 取消之前的一个分叉任务。





### 四、项目准备

接下来我们会根据以上内容，编写一个关于记账的小`Demo`，方便更好地理解。

目录结构

![](https://user-gold-cdn.xitu.io/2020/2/11/17033a399180995d?w=700&h=1238&f=jpeg&s=75069)

#### 4.1 安装

````

create-react-app my-project

cd my-project

npm install redux react-redux redux-actions seamless-immutable redux-saga redux-logger antd lodash moment -S

````

#### 4.2 创建action

````javascript

import { createActions } from 'redux-actions';

const actions = createActions({
    SET_LOADING: loading => loading,
    SET_ACCOUNT: data => data,
    SET_ALL: num => num,
    // 接口
    GET_ACCOUNT:get=> get, // 获取账目
    ADD_ACCOUNT: add => add, // 新增账目
    UPDATE_ACCOUNT: update => update, // 修改账目
    DELATE_ACCOUNT: del => del // 删除账目
});

export default actions;

````

#### 4.3 创建reducer

````javascript

//reducer/account.js

import {
    handleActions
} from 'redux-actions';
import actions from '../actions/index';
import Immutable from "seamless-immutable";

//默认数据
const defaultState = Immutable({
    loading: false,
    accounts: [],
    all: 0
});

const reducer = handleActions(
    new Map([
        [
            actions.setLoading,
            (state, {
                payload
            }) =>
            state.set("loading", payload)
        ],
        [
            actions.setAccount,
            (state, {
                payload
            }) => 
            state.set("accounts", payload)
        ],
        [
            actions.setAll,
            (state, {
                payload
            }) =>
            state.set("all", payload)
        ]
    ]),
    defaultState
);

export default reducer;

//reducer/index.js
import {
    combineReducers
} from 'redux';
import account from './account';

const reducer = combineReducers({
    account
});

  export default reducer;

````

#### 4.4 创建saga

````javascript

// saga/index.js
import {
  all
} from 'redux-saga/effects';
import account from './account';

export default function* rootSaga() {
  yield all([account()]);
}

// saga/account.js
...
下面会有介绍

````

#### 4.5 连接store

````javascript

// createStore.js
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';//打印action的中间件
import reducer from './store/reducer';

export const sagaMiddleware = createSagaMiddleware();// 创建saga中间件
const middlewares = [sagaMiddleware, logger];

export default function configureStore() {
  const store = createStore( // 创建store，避免手动调用
    reducer,
    compose(applyMiddleware(...middlewares)) //saga连接store
  );
  return store;
}

// index.js
...
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux';
import configureStore, { sagaMiddleware } from './createStore';
import rootSaga from './store/saga';

import zhCN from 'antd/lib/locale-provider/zh_CN';
import { ConfigProvider } from 'antd';
import 'antd/dist/antd.css';

const store = configureStore();

sagaMiddleware.run(rootSaga); // 运行saga

ReactDOM.render(
    <Provider store={store}>
        <ConfigProvider locale={zhCN}>
            <App />
        </ConfigProvider>
    </Provider>,
    document.getElementById('root'));

serviceWorker.unregister();


````

### 五、编写界面

````HTML

// App.js
import React, { useState, useEffect } from 'react';
import { Button, Spin } from 'antd';
import List from './component/List';
import Modal from './component/Modal';
import './App.css';

function App(props) {

  const [visible, setVisible] = useState(false);

  function handleAccount() {
    setVisible(true);
  }

  function handleOk() {
    setVisible(false);
  }

  function handleCancel() {
    setVisible(false);
  }

  return (
    <div className="App">
      <h1>Dong日账目</h1>
      <Spin spinning={loading}>
        <List data={accounts} all={all} />
        <Button type="primary" style={{ marginTop: 20 }} onClick={handleAccount}>开始记账</Button>
      </Spin>
      <Modal isOpen={visible} onClose={handleCancel} type={0} data={null}/>
    </div>
  );
}

export default App;

/** 
    component/Modal.js
    isOpen: 是否显示
    data: 数据
    onClose: 关闭
    type: 类型 0新增1修改
*/
import React from 'react';
import { Modal, Form, Input, InputNumber, Select, DatePicker } from 'antd';
import moment from 'moment';

const { Option } = Select;

function AccountModal(props) {

    const { isOpen, onClose, data } = props;

    function handleOk() {
        onClose();
    }

    function handleCancel() {
        onClose();
    }

    return (
        <div className="Modal">
            <Modal
                title="开始记账"
                visible={isOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
                destroyOnClose={true}
            >
                <Form>
                    <Form.Item label="名称">
                        <Input placeholder="请输入名称" defaultValue={data && data.name} />
                    </Form.Item>
                    <Form.Item label="类型">
                        <Select placeholder="请输入..." style={{ width: '100%' }} defaultValue={data && data.type} >
                            <Option value={0}>支出</Option>
                            <Option value={1}>收入</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="支出/收入">
                        <InputNumber style={{ width: '100%' }} placeholder="请输入..." defaultValue={data && data.money} />
                    </Form.Item>
                    <Form.Item label="日期">
                        <DatePicker style={{ width: '100%' }} defaultValue={data && moment(data.date)} />
                    </Form.Item>
                    
                </Form>
            </Modal>
        </div>
    );
}

export default AccountModal;

/** 
    component/List.js
    all: 总账目
    data: 数据
*/

import React, { useState } from 'react';
import { Button } from 'antd';
import Modal from '../Modal';
import './index.css';

function List(props) {

    const [visible, setVisible] = useState(false);
    const [select, setSelect] = useState({});

    const { data, all } = props;

    // 点击修改
    function handleAccount(data) {
        setSelect(data);
        setVisible(true);
    }

    //点击取消
    function handleCancel() {
        setVisible(false);
    }

    return (
        <ul className="list">
            {
                data && data.length > 0 ? data.map(item => {
                    return (
                        <li key={item.id}>
                            <span className="type">{item.name}</span>
                            <span className="money" style={{ color: item.type ? 'green' : 'red' }}>{item.money}</span>
                            <span className="date">{item.date.toLocaleString()}</span>
                            <div>
                                <Button type="" style={{ marginRight: 10 }} onClick={() => handleAccount(item)}>修改</Button>
                                <Button type="danger">删除</Button>
                            </div>
                        </li>
                    )
                }) : '暂无数据'
            }

            <Modal isOpen={visible} onClose={handleCancel} data={select} type={1} />

            <span className="all">总计： {all}</span>
        </ul>
    )
}

export default List;

````

效果如下

![](https://user-gold-cdn.xitu.io/2020/2/11/170331ff6c647339?w=1678&h=836&f=png&s=72594)
![](https://user-gold-cdn.xitu.io/2020/2/11/170332010554587d?w=1408&h=1286&f=png&s=74912)

### 六、功能完善

#### 6.1 查询

````javascript

// saga.js
function* fetchGetAcount() {
    try {
        yield put(actions.setLoading(true));// 加载
        yield delay(1000); // 模拟接口
        yield put(actions.setLoading(false));// 取消加载
        yield put(actions.setAccount([ // 添加数据
            {
                name: '充值',
                type: 0,
                money: -100,
                date: new Date(),
                id: 1
            },
            {
                name: '兼职',
                type: 1,
                money: 200,
                date: new Date(),
                id: 2
            }
        ]));
        yield put(actions.setAll(100)); // 设置总数
    } catch (error) {
        return error;
    }
}

export default function* accountSaga() {
    // actions.getAccount().type 相当于 ‘GET_ACCOUNT’
    yield takeLatest(actions.getAccount().type, fetchGetAcount);
}

// App.js

//获取store数据
const mapStateToProps = state => {
  const { loading, accounts, all } = state.account;
  return {
    loading,
    accounts,
    all
  }
}

//添加dispatch映射
const mapDispatchToProps = dispatch => {
  return {
    getAccount: () => {
      dispatch(actions.getAccount());
    }
  }
}

connect(mapStateToProps, mapDispatchToProps)(App);

````

其实上面这种`connect`写法还是适合`Class`的写法，`React-Redux`也是提供了`useSelector`和`useDispatch`来帮助我们更好地实现，替代了传统的方案，在这里就不一一介绍了，感兴趣的小伙伴可以去官网进行查看，然后我们修改一下代码。

````javascript

...
const data = useSelector(state => state.account);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(actions.getAccount());
}, []);

...

````
是不是感觉轻便了许多呢。

#### 6.2 新增

````javascript

//saga.js

// 新增账目
function* fetchAddAcount(action) {
    try {
        const allData = store.getState().account; // 获取所有账目
        
        // 添加新账目并按时间排序
        const newData = sortBy(allData.accounts.concat(action.payload), function(item){
            return item.date;
        });
        
        const money = action.payload.type ? action.payload.money : -action.payload.money;

        yield put(actions.setAccount(newData));
        yield put(actions.setAll(allData.all + money));

    } catch (error) {
        return error;
    }
}

//Modal.js

const [name, setName] = useState('');
const [money, setMoney] = useState(0);
const [accountType, setType] = useState(-1);
const [date, setDate] = useState(null);

//点击确定
function handleOk() {
    const { addAccount } = props;
    
    //上传的账目格式
    const data = {
        name,
        money,
        type: accountType,
        date: new Date(date),
        id: Math.floor(Math.random() * 10000)
    }
    addAccount(data);
    onClose();
}

````

#### 6.3修改

````javascript

//saga.js

// 修改账目
function* fetchUpdateAcount(action) {
    try {
        //获取store数据
        const allData = store.getState().account;

        //获取修改的账单index
        const selectNum = allData.accounts.findIndex(item => {
            return item.id === action.payload.id;
        });
        
        //将伪数组修改为数组
        const [...accounts] = allData.accounts;

        //删除原本修改账目
        accounts.splice(selectNum, 1);

        //删除为了更快的获取之前账目金额 而额外添加的属性
        delete action.payload.initial;
    
        //添加修改后的账目并排序
        const newData = sortBy(accounts.concat(action.payload), function(item){
            return item.date;
        });        
        
        yield put(actions.setAccount(newData));
        
        //修改总账目
        yield put(actions.setAll(allData.all - action.payload.initial + (action.payload.type ? action.payload.money : -action.payload.money)));

    } catch (error) {
        return error;
    }
}

//Modal.js

const newData = {
    ...data,
    name,
    money,
    type: accountType,
    date: new Date(date),
    //额外的属性，保存初始金额
    initial: data.money
}

//修改账目的Action
updateAccount(newData);

````

#### 6.4 删除

````javascript

//saga.js

// 删除账目
function* fetchDeleteAcount(action) {
    try {
        const allData = store.getState().account;
        const [...accounts] = allData.accounts;
        accounts.splice(action.payload.index, 1);
      
        yield put(actions.setAccount(accounts));
        yield put(actions.setAll(allData.all - action.payload.money));

    } catch (error) {
        return error;
    }
}

//List.js
//删除
function handleDel(item, index) {
    //index:当前账目位置 money: 当前账目金额
    dispatch(actions.deleteAccount({money: item.type ? item.money : -item.money, index}));
}

````

### 七、总结

以上主要介绍了一下`Redux`以及`React-Redux`和`Redux-Saga`的使用方法，最后完成了一个简单地关于记账的小Demo，实现了基本的增删改查，当然，还有一些细节还未完善，之后有时间的话会抽空完善一下。

当你还在犹豫项目中是否需要使用`Redux`的时候，其实就没必要使用了，因为这部分依赖本来体积就很大，对于一些小型项目还是不建议使用了，不过感兴趣的话还是可以尝试一下，毕竟技多不压身嘛。

最后，文中如果错误或者不正当的地方，欢迎指正，如果对你有什么帮助的话，欢迎Star。

### 八、参考

* [redux](https://www.redux.org.cn/)
* [阮一峰](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)
* [redux-saga](https://redux-saga-in-chinese.js.org/)