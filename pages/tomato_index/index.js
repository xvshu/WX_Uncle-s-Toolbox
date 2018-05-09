Page({
  data: {
    windowHeight: 654,
    maxtime: "",
    isHiddenLoading: true,
    isHiddenToast: true,
    dataList: {},
    countDownDay: '00',
    countDownHour: '00',
    countDownMinute: '00',
    countDownSecond: '00',
    workType:'work',
    workText: '未开始',
    autoWork:false,
    workAutoText:'全自动模式'
  },
  //事件处理函数  
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.setData({
      windowHeight: wx.getStorageSync('windowHeight')
    });
  },

  // 页面渲染完成后 调用  
  onReady: function () {
  },

  //cell事件处理函数  
  bindCellViewTap: function (e) {
  },
  workTimeAuto: function() {
    var autoWork = this.data['autoWork'];
    if (autoWork) {
      this.setData({
        autoWork: false,
        workAutoText: '全自动模式'
      });
    }else {
      this.setData({
        autoWork: true,
        workAutoText:'取消全自动模式'
      });
      this.workTime();
    }
  },
  workTime: function () {
    var totalSecond = 25*60;
    this.setData({
      workType: 'work',
      workText:'工作中'
    });

    var interval = setInterval(function () {
      // 秒数  
      var second = totalSecond;
      var workType = this.data['workType'];
      if (workType =='rest'){
        totalSecond=0;
        clearInterval(interval);
        return;
      }

      // 天数位  
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;

      // 小时位  
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位  
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位  
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        wx.showToast({
          title: '休息下！',
        });
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
          workText: '未开始'
        });
        var autoWork = this.data['autoWork'];
        if (autoWork){
          this.restTime();
        }
      }
    }.bind(this), 1000);
  }, 
  restTime: function () {
    var totalSecond = 5*60;
    this.setData({
      workType: 'rest',
      workText: '休息中'
    });

    var interval = setInterval(function () {
      // 秒数  
      var second = totalSecond;
      var workType = this.data['workType'];
      if (workType == 'work') {
        totalSecond = 0;
        clearInterval(interval);
        return;
      }

      // 天数位  
      var day = Math.floor(second / 3600 / 24);
      var dayStr = day.toString();
      if (dayStr.length == 1) dayStr = '0' + dayStr;

      // 小时位  
      var hr = Math.floor((second - day * 3600 * 24) / 3600);
      var hrStr = hr.toString();
      if (hrStr.length == 1) hrStr = '0' + hrStr;

      // 分钟位  
      var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
      var minStr = min.toString();
      if (minStr.length == 1) minStr = '0' + minStr;

      // 秒位  
      var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
      var secStr = sec.toString();
      if (secStr.length == 1) secStr = '0' + secStr;

      this.setData({
        countDownDay: dayStr,
        countDownHour: hrStr,
        countDownMinute: minStr,
        countDownSecond: secStr,
      });
      totalSecond--;
      if (totalSecond < 0) {
        clearInterval(interval);
        wx.showToast({
          title: '努力工作喽！',
        });
        this.setData({
          countDownDay: '00',
          countDownHour: '00',
          countDownMinute: '00',
          countDownSecond: '00',
          workText: '未开始'
        });
        var autoWork = this.data['autoWork'];
        if (autoWork) {
          this.workTime();
        }

      }
    }.bind(this), 1000);
  }
}) 