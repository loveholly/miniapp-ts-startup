import { getLogger } from './utils/logger'
import { indexService } from './service/index'

export interface IMyApp {
  userInfoReadyCallback?(res: WechatMiniprogram.UserInfo): void
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo
  }
  onDataChange: () => void
}
const logger = getLogger('App')

App<IMyApp>({
  onLaunch() {
    this.onDataChange()
    // 展示本地存储能力
    var logs: number[] = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success(_res) {
        // console.log(_res.code)
        // 发送 _res.code 到后台换取 openId, sessionKey, unionId
        logger.debug('wx_login', _res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res.userInfo)
              }
            }
          })
        }
      }
    })
  },
  onDataChange() {
    indexService.data.subscribe(data => {
      logger.debug('onDataChange_', data)
    })
  },
  globalData: {
  }
})