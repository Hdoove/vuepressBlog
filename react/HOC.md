### HOC

### HOC实现方式

- 属性代理
- 反向继承

### 属性代理

- 可操作所有传入的props。
- 可操作组件的生命周期
- 可操作组件的静态方法
- 获取ref

### 反向继承

- 可操作所有传入的props。
- 可操作组件的生命周期
- 可操作组件的静态方法
- 获取ref
- 可操作state
- 可以渲染劫持

### HOC可实现功能

- 组合渲染

```javascript
function HOC(Component) {
    return class extends Component {
        render() {
            return (
                <div>
                    <span>组合渲染</span>
                    <Component { ...this.props } />
                </div>
            )
        }
    }
}
```

- 条件渲染

```javascript
function HOC(Component) {
    return class extends Component {
        render() {
            if(this.props.visible) {
                return null;
            }else {
                return <Component { ...this.props } />
            }
        }
    }
}
```

- 操作props

```javascript
function HOC(Component) {
    return class extends Component {
        render() {
            const newProps = {
                ...this.props,
                name: 'hdove'
            }
            return <Component { ...newProps } />
        }
    }
}
```

- 获取ref

```javascript
function HOC(Component) {
    class RefComp  extends Component {
        render() {
            <Component ref={this.props.forward} {...this.props} />
        }
    }

    return React.forwardRef((props, ref) => {
        return <RefComp { ...props } forward={ref} />
    });

}
```

- 状态管理
- 操作state
- 渲染劫持

### 注意事项

- 拷贝静态属性
- 传递ref
- 透传不相关props
- 不要改变原始组件
- 不要再render方法中创建高阶组件