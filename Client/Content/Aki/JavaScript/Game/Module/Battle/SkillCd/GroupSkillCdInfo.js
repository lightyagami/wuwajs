"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GroupSkillCdInfo = exports.SkillCdInfo = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const Queue_1 = require("../../../../Core/Container/Queue");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
class SkillCdInfo {
  constructor() {
    this.SkillId = 0;
    this.SkillCd = -0;
    this.CdDelay = -0;
    this.IsShareAllCdSkill = false;
  }
}
exports.SkillCdInfo = SkillCdInfo;
class GroupSkillCdInfo {
  constructor() {
    this.GroupId = 0;
    this.ConfigMaxCount = 0;
    this.LimitCountModify = 0;
    this.LimitCountAdd = 0;
    this.LimitCount = 0;
    this.RemainingCount = 0;
    this.SkillCdInfoMap = new Map();
    this.EntityIds = new Set();
    this.SkillIdQueue = new Queue_1.Queue();
    this.CdQueue = new Queue_1.Queue();
    this.CurMaxCd = 0;
    this.SkillCdFinishStamp = 0;
    this.CurSkillId = 0;
    this.D5_ = undefined;
    this.B5_ = undefined;
    this.CurDelaySkillId = 0;
    this.CurDelaySkillCd = 0;
    this.sDe = undefined;
    this.CdTags = [];
    this.Oqn = [];
    this.k5_ = false;
    this.q5_ = () => {
      var t;
      var i;
      this.D5_ = undefined;
      this.k5_ = false;
      if (this.RemainingCount <= 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 35, "技能CD延迟计时结束时，可用次数为0，不能进入CD");
        }
      } else {
        t = this.CurDelaySkillId;
        i = this.CurDelaySkillCd;
        if (this.IsInCd()) {
          this.CdQueue.Push(i);
          this.SkillIdQueue.Push(t);
          this.RemainingCount--;
          this.OnCountChanged();
        } else {
          this.RemainingCount--;
          this.OnCountChanged();
          this.StartSkillCdTimer(t, i);
        }
      }
    };
    this.O5_ = () => {
      var t = this.SkillCdFinishStamp;
      this.B5_ = undefined;
      this.SkillCdFinishStamp = 0;
      this.RemainingCount++;
      let i = Math.max(0, Time_1.Time.FlowTime - t) * TimeUtil_1.TimeUtil.Millisecond;
      let [s, h] = this.I8_();
      while (h && i >= h) {
        this.RemainingCount++;
        i -= h;
        [s, h] = this.I8_();
      }
      if (this.RemainingCount > this.LimitCount && (this.RemainingCount = this.LimitCount, Log_1.Log.CheckError())) {
        Log_1.Log.Error("Battle", 17, "技能CD结束，可用次数已达上限");
      }
      this.OnCountChanged();
      if (s && h) {
        this.StartSkillCdTimer(s, h - i);
      }
    };
  }
  get CurRemainingCd() {
    if (this.SkillCdFinishStamp === 0) {
      return 0;
    } else {
      return (this.SkillCdFinishStamp - Time_1.Time.FlowTime) * TimeUtil_1.TimeUtil.Millisecond;
    }
  }
  IsInCd() {
    return this.RemainingCount < this.LimitCount;
  }
  HasRemainingCount() {
    return this.RemainingCount > 0;
  }
  IsInDelay() {
    return this.k5_;
  }
  StartCd(t, i, s, h, e) {
    this.sDe = s;
    s = this.SkillCdInfoMap.get(t);
    return !!s && !(this.RemainingCount <= 0) && !(h = h.CalcExtraEffectCd(s.SkillCd, t, e) * i, this.IsInDelay() ? (Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "技能CD延迟期间，不能再用一次技能，必须先打断前一次技能", ["skillId", t]), 1) : ((e = s.CdDelay) > 0 ? (this.CurDelaySkillId = t, this.CurDelaySkillCd = h, this.k5_ = true, i = Math.max(TimerSystem_1.MIN_TIME, e * TimeUtil_1.TimeUtil.InverseMillisecond), this.D5_ = TimerSystem_1.FlowTimeTimerSystem.Delay(this.q5_, i), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "技能CD开始延迟CD", ["skillId", t])) : h <= 0 || (this.IsInCd() ? (this.CdQueue.Push(h), this.SkillIdQueue.Push(t)) : this.StartSkillCdTimer(t, h), this.RemainingCount--, this.OnCountChanged()), 0));
  }
  I8_() {
    if (this.SkillIdQueue.Size <= 0 || this.CdQueue.Size <= 0) {
      return [undefined, undefined];
    } else {
      return [this.SkillIdQueue.Pop(), this.CdQueue.Pop()];
    }
  }
  G5_() {
    if (this.D5_) {
      TimerSystem_1.FlowTimeTimerSystem.Remove(this.D5_);
      this.k5_ = false;
      this.D5_ = undefined;
    }
  }
  F5_() {
    if (this.B5_) {
      TimerSystem_1.FlowTimeTimerSystem.Remove(this.B5_);
      this.O5_();
    }
  }
  Fcc(t) {
    this.SkillCdFinishStamp = t <= 0 ? Time_1.Time.FlowTime : Time_1.Time.FlowTime + t * TimeUtil_1.TimeUtil.InverseMillisecond;
    if (this.B5_) {
      TimerSystem_1.FlowTimeTimerSystem.Remove(this.B5_);
      t = Math.max(TimerSystem_1.MIN_TIME, t * TimeUtil_1.TimeUtil.InverseMillisecond);
      this.B5_ = TimerSystem_1.FlowTimeTimerSystem.Delay(this.O5_, t);
    }
  }
  StartSkillCdTimer(t, i) {
    this.CurMaxCd = i;
    this.CurSkillId = t;
    t = i * TimeUtil_1.TimeUtil.InverseMillisecond;
    i = Math.max(TimerSystem_1.MIN_TIME, t);
    this.B5_ = TimerSystem_1.FlowTimeTimerSystem.Delay(this.O5_, i);
    this.SkillCdFinishStamp = Time_1.Time.FlowTime + t;
  }
  SetLimitCount(t) {
    this.LimitCountModify = t || this.ConfigMaxCount;
    this.LimitCount = this.LimitCountModify + this.LimitCountAdd;
    this.ResetAllCd();
  }
  AddLimitCount(t) {
    if (t !== 0) {
      this.LimitCountAdd += t;
      if (this.LimitCountAdd < 0) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Battle", 17, "技能次数叠加不能小于0");
        }
        this.LimitCountAdd = 0;
      }
      var i = this.LimitCount - this.RemainingCount;
      this.LimitCount = this.LimitCountModify + this.LimitCountAdd;
      this.RemainingCount = this.LimitCount - i;
      if (t < 0 && this.RemainingCount < 0) {
        for (let t = 0; t > this.RemainingCount; t--) {
          this.CdQueue.Pop();
          this.SkillIdQueue.Pop();
        }
        this.RemainingCount = 0;
      }
      this.OnCountChanged();
    }
  }
  ResetAllCd() {
    this.CdQueue.Clear();
    this.SkillIdQueue.Clear();
    this.G5_();
    if (this.B5_) {
      TimerSystem_1.FlowTimeTimerSystem.Remove(this.B5_);
      this.B5_ = undefined;
      this.SkillCdFinishStamp = 0;
    }
    this.RemainingCount = this.LimitCount;
    this.OnCountChanged();
  }
  ResetDelayCd() {
    return !!this.D5_ && (this.G5_(), true);
  }
  ModifyRemainingCd(t, i) {
    if (this.IsInCd()) {
      t = this.CurRemainingCd + t + this.CurMaxCd * i;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "技能CD修改剩余CD", ["skillId", this.CurSkillId], ["cd", t]);
      }
      if (t <= 0) {
        this.F5_();
      } else {
        this.Fcc(t);
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharSkillRemainCdChanged, this);
      }
    }
  }
  OnCountChanged() {
    if (this.sDe?.Valid) {
      const i = this.sDe.Entity.GetComponent(178);
      var t;
      if (this.RemainingCount <= 0) {
        t = i.AddTagWithReturnHandle(this.CdTags);
        this.Oqn.push(t);
      } else {
        this.Oqn.forEach(t => {
          i.RemoveBuffByHandle(t, -1, "技能CD结束移除");
        });
        this.Oqn.length = 0;
      }
    }
    this.iQe();
  }
  InitCdTags(t) {
    this.sDe = t;
    if (!(this.RemainingCount > 0) && !(this.Oqn.length > 0)) {
      if (this.sDe?.Valid) {
        t = this.sDe.Entity.GetComponent(178).AddTagWithReturnHandle(this.CdTags);
        this.Oqn.push(t);
      }
    }
  }
  ClearCdTags(t) {
    if (this.sDe?.Id === t) {
      if (this.sDe?.Valid) {
        const i = this.sDe.Entity.GetComponent(178);
        this.Oqn.forEach(t => {
          i.RemoveBuffByHandle(t, -1, "实体清理时移除技能CDTag");
        });
      }
      this.sDe = undefined;
      this.Oqn.length = 0;
    }
  }
  ClearLimitCountChange() {
    if (this.ConfigMaxCount !== this.LimitCount) {
      this.SetLimitCount(this.ConfigMaxCount);
    }
  }
  iQe() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "技能CD可用次数改变", ["skillId", this.CurSkillId], ["count", this.RemainingCount]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CharSkillCountChanged, this);
  }
  CheckConfigValid() {}
}
exports.GroupSkillCdInfo = GroupSkillCdInfo;
//# sourceMappingURL=GroupSkillCdInfo.js.map