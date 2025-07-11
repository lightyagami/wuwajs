"use strict";

var PawnTimeScaleComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, r) {
  var s;
  var o = arguments.length;
  var n = o < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(e, t, i, r);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (s = e[h]) {
        n = (o < 3 ? s(n) : o > 3 ? s(t, i, n) : s(t, i)) || n;
      }
    }
  }
  if (o > 3 && n) {
    Object.defineProperty(t, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PawnTimeScaleComponent = exports.ForeverTimeScale = exports.TimeScale = exports.getSourceGroup = exports.getSourceEffectGroup = undefined;
const puerts_1 = require("puerts");
const Time_1 = require("../../../../Core/Common/Time");
const PriorityQueue_1 = require("../../../../Core/Container/PriorityQueue");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const LIMIT_SCALE = 0;
const sourceEffectGroup = new Map([[1, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14]], [2, [15]]]);
function getSourceEffectGroup(e) {
  for (var [t, i] of sourceEffectGroup.entries()) {
    if (i.includes(e)) {
      return t;
    }
  }
  return 0;
}
exports.getSourceEffectGroup = getSourceEffectGroup;
const sourceTypeGroup = new Map([[1, [0, 1, 2, 3, 4, 6, 7, 8, 11, 12]], [2, [14]], [3, [15]], [4, [9, 10]], [5, [5]]]);
function getSourceGroup(e) {
  for (var [t, i] of sourceTypeGroup.entries()) {
    if (i.includes(e)) {
      return t;
    }
  }
  return 0;
}
exports.getSourceGroup = getSourceGroup;
class TimeScale {
  constructor(e, t, i, r, s, o, n, h, a, u = false) {
    this.StartTime = e;
    this.EndTime = t;
    this.Priority = i;
    this.TimeDilation = r;
    this.TimeCurveFloat = s;
    this.Duration = o;
    this.Id = n;
    this.SourceType = h;
    this.SourceTypeGroup = a;
    this.NeedAddSceneItemTag = u;
    this.MarkDelete = false;
    this.rrr = undefined;
    this.nrr = undefined;
    this.srr = undefined;
    this.arr = undefined;
  }
  hrr() {
    var e = (0, puerts_1.$ref)(0);
    var t = (0, puerts_1.$ref)(0);
    this.TimeCurveFloat.GetTimeRange(e, t);
    this.rrr = (0, puerts_1.$unref)(e);
    this.nrr = (0, puerts_1.$unref)(t);
  }
  get CurveTimeRangeMin() {
    if (this.rrr === undefined) {
      this.hrr();
    }
    return this.rrr ?? -Infinity;
  }
  get CurveTimeRangeMax() {
    if (this.nrr === undefined) {
      this.hrr();
    }
    return this.nrr ?? Infinity;
  }
  lrr() {
    var e = (0, puerts_1.$ref)(0);
    var t = (0, puerts_1.$ref)(0);
    this.TimeCurveFloat.GetValueRange(e, t);
    this.srr = (0, puerts_1.$unref)(e);
    this.arr = (0, puerts_1.$unref)(t);
  }
  get _rr() {
    if (this.srr === undefined) {
      this.lrr();
    }
    return this.srr ?? -Infinity;
  }
  get urr() {
    if (this.arr === undefined) {
      this.lrr();
    }
    return this.arr ?? Infinity;
  }
  CalculateTimeScale() {
    var e;
    var t;
    var i;
    if (this.TimeCurveFloat) {
      i = this.CurveTimeRangeMin;
      e = this.CurveTimeRangeMax;
      t = (Time_1.Time.WorldTimeSeconds - this.StartTime) / this.Duration;
      t = MathUtils_1.MathUtils.RangeClamp(t, 0, 1, i, e);
      i = this.TimeCurveFloat.GetFloatValue(t);
      return 1 - MathUtils_1.MathUtils.RangeClamp(i, this._rr, this.urr, 0, 1) * (1 - this.TimeDilation);
    } else {
      return this.TimeDilation;
    }
  }
}
exports.TimeScale = TimeScale;
class ForeverTimeScale {
  constructor(e, t, i, r, s) {
    this.Priority = e;
    this.TimeDilation = t;
    this.SourceType = i;
    this.SourceTypeGroup = r;
    this.Id = s;
    this.MarkDelete = false;
  }
  get EndTime() {
    return -1;
  }
}
exports.ForeverTimeScale = ForeverTimeScale;
let PawnTimeScaleComponent = PawnTimeScaleComponent_1 = class PawnTimeScaleComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.Xln = undefined;
    this.TimeScaleInternal = 1;
    this.DisableHandle = undefined;
    this.FreezeTimeScaleInternal = 1;
    this.Vhn = 1;
    this.TimeScaleList = new PriorityQueue_1.PriorityQueue(PawnTimeScaleComponent_1.CompareScalePriority);
    this.TimeScaleMap = new Map();
    this.Hhn = 1;
    this.ForeverTimeScaleList = new PriorityQueue_1.PriorityQueue(PawnTimeScaleComponent_1.CompareScalePriority);
    this.ForeverTimeScaleMap = new Map();
    this.PauseLocks = new Map();
    this.RemoveLockTimestamp = -1;
    this.DelayLocks = new Map();
  }
  static CompareScalePriority(e, t) {
    if (e.SourceTypeGroup !== t.SourceTypeGroup) {
      return t.SourceTypeGroup - e.SourceTypeGroup;
    } else if (e.Priority !== t.Priority) {
      return t.Priority - e.Priority;
    } else if (e.TimeDilation !== t.TimeDilation) {
      return e.TimeDilation - t.TimeDilation;
    } else {
      return t.EndTime - e.EndTime;
    }
  }
  OnInit() {
    this.TimeScaleList.Clear();
    this.TimeScaleMap.clear();
    this.ForeverTimeScaleList.Clear();
    this.ForeverTimeScaleMap.clear();
    this.Hhn = 1;
    return true;
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(1);
    this.Xln = this.Entity.GetComponent(61);
    var e = this.ActorComp.CreatureData.GetEntityPropertyConfig();
    this.Vhn = e.子弹受击顿帧时长比例 / 100;
    return true;
  }
  IsTimescaleValid(e, t) {
    return e.EndTime > t && !e.MarkDelete;
  }
  OnTick(e) {}
  SetTimeScale(e, t, i, r, s, o = false) {
    var n;
    var h;
    if (s === 2) {
      r *= this.Vhn;
    }
    if (r <= 0) {
      return -1;
    } else {
      n = (h = Time_1.Time.WorldTimeSeconds) + r;
      h = new TimeScale(h, n, e, Math.max(t, LIMIT_SCALE), i, r, this.Hhn++, s, getSourceGroup(s), o);
      this.TimeScaleList.Push(h);
      this.TimeScaleMap.set(h.Id, h);
      return h.Id;
    }
  }
  RemoveTimeScale(e) {
    e = this.TimeScaleMap.get(e);
    if (e) {
      e.MarkDelete = true;
    }
  }
  SetForeverTimeScale(e, t, i = 0, r = false) {
    var s = new ForeverTimeScale(i, t, e, getSourceGroup(e), this.Hhn++);
    this.ForeverTimeScaleList.Push(s);
    this.ForeverTimeScaleMap.set(s.Id, s);
    if (r) {
      this.OnTick(0);
    }
    EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnForeverTimeDilationAdd, e, t, i);
    return s.Id;
  }
  RemoveForeverTimeScale(e, t = false) {
    e = this.ForeverTimeScaleMap.get(e);
    if (e) {
      e.MarkDelete = true;
      if (t) {
        this.OnTick(0);
      }
      EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.OnForeverTimeDilationRemove, e.SourceType, e.TimeDilation, e.Priority);
    }
  }
  GetForeverTimeScale(e) {
    e = this.ForeverTimeScaleMap.get(e);
    if (e === undefined) {
      return 1;
    } else {
      return e.TimeDilation;
    }
  }
  SetTimeScaleTicking(e, t) {
    if (e && this.DisableHandle !== undefined) {
      if (this.Enable(this.DisableHandle, t ?? "[PawnTimeScaleComponent] 开启Tick")) {
        this.DisableHandle = undefined;
      }
    } else if (!e && this.DisableHandle === undefined) {
      this.DisableHandle = this.Disable(t ?? "[PawnTimeScaleComponent] 关闭Tick");
    }
  }
  get CurrentTimeScale() {
    return this.TimeScaleInternal;
  }
  get FreezeTimeScale() {
    return this.FreezeTimeScaleInternal;
  }
  AddPauseLock(e) {
    if (this.PauseLocks.has(e)) {
      this.RemovePauseLock(e);
    }
    let t = -1;
    if (!this.Xln?.IsImmuneTimeScaleEffect()) {
      t = this.SetTimeScale(Infinity, 0, undefined, Infinity, 9);
    }
    this.PauseLocks.set(e, t);
  }
  RemovePauseLock(e) {
    var t = this.PauseLocks.get(e);
    if (t !== undefined) {
      this.RemoveTimeScale(t);
    }
    this.PauseLocks.delete(e);
    this.RemoveLockTimestamp = Time_1.Time.NowSeconds;
  }
  ImmunePauseLock() {
    this.PauseLocks.forEach(e => {
      this.RemoveTimeScale(e);
    });
  }
  ResumePauseLock() {
    this.PauseLocks.forEach((e, t) => {
      var i = this.SetTimeScale(Infinity, 0, undefined, Infinity, 9);
      this.PauseLocks.set(t, i);
    });
  }
  HasPauseLock() {
    return this.PauseLocks.size > 0;
  }
  AddDelayLock(e) {
    if (this.DelayLocks.has(e)) {
      this.RemoveDelayLock(e);
    }
    var t = this.SetTimeScale(Infinity, 1, undefined, Infinity, 10);
    this.DelayLocks.set(e, t);
  }
  RemoveDelayLock(e) {
    var t = this.DelayLocks.get(e);
    if (t !== undefined) {
      this.RemoveTimeScale(t);
    }
    this.DelayLocks.delete(e);
  }
  GetTopForeverTimeScale(e) {
    while (!this.ForeverTimeScaleList.Empty) {
      var t = this.ForeverTimeScaleList.Top;
      if (!t) {
        return 1;
      }
      if (!t.MarkDelete) {
        if (e && getSourceEffectGroup(t.SourceType) !== e) {
          return 1;
        } else {
          return t.TimeDilation;
        }
      }
      this.ForeverTimeScaleMap.delete(t.Id);
      this.ForeverTimeScaleList.Pop();
    }
    return 1;
  }
  GetTopForeverTimeScaleConfig(e) {
    while (!this.ForeverTimeScaleList.Empty) {
      var t = this.ForeverTimeScaleList.Top;
      if (!t) {
        return;
      }
      if (!t.MarkDelete) {
        if (e && getSourceEffectGroup(t.SourceType) !== e) {
          return undefined;
        } else {
          return t;
        }
      }
      this.ForeverTimeScaleMap.delete(t.Id);
      this.ForeverTimeScaleList.Pop();
    }
  }
  GetDebugString() {
    let e = "";
    var t;
    if (this.ForeverTimeScaleList.Empty) {
      e += `没有生效的ForeverTimeScale
`;
    } else {
      if (t = this.GetTopForeverTimeScaleConfig(1)) {
        e += `	生效的LogicAndViewTimeScale: SourceType: ${t.SourceType}, TimeDilation: ${t.TimeDilation}
`;
      }
      if (t = this.GetTopForeverTimeScaleConfig(2)) {
        e += `	生效的ViewOnlyTimeScale: SourceType: ${t.SourceType}, TimeDilation: ${t.TimeDilation}
`;
      }
    }
    return e;
  }
};
PawnTimeScaleComponent = PawnTimeScaleComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(122)], PawnTimeScaleComponent);
exports.PawnTimeScaleComponent = PawnTimeScaleComponent; //# sourceMappingURL=PawnTimeScaleComponent.js.map