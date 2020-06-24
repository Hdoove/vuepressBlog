### 实现Render(伪代码)

```javascript
function render(element, root) {
    const { target, attr, children } = element;
    let realDOM = document.createElement(target);

    const { props, styles } = attr;

    for(let i in props) {
        realDOM.setAttribute( i, props[i] );
    }

    for(let i in styles) {
        realDOM.style[i] = styles[i];
    }

    children.forEach(item => {
        if(item instanceof Element) {
            render(item, realDOM);
        }else {
            realDOM.appendChild(document.createTextNode(item));
        }
    });

    root.appendChild(realDOM);

    return root;
}

```