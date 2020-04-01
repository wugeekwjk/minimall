// components/w-swiper/w-swiper.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banner:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 2000,
    duration: 500,
    indicatorColor:"rgba(0,0,0,.3)",
    indicatorActiveColor:"#f55777",
    circular:true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIndicatorDots() {
      this.setData({
        indicatorDots: !this.data.indicatorDots
      })
    },

    changeAutoplay() {
      this.setData({
        autoplay: !this.data.autoplay
      })
    },

    intervalChange(e) {
      this.setData({
        interval: e.detail.value
      })
    },

    durationChange(e) {
      this.setData({
        duration: e.detail.value
      })
    }
  }
})
