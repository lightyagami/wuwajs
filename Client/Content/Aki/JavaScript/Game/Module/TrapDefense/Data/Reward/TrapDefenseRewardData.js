"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRewardData = undefined;
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const TrapDefenseRewardItemData_1 = require("./TrapDefenseRewardItemData");
const TrapDefenseSpecialRewardData_1 = require("./TrapDefenseSpecialRewardData");
class TrapDefenseRewardData {
  constructor() {
    this.LOe = 0;
    this.RewardTypeMap = new Map();
    this.SpecialRewardData = undefined;
    this.RewardDataMap = new Map();
    this.FixedRewardDataList = [];
    this.LimitBeginTime = 0;
    this.LimitEndTime = 0;
    this.p9c = (e, t) => e.State !== t.State ? e.State < t.State ? 1 : -1 : e.Id > t.Id ? 1 : -1;
  }
  static Create(e) {
    var t = new TrapDefenseRewardData();
    t.LOe = e;
    t.AU();
    return t;
  }
  UpdateRewardsByServerData(e) {
    for (const t of e) {
      this.RewardDataMap.get(t.Wm1?.s5n ?? 0)?.UpdateByServerData(t);
    }
  }
  SetLimitTime(e, t) {
    this.LimitBeginTime = MathUtils_1.MathUtils.LongToNumber(e);
    this.LimitEndTime = MathUtils_1.MathUtils.LongToNumber(t);
  }
  GetRewardListByType(e) {
    e = this.RewardTypeMap.get(e);
    e?.sort(this.p9c);
    return e ?? [];
  }
  GetRewardProgressByType(e) {
    e = this.GetRewardListByType(e);
    let t = 0;
    for (const r of e) {
      if (r.State === 1) {
        ++t;
      }
    }
    return [t, e.length];
  }
  GetLimitRewardTotalProgress() {
    let [t, r] = [0, 0];
    for (let e = 1; e < 5; ++e) {
      var i = e;
      var [i, a] = this.GetRewardProgressByType(i);
      t += i;
      r += a;
    }
    r += 1;
    return [t += this.SpecialRewardData?.State === 1 ? 1 : 0, r];
  }
  GetLimitRewardRemainTimeStr() {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(this.LimitEndTime * TimeUtil_1.TimeUtil.Millisecond - e).CountDownText ?? "";
  }
  IsOpenLimitReward() {
    var e = this.LimitBeginTime * TimeUtil_1.TimeUtil.Millisecond;
    var t = this.LimitEndTime * TimeUtil_1.TimeUtil.Millisecond;
    return TimeUtil_1.TimeUtil.IsInTimeSpan(e, t);
  }
  RequestClaimRewardByType(e) {
    var t = [];
    for (const r of this.GetRewardListByType(e)) {
      if (r.State === 3) {
        t.push(r.Id);
      }
    }
    ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseRewardClaim(t);
  }
  RequestFixedReward() {
    var e = this.FixedRewardDataList.filter(e => e.State === 3).map(e => e.Id);
    ControllerHolder_1.ControllerHolder.TrapDefenseController.RequestTrapDefenseRewardClaim(e);
  }
  AU() {
    for (const i of ConfigManager_1.ConfigManager.TrapDefenseConfig?.GetRewardListByActivityId(this.LOe) ?? []) {
      var e = i.Type;
      if (!this.RewardTypeMap.has(e)) {
        this.RewardTypeMap.set(e, []);
      }
      var t = TrapDefenseRewardItemData_1.TrapDefenseRewardItemData.Create(i);
      if (!i.IsPermanent) {
        this.RewardTypeMap.get(e)?.push(t);
      }
      this.RewardDataMap.set(t.Id, t);
      if (i.IsPermanent) {
        this.FixedRewardDataList.push(t);
      }
    }
    for (const a of this.RewardTypeMap.values()) {
      a.sort(this.p9c);
    }
    var r = ConfigManager_1.ConfigManager.TrapDefenseConfig?.GetSpecialRewardByActivityId(this.LOe);
    if (r && r.length > 0) {
      this.SpecialRewardData = TrapDefenseSpecialRewardData_1.TrapDefenseSpecialRewardData.Create(r[0]);
    }
  }
  SortFixedRewardList() {
    this.FixedRewardDataList.sort(this.p9c);
  }
  GetFixedRewardTotalProgress() {
    return [this.FixedRewardDataList.filter(e => e.State === 1).length, this.FixedRewardDataList.length];
  }
  IsCanClaimLimitReward() {
    for (const e of this.RewardTypeMap.values()) {
      for (const t of e) {
        if (t.State === 3) {
          return true;
        }
      }
    }
    return this.SpecialRewardData?.State === 3;
  }
  IsCanClaimLimitRewardByType(e) {
    return this.GetRewardListByType(e).some(e => e.State === 3);
  }
  IsCanClaimFixedReward() {
    return this.FixedRewardDataList.some(e => e.State === 3);
  }
  RedDotFixedReward() {
    return this.IsCanClaimFixedReward();
  }
  RedDotLimitReward() {
    return this.IsCanClaimLimitReward();
  }
  IsAllRewardClaimed() {
    if (this.SpecialRewardData?.State !== 1) {
      return false;
    }
    if (this.FixedRewardDataList.some(e => e.State !== 1)) {
      return false;
    }
    for (const e of this.RewardTypeMap.values()) {
      if (e.some(e => e.State !== 1)) {
        return false;
      }
    }
    return true;
  }
}
exports.TrapDefenseRewardData = TrapDefenseRewardData;
//# sourceMappingURL=TrapDefenseRewardData.js.map