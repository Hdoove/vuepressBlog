### Component和PureComponent区别

```javascript

//App.js
class App extends React.Component {

  constructor() {
    super();
    this.state = {
        title: 1,
        subTitle: 2
    }
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        title: this.state.title + 1
      })
    }, 2000);
  }

  render() {
    return (
      <div className="App" >
       <Title title={this.state.title} />
       <SubTitle title={this.state.subTitle} />
      </div>
    )
  }
}

//title
import React from 'react';

export default class Title extends React.Component {
    render() {
        console.log('title')
        return <span> {this.props.title} </span>
    }
}

//subTitle
import React from 'react';

export default class SubTitle extends React.Component {
    render() {
        console.log('subtitle')
        return <span> {this.props.title} </span>
    }
}

```

以上代码中， 每次我们在修改title属性的时候，Title和SubTitle组件都会重新渲染 ，即使我们没有修改SubTitle的props

这个时候我们可以将 SubTitle 改成  ` class SubTitle extends React.PureComponent ` 就可以解决

`PureComponent` 通过 `prop` 和 `state` 的`浅比较`来实现 `shouldComponentUpdate` ，某些情况下可以用 `PureComponent` 提升性能。