//index.js
//获取应用实例
import * as dayjs from 'dayjs'
import { getLogger } from '../../utils/logger'
import { indexService } from '../../service/index'

const app = getApp()
const logger = getLogger('Index Page')

Page({
  data: {
    motto: '点击 “编译” 以构建',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    lodashVersion: '',
    today: dayjs().format('dddd')
  },
  //事件处理函数
  bindViewTap() {
    indexService.setData('logs/logs')
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {

    logger.debug('onLoad')
    if (app.globalData.userInfo) {
      logger.debug('onLoad', 'initFrom globalData', app.globalData.userInfo)
      this.setData!({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
      })
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          logger.debug('getUserInfo', res)
          this.updateUserInfo(res.userInfo)
        }
      })
    }
  },

  updateUserInfo(userInfo: WechatMiniprogram.UserInfo) {
    logger.debug('updateUserInfo', userInfo)
    app.globalData.userInfo = { ...userInfo }
    this.setData!({
      userInfo,
      hasUserInfo: true,
    })
  },

  getUserInfo(e: any) {
    logger.debug('getUserInfo', e)
    this.updateUserInfo(e.detail.userInfo)
  }
})
