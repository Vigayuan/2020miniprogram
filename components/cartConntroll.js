Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
  properties: {
    num: {
      type: Number,
      value: 0
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    num:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    add:function(){
      this.setData({
        num: this.properties.num+1
      })
      this.triggerEvent('addPdNum')
    },
    decrease:function(){
      if (this.properties.num == 0)return;
      this.setData({
        num: this.properties.num -1
      })
      this.triggerEvent('decreasePdNum')
    }
  }
}) 