"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseRewardItemData = undefined;
const DropPackageById_1 = require("../../../../../Core/Define/ConfigQuery/DropPackageById");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const TrapDefenseDefine_1 = require("../../TrapDefenseDefine");
class TrapDefenseRewardItemData {
  constructor() {
    this.Lo = undefined;
    this.Id = 0;
    this.Type = 0;
    this.Desc = "";
    this.ItemList = [];
    this.State = 0;
    this.StartTime = 0;
    this.CurProgress = 0;
    this.Target = 0;
  }
  static Create(e) {
    var t = new TrapDefenseRewardItemData();
    t.Lo = e;
    t.Id = e.Id;
    t.AU();
    return t;
  }
  UpdateByServerData(e) {
    var t;
    var i;
    if (e.Wm1?.s5n === this.Id) {
      this.State = TrapDefenseDefine_1.trapDefenseRewardServerState2ClientState[e.Wm1.H6n];
      t = MathUtils_1.MathUtils.LongToNumber(e.CPs) * TimeUtil_1.TimeUtil.Millisecond;
      i = MathUtils_1.MathUtils.LongToNumber(e.gPs) * TimeUtil_1.TimeUtil.Millisecond;
      if (!TimeUtil_1.TimeUtil.IsInTimeSpan(t, i)) {
        this.State = 0;
      }
      this.StartTime = t;
      this.CurProgress = e.Wm1?.lMs ?? 0;
      this.Target = e.Wm1?.j6n ?? 0;
    }
  }
  GetUnlockRemainTimeStr() {
    var e;
    if (this.State !== 0 || (e = TimeUtil_1.TimeUtil.GetServerTime(), (e = this.StartTime - e) <= 0)) {
      return "";
    } else {
      return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(e).CountDownText ?? "";
    }
  }
  AU() {
    if (this.Lo !== undefined) {
      this.Type = this.Lo.Type;
      this.Desc = this.Lo.Desc;
      this.o9u();
    }
  }
  o9u() {
    this.ItemList = [];
    var e;
    var t;
    var i = DropPackageById_1.configDropPackageById.GetConfig(this.Lo.RewardId);
    if (i) {
      for ([e, t] of i.DropPreview) {
        this.ItemList.push([{
          ItemId: e,
          IncId: 0
        }, t]);
      }
    }
  }
}
exports.TrapDefenseRewardItemData = TrapDefenseRewardItemData;
//# sourceMappingURL=TrapDefenseRewardItemData.js.map