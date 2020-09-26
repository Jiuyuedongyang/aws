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
      /**
       * swiper初始化后执行
       * @param weswiper
       */
      onInit(weswiper) {},
      /**
       * 手指碰触slide时执行
       * @param weswiper
       * @param event
       */
      onTouchStart(weswiper, event) {},
      /**
       * 手指碰触slide并且滑动时执行
       * @param weswiper
       * @param event
       */
      onTouchMove(weswiper, event) {},
      /**
       * 手指离开slide时执行
       * @param weswiper
       * @param event
       */
      onTouchEnd(weswiper, event) {},
      /**
       *  slide达到过渡条件时执行
       */
      onSlideChangeStart(weswiper) {},
      /**
       *  weswiper从一个slide过渡到另一个slide结束时执行
       */
      onSlideChangeEnd(weswiper) {},
      /**
       *  过渡时触发
       */
      onTransitionStart(weswiper) {},
      /**
       *  过渡结束时执行
       */
      onTransitionEnd(weswiper) {},
      /**
       *  手指触碰weswiper并且拖动slide时执行
       */
      onSlideMove(weswiper) {},
      /**
       * slide达到过渡条件 且规定了方向 向前（右、下）切换时执行
       */
      onSlideNextStart(weswiper) {},
      /**
       *  slide达到过渡条件 且规定了方向 向前（右、下）切换结束时执行
       */
      onSlideNextEnd(weswiper) {},
      /**
       *  slide达到过渡条件 且规定了方向 向前（左、上）切换时执行
       */
      onSlidePrevStart(swiper) {},
      /**
       *  slide达到过渡条件 且规定了方向 向前（左、上）切换结束时执行
       */
      onSlidePrevEnd(weswiper) {},
    });
  },
};


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


    /** 
    body为题目主体 
    */
    body: [{
        id: 1, //数据库id
        type: 1, //选择题类型 1为单选 2为多选
        question: "第1题xxxxxxxxxxxx", //题目题干
        en_zn: false, //中英切换标志位  false为英文 zn为中文
        answer: "a",//正确参考答案
        answers: [{
            index: "a",//答案索引
            content: "a1",//英文选项
            content_cn: "a1_cn",//中文选项
          },
          {
            index: "b",
            content: "b1",
            content_cn: "b1_cn",
          },
          {
            index: "c",
            content: "c1",
            content_cn: "c1_cn",
          },
          {
            index: "d",
            content: "d1",
            content_cn: "d1_cn",
          },
          {
            index: "e",
            content: "e1",
            content_cn: "e1_cn",
          },
        ],
      },
      {
        id: 2,
        type: 1,
        question: "第2题",
        en_zn: false, //false为英文 zn为中文 中英切换
        answer: "b",
        answers: [{
            index: "a",
            content: "A2",
            content_cn: "A2_cn",
          },
          {
            index: "b",
            content: "b2",
            content_cn: "B2_cn",
          },
          {
            index: "c",
            content: "c2",
          },
          {
            index: "d",
            content: "d2",
          },
          {
            index: "e",
            content: "",
          },
        ],
      },
      {
        id: 3,
        type: 1,
        question: "第3题",
        en_zn: false, //false为英文 zn为中文 中英切换
        answer: "c",
        answers: [{
            index: "a",
            content: "a3",
            content_cn: "a3_cn",
          },
          {
            index: "b",
            content: "b3",
          },
          {
            index: "c",
            content: "c3",
          },
          {
            index: "d",
            content: "d3",
          },
          {
            index: "e",
            content: "e3",
          },
        ],
      },
      {
        id: 4,
        type: 2,
        en_zn: false, //false为英文 zn为中文 中英切换
        question: "第4题",
        answer: "ab",
        answers: [{
            index: "a",
            content: "a4",
          },
          {
            index: "b",
            content: "b4",
          },
          {
            index: "c",
            content: "c4",
            content_cn: "c4_cn",
          },
          {
            index: "d",
            content: "d4",
            content_cn: "d4_cn",
          },
          {
            index: "e",
            content: "",
          },
        ],
      },
      {
        id: 5,
        type: 2,
        question: "第5题",
        en_zn: false, //false为英文 zn为中文 中英切换
        answer: "ac",
        answers: [{
            index: "a",
            content: "a5",
            content_cn: "a5_cn",
          },
          {
            index: "b",
            content: "b5",
            content_cn: "b5_cn",
          },
          {
            index: "c",
            content: "c5",
            content_cn: "c5_cn",
          },
          {
            index: "d",
            content: "d5",
            content_cn: "d5_cn",
          },
          {
            index: "e",
            content: "e5",
            content_cn: "e5_cn",
          },
        ],
      },
      {
        id: 6,
        type: 2,
        question: "第6题",
        en_zn: false, //false为英文 zn为中文 中英切换
        answer: "cde",
        answers: [{
            index: "a",
            content: "a6",
          },
          {
            index: "b",
            content: "b6",
          },
          {
            index: "c",
            content: "c6",
          },
          {
            index: "d",
            content: "d6",
          },
          {
            index: "e",
            content: "e6",
          },
        ],
      },
    ],
  },


  //答案选择函数
  answerSelected(e) {
    let outterIndex = e.currentTarget.dataset.outterindex;
    let innerIndex = e.currentTarget.dataset.innerindex;
    let question = this.data.body[outterIndex];

    if (question.type == 1) {
      //单选
      for (let item of question.answers) {
        item.selected = false;
      }
      question.answers[innerIndex].selected = true;
      this.setData({
        body: this.data.body,

        outterIndex: outterIndex,
        innerIndex: innerIndex,
      });
    } else if (question.type == 2) {
      //多选
      console.log("这是多选题");
      let answerAll = this.data.answerAll;

      question.answers[innerIndex].selected = !question.answers[innerIndex]
        .selected;
      console.log(answerAll);

      this.setData({
        body: this.data.body,
        answerAll: this.data.answerAll,

        outterIndex: outterIndex,
        innerIndex: innerIndex,
      });

      if (
        answerAll.includes(
          this.data.body[outterIndex].answers[innerIndex].index
        )
      ) {
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
        answerAll.push(this.data.body[outterIndex].answers[innerIndex].index);
      }
      console.log(answerAll);
      answerAll = answerAll.toString().replace(/,/g, ""); //将数组转化为字符串并且用正则去掉其中的,逗号
      console.log(answerAll);
    }

    console.log(e);
    console.log(outterIndex);
    console.log(innerIndex);
    console.log(question);
  },


  //we-swiper的touchmove滑动事件函数
  //滑动时，将 答案标志位 置100，100表示html答案选项的标签消失
  touchmove(e) {
    console.log(e)
    console.log("moving... github的");
    this.setData({
      flag: 100
    });

  },


  //确认答题按钮函数
  submit() {
    if (this.data.body[this.data.outterIndex].type == 1) {
      //如果是单选

      console.log(
        "你选的答案" +
        this.data.body[this.data.outterIndex].answers[this.data.innerIndex]
        .index
      ); //你选的答案
      console.log(
        "题库正确答案" + this.data.body[this.data.outterIndex].answer
      ); //题库正确答案

      if (
        this.data.body[this.data.outterIndex].answers[this.data.innerIndex]
        .index == this.data.body[this.data.outterIndex].answer
      ) {
        this.setData({
          flag: 1,
        });
        console.log("单选题回答正确");
      } else {
        this.setData({
          flag: 0,
        });
        console.log("单选题回答错误");
      }
    } else if (this.data.body[this.data.outterIndex].type == 2) {
      //如果是多选
      console.log("abcdefg");
      let answerAll = this.data.answerAll;
      // console.log("pand"+(answerAll  == this.data.body[this.data.outterIndex].answer))

      answerAll = answerAll.toString().replace(/,/g, ""); //将数组转化为字符串并且用正则去掉其中的,逗号
      answerAll = answerAll.split(""); //再把字符串转成数组

      //判断两个数组是否相等
      // var a = ["type", 2, 3];
      // var b = ["type", 3, 2];
      // var isSameArray = function (array1, array2) {
      //     array1 = array1.sort().join('');
      //     array2 = array2.sort().join('');
      //     return array1 === array2;
      //   };
      // console.log(isSameArray(a, b))
      // 作者：九千_
      // 链接：https://www.jianshu.com/p/34dcd1c6f753
      // 来源：简书
      // 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

      //answerAll用户所选的答案
      answerAll = answerAll.sort().join("");

      //answer是数据库中的正确答案
      let answer = this.data.body[this.data.outterIndex].answer;
      answer = answer.split(""); //再把字符串转成数组
      answer = answer.sort().join("");

      if (answerAll == answer) {
        this.setData({
          flag: 1,
        });
        console.log("x同学你答对了");
      } else {
        this.setData({
          flag: 0,
        });
        console.log("xx同学你答错了");
      }
      //anwerAll清零,item.seletced清零
      this.setData({
        answerAll: []
      });
      for (let item of this.data.body[this.data.outterIndex].answers) {
        item.selected = false;
      }

      //清空answerAll
      this.setData({
        answerAll: []
      });
    }
  },

  //页面滑动时清除item.selectd选项，让用户在回来做这题的时候所有选项清零
  swiperchange(e) {
    console.log(this.data.currentTab)
    console.log("changeswiper微信自带");
    console.log(this.data.innerIndex);
    for (let item of this.data.body[this.data.outterIndex].answers) {
      item.selected = false;
    }

    console.log(e)
    console.log("changeswiper222微信自带");
    let currentTab
    this.setData({
      currentTab: e.detail.current
    })
    console.log(currentTab)
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
    var input_page = this.data.input_page - 1;
    console.log(typeof input_page);
    console.log(input_page);
    this.setData({
      currentTab: input_page,
    });
  },

  //翻转切换中英文en_zn标志位flag函数
  toggle(e) {
    console.log(e)
    let toggle = this.data.body[this.data.currentTab].en_zn;
    console.log(toggle);
    toggle = !toggle;
    console.log(toggle);
    console.log(this.data.outterIndex, this.data.innerIndex)
    var str = "body[" + this.data.currentTab + "].en_zn";
    this.setData({
      [str]: toggle
    });
    console.log("aa");

  },
  /**
   * 生命周期函数--监听页面加载
   */
  /**
   *  手指触碰weswiper并且拖动slide时执行
   */

  onLoad: function () {

//微信自带swiper调整为竖向模式的相关函数
    var data = this.data;
    console.log(data);
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          clientHeight: res.windowHeight,
        });
      },
    });


  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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