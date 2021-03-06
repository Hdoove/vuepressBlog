### 从输入 `url` 到显示都发生了什么 ？

### 大致描述

- 首先，浏览器进程接收到用户输入的URL请求，浏览器进程便将改URL转发给网络进程。
- 在网络进程中发起真正的URL请求。
- 接着网络进程接收到响应头数据之后，发送“提交导航”消息到渲染进程。
- 渲染进程接收到“提交导航”的消息之后，便开始准备接受HTML数据，接受数据的方式是直接和网络进程简历数据管道。
- 最后渲染进程会想浏览器进程“确认提交”，这是告诉浏览器进程：已经准备好接受和解析页面数据了。
- 浏览器进程接受到渲染进程“提交文档”的消息之后，便开始移除之前旧的文档，然后更新浏览器进程中的页面状态。

### 详细过程

- 1.地址栏会判断用户输入的关键字是搜索内容还是请求的URL

    + 如果是搜索内容，地址栏会使用浏览器默认的搜索引擎，来合成新的带搜索关键字的URL

    + 如果判断输入内容符合URL规则，那么地址栏会根据规则，把这段内容和加上协议，合成完整的URL， 比如 https://music.hdove.top

- 2.浏览器通过进程间通讯 IPC 把url请求发送给网络进程

- 3.网络进程收到url之后会检查本地是否缓存了该请求资源，如果有则直接使用缓存返回给浏览器进程。

- 4.如果没有，网络进程向web服务器发起http请求，请求流程如下
    - 进行DNS解析，获取服务器IP地址，端口。
    - 利用IP地址和目标服务器进行tcp连接
    - 构建请求头信息
    - 发送请求头信息
    - 服务器响应之后，网络进程接受响应头和响应信息，并解析响应内容

- 5.网络进程解析响应流程
    - 检查状态码，如果是301、302，则需要重定向，从Location中自动读取地址，重新进行第三步，如果是200，则继续处理请求。
    - 200响应处理
        - 检查响应类型（Content-type），如果是字节流类型，则将该请求提交给下载管理器，改导航流程结束，不再进行， 如果是HTML则通知浏览器进程准备进行渲染

- 6.准备渲染进程

    - 浏览器进程检查当前url是否和之前打开的渲染进程根域名是否相同，如果相同，则复用之前的渲染进程，如果不同，则开启新的进程。
    - 通常情况下，打开新的页面都会使用单独的渲染进程
    - 如果从A页面打开B页面，且A和B属于同一站点的话，那么B页面复用A页面的渲染进程。如果是其他情况，浏览器进程会为B页面开启一个渲染进程。
    - (同一站点：根域名和协议相同)

- 7.传输数据，更新状态
    - 渲染文档准备好之后，浏览器向渲染进程发起“提交文档”的消息，渲染进程收到消息和网络进程建立传输数据的管道
    - 渲染进程接受完数据之后，向浏览器进程发送“确认提交”
    - 浏览器进程接受到确认消息后更新浏览器界面状态：安全、地址栏url、前进后退的历史状态、更新web界面。


