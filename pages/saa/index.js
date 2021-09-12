//index.js
//获取应用实例


Page({
  data: {
    test: 'test',
    showDialog: false
  },


  if_vip() {
    wx.showToast({
      title: '请发送邮件lin909958300@yeah.net解锁',
      icon: 'none',
      duration: 1500,
      mask: true
    })
    console.log("题库未购买")
  },
  onShow_if_vip_saa() {

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
        console.log("这是和flask openid查询if_vip_saa的交互结果")
        console.log(res)
        console.log(res.data)
        console.log(res.data.if_vip_saa)
        console.log(typeof (res.data.if_vip_saa))
        console.log(res.data.if_vip_saa)
        that.setData({
          if_vip_saa: res.data.if_vip_saa

        })
        console.log('函数')
        console.log(that.data)
        console.log('函数')
      },
      fail(res) {
        console.log("if_vip_saa失败")
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
          if_on_off_sap: res.data.if_on_off_sap,
          saa_update_time:res.data.saa_update_time,
          notification_saa:res.data.notification_saa
        })
      },
      fail(res) {
        console.log("if_on_off失败")
      }

    })
  },




  //分享本页面给朋友
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: 'AWS云题库saa-c02☁️',
      path: '/pages/saa/index'
    }

  },
  //分享到朋友圈
  onShareTimeline: function () {
    return {
      title: 'AWS云题库',
      path: 'pages/saa/index',
    }
  },

  /**
   * 控制 pop 的打开关闭
   * 该方法作用有2:
   * 1：点击弹窗以外的位置可消失弹窗
   * 2：用到弹出或者关闭弹窗的业务逻辑时都可调用
   */
  toggleDialog() {
    this.setData({
      showDialog: !this.data.showDialog
    });
  },
  // test222() {
  //   console.log(this.data)
  // },



  onLoad: function (options) {
    wx.showToast({
      title: '请发送邮件lin909958300@yeah.net解锁答题',
      icon: 'none',
      duration: 3000,
      mask: false
    })
  },

  onShow: function (options) {
    
    //在onShow()的时候查询用户是否购买了
    this.onShow_if_vip_saa()
    this.onShow_if_on_off()
    // setTimeout(test222(), 3000) //延迟时间 这里是2秒
  }


});