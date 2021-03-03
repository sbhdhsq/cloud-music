let userInfo = {} //用户信息
const db = wx.cloud.database() //引入云数据库
Component({
  properties: {
    blogId: String,
    blog: Object,
  },
  options:{
    styleIsolation: 'apply-shared',
  },
  data: {
    loginShow: false,
    modalShow: false,
    content: '',
  },
  methods: {
    onInput(event){
      this.setData({
        content: event.detail.value
      })
    },
    onComment(){
      wx.getSetting({
        success: (res) =>{
          if(res.authSetting['scope.userInfo']){
            wx.getUserInfo({
              success:(res) =>{
                userInfo = res.userInfo
                this.setData({
                  modalShow: true,
                })
              }
            })
          }else{
            this.setData({
              loginShow: true,
            })
          }
        }
      })
    },
    onLoginsuccess(event){
      userInfo = event.datail
      this.setData({
        loginShow: false,
      }, () =>{
        this.setData({
          modalShow: true,
        })
      })
    },
    onLoginfail(){
      wx.showModal({
        title: '授权用户才能进行评价',
        content: '',
      })
    },
    onSend(event){
      console.log(event)
      let content = this.data.content
      console.log(content)
      if(content.trim() == ''){
        wx.showModal({
          title: '评论内容不能为空',
          content: '',
        })
        return
      }
      wx.showLoading({
        title: '评论中',
        mask:true,
      })
      db.collection('blog-comment').add({
        data: {
          content,
          createTime: db.serverDate(),
          blogId: this.properties.blogId,
          nickName: userInfo.nickName,
          avatarUrl: userInfo.avatarUrl
        }
      }).then((res) =>{
        console.log(res)
        wx.hideLoading()
        wx.showToast({
          title: '评论成功',
        })
        this.setData({
          modalShow: false,
          content: '',
        })
        this.triggerEvent('refreshCommentList')
      })
    },
  }
})
