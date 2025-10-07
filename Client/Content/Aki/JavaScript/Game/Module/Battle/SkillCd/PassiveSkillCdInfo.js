"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PassiveSkillCdInfo = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const TimeUtil_1 = require("../../../Common/TimeUtil");
class PassiveSkillCdInfo {
  constructor() {
    this.SkillId = 0;
    this.SkillCd = -0;
    this.Threshold = 0;
    this.IsShareAllCdSkill = false;
    this.EntityIds = new Set();
    this.CurMaxCd = 0;
    this.SkillCdFinishStamp = 0;
  }
  get CurRemainingCd() {
    if (this.SkillCdFinishStamp === 0) {
      return 0;
    } else {
      return (this.SkillCdFinishStamp - Time_1.Time.FlowTime) * TimeUtil_1.TimeUtil.Millisecond;
    }
  }
  IsInCd() {
    return this.CurRemainingCd > Math.max(this.Threshold, 0);
  }
  StartCd(i, t = -1) {
    if (this.IsInCd()) {
      return false;
    }
    let s = t;
    if (!((s = s === -1 ? this.SkillCd : s) <= 0)) {
      this.CurMaxCd = s;
      t = Time_1.Time.FlowTime > this.SkillCdFinishStamp ? Time_1.Time.FlowTime : this.SkillCdFinishStamp;
      this.SkillCdFinishStamp = t + s * TimeUtil_1.TimeUtil.InverseMillisecond;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "被动技能CD开始", ["skillId", this.SkillId], ["cd", s]);
      }
    }
    return true;
  }
  ResetAllCd() {
    this.SkillCdFinishStamp = 0;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "重置被动技能CD", ["skillId", this.SkillId]);
    }
  }
  ModifyRemainingCd(i, t) {
    if (this.IsInCd()) {
      i = this.CurRemainingCd + i + this.CurMaxCd * t;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "被动技能CD修改剩余CD", ["skillId", this.SkillId], ["cd", i]);
      }
      if (i <= 0) {
        this.SkillCdFinishStamp = 0;
      } else {
        t = this.SkillCdFinishStamp - this.CurMaxCd * TimeUtil_1.TimeUtil.InverseMillisecond;
        this.SkillCdFinishStamp = t + i;
      }
    }
  }
}
exports.PassiveSkillCdInfo = PassiveSkillCdInfo;
//# sourceMappingURL=PassiveSkillCdInfo.js.map