// components/login/login.js
Component({
  properties: {
    modalShow: Boolean
  },

  data: {

  },

  methods: {
    onGotUserInfo(event){
      console.log(event)
      const userInfo = event.detail.userInfo
      if(userInfo){
        this.setData({
          modalShow: false
        })
        this.triggerEvent('loginsuccess', userInfo)
      }else{
        this.triggerEvent('loginfail')
      }
    }
  }
})
