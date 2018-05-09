// pages/calendar/index.js
var d = require("./common/getDate.js");
var CN_Date = require('./common/getCNDate.js');
var t = new Date();
Page({
  data : {
    monthNum: t.getMonth() + 1,
    yearNum: t.getFullYear(),
    MonthDayArray: [],
    toDate: t.getDate(),
    toMonth: t.getMonth() + 1,
    toYear: t.getFullYear(),
    fromToday: '今天',
    nongliDetail: CN_Date.GetLunarDay(t.getFullYear(), t.getMonth() + 1, t.getDate()),
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onShow:function() {
    this.calcMonthDayArray();
  },
  dateClick: function(e) {
      var eId = e.currentTarget.id;
      var MonArray = this.data['MonthDayArray'];
      if (eId == "") return;
      //点击效果 ，且只能选中一个日期
      //FIX 这个遍历算法可以改进

      for (var i = 0; i < MonArray.length; i++) {
        for (var j = 0; j < MonArray[i].length; j++) {
          if (typeof (MonArray[i][j]) == 'string') {
            continue;
          }
          if (MonArray[i][j].num == eId) {
            MonArray[i][j].isShowDayInfo = !MonArray[i][j].isShowDayInfo;
          }
        }
      }

      for (var i = 0; i < MonArray.length; i++) {
        for (var j = 0; j < MonArray[i].length; j++) {
          if (typeof (MonArray[i][j]) == 'string' || MonArray[i][j].num == eId) {
            continue;
          }
          MonArray[i][j].isShowDayInfo = false;
        }
      }

      this.setData({
        MonthDayArray : MonArray,
        toYear :yearNum,
        toMonth : monthNum,
        toDate : eId,
        fromToday : d.getFromTodayDays(eId, this.monthNum - 1, this.yearNum),
        nongliDetail : CN_Date.GetLunarDay(this.yearNum, this.monthNum, eId)
      });
      
    },
  monthTouch: function(e) {
      var beginX = e.target.offsetLeft;
      var endX = e.changedTouches[0].clientX;
      if (beginX - endX > 125) {
        this.nextMonth_Fn();
      }
      else if (beginX - endX < -125) {
        this.lastMonth_Fn();
      }
    }
  ,
  nextMonth_Fn: function() {
    var n = this.data['monthNum'];
    var y = this.data['yearNum'];
    if (n == 12) {
      this.setData({
        monthNum : 1,
        yearNum : y + 1
      })
     
    }
    else {
      this.setData({
        monthNum : n + 1
      })
      
    }
    this.calcMonthDayArray();
  },
  lastMonth_Fn: function() {
    var n = this.data['monthNum'];
    var y = this.data['yearNum'];
    if (n == 1) {
      this.setData({
        monthNum: 12,
        yearNum: y - 1
      })
    }
    else {
      this.setData({
        monthNum: n - 1
      })
    }
    this.calcMonthDayArray();
  },
  calcMonthDayArray: function() {
    var dateArray = d.paintCalendarArray(this.data['monthNum'], this.data['yearNum']);

    //如果不是当年当月，自动选中1号
    var notToday = (this.data['monthNum'] != t.getMonth() + 1 || this.data['yearNum'] != t.getFullYear());
    if (notToday) {
      for (var i = 0; i < dateArray[0].length; i++) {
        if (dateArray[0][i].num == 1) {
          dateArray[0][i].isShowDayInfo = true;
        }
      }
    }

    this.setData({
      MonthDayArray : dateArray,
      toYear : notToday ? this.data['yearNum'] : t.getFullYear(),
      toMonth : notToday ? this.data['monthNum'] : t.getMonth() + 1,
      toDate : notToday ? 1 : t.getDate(),
      fromToday : notToday ? d.getFromTodayDays(1, this.data['monthNum'] - 1, this.data['yearNum']) : '今天',
      nongliDetail : notToday ? CN_Date.GetLunarDay(this.data['yearNum'], this.data['monthNum'], 1) : CN_Date.GetLunarDay(t.getFullYear(), t.getMonth() + 1, t.getDate())
    })
    


  }

})