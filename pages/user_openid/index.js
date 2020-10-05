const APP_ID = 'wxf0500bf05da4ac3f'; //输入小程序appid  
const APP_SECRET = '750e4e14e963b56ffb61bf1ef24ced52'; //输入小程序app_secret  
var OPEN_ID = '' //储存获取到openid  
var SESSION_KEY = '' //储存获取到session_key  
Page({
    data: {
    },
    getOpenId: function () {
      var that = this;
      wx.login({
        success: function (res) {
          console.log(res)
          console.log(res.code)//打印wx.login()返回的code码，通过code码发送给flask生成openid
          wx.request({
            url: 'https://aws.lycaicai.top:5001/get_openid',
            data: {
              code: res.code
            },
            method: 'GET',
            success(res) {
              console.log("get")
              // console.log(res)
              console.log(res.data)//res.data是flask返回的openid数据
              let openid=res.data
              console.log("openid= ",openid)
              that.setData({
                openid:openid
              })
              wx.setStorageSync('openid',openid)
            }
            
          })


        
        }
      })
      // setTimeout(function () {
        
      //   console.log("延迟函数")
      
      //   console.log("延迟函数")
      //   //要延时执行的代码
      // }, 3000) //延迟时间 这里是2秒
    }






  },


)