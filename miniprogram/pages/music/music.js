//const { title } = require("process")
const MAX_LIMIT = 15
const db  = wx.cloud.database()
// pages/music/music.js
Page({

  data: {
    imgUrls:[{
      url: 'http://p1.music.126.net/nVUH7O5ZNMG1OQ1kE-tq9g==/109951165665595417.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/C9I9GxpvRX7nCZyXNBeqOw==/109951165664694558.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/q5rKcBx9Y0V37DsUSaQKXg==/109951165664695730.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/WOoIZuva_umxxzYOvWINLA==/109951165664707565.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/pOXTFta-mhTpZOGhBBWvhQ==/109951165664682857.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/UdSM2BmqY_h_t9HAOzb5dQ==/109951165664710664.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/Z90NF2dHuBYrV6x-U9jJJQ==/109951165664719544.jpg?imageView&quality=89'
    },
    {
      url: 'http://p1.music.126.net/vAjwukVm-H0LOqzy4FTJXA==/109951165664851877.jpg?imageView&quality=89'
    }
  ],
  playlist:[]
 // playlist:[{
//  "id": "1001",
//    "playCount": 1.4641238e+06,
 //   "name": "是你的垚/刘大壮/王小帅/王泽科",
 //   "picUrl": "http://p3.music.126.net/plguw5K_27B2Z8-0P-kIqw==/109951165320528577.jpg?param=140y140"

//  },
//  {
 //   "id": "1002",
  //  "playCount":622822.6,
 //   "name": "说唱精选‖emo旋律励志我都喜欢不纠结风格",
 //   "picUrl": "http://p3.music.126.net/68OCNcyT_H28E15WL5OoCw==/109951165594214074.jpg?param=140y140"

 // },
 // {
   // "id": "1003",
   // "playCount":3565221,
  //  "name": "我再也不会对谁满怀期待",
  //  "picUrl": "http://p4.music.126.net/-Nb42Jwn9dkZR2AtvyTBrQ==/109951165571613240.jpg?param=140y140"

  //},
  //{
   // "id": "1004",
   // "playCount":985656,
   // "name": "所有好运都会与你撞个满怀",
   // "picUrl": "http://p4.music.126.net/l_c3SARUoRRhNOLkhZJByA==/109951165077363897.jpg?param=140y140"

 // },
 // {
   // "id": "1005",
   // "playCount":655885,
  //  "name": "网易云精选伤感歌单",
  //  "picUrl": "http://p3.music.126.net/fFx5R8nOqRcRN_hSr7ELOA==/109951165516821010.jpg?param=140y140"

 // },
 // {
  //  "id": "1006",
   // "playCount":85565549,
   // "name": "饶 舌 情 歌",
  //  "picUrl": "http://p3.music.126.net/crWOc01qyPtsMSnV1hxcrw==/109951165615977084.jpg?param=140y140"

 // }
//]
  },
  onLoad: function (options) {
    this._getPlaylist()

  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {
    this.setData({
      playlist: []
    })
    this._getPlaylist()

  },
  onReachBottom: function () {
    this._getPlaylist()

  },
  onShareAppMessage: function () {},

_getPlaylist() {
  wx.showLoading({
    title: '努力加载中',
  })
  wx.cloud.callFunction({
    name: 'music',
    data: {
      start: this.data.playlist.length,
      count: MAX_LIMIT,
      $url: 'playlist',
    }
  }).then((res) =>{
    console.log(res)
    this.setData({
      playlist: this.data.playlist.concat(res.result.data)
    })
    wx.stopPullDownRefresh()
    wx.hideLoading()
  })
}
})