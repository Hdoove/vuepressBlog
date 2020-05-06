### http3

#### http/2缺点

- TCP 以及 TCP + TLS 建立连接的延迟

HTTP/2 使用TCP协议来传输的，而如果使用HTTPS的话，还需要使用TLS协议来进行安全传输，而是用 TLS 也需要一个握手过程

- TCP 的队头阻塞并没有彻底解决

#### http/3

[请查看](https://www.jianshu.com/p/01567223e611)