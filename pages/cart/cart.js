const util = require('../../utils/util.js')
const app = getApp()
// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    minHeight: '',
    totalNum: 0,
    cartPdList: [],
    pdListData:[],
    isEmpty:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getSystemInfo({
      success: function (res, rect) {
        that.setData({
          minHeight: res.windowHeight
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      cartPdList: app.globalData.cartList,
      pdListData: app.globalData.pdListData
    })
    this.getTotalNum(this.data.cartPdList)
    if (this.data.cartPdList.length > 0){
      this.setData({
        isEmpty:false
      })
    }else{
      this.setData({
        isEmpty: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.pdListData = this.data.pdListData
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  goToPage: function (e) {
    var _index = e.currentTarget.dataset.index
    // wx.navigateTo({
    //   url: this.data.cartPdList[_index].url,
    // })
    console.log(this.data.cartPdList[_index].url)
  },
  goToBuy: function () {
    wx.switchTab({
      url: '../pdpage/pdpage',
    })
  },
  // 减
  decreasePdNum: function (e) {
    var item = e.currentTarget.dataset.item
    this.data.cartPdList[item.sku].num--
    this.data.pdListData[item._firstindex].childInfo[item._secondindex].childInfo[item._thirdindex].num--
    this.setData({
      cartPdList: this.data.cartPdList
    })

    this.getTotalNum(this.data.cartPdList)
  },
  // 加
  addPdNum: function (e) {
    var item = e.currentTarget.dataset.item
    this.data.cartPdList[item.sku].num++
    this.data.pdListData[item._firstindex].childInfo[item._secondindex].childInfo[item._thirdindex].num++
    this.setData({
      cartPdList: this.data.cartPdList
    })
    this.getTotalNum(this.data.cartPdList)
  },
  // 计算总价
  getTotalNum: function (arr) {
    var totalPrice = 0;
    console.log(arr)
    arr.forEach(item => {
      if (item && item.price) {
        totalPrice += item.price * item.num
      }
    })
    totalPrice = totalPrice.toFixed(2)
    console.log(totalPrice)
    this.setData({
      totalNum: totalPrice
    })
  },
  // 保存至数据库
  saveToDb: function (data) { //保存至数据库
    let db = wx.cloud.database({
      env: "viga-s8qsn"
    })
    let cartList = db.collection('cartList')
    cartList.add({
      data: data
    }).then(res => {
      console.log('add:ok')
    }).catch(err => {
      console.log(err)
    })
  },
  // gotopay
  goToPay: function () {
    var that = this;
    wx.login({
      success: function (res) {
        console.log("获取login code", res.code)
        that.getOpenId(res.code)
      }
    })
  },
  // 获取openid
  getOpenId: function (code) {
    var that = this
    wx.request({
      url: 'https://api.weixin.qq.com/sns/jscode2session',
      data:{
        appid:'wx1162079bf9bf01af',
        secret:'aacc994199fe9ffc2619cf6f354572b4',
        js_code:code,
        grant_type:'authorization_code'
      },
      success: function (res) {
        console.log("获取openid", res);
        console.log(res.data.openid);
        // 调用支付接口
        // that.unitedPayRequest(res.data.openid);
      },
      fail: function () {
        wx.showModal({
          title: '出错了',
          content: '获取openId失败',
        })
      }
    })
  },
  // 支付接口
  unitedPayRequest: function (openid) {
    var that = this;
    //统一支付签名
    var appid = ''; //appid必填
    var body = ''; //商品名必填
    var mch_id = ''; //商户号必填
    var nonce_str = util.randomString(); //随机字符串，不长于32位。  
    var notify_url = ''; //通知地址必填
    var total_fee = parseInt(0.01 * 100); //价格，这是一分钱
    var trade_type = "JSAPI";
    var key = ''; //商户key必填，在商户后台获得
    var out_trade_no = ''; //自定义订单号必填

    var unifiedPayment = 'appid=' + appid + '&body=' + body + '&mch_id=' + mch_id + '&nonce_str=' + nonce_str + '&notify_url=' + notify_url + '&openid=' + openid + '&out_trade_no=' + out_trade_no + '&total_fee=' + total_fee + '&trade_type=' + trade_type + '&key=' + key;
    console.log("unifiedPayment", unifiedPayment);
    var sign = md5.md5(unifiedPayment).toUpperCase();
    console.log("签名md5", sign);

    //封装统一支付xml参数
    var formData = "<xml>";
    formData += "<appid>" + appid + "</appid>";
    formData += "<body>" + body + "</body>";
    formData += "<mch_id>" + mch_id + "</mch_id>";
    formData += "<nonce_str>" + nonce_str + "</nonce_str>";
    formData += "<notify_url>" + notify_url + "</notify_url>";
    formData += "<openid>" + openid + "</openid>";
    formData += "<out_trade_no>" + that.data.ordernum + "</out_trade_no>";
    formData += "<total_fee>" + total_fee + "</total_fee>";
    formData += "<trade_type>" + trade_type + "</trade_type>";
    formData += "<sign>" + sign + "</sign>";
    formData += "</xml>";
    console.log("formData", formData);

    // 统一支付
    wx.request({
      url: 'https://api.mch.weixin.qq.com/pay/unifiedorder',
      method: 'POST',
      head: 'application/x-www-form-urlencoded',
      data: formData,
      success: function (res) {
        console.log('返回商户', res.data)
        var result_code = util.getXMLNodeValue('result_code', res.data.toString("utf-8"));
        var resultCode = result_code.split('[')[2].split(']')[0];
        if (resultCode == 'FAIL') {
          var err_code_des = util.getXMLNodeValue('err_code_des', res.data.toString("utf-8"));
          var errDes = err_code_des.split('[')[2].split(']')[0];
          wx.showToast({
            title: errDes,
            icon: 'none',
            duration: 3000
          })
        } else {
          //发起支付
          var prepay_id = util.getXMLNodeValue('prepay_id', res.data.toString("utf-8"));
          var tmp = prepay_id.split('[');
          var tmp1 = tmp[2].split(']');
          //签名  
          var key = ''; //商户key必填，在商户后台获得
          var appId = ''; //appid必填
          var timeStamp = util.createTimeStamp();
          var nonceStr = util.randomString();
          var stringSignTemp = "appId=" + appId + "&nonceStr=" + nonceStr + "&package=prepay_id=" + tmp1[0] + "&signType=MD5&timeStamp=" + timeStamp + "&key=" + key;
          console.log("签名字符串", stringSignTemp);
          var sign = md5.md5(stringSignTemp).toUpperCase();
          console.log("签名", sign);
          var param = {
            "timeStamp": timeStamp,
            "package": 'prepay_id=' + tmp1[0],
            "paySign": sign,
            "signType": "MD5",
            "nonceStr": nonceStr
          }
          console.log("param小程序支付接口参数", param);
          that.processPay(param);
        }
      }
    })
  },
  // 支付
  processPay: function (param) {
    wx.requestPayment({
      timeStamp: param.timeStamp,
      nonceStr: param.nonceStr,
      package: param.package,
      signType: param.signType,
      paySign: param.paySign,
      success: function (res) {
        wx.showModal({
          title: '支付成功',
          content: '您将在“微信支付”官方号中收到支付凭证',
          showCancel: false,
          success: function (res) {
            if (res.confirm) { } else if (res.cancel) { }
          }
        })
      },
      fail: function () {
        wx.showModal({
          title: '支付失败',
          content: '请重新尝试',
        })
      }
    })
  }
})