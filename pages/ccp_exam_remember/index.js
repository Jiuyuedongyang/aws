// pages/exam/index.js

// 导入we-swiper，具体使用方法参考https://github.com/we-plugin/we-swiper
import weSwiper from "../../we-swiper/dist/weSwiper";

const option = {
  touchstart(e) {
    this.weswiper.touchstart(e);
  },
  touchmove(e) {
    this.weswiper.touchmove(e);
  },
  touchend(e) {
    this.weswiper.touchend(e);
  },
  onLoad() {
    new weSwiper({
      animationViewName: "animationData",
      initialSlide: 0,
    });
  },
};

var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    input_page: 1, //用户跳转页面默认为1
    outterIndex: 0, //题号索引 外索引
    innerIndex: 0, //选项索引 内索引
    flag: 100, //答案标志位，用于 答错为0，答对为1，否则为任意数这里填100
    currentTab: 0, //当前swiper的页数
    answerAll: [], //多选题数组
    count_right: 0, //已答题正确数
    count_sum: 0, //已答总数
    right_rate: 0, //正确率


    /** 
    body为题目主体 
    */
    body: [],

  },


  //答案选择函数
  answerSelected(e) {
    let outterIndex = e.currentTarget.dataset.outterindex; //获取回调函数e的outterindex 和 innerindex数据 注：outterindex 和 innerindex都是小写，为微信e里规定的
    let innerIndex = e.currentTarget.dataset.innerindex;
    let question = this.data.body[outterIndex]; //获取题目题干

    //当为单选题时
    if (question.type == 1) {
      //先将所有选项置false
      for (let item of question.answers) {
        item.selected = false;
      }
      //置true
      question.answers[innerIndex].selected = true;
      //将获取到的 let outterIndex = e.currentTarget.dataset.outterindex;和innerindex 数据写入setData中 以便后续submit按钮判断正确答案
      this.setData({
        body: this.data.body,
        outterIndex: outterIndex,
        innerIndex: innerIndex,
      });
      //多选
    } else if (question.type == 2) {

      console.log("这是多选题");
      let answerAll = this.data.answerAll; //获取data中的answerAll
      question.answers[innerIndex].selected = !question.answers[innerIndex]
        .selected; //点击一次选择，再次点击取消选择
      // console.log(answerAll);


      //判断 如果answerAll中包含了所选的了（防止反复往answerAll中push a a a a），就remove掉，否则就push进多选题数组
      if (
        answerAll.includes(
          this.data.body[outterIndex].answers[innerIndex].index
        )
      ) {
        //因为js本身没有remove()函数，所以构造一个remove元素的函数
        //你可以在Array的原型链上写一个remove的方法
        Array.prototype.remove = function (val) {
          var index = this.indexOf(val);
          if (index > -1) {
            this.splice(index, 1);
          }
        };
        //使用.remove()方法
        answerAll.remove(this.data.body[outterIndex].answers[innerIndex].index);
      } else {
        //否则push入多选答案数组中
        answerAll.push(this.data.body[outterIndex].answers[innerIndex].index);
      }
      //回写入data中
      //写不写answerAll: this.data.answerAll,其实都一样，因为.push直接是修改了原数组，这是个知识点
      this.setData({
        body: this.data.body,
        answerAll: this.data.answerAll,
        outterIndex: outterIndex,
        innerIndex: innerIndex,
      });

      answerAll = answerAll.toString().replace(/,/g, ""); //将数组转化为字符串并且用正则去掉其中的,逗号 为后续submit判断答案时做准备
      // console.log(answerAll);
      console.log("set之后的答案" + answerAll);
    }

    // console.log(e);
    // console.log(outterIndex);
    // console.log(innerIndex);
    // console.log(question);
  },


  //we-swiper的touchmove滑动事件函数
  //滑动时，将 答案标志位 置100，100表示html答案选项的标签消失
  touchmove(e) {
    // console.log(e)
    // console.log("moving... github的");
    this.setData({
      flag: 100
    });
  },


  //确认答题按钮函数
  submit() {
    //如果是单选
    if (this.data.body[this.data.outterIndex].type == 1) {
      // console.log(
      //   "你选的答案" +
      //   this.data.body[this.data.outterIndex].answers[this.data.innerIndex]
      //   .index
      // ); //你选的答案
      // console.log(
      //   "题库正确答案" + this.data.body[this.data.outterIndex].answer
      // ); //题库正确答案


      //如果回答正确 
      //所选答案等于题库答案
      if (
        this.data.body[this.data.outterIndex].answers[this.data.innerIndex]
        .index == this.data.body[this.data.outterIndex].answer
      ) {
        wx.showToast({
          title: '回答正确',
          icon: 'success',
          duration: 1500
        })

        if (this.data.body[this.data.currentTab].answer_or_not == false) {
          let count_right = this.data.count_right
          count_right++

          this.setData({
            flag: 1, //答题标志位置1
            count_right
          });
        }



        // console.log("单选题回答正确");
      } else {
        this.setData({
          flag: 0, //否则置0
        });
        // console.log("单选题回答错误");
        wx.showToast({
          title: '回答错误',
          icon: 'none',
          duration: 1500
        })
      }
    } else if (this.data.body[this.data.outterIndex].type == 2) {
      //如果是多选
      // console.log("abcdefg");
      console.log(this.data.answerAll)
      let answerAll = this.data.answerAll;
      answerAll = answerAll.toString().replace(/,/g, ""); //将数组转化为字符串并且用正则去掉其中的,逗号
      answerAll = answerAll.split(""); //再把字符串转成数组

      /**
            判断两个数组是否相等
            var a = ["type", 2, 3];
            var b = ["type", 3, 2];
            var isSameArray = function (array1, array2) {
                array1 = array1.sort().join(''); //.sort()排序
                array2 = array2.sort().join('');
                return array1 === array2;
              };
            console.log(isSameArray(a, b))
            作者：九千_
            链接：https://www.jianshu.com/p/34dcd1c6f753
            来源：简书
            著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
       */


      //answerAll用户所选的答案
      answerAll = answerAll.sort().join(""); //.sort()排序

      //this.data.body[this.data.outterIndex].answer;是数据库中的题目正确答案
      let answer = this.data.body[this.data.outterIndex].answer;
      answer = answer.split(""); //再把字符串转成数组
      answer = answer.sort().join(""); //.sort()排序

      if (answerAll == answer) {
        wx.showToast({
          title: '回答正确',
          icon: 'success',
          duration: 1500
        })
        if (this.data.body[this.data.currentTab].answer_or_not == false) {
          let count_right = this.data.count_right
          count_right++

          this.setData({
            flag: 1, //标志位置1
            count_right
          });
          // console.log("同学你答对了");
        }


      } else {
        wx.showToast({
          title: '回答错误',
          icon: 'none',
          duration: 1500
        })
        this.setData({
          flag: 0,
        });
        // console.log("同学你答错了");
      }

      //答对后anwerAll清零，为下次答题做准备
      this.setData({
        answerAll: []
      });
      //选项item.seletced清零
      for (let item of this.data.body[this.data.outterIndex].answers) {
        item.selected = false;
      }


    }


    console.log(this.data.body[this.data.currentTab].answer_or_not)
    //判断该题目是否答过 answer_or_not==false
    if (this.data.body[this.data.currentTab].answer_or_not == false) {
      //带变量的写法，具体参考https://www.cnblogs.com/simuhunluo/p/7989461.html

      //没答过 总答题个数加一
      let count_sum = this.data.count_sum
      count_sum++

      //将answer_or_not置true表示答过了,count_sum便不再计数
      let str = "body[" + this.data.currentTab + "].answer_or_not";
      this.setData({
        [str]: true,
        count_sum
      });
      // console.log(this.data.body[this.data.currentTab].answer_or_not)
    }

    let count_right = this.data.count_right
    let count_sum = this.data.count_sum

    let right_rate = count_right / count_sum * 100
    right_rate = right_rate.toFixed(2)
    this.setData({
      right_rate
    })
    console.log(right_rate)

  },

  //页面滑动时清除item.selectd选项，让用户在回来做这题的时候所有选项清零
  swiperchange(e) {
    // console.log(this.data.currentTab)
    // console.log("changeswiper微信自带");
    // console.log(this.data.innerIndex);
    console.log(e)
    console.log(e.detail.current)
    //将所有答案置false
    for (let item of this.data.body[this.data.outterIndex].answers) {
      item.selected = false;
    }

    // console.log(e)
    // console.log("changeswiper222微信自带");


    //////////////////////存疑
    // let currentTab
    //////////////////////存疑


    //setData把currentTab写入全局，让其他函数知道当前页是哪一页
    if (e.detail.source == "touch") {
      console.log("touch")
      this.setData({
        currentTab: e.detail.current
      })
    } else {
      console.log("autoplay")
    }

    // console.log(currentTab)
  },


  //获取用户input的输入值
  getInputValue(e) {
    // console.log(e.detail.value)// {value: "ff", cursor: 2}
    var input = this.data.input_page;
    input = e.detail.value;
    console.log(input);
    this.setData({
      input_page: input,
    });
  },


  //跳转页面函数
  goto() {
    //索引=输入-1 因为索引是从0开始，而用户输入是从1开始
    var input_page = this.data.input_page - 1;

    console.log(input_page);
    this.setData({

      flag: 100,
      currentTab: input_page,
    });
  },

  //翻转 切换中英文en_cn标志位flag函数
  toggle(e) {
    console.log(e)
    let toggle = this.data.body[this.data.currentTab].en_cn;
    // console.log(toggle);
    if(toggle==0){
      toggle=1
    }else if(toggle==1){
      toggle=0
    }
    // console.log(toggle);
    console.log(this.data.outterIndex, this.data.innerIndex)
    //带变量的写法，具体参考https://www.cnblogs.com/simuhunluo/p/7989461.html
    let str = "body[" + this.data.currentTab + "].en_cn";
    this.setData({
      [str]: toggle
    });
    // console.log("aa");
  },
  clearAll() {
let that=this
    wx.showModal({
      title: '是否重置',
      content: '该操作不可撤销',
      success(res) {
        if (res.confirm) {

          let cleraAll = wx.getStorageSync('saa')
          console.log(cleraAll)
          that.setData({
            input_page: cleraAll.input_page, //用cl户跳转页面默认为1
            outterIndex: cleraAll.outterIndex, //题号索引 外索引
            innerIndex: cleraAll.innerIndex, //选项索引 内索引
            flag: cleraAll.flag, //答案标志位，用于 答错为0，答对为1，否则为任意数这里填100
            currentTab: cleraAll.currentTab, //当前swiper的页数
            answerAll: cleraAll.answerAll, //多选题数组
            count_right: cleraAll.count_right, //已答题正确数
            count_sum: cleraAll.count_sum, //已答总数
            right_rate: cleraAll.right_rate, //正确率
            body: cleraAll.body
          })
          console.log('用户点击确定')
        }
      }
    })


  },

  // getData:function () {}的简写，向服务器获取题库源数据
  // getData() {
  //   console.log("---")
  //   console.log(this.data.body)
  //   console.log(this.data)
  //   console.log("---")
  //   let that = this
  //   wx.request({
  //     url: 'https://aws.lycaicai.top:5000', //仅为示例，并非真实的接口地址
  //     header: {
  //       'content-type': 'application/json' // 默认值
  //     },
  //     success(res) {
  //       // console.log(res.data)
  //       that.setData({
  //         body: res.data
  //       })

  //     }
  //   })
  //   console.log("+++++")
  //   console.log(this.data)
  //   console.log("+++++")
  // },

  handleCollection() {
    console.log(this.data.body[this.data.currentTab].isCollected)
    let isCollected = this.data.body[this.data.currentTab].isCollected

    if(isCollected==0){
      isCollected=1
    }else if(isCollected==1){
      isCollected=0
    }
    console.log(isCollected)
    let str = "body[" + this.data.currentTab + "].isCollected";
    this.setData({
      [str]: isCollected,
    });


//
    if (isCollected==true){
      wx.showToast({
        title:'收藏成功',
        icon: 'success'
      })
    }else{
      wx.showToast({
        title:'取消收藏',
        icon:'none'
      })
    }
    //提示用户
    
    console.log("123---321")
    console.log(this.data)
    console.log("123---321")
  },



  adapt_screen() {

    //微信自带swiper调整为竖向模式的相关函数
    var data = this.data;
    // console.log(data);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight,
        });
      },
    });
  },

  setsaa() {
    let saa_body = wx.getStorageSync(
      'saa_body',
    )

    console.log(saa_body)
    // success: (res) => {
    //   console.log("saa_body_ok")
    //   console.log(res.data)

    // }
    this.setData({
      body: saa_body
    })
    //此时本页面中的所有信息
    console.log("此=======")
    console.log(this.data)
    console.log("此=======")

    //设置saa
    wx.setStorageSync('saa', this.data)
  },
  /**
   * 生命周期函数--监听页面加载
   */


  getsaa_current() {
    let saa_current = wx.getStorageSync('saa_current')
    console.log("saa_current get")
    console.log(saa_current)

    if (saa_current) {
      this.setData({




        input_page: saa_current.input_page, //用cl户跳转页面默认为1
        outterIndex: saa_current.outterIndex, //题号索引 外索引
        innerIndex: saa_current.innerIndex, //选项索引 内索引
        flag: saa_current.flag, //答案标志位，用于 答错为0，答对为1，否则为任意数这里填100
        currentTab: saa_current.currentTab, //当前swiper的页数
        answerAll: saa_current.answerAll, //多选题数组
        count_right: saa_current.count_right, //已答题正确数
        count_sum: saa_current.count_sum, //已答总数
        right_rate: saa_current.right_rate, //正确率
        body: saa_current.body


      })
      console.log(this.data)
    }
    console.log(this.data)
  },




  onLoad: function () {
    this.adapt_screen()
    this.setsaa()





  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getsaa_current()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {


  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("onunload")
    wx.setStorageSync('saa_current', this.data)
    console.log(this.data)
    console.log("onunload")
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});