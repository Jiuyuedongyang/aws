//index.js
//获取应用实例


Page({
  data: {
    test: 'test',
    showDialog: false
  },


  if_vip() {
    wx.showToast({
      title: '请加微信aws_superman加入学习群',
      icon: 'none',
      duration: 2000,
      mask: true
    })
    console.log("题库未购买")
  },
  onShow_if_vip_sap() {

    let that = this

    let openid = wx.getStorageSync('openid')

    let nickName = wx.getStorageSync('nickName')
    console.log("getopenidsync " + openid)
    wx.request({
      url: 'https://aws.aws-superman.top/if_vip-aws-superman-2020',
      data: {
        openid: openid,
        nickName: nickName
      },
      method: 'GET',
      success(res) {
        console.log("这是和flask openid查询if_vip_sap的交互结果")
        console.log(res)
        console.log(res.data)
        console.log(res.data.if_vip_sap)
        console.log(typeof (res.data.if_vip_sap))
        console.log(res.data.if_vip_sap)
        that.setData({
          if_vip_sap: res.data.if_vip_sap

        })
        console.log('函数')
        console.log(that.data)
        console.log('函数')
      },
      fail(res) {
        console.log("if_vip_sap失败")
      }

    })
  },
  onShow_if_on_off() {

    let that = this
    wx.request({
      url: 'https://aws.aws-superman.top/if_on_off-aws-superman-2020',
      data: {},
      method: 'GET',
      success(res) {
        console.log(res)
        console.log("if_on_off_saa " + res.data.if_on_off_saa)
        console.log("if_on_off_sap " + res.data.if_on_off_sap)
        that.setData({
          if_on_off_saa: res.data.if_on_off_saa,
          if_on_off_sap: res.data.if_on_off_sap
        })
      },
      fail(res) {
        console.log("if_on_off失败")
      }

    })
  },

  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  // test222() {
  //   console.log(this.data)
  // },
  onLoad: function (options) {},

  onShow: function (options) {
    //在onShow()的时候查询用户是否购买了
    this.onShow_if_vip_sap()
    this.onShow_if_on_off()
    // setTimeout(test222(), 3000) //延迟时间 这里是2秒
  },

  //分享本页面给朋友
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'AWS云题库sap-c01☁️',
      path: '/pages/sap/index'
    }

  },
  //分享到朋友圈
  onShareTimeline: function () {
    return {
      title: 'AWS云题库',
      path: 'pages/sap/index',
    }
  }

});