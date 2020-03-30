const path = require("path")
const rootpath = path.dirname(__dirname) //执行一次dirname将目录定位到docs目录
const utils = require('../utils/index');
const filehelper = require('../utils/initPages');

module.exports = {
  title: '前端成长之路',
  description: '记录每日生活',
//   base: '/Hdoove',
  themeConfig: {
    nav: [
      { text: 'Github', link: 'https://github.com/Hdoove' },
      { text: '仿网易云音乐', link: 'http://music.hdove.top' },
    ],
    sidebar: [
      utils.genSidebar('HTML', filehelper.getFileName("./html"), true),
      utils.genSidebar('CSS', filehelper.getFileName("./css"), true),
      utils.genSidebar('JS基础', filehelper.getFileName("./jsbasis"), true),
      utils.genSidebar('JS手写', filehelper.getFileName("./jsadvance"), true),
      utils.genSidebar('React', filehelper.getFileName("./react"), true),
      utils.genSidebar('Webpack', filehelper.getFileName("./webpack"), true),
      utils.genSidebar('TypeScript', filehelper.getFileName("./typescript"), true),
      utils.genSidebar('Koa', filehelper.getFileName("./koa"), true),
      utils.genSidebar('HTTP', filehelper.getFileName("./http"), true),
      utils.genSidebar('LeetCode', filehelper.getFileName("./leetcode"), true),
      utils.genSidebar('二叉树', filehelper.getFileName("./tree"), true),
      utils.genSidebar('链表', filehelper.getFileName("./list"), true),
      utils.genSidebar('面试', filehelper.getFileName("./interview"), true),
      utils.genSidebar('其他', filehelper.getFileName("./other"), true),
      utils.genSidebar('问题汇总', filehelper.getFileName("./problem"), true),
    ]
  }
}