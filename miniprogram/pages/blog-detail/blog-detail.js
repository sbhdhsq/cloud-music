import formatTime from '../../utils/formatTime.js'
const app = getApp()
Page({
  data: {
     blog:{},
     commentList:[],
     blogId: '',
  },
  onLoad: function (options) {
     console.log(options) 
     this.setData({
        blogId:options.blogId
     })
      this._getBlogDetail()
  },
  
back() {
  wx.navigateBack({
    delta: 1,
  })
},
  _getBlogDetail() {
    wx.showLoading({
      title: 'Loading',
      mask:true,
    })
    wx.cloud.callFunction({
      name:'blog',
      data:{
        blogId: this.data.blogId,
        $url:'detail',
      }
    }).then((res) => {
      console.log(res)
      const blog = res.result.list[0]
      let commentList = blog.commentList
      for (let i=0,len = commentList.length; i< len; i++) {
        commentList[i].createTime = formatTime(new Date(commentList[i].createTime))
      }
      this.setData({
        commentList,
        blog,
      })
      wx.hideLoading({

      })
    })
  }
  
})