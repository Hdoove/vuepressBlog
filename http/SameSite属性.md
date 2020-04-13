### SameSite属性

Cookie 的SameSite属性用来限制第三方 Cookie，从而减少安全风险。

有三个值

- Strict
- Lax
- None

### Strict

Strict最为严格，完全禁止第三方 Cookie，跨站点时，任何情况下都不会发送 Cookie。换言之，只有当前网页的 URL 与请求目标一致，才会带上 Cookie。

### Lax

相对来说比较宽松，使用a标签链接，预加载请求，GET 表单时，都会带上 cookie。

### None

之前的默认值，所有请求都会自动带上 cookie

