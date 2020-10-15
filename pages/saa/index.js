//index.js
//获取应用实例


Page({
  data: {
    test: 'test',
    showDialog: false
  },


  if_vip() {
    wx.showToast({
      title: '题库未购买',
      icon: 'loading',
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
      url: 'https://aws.aws-superman.top:5001/if_vip-aws-superman-2020',
      data: {
        openid: openid,
        nickName:nickName
      },
      method: 'GET',
      success(res) {
        console.log("这是和flask openid查询if_vip_saa的交互结果")
        console.log(res)
        console.log(res.data)
        console.log(res.data.if_vip_saa)
        console.log(typeof(res.data.if_vip_saa))
        console.log(res.data.if_vip_saa)
        that.setData({
          if_vip_saa: res.data.if_vip_saa

        })
        console.log('函数')
        console.log(that.data)
        console.log('函数')
      }
      ,fail(res){
        console.log("if_vip_saa失败")
      }

    })
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
  onLoad: function (options) {},

  onShow: function (options) {
    //在onShow()的时候查询用户是否购买了
    this.onShow_if_vip_saa()

    // setTimeout(test222(), 3000) //延迟时间 这里是2秒
  }


});