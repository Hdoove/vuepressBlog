const utils = {
    genSidebar: function (title, children = [''], collapsable = true, sidebarDepth = 2) {
      return {
        title,
        collapsable,
        children,
        sidebarDepth
      }
    }
  };
  
  module.exports = utils;