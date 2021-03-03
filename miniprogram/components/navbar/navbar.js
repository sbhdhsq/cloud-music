// components/navigation/index.js
const app = getApp()
const statusBarHeight = wx.getSystemInfoSync().statusBarHeight;
const menuButtonInfo = wx.getMenuButtonBoundingClientRect();//胶囊相关信息
const menuButtonHeight = menuButtonInfo.height //胶囊高度
const menuButtonTop = menuButtonInfo.top//胶囊距上边界距离

Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的初始数据
   */

  data: {
    navBarHeight: app.globalData.navBarHeight, 
    menuRight: app.globalData.menuRight, 
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight
  }
})
