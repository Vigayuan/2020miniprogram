//index.js
//获取应用实例

var QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
var qqmapsdk;
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'https://m.misumi.com.cn/images/img/banner_pb201903.jpg',
      'https://m.misumi.com.cn/images/img/banner_lpXiaohaopin190523.jpg',
      'https://m.misumi.com.cn/images/img/banner_maisong190415.jpg',
      'https://m.misumi.com.cn/images/img/banner_Vmitsubishi190620.jpg',
      'https://m.misumi.com.cn/images/img/banner_lpCIbs190718.jpg',
      'https://m.misumi.com.cn/images/img/banner_lpFAfree190718.jpg'
    ],
    indicatorDots: true,
    indicatorColor: 'rgba(0, 0, 0, .3)',
    indicatorActiveColor: '#dddddd',
    autoplay: true,
    interval: 5000,
    duration: 1000,
    tabSelectedIdex: 1,
    province: '',
    city: '',
    scrollInfo: [{
      icTop: '../../images/ic_index_mech.png',
      icTop_title: '工厂自动',
      icBottom: '../../images/ic_index_fs_processing.png',
      icBottom_title: '生产加工',
    }, {
      icTop: '../../images/ic_index_mech_screw.png',
      icTop_title: '螺丝螺帽',
      icBottom: '../../images/ic_index_fs_logistics.png',
      icBottom_title: '捆包物流',
    }, {
      icTop: '../../images/ic_index_el_wire.png',
      icTop_title: '接线',
      icBottom: '../../images/ic_index_fs_health.png',
      icBottom_title: '安全办公',
    }, {
      icTop: '../../images/ic_index_el_control.png',
      icTop_title: '控制',
      icBottom: '../../images/ic_index_mech_material.png',
      icBottom_title: '工业材料',
    }, {
      icTop: '../../images/ic_index_fs_machining.png',
      icTop_title: '切削',
      icBottom: '../../images/ic_index_fs_lab.png',
      icBottom_title: '研究管理',
    }, {
      icTop: '../../images/ic_index_mold.png',
      icTop_title: '冲压模具',
      icBottom: '../../images/ic_index_injection.png',
      icBottom_title: '注塑成型',
    }, {
      icTop: '../../images/ic_index_press.png',
      icTop_title: '塑料模具',
    },],
    category: [{
      img: '../../images/ic_index_technology.png',
      title: '技术之窗'
    }, {
      img: '../../images/ic_index_case.png',
      title: '案例库'
    }, {
      img: '../../images/ic_index_catalog.png',
      title: '目录申请'
    }, {
      img: '../../images/ic_index_RDicon.png',
      title: '设计插件'
    }],
    popularPd: [{
      id: '1',
      img: '../../images/ic_index_technology.png',
      title: 'aaa'
    }, {
      id: '2',
      img: '../../images/ic_index_case.png',
      title: 'bbb'
    }, {
      id: '3',
      img: '../../images/ic_index_catalog.png',
      title: 'ccc'
    }, {
      id: '4',
      img: '../../images/ic_index_RDicon.png',
      title: 'ddd'
    }, {
      id: '5',
      img: '../../images/ic_index_technology.png',
      title: 'eee'
    }, {
      id: '6',
      img: '../../images/ic_index_case.png',
      title: 'fff'
    }, {
      id: '7',
      img: '../../images/ic_index_catalog.png',
      title: 'ggg'
    }, {
      id: '8',
      img: '../../images/ic_index_RDicon.png',
      title: 'hhh'
    }, {
      id: '9',
      img: '../../images/ic_index_technology.png',
      title: 'iii'
    }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindKeyInput: function () {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  gotoDetail: function () {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  goToPdPage(val){
    console.log(val)
  },
  scrollChange(e){
    console.log(e)
  },
  onLoad: function () {

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  scan: function () {
    wx.scanCode({
      success(res){
        console.log(res)
      },
      fail(err){
        console.log(err)
      }
    })
  },
  onTabSelected: function (e) {
    this.setData({
      tabSelectedIdex: e.currentTarget.dataset.index
    })
  },
  getUserLocation:function(){
    var that = this
    wx.getSetting({
      success:function(res){
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != false && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting['scope.userLocation'] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000,
                      })
                      that.getLocation()
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          that.getLocation()
        } else {
          that.getLocation()
        }
      }
    })
  },
  getLocation:function(){
    var that = this
    wx.getLocation({
      type:'wsg84',
      success: function(res) {
        console.log(res)
        var latitude =res.altitude
        var longitude = res.longitude
        that.getLocal(latitude,longitude)
      },
    })
  },
  getLocal:function(latitude,longitude){
    var that=this
    qqmapsdk.reverseGeocoder({
      location:{
        latitude: latitude,
        longitude: longitude
      },
      success:function(res){
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        wx.showToast({
          title: '您所咋的城市是' + province + city,
          duration: 1000,
        })
      }
    })
  }
})
