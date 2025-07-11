"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MultiSkillData = exports.MultiSkillInfo = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../../Common/TimeUtil");
class MultiSkillInfo {
  constructor() {
    this.FirstSkillId = 0;
    this.CurSkillId = 0;
    this.NextSkillId = undefined;
    this.StartTime = -0;
    this.MultiSkillStartStamp = 0;
    this.StopTime = -0;
    this.MultiSkillStopStamp = 0;
    this.IsReset = false;
    this.IsResetOnChangeRole = false;
  }
  get RemainingStartTime() {
    if (this.MultiSkillStartStamp === 0) {
      return 0;
    } else {
      return (this.MultiSkillStartStamp - Time_1.Time.FlowTime) * TimeUtil_1.TimeUtil.Millisecond;
    }
  }
  get RemainingStopTime() {
    if (this.MultiSkillStopStamp === 0) {
      return 0;
    } else {
      return (this.MultiSkillStopStamp - Time_1.Time.FlowTime) * TimeUtil_1.TimeUtil.Millisecond;
    }
  }
}
exports.MultiSkillInfo = MultiSkillInfo;
class MultiSkillData {
  constructor() {
    this.MultiSkillInfoMap = new Map();
    this.MultiSkillInfos = [];
    this.EntityId = 0;
    this.VisionEntityId = 0;
    this.MultiSkillStartTimer = undefined;
    this.MultiSkillStopTimer = undefined;
  }
  Init(t, i = 0) {
    this.EntityId = t;
    this.VisionEntityId = i;
  }
  IsMultiSkill(t) {
    return t.CooldownConfig.SectionCount > 1;
  }
  CanStartMultiSkill(t) {
    var i = t.SkillId;
    var e = this.MultiSkillInfoMap.get(i);
    var t = t.SkillInfo.CooldownConfig;
    if (e) {
      if (e.NextSkillId) {
        if (e.NextSkillId !== i) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("Battle", 17, "多段技能使用的不是下一段技能", ["传入技能Id", i], ["下一段技能Id", e.NextSkillId]);
          }
          return false;
        } else {
          return !(e.RemainingStartTime > 0) || !(Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "多段技能还没到下一段技能可使用的时间", ["技能Id", i]), 1);
        }
      } else {
        return e.FirstSkillId === i || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "多段技能必须从第一段技能开始", ["传入技能Id", i], ["第一段技能Id", e.FirstSkillId]), false);
      }
    } else {
      return t.SectionCount - t.SectionRemaining == 1 || (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "多段技能必须从第一段技能开始", ["传入技能Id", i], ["段数", t.SectionCount - t.SectionRemaining]), false);
    }
  }
  StartMultiSkill(t, i = true) {
    if (i && !this.CanStartMultiSkill(t)) {
      return false;
    }
    i = t.SkillId;
    let e = this.MultiSkillInfoMap.get(i);
    t = t.SkillInfo.CooldownConfig;
    if (!e) {
      (e = new MultiSkillInfo()).FirstSkillId = i;
      this.MultiSkillInfoMap.set(i, e);
      this.MultiSkillInfos.push(e);
    }
    e.CurSkillId = i;
    e.NextSkillId = Number(t.NextSkillId);
    e.IsReset = t.IsReset;
    e.IsResetOnChangeRole = t.IsResetOnChangeRole;
    if (e.NextSkillId === 0) {
      this.Tzo(e);
    } else {
      e.StartTime = t.StartTime;
      e.MultiSkillStartStamp = Time_1.Time.FlowTime + t.StartTime * TimeUtil_1.TimeUtil.InverseMillisecond;
      e.StopTime = t.StopTime;
      e.MultiSkillStopStamp = Time_1.Time.FlowTime + t.StopTime * TimeUtil_1.TimeUtil.InverseMillisecond;
      this.MultiSkillInfoMap.set(e.NextSkillId, e);
      this.V5_(e);
      this.Tzo(e);
    }
    return true;
  }
  InitMultiSkillInfo(e) {
    for (var [s, l] of e) {
      l = l.SkillInfo;
      if (l && !l.CooldownConfig.SectionCount) {
        l = l.CooldownConfig;
        if (l.SectionCount - l.SectionRemaining == 1) {
          var r = new MultiSkillInfo();
          r.FirstSkillId = s;
          this.MultiSkillInfoMap.set(s, r);
          this.MultiSkillInfos.push(r);
          let t = Number(l.NextSkillId);
          let i = l.SectionCount - 1;
          while (i > 0) {
            i--;
            var h = e.get(t);
            if (!h) {
              break;
            }
            this.MultiSkillInfoMap.set(t, r);
            if (!(t = h?.SkillInfo?.CooldownConfig.NextSkillId ? Number(h?.SkillInfo?.CooldownConfig.NextSkillId) : 0)) {
              break;
            }
          }
        }
      }
    }
  }
  V5_(t) {
    if (this.MultiSkillStartTimer) {
      TimerSystem_1.FlowTimeTimerSystem.Remove(this.MultiSkillStartTimer);
    }
    if (this.MultiSkillStopTimer) {
      TimerSystem_1.FlowTimeTimerSystem.Remove(this.MultiSkillStopTimer);
    }
    if (t.StartTime > 0) {
      this.MultiSkillStartTimer = TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
        t.MultiSkillStartStamp = 0;
        this.Lzo(t);
        this.MultiSkillStartTimer = undefined;
      }, t.StartTime * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
    if (t.StopTime > 0) {
      this.MultiSkillStopTimer = TimerSystem_1.FlowTimeTimerSystem.Delay(() => {
        t.MultiSkillStopStamp = 0;
        t.NextSkillId = 0;
        this.Tzo(t);
        this.MultiSkillStopTimer = undefined;
      }, t.StopTime * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }
  j5_(t, i) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "提前结束多段技能", ["技能Id", t.CurSkillId], ["reason", i], ["entity", this.EntityId], ["vision", this.VisionEntityId]);
    }
    t.NextSkillId = 0;
    t.MultiSkillStartStamp = 0;
    t.MultiSkillStopStamp = 0;
    this.Tzo(t);
    if (this.MultiSkillStartTimer) {
      TimerSystem_1.FlowTimeTimerSystem.Remove(this.MultiSkillStartTimer);
      this.MultiSkillStartTimer = undefined;
    }
    if (this.MultiSkillStopTimer) {
      TimerSystem_1.FlowTimeTimerSystem.Remove(this.MultiSkillStopTimer);
      this.MultiSkillStopTimer = undefined;
    }
  }
  ResetMultiSkills(t, i = false) {
    var e = this.MultiSkillInfoMap.get(t);
    if (e && (e.IsReset || i) && e.NextSkillId && e.CurSkillId === t) {
      this.j5_(e, "多段技能被打断");
    }
  }
  ResetOnChangeRole() {
    for (const t of this.MultiSkillInfos) {
      if (t.IsResetOnChangeRole) {
        this.j5_(t, "换人时清理所有多段技能");
      }
    }
  }
  ClearAllSkill() {
    for (const t of this.MultiSkillInfos) {
      if (t.NextSkillId !== 0) {
        this.j5_(t, "清理所有多段技能");
      }
    }
  }
  GetNextMultiSkillId(t) {
    var i = this.MultiSkillInfoMap.get(t);
    if (i) {
      return i.NextSkillId || i.FirstSkillId;
    } else {
      return t;
    }
  }
  GetMultiSkillInfo(t) {
    return this.MultiSkillInfoMap.get(t);
  }
  Tzo(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "多段技能Id变化", ["当前技能Id", t.CurSkillId], ["下一段技能Id", t.NextSkillId]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMultiSkillIdChanged, this.EntityId, t, this.VisionEntityId);
  }
  Lzo(t) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "多段技能可用", ["当前技能Id", t.CurSkillId], ["下一段技能Id", t.NextSkillId]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMultiSkillEnable, this.EntityId, t, this.VisionEntityId);
  }
}
exports.MultiSkillData = MultiSkillData;
//# sourceMappingURL=MultiSkillData.js.map