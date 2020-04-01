import {getMultiData,getHomeData} from '../../services/home.js'


const DIATANCE = 1000
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    recommend: [],
    titles:['流行', '新款', '精选'],
    goods:{
      pop:{page:0,list:[]},
      new:{page:0,list:[]},
      sell:{page:0,list:[]}
    },
    types:['pop','new', 'sell'],
    currentType:'pop',
    isShow:true,
    // currentIndex:0,
    tabShow:false,
    tabControlTop:0
  },

  tabclick(event){
    var index = event.detail.index

    this.setData({
      currentType:this.data.types[index]
    })
    const tab2 = this.selectComponent('.tab2')
    tab2.switchIndex(index)
    const tab1 = this.selectComponent('.tabcontrol1')
    tab1.switchIndex(index)
    // console.log(tab2)
    // console.log(tab1)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  this.setData({
    tabShow:false
  })
   this._getMultiData()
   this._getHomeData('pop')
    this._getHomeData('new')
    this._getHomeData('sell')
  },


  _getMultiData(){
    getMultiData().then(res => {
      this.setData({
        banner: res.data.data.banner.list,
        recommend: res.data.data.recommend.list
      })
      // console.log(this.data.banner)
      // console.log(this.data.recommend)
    })
  },

  _getHomeData(type){
    const page = this.data.goods[type].page + 1
    getHomeData(type, page).then( res => {
      const list = res.data.data.list
      const oldList = this.data.goods[type].list
      const typekey = `goods.${type}.list`
      const pagekey = `goods.${type}.page`
      oldList.push(...list)
      this.setData({
        [typekey]:oldList,
        [pagekey]: page
      })
    })
  },

  backtop() {
    wx.pageScrollTo({
      scrollTop: 0,
    })
  },

  imageLoad(){
    wx.createSelectorQuery().select('.tab2').boundingClientRect((rect) => {
      this.setData({
        tabControlTop: rect.top
      })
    }).exec()
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
    this._getHomeData(this.data.currentType)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onPageScroll(options){
    const show = options.scrollTop>DIATANCE
    if(show !== this.data.isShow){
      this.setData({
        isShow:show
      })
    }
    const temp = options.scrollTop > this.data.tabControlTop
    if (temp !== this.data.tabShow) {
      this.setData({
        tabShow: temp
      })}
  }
})