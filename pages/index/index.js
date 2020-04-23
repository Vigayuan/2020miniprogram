//index.js
//获取应用实例

import api from '../../utils/api.js'
import { login } from '../../utils/config.js'

var amapFile = require('../../utils/amap-wx.js')
var markersData = {
  latitude: '', //纬度
  longitude: '', //经度
  key: "6abb254e4350b2c65586b49df13cdc13"
};
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/banner1.jpg',
      'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/banner2.jpg',
      'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/banner3.jpg',
      'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/banner4.jpg',
      'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/banner5.jpg',
      'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/banner6.jpg'
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
      icTop: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_mech.png',
      icTop_title: '工厂自动',
      icBottom: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_fs_processing.png',
      icBottom_title: '生产加工',
    }, {
      icTop: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_mech_screw.png',
      icTop_title: '螺丝螺帽',
      icBottom: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_fs_logistics.png',
      icBottom_title: '捆包物流',
    }, {
      icTop: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_el_wire.png',
      icTop_title: '接线',
      icBottom: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_fs_health.png',
      icBottom_title: '安全办公',
    }, {
      icTop: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_el_control.png',
      icTop_title: '控制',
      icBottom: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_mech_material.png',
      icBottom_title: '工业材料',
    }, {
      icTop: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_fs_machining.png',
      icTop_title: '切削',
      icBottom: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_fs_lab.png',
      icBottom_title: '研究管理',
    }, {
      icTop: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_mold.png',
      icTop_title: '冲压模具',
      icBottom: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_injection.png',
      icBottom_title: '注塑成型',
    }, {
      icTop: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_press.png',
      icTop_title: '塑料模具',
    }, ],
    category: [{
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_technology.png',
      title: '技术之窗'
    }, {
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_case.png',
      title: '案例库'
    }, {
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_catalog.png',
      title: '目录申请'
    }, {
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_RDicon.png',
      title: '设计插件'
    }],
    popularPd: [{
      id: '1',
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_technology.png',
      title: 'aaa'
    }, {
      id: '2',
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_case.png',
      title: 'bbb'
    }, {
      id: '3',
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_catalog.png',
      title: 'ccc'
    }, {
      id: '4',
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_RDicon.png',
      title: 'ddd'
    }, {
      id: '5',
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_technology.png',
      title: 'eee'
    }, {
      id: '6',
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_case.png',
      title: 'fff'
    }, {
      id: '7',
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_catalog.png',
      title: 'ggg'
    }, {
      id: '8',
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_RDicon.png',
      title: 'hhh'
    }, {
      id: '9',
      img: 'cloud://viga-s8qsn.7669-viga-s8qsn-1300720582/public/ic_index_technology.png',
      title: 'iii'
    }]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindKeyInput: function() {
    wx.navigateTo({
      url: '../search/search'
    })
  },
  gotoDetail: function() {
    wx.navigateTo({
      url: '../detail/detail',
    })
  },
  goToPdPage(val) {
    console.log(val)
  },
  scrollChange(e) {
    console.log(e)
  },
  onLoad: function() {

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  scan: function() {
    wx.scanCode({
      success(res) {
        console.log(res)
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  onTabSelected: function(e) {
    this.setData({
      tabSelectedIdex: e.currentTarget.dataset.index
    })
  },
  getUserLocation: function() {
    var that = this
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != false && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function(res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function(dataAu) {
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
  getLocation: function() {
    var that = this
    wx.getLocation({
      type: 'gcj02',
      success: function(res) {
        console.log(res)
        var latitude = res.latitude
        var longitude = res.longitude
        that.loadCity(latitude, longitude)
      },
    })
  },
  loadCity: function(latitude, longitude) {
    var that = this
    var myAmapFun = new amapFile.AMapWX({
      key: markersData.key
    })
    myAmapFun.getRegeo({
      location: '' + longitude + ',' + latitude + '', //location的格式为'经度,纬度'
      success: function(data) {
        console.log(data[0].regeocodeData.formatted_address);
        wx.showModal({
          title: '您的位置是',
          content: data[0].regeocodeData.formatted_address,
        })
      },
      fail: function(info) {}
    })
  },
  onLoad: function (options) {
    // wx.setTabBarBadge({
    //   index: 2,
    //   text:'6'
    // });
    if(options.scene){
      console.log('has scene')
      var scene = decodeURIComponent(options.scene)
      console.log('scene is',scene)
    }
  },
  onShow:function(){
    // api.post(login,{username:'viga',password:'viga1234'}).then(res => {
    //   console.log(res.code)
    //   wx.showToast({
    //     title: res.token,
    //   })
    // })

  }
})

