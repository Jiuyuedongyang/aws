//app.js

App({
  globalData: {
    userInfo: null,
    body_saa: []
  },


  getData_ccp_saa_sap() {
    console.log("---")
    console.log("---")
    let that = this

    wx.request({
      url: 'https://aws.aws-superman.top/ccp-aws-superman-2020', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("res")
        console.log(res)
        that.globalData.body_ccp = res
        //将saa的主数据放入storage中
        wx.setStorageSync('ccp_body', res.data)
      }
    })




    wx.request({
      url: 'https://aws.aws-superman.top/saa-aws-superman-2020', //仅为示例，并非真实的接口地址
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











    wx.request({
      url: 'https://aws.aws-superman.top/sap-aws-superman-2020', //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        console.log("res")
        console.log(res)
        that.globalData.body_sap = res
        //将saa的主数据放入storage中
        wx.setStorageSync('sap_body', res.data)
      }
    })
    // console.log("+++++")
    // console.log(this.globalData)
    // console.log("+++++")
  },


  onLaunch: function () {


    this.getData_ccp_saa_sap()





  },

})