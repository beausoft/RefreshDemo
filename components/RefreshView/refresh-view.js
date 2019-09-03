var PULL_DEFAULT = -1 //默认
var PULL_LT_HEIGHT = 1 //下拉小于高度
var PULL_GT_HEIGHT = 2 //下拉大于高度
var PULL_REFRESHING = 0 //刷新中

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    backgroundColor: {
      type: String,
      value: "#000"
    },
    refreshHeight: {
      type: Number,
      value: 150
    },
    textColor: {
      type: String,
      value: "white"
    },
    viewStyle: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    pullState: PULL_DEFAULT, // 刷新状态 -1:默认  1:开始下拉  2: 达到下拉最大距离  0: 正在刷新
  },

  attached: function() {
    const platform = wx.getSystemInfoSync().platform;
    const scale =  wx.getSystemInfoSync().windowWidth / 375 *2;
    this.setData({
      platformValue: platform,
      scaleValue: scale
    });
  },
  
  methods: {
    //自动刷新
    autoRefresh() {
      this._pullStateChange(PULL_REFRESHING, this.data.refreshHeight)
      //刷新事件 回调出去
      this.triggerEvent("onRefresh")
    },
    //停止刷新
    stopPullRefresh() {
      this.setData({
        pullState: PULL_DEFAULT
      });
    },
    //是否正在刷新
    isRefreshing() {
      return PULL_REFRESHING == this.data.pullState
    },
    //是否下拉状态
    isPullState() {
      return PULL_DEFAULT != this.data.pullState
    },
    //是否是安卓平台
    _isAndriod() {
      return 'ios' == this.data.platformValue
    },
    callPullState(res) {
      if (this.data.pullState !== res.state) {
        this.setData({
          "pullState": res.state
        });
      }
    },
    callRefresh() {
      this.triggerEvent("onRefresh");
    }
  }
})