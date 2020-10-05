const APP_ID = 'wxf0500bf05da4ac3f'; //输入小程序appid  
const APP_SECRET = '750e4e14e963b56ffb61bf1ef24ced52'; //输入小程序app_secret  
var OPEN_ID = '' //储存获取到openid  
var SESSION_KEY = '' //储存获取到session_key  
Page({
  data: {
    b: 'b'
  },
  getOpenId: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res)
        console.log(res.code)
        wx.request({
          //获取openid接口  
          url: 'https://api.weixin.qq.com/sns/jscode2session',
          data: {
            appid: APP_ID,
            secret: APP_SECRET,
            js_code: res.code,
            grant_type: 'authorization_code'
          },
          method: 'GET',
          success: function (res) {
            console.log(res)
            console.log(res.data)
            OPEN_ID = res.data.openid; //获取到的openid  
            SESSION_KEY = res.data.session_key; //获取到session_key  
            console.log(OPEN_ID.length)
            console.log(SESSION_KEY.length)
            that.setData({
              openid: res.data.openid,
              session_key: res.data.session_key
            })
          }
        })
      }
    })
    setTimeout(function () {console.log(that.data)
      console.log("yanshi")
      console.log(that.data.openid)
      console.log("yanshi")
      //要延时执行的代码
      }, 3000) //延迟时间 这里是2秒
  }
  
},


)