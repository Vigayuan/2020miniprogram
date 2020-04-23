const app = getApp()
// pages/pdpage/pdpage.js
// const resdata = require('../../city.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pickIndex:0,//顶部tab栏index
    secondPickIndex:0,//左边栏的index
    pdListData: '',//请求到的商品数据 [{[{[]}]}]
    // sencondData:'',//次一级数据[{[]}]
    // thirdData:'',//最底层实际数据[]
    allHeight: '', //设备高度 去除底部tabbar
  },
  pickTap: function (e) { //点击顶部tab
    this.setData({
      pickIndex: e.currentTarget.dataset.index
    })
    var len = this.data.pdListData.length;//36
    this.setData({
      secondPickIndex: 0
    })
  },
  secondPickTap: function (e){//点击右边tab
    this.setData({
      secondPickIndex: e.currentTarget.dataset.index,
    })
    this.setData({
      thirdPickIndex: 0
    })
    console.log(this.data.thirdData)
  },
  // 增加商品
  addPdNum:function(e){
    var sku =e.currentTarget.dataset.item.sku//sku
    console.log(sku)
    var item = e.currentTarget.dataset.item//当前对象
    var _firstindex = e.currentTarget.dataset.pickindex//index1
    var _secondindex = e.currentTarget.dataset.secondpickindex//index2
    var _thirdindex = e.currentTarget.dataset.thirdpickindex//index3
    var cartList = app.globalData.cartList//购物车
    item._firstindex = _firstindex
    item._secondindex = _secondindex
    item._thirdindex = _thirdindex
    if (!cartList[sku]){
      item.num = 1
      cartList[sku] = item
      console.log(cartList)
    }else{
      item.num = item.num +1
      cartList[sku] = item
      console.log(cartList)
    }
    if (!this.data.pdListData[_firstindex].childInfo[_secondindex].childInfo[_thirdindex].num){
      this.data.pdListData[_firstindex].childInfo[_secondindex].childInfo[_thirdindex].num = 1
    }else{
      this.data.pdListData[_firstindex].childInfo[_secondindex].childInfo[_thirdindex].num ++
    }
  },
  // 减少商品
  decreasePdNum:function(e){
    var sku =e.currentTarget.dataset.item.sku  //sku
    var item = e.currentTarget.dataset.item//当前对象
    var _firstindex = e.currentTarget.dataset.pickindex//index1
    var _secondindex = e.currentTarget.dataset.secondpickindex//index2
    var _thirdindex = e.currentTarget.dataset.thirdpickindex//index3
    var cartList = app.globalData.cartList//购物车
    console.log(cartList)
    if (cartList[sku].num == 1) {
      cartList.splice(cartList.indexOf(cartList[sku]),1,null)
    } else {
      item.num = item.num - 1
      cartList[sku] = item
    }
    this.data.pdListData[_firstindex].childInfo[_secondindex].childInfo[_thirdindex].num --
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取页面的高度
    wx.getSystemInfo({
      success: function (res, rect) {
        that.setData({
          allHeight: res.windowHeight
        })
        console.log(that.data.allHeight)
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
      pdListData: app.globalData.pdListData
    })
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

  }
})