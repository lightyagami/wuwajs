"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProtoGachaInfo = exports.ProtoGachaPoolInfo = undefined;
const Log_1 = require("../../../Core/Common/Log");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class ProtoGachaPoolInfo {
  constructor(t) {
    this.Id = 0;
    this.BeginTime = 0;
    this.EndTime = 0;
    this.Sort = 0;
    this.Title = "";
    this.Description = "";
    this.UiType = 0;
    this.ThemeColor = "";
    this.ShowIdList = [];
    this.UpList = [];
    this.PreviewIdList = [];
    this.ComplianceDetail = "";
    this.Id = t.s5n;
    this.BeginTime = MathUtils_1.MathUtils.LongToNumber(t.cps);
    this.EndTime = MathUtils_1.MathUtils.LongToNumber(t.dps);
    this.Title = t.tbs;
    this.Description = t.fb_;
    this.UiType = t.Cb_;
    this.ThemeColor = t.gb_;
    this.ShowIdList = t.pb_;
    this.UpList = t.vb_;
    this.PreviewIdList = t.yb_;
    this.ComplianceDetail = t.czd;
    t = ConfigManager_1.ConfigManager.GachaConfig.GetGachaPoolConfig(this.Id);
    if (t) {
      this.Sort = t.Sort;
    }
  }
}
exports.ProtoGachaPoolInfo = ProtoGachaPoolInfo;
class ProtoGachaInfo {
  constructor(t) {
    this.Id = 0;
    this.TodayTimes = 0;
    this.TotalTimes = 0;
    this.ItemId = 0;
    this.GachaConsumes = undefined;
    this.UsePoolId = 0;
    this.bKt = [];
    this.BeginTime = 0;
    this.EndTime = 0;
    this.DailyLimitTimes = 0;
    this.TotalLimitTimes = 0;
    this.ResourcesId = "";
    this.GroupId = 0;
    this.Sort = 0;
    this.Id = t.s5n;
    this.TodayTimes = t._9n;
    this.TotalTimes = t.u9n;
    this.ItemId = t.L8n;
    this.GachaConsumes = t.WUs;
    this.UsePoolId = t.KUs;
    var i = t.QUs;
    if (i) {
      for (const s of i) {
        this.bKt.push(new ProtoGachaPoolInfo(s));
      }
    }
    this.BeginTime = MathUtils_1.MathUtils.LongToNumber(t.cps);
    this.EndTime = MathUtils_1.MathUtils.LongToNumber(t.dps);
    this.DailyLimitTimes = t.XUs;
    this.TotalLimitTimes = t.YUs;
    this.ResourcesId = t.JUs;
    i = ConfigManager_1.ConfigManager.GachaConfig.GetGachaConfig(this.Id);
    if (i) {
      this.Sort = i.Sort;
      this.GroupId = i.RuleGroupId;
    }
  }
  GetFirstValidPool() {
    if (this.bKt && this.bKt.length > 0) {
      for (const t of this.bKt) {
        if (this.IsPoolValid(t)) {
          return t;
        }
      }
    }
  }
  GetPoolInfo(t) {
    let i = undefined;
    for (const s of this.bKt) {
      if (s.Id === t) {
        i = s;
      }
    }
    return i;
  }
  GetCurrentPoolInfo() {
    if (this.UsePoolId !== 0) {
      return this.GetPoolInfo(this.UsePoolId);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Gacha", 34, "ProtoGachaInfo.GetCurrentPoolInfo UsePoolId is 0!");
    }
  }
  GetPoolEndTimeByPoolId(t) {
    t = this.GetPoolInfo(t);
    return this.GetPoolEndTimeByPoolInfo(t);
  }
  GetPoolEndTimeByPoolInfo(t) {
    var i = this.EndTime;
    if (!t || (t = t.EndTime) === 0 || i !== 0 && i < t) {
      return i;
    } else {
      return t;
    }
  }
  GetValidPoolList() {
    var t = this.bKt;
    if (t) {
      var i = [];
      for (const s of t) {
        if (this.IsPoolValid(s)) {
          i.push(s);
        }
      }
      return i;
    }
  }
  IsPoolValid(t) {
    t = this.GetPoolEndTimeByPoolInfo(t);
    return t === 0 || t >= TimeUtil_1.TimeUtil.GetServerTime();
  }
}
exports.ProtoGachaInfo = ProtoGachaInfo;
//# sourceMappingURL=ProtoGachaInfo.js.map