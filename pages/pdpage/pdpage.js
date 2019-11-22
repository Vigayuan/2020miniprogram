const app = getApp()
// pages/pdpage/pdpage.js
// const resdata = require('../../city.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pickIndex:0,
    secondPickIndex:0,
    thirdPickIndex:0,
    scrollInfo: '',
    sencondData:'',
    thirdData:'',
    allHeight: '', 
    leftDist:0,
    skuList:[]//存储sku
  },

  pdScrollChange: function (e) {
    // console.log(e)
    // console.log(e.detail)
    // this.setData({
    //   leftDist: e.detail.scrollLeft
    // })
  },
  pickTap: function (e) {
    this.setData({
      pickIndex: e.currentTarget.dataset.index,
    })
    var len = this.data.scrollInfo.length;//36
    
    console.log(this.data.leftDist)
    this.setData({
      sencondData: this.data.scrollInfo[this.data.pickIndex].childInfo,
      thirdData: this.data.scrollInfo[this.data.pickIndex].childInfo[0].childInfo,
      secondPickIndex: 0,
      thirdPickIndex: 0
    })
  },
  secondPickTap: function (e){
    this.setData({
      secondPickIndex: e.currentTarget.dataset.index,
    })
    this.setData({
      thirdData: this.data.sencondData[this.data.secondPickIndex].childInfo,
      thirdPickIndex: 0
    })
    console.log(this.data.thirdData)
  },
  thirdPickTap: function (e){
    this.setData({
      thirdPickIndex: e.currentTarget.dataset.index,
    })
  },
  // 增加商品
  addPdNum:function(e){
    var sku = e.currentTarget.dataset.item.sku
    var item = e.currentTarget.dataset.item
    var cartList = app.globalData.cartList
    if (!cartList[sku]){
      item.num = 1
      cartList[sku] = item
      console.log(cartList)
    }else{
      item.num = item.num +1
      cartList[sku] = item
      console.log(cartList)
    }
  },
  // 减少商品
  decreasePdNum:function(e){
    var sku = e.currentTarget.dataset.item.sku
    var item = e.currentTarget.dataset.item
    var cartList = app.globalData.cartList
    if (cartList[sku].num == 1) {
      cartList.splice(cartList.indexOf(cartList[sku]),1)
    } else {
      item.num = item.num - 1
      cartList[sku] = item
    }
    console.log(cartList)
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
    this.getPdList()
  },
  getPdList: function () {
    var that = this
    let db = wx.cloud.database({
      env: "viga-s8qsn"
    })
    let pdList = db.collection('pdList')
    pdList.get().then(res => {
      console.log(res.data)
      that.setData({
        scrollInfo: res.data,
        sencondData: res.data[0].childInfo,
        thirdData: res.data[0].childInfo[0].childInfo
      })
      console.log(this.data.thirdData)
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