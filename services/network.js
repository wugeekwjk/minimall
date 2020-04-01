import {baseURL, timeout} from './config.js'

export function request(options){
  wx.showLoading({
    title: '数据加载中',
  })
  return new Promise((resolve,reject) => {
    wx.request({
      url: baseURL + options.url,
      method: options.method || 'get',
      data: options.data,
      success: (res) => {
        resolve(res)
      },
      fail: (error) => {
        reject(error)
      },
      complete: (res) => {
        wx.hideLoading()
      }
    })
  })
}