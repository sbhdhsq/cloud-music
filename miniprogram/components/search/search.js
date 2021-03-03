 let keyword = ' '
 Component({
  properties: {
    placeholder:{
     type: String,
      value: '请输入关键字',
    },
  },
  data: {
    inputValue: '',
  },
  
  methods: {
    onInput(event) {
      keyword = event.detail.value
    },

    onFocus(event) {
      this.setData({
        inputValue: '',
      })
      keyword = ''
    },

    onSearch() {
      console.log (keyword)
      this.triggerEvent('search', {
        keyword,
      })
    },

  },
 })