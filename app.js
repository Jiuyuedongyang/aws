//app.js

App({
  globalData: {
    userInfo: null,
    body_saa: []
  },


  getData_saa() {
    console.log("---")
    console.log("---")
    let that = this
    wx.request({
      url: 'https://aws.lycaicai.top:5001/saa', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("res")
        console.log(res)
        that.globalData.body_saa = res
        //将saa的主数据放入storage中
        wx.setStorageSync('saa_body', res.data)
      }
    })
    console.log("+++++")
    console.log(this.globalData)
    console.log("+++++")
  },


  onLaunch: function () {


    this.getData_saa()





  },

})