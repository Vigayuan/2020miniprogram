// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history: [],
    recommend: ['回家了空间', '讲话稿客服号', '而犹太人', '开发股份', 'IT如入一台', '来看根据', '却无法第三方'],
    keywords:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  bindKeyInput:function(e){
    console.log(e.detail.value)
    this.setData({
      keywords: e.detail.value
    })
  },
  searchThis:function(e){
    var key = e.currentTarget.dataset.keywords
    console.log(key)
    this.setData({
      keywords: key
    })
  },
  goBack:function(){
    wx.navigateBack({
      delta: 1
    })
  },
  comfirmSearch:function(e){
    var key = e.currentTarget.dataset.finalkey
    var arr = this.data.history
    if (key==="")return;
    arr.push(key)
    this.setData({
      history: arr
    })
    this.setData({
      keywords:''
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