"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CiacconaGalActivityData = undefined;
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
class CiacconaGalActivityData {
  constructor(t) {
    this.Lo = t;
    this.Y4c = 0;
    this.Dpi = undefined;
    this.z4c = false;
    this.J4c = false;
    this.$dr = 0;
    this.Px1 = 0;
    this.xx1 = 0;
    this.SXl = undefined;
  }
  get Id() {
    return this.Lo.Id;
  }
  get SlotIds() {
    return this.Lo.Slots;
  }
  get InspirationCount() {
    return this.Y4c;
  }
  get MaxInspirationCount() {
    return this.Lo.InspirationMaxValue;
  }
  get RefreshTime() {
    return this.Dpi?.low ?? 0;
  }
  get State2Unlock() {
    return this.z4c;
  }
  get State3Unlock() {
    return this.J4c;
  }
  get EndTime() {
    return this.$dr;
  }
  get RecommendQuestId() {
    return this.Lo.RecommendQuestId;
  }
  get RecommendQuestTipsTextId() {
    return this.Lo.RecommendQuestTips;
  }
  get RewardEndTime() {
    return this.Px1;
  }
  get RewardStartTime() {
    return this.xx1;
  }
  get IsInRewardTime() {
    return TimeUtil_1.TimeUtil.IsInTimeSpan(this.RewardStartTime, this.RewardEndTime);
  }
  get RewardRemainTimeStr() {
    var t = this.RewardEndTime - TimeUtil_1.TimeUtil.GetServerTimeStamp() * TimeUtil_1.TimeUtil.Millisecond;
    return TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(t).CountDownText;
  }
  get State() {
    if (this.State3Unlock) {
      return 2;
    } else if (this.State2Unlock) {
      return 1;
    } else {
      return 0;
    }
  }
  get FinishedSubEndingCount() {
    let t = 0;
    if (this.SXl) {
      for (const i of this.SXl.e4c) {
        for (const e of i.a4c) {
          if (e.a3_) {
            ++t;
          }
        }
      }
    }
    return t;
  }
  get TotalSubEndingCount() {
    let t = 1;
    if (this.SXl) {
      for (const i of this.SXl.e4c) {
        t += i.a4c.length;
      }
    }
    return t;
  }
  get RemainTimeToNextRefreshStr() {
    var t = TimeUtil_1.TimeUtil.GetServerTimeStamp();
    var t = Number(this.RefreshTime) - t * TimeUtil_1.TimeUtil.Millisecond;
    return (t < TimeUtil_1.TimeUtil.Hour ? TimeUtil_1.TimeUtil.GetRemainTimeDataFormat4(t) : TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(t)).CountDownText;
  }
  UpdateByServerData(t) {
    this.SXl = t;
    this.UpdateInspirationData(t.r4c);
    this.z4c = t.o4c;
    this.J4c = t.n4c;
    this.xx1 = Number(MathUtils_1.MathUtils.LongToBigInt(t._M_));
    this.Px1 = Number(MathUtils_1.MathUtils.LongToBigInt(t.cM_));
  }
  UpdateInspirationData(t) {
    if (t) {
      this.Y4c = t.f4c;
      this.Dpi = t.eb_;
    }
  }
  UpdateState(t) {
    this.z4c = t.o4c;
    this.J4c = t.n4c;
  }
  UpdateEndTime(t) {
    this.$dr = t;
  }
}
exports.CiacconaGalActivityData = CiacconaGalActivityData;
//# sourceMappingURL=CiacconaGalActivityData.js.map