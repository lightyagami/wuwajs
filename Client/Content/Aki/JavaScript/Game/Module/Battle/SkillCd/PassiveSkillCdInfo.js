"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PassiveSkillCdInfo = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const MAX_CD_COUNT = 20;
class PassiveSkillCdInfo {
  constructor() {
    this.SkillId = 0;
    this.SkillCd = -0;
    this.Threshold = 0;
    this.IsShareAllCdSkill = false;
    this.EntityIds = new Set();
    this.CurMaxCd = 0;
    this.SkillCdFinishStampMap = new Map();
  }
  GetCurRemainingCd(t) {
    t = this.SkillCdFinishStampMap.get(t) ?? 0;
    if (t === 0) {
      return 0;
    } else {
      return (t - Time_1.Time.FlowTime) * TimeUtil_1.TimeUtil.Millisecond;
    }
  }
  IsInCd(t) {
    return this.GetCurRemainingCd(t) > Math.max(this.Threshold, 0);
  }
  Vxm() {
    for (var [t] of this.SkillCdFinishStampMap) {
      if (this.IsInCd(t)) {
        break;
      }
      this.SkillCdFinishStampMap.delete(t);
    }
    var i;
    if (this.SkillCdFinishStampMap.size >= MAX_CD_COUNT && (i = this.EntityIds.keys().next().value, Log_1.Log.CheckInfo() && Log_1.Log.Info("Battle", 85, "被动技能CD数量超上限,移除最先的entityCD", ["skillId", this.SkillId], ["firstEntityId", i]), i)) {
      this.SkillCdFinishStampMap.delete(i);
    }
  }
  StartCd(t, i, e = -1) {
    if (this.IsInCd(i)) {
      return false;
    }
    let s = e;
    if (!((s = s === -1 ? this.SkillCd : s) <= 0)) {
      this.CurMaxCd = s;
      e = this.SkillCdFinishStampMap.get(i) ?? 0;
      e = (Time_1.Time.FlowTime > e ? Time_1.Time.FlowTime : e) + s * TimeUtil_1.TimeUtil.InverseMillisecond;
      this.Vxm();
      this.SkillCdFinishStampMap.delete(i);
      this.SkillCdFinishStampMap.set(i, e);
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "被动技能CD开始", ["skillId", this.SkillId], ["cd", s]);
      }
    }
    return true;
  }
  ResetAllCd() {
    this.SkillCdFinishStampMap.clear();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "重置被动技能CD", ["skillId", this.SkillId]);
    }
  }
}
exports.PassiveSkillCdInfo = PassiveSkillCdInfo;
//# sourceMappingURL=PassiveSkillCdInfo.js.map