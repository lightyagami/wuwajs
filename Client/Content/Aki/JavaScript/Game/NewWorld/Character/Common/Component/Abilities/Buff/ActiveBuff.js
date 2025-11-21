"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActiveBuffInternal = undefined;
const Stats_1 = require("../../../../../../../Core/Common/Stats");
const Time_1 = require("../../../../../../../Core/Common/Time");
const CommonDefine_1 = require("../../../../../../../Core/Define/CommonDefine");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const AbilityUtils_1 = require("../AbilityUtils");
const CharacterAttributeTypes_1 = require("../CharacterAttributeTypes");
const ActiveBuffConfigs_1 = require("./ActiveBuffConfigs");
const MAX_POOL_COUNT = 100;
class ActiveBuffInternal {
  constructor(t) {
    this.TAe = t;
    this.tQo = ActiveBuffConfigs_1.INVALID_BUFF_HANDLE;
    this.PreMessageId = undefined;
    this.MessageId = -1n;
    this.iQo = "";
    this.oQo = undefined;
    this.f5l = true;
    this.InstigatorIdInternal = ActiveBuffConfigs_1.NULL_INSTIGATOR_ID;
    this.rQo = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID;
    this.BuffTimeScaleMap = new Map();
    this.BuffTimeScale = 1;
    this.DurationTimer = undefined;
    this.y6o = 1;
    this.nQo = Stats_1.Stat.Create("ActiveBuff.ResetDurationTimer");
    this.CB = 0;
    this.sQo = 0;
    this.j4l = 1;
    this.hQo = false;
    this.lQo = 0;
    this._Qo = 0;
    this.PeriodInternal = 0;
    this.uQo = undefined;
    this.cQo = Stats_1.Stat.Create("ActiveBuff.ResetPeriodTimer");
    this.mQo = false;
    this.StackCountInternal = 0;
    this.jGi = 0;
    this.dQo = [];
    this.StateModifiers = [];
  }
  static AllocBuff(...t) {
    let i = this.BuffPool.pop();
    (i = i || new ActiveBuffInternal(t[0])).AU(...t);
    return i;
  }
  static ReleaseBuff(t) {
    if (t.IsValid()) {
      t.Destroy();
    }
    if (t && this.BuffPool.length < MAX_POOL_COUNT) {
      this.BuffPool.push(t);
    }
  }
  AU(t, i, e, s, h, r, f, a, n, o, u) {
    this.TAe = t;
    this.tQo = i;
    this.InstigatorIdInternal = e ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID;
    this.oQo = s;
    this.iQo = s?.GetDebugName() ?? "unknown";
    this.f5l = u === Protocol_1.Aki.Protocol.uFs.Proto_Common && s.NeedCheck(t);
    this.rQo = h;
    this.MessageId = f ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId();
    this.PreMessageId = r;
    this.jGi = a;
    this.StackCountInternal = n;
    this.mQo = false;
    this.hQo = false;
    this.SetDuration(o);
    this.SetPeriod();
    if (this.IsInstantBuff()) {
      for (const l of this.Config.Modifiers) {
        var c = l.AttributeId;
        if (CharacterAttributeTypes_1.stateAttributeIds.has(c)) {
          this.g__(l);
        } else {
          this.p__(l);
        }
      }
    } else {
      this.ResetModifiers();
    }
    return this;
  }
  Destroy() {
    if (this.IsActive()) {
      const i = this.GetOwnerBuffComponent()?.GetExactEntity()?.CheckGetComponent(209);
      if (i?.Valid) {
        this.Config.GrantedTags?.forEach(t => {
          i.TagContainer.UpdateExactTag(2, t, -this.StackCount);
        });
      }
    }
    this.hQo = true;
    this.CQo();
    this.gQo();
    this.ClearModifiers();
    this.gHu();
    this.StackCountInternal = 0;
  }
  IsValid() {
    return !this.hQo && (this.GetOwnerBuffComponent()?.GetExactEntity()?.Valid ?? false);
  }
  get Config() {
    return this.TAe;
  }
  get Handle() {
    return this.tQo;
  }
  GetOwner() {
    return this.oQo?.Entity;
  }
  GetOwnerDebugName() {
    return this.iQo;
  }
  GetOwnerBuffComponent() {
    return this.oQo;
  }
  get InstigatorId() {
    return this.InstigatorIdInternal;
  }
  GetInstigator() {
    if (this.InstigatorId) {
      return ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.InstigatorId)?.Entity;
    } else {
      return undefined;
    }
  }
  GetInstigatorBuffComponent() {
    if (this.InstigatorId) {
      return ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.InstigatorId)?.Entity?.GetComponent(178);
    }
  }
  GetInstigatorActorComponent() {
    if (this.InstigatorId) {
      return ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.InstigatorId)?.Entity?.GetComponent(3);
    }
  }
  GetInstigatorAttributeSet() {
    if (this.InstigatorId) {
      return ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.InstigatorId)?.Entity?.GetComponent(177);
    }
  }
  GetOwnerAttributeSet() {
    return this.oQo?.GetEntity()?.GetComponent(177);
  }
  get Id() {
    return this.Config.Id ?? ActiveBuffConfigs_1.NULL_BUFF_ID;
  }
  get ServerId() {
    return this.rQo;
  }
  IsInstantBuff() {
    return this.Config.DurationPolicy === 0;
  }
  SetBuffTimeScale(t, i) {
    this.BuffTimeScaleMap.set(t, i);
    this.Obu();
  }
  RemoveBuffTimeScale(t) {
    if (this.BuffTimeScaleMap.has(t)) {
      this.BuffTimeScaleMap.delete(t);
      this.Obu();
    }
  }
  Obu() {
    let t = 1;
    for (const s of this.BuffTimeScaleMap.values()) {
      t *= s;
    }
    var i;
    var e;
    if (t !== this.BuffTimeScale) {
      this.BuffTimeScale = t;
      i = this.oQo?.GetTimeScale() ?? 1;
      e = this.oQo?.IsPaused() ?? false;
      this.OnTimeScaleChanged(i, e);
    }
  }
  gHu() {
    this.BuffTimeScale = 1;
    this.BuffTimeScaleMap.clear();
  }
  get Duration() {
    return this.y6o;
  }
  CQo() {
    if (this.DurationTimer !== undefined) {
      if (TimerSystem_1.TimerSystem.Has(this.DurationTimer)) {
        TimerSystem_1.TimerSystem.Remove(this.DurationTimer);
      }
      this.DurationTimer = undefined;
    }
  }
  fQo(t) {
    var i;
    this.CQo();
    if (!(this.y6o <= 0)) {
      this.sQo = t;
      this.CB = this.GetCurrentTime();
      if (this.f5l && this.j4l > 0) {
        t = this.sQo / this.j4l * CommonDefine_1.MILLIONSECOND_PER_SECOND;
        i = this.nQo;
        this.DurationTimer = t >= TimerSystem_1.MIN_TIME ? TimerSystem_1.TimerSystem.Delay(this.DurationCallback.bind(this), t, i, undefined, false) : TimerSystem_1.TimerSystem.Next(this.DurationCallback.bind(this), i);
      }
    }
  }
  GetCurrentTime() {
    return Time_1.Time.Now;
  }
  SetDuration(t = undefined) {
    var i;
    var e;
    var s;
    var h;
    var r = this.Config;
    let f = ActiveBuffConfigs_1.MIN_BUFF_PERIOD;
    f = r.DurationPolicy === 1 ? -1 : t !== undefined ? t : r.DurationMagnitude.length === 0 || r.DurationCalculationPolicy.length === 0 ? (CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "Buff 配置为hasDuration 但未配置DurationMagnitude或DurationCalculationPolicy, 强制将时间设为" + ActiveBuffConfigs_1.MIN_BUFF_PERIOD, ["BuffId", this.Id]), ActiveBuffConfigs_1.MIN_BUFF_PERIOD) : (t = AbilityUtils_1.AbilityUtils.GetLevelValue(this.Config.DurationMagnitude, this.Level, 0), i = this.oQo?.CalculateDurationRate(this.Id, this.GetInstigatorBuffComponent()) ?? 1, (e = r.DurationCalculationPolicy)?.[0] === 1 ? e.length < 4 ? (CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "Buff 配置为hasDuration 但未配置DurationMagnitude或DurationCalculationPolicy, 将被重设为" + ActiveBuffConfigs_1.MIN_BUFF_PERIOD, ["BuffId", this.Id], ["handle", this.Handle], ["持有者", this.oQo?.GetDebugName()], ["释放者", this.InstigatorId]), ActiveBuffConfigs_1.MIN_BUFF_PERIOD) : (r = AbilityUtils_1.AbilityUtils.GetLevelValue(r.DurationMagnitude2, this.Level, 0), [, e, h, s] = e, (h = h === 1 ? this.GetInstigatorAttributeSet() : this.GetOwnerAttributeSet()) ? (h = AbilityUtils_1.AbilityUtils.GetAttrValue(h, e, s), Math.max((h * t * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + r) * i, ActiveBuffConfigs_1.MIN_BUFF_PERIOD)) : (CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "Buff 找不到周期计算属性来源, 周期将被重设为" + ActiveBuffConfigs_1.MIN_BUFF_PERIOD, ["BuffId", this.Id], ["handle", this.Handle], ["持有者", this.oQo?.GetDebugName()], ["释放者", this.InstigatorId]), ActiveBuffConfigs_1.MIN_BUFF_PERIOD)) : t * i);
    this.y6o = f;
    this.fQo(f);
  }
  SetRemainDuration(t) {
    if (this.Config.DurationPolicy === 2) {
      this.fQo(t > 0 ? t : ActiveBuffConfigs_1.MIN_BUFF_PERIOD);
    }
  }
  GetRemainDuration() {
    if (!this.IsValid()) {
      return 0;
    }
    switch (this.Config?.DurationPolicy) {
      case 1:
        return ActiveBuffConfigs_1.INFINITY_DURATION;
      case 0:
        return 0;
      default:
        var t = (this.GetCurrentTime() - this.CB) * this.j4l / CommonDefine_1.MILLIONSECOND_PER_SECOND;
        if (this.y6o < 0) {
          return ActiveBuffConfigs_1.INFINITY_DURATION;
        } else {
          return Math.max(this.sQo - t, 0);
        }
    }
  }
  RefreshPeriodInternal() {
    var t;
    this.PeriodInternal = this.Config.Period;
    if (this.PeriodInternal > 0) {
      t = this.oQo?.CalculatePeriodRate(this.Id, this.GetInstigatorBuffComponent()) ?? 1;
      this.PeriodInternal *= t;
      if (this.Config.HasBuffPeriodExecution) {
        if (this.PeriodInternal < ActiveBuffConfigs_1.MIN_BUFF_EXECUTION_EFFECT_PERIOD) {
          CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), `目前限制带周期型额外效果的Buff周期最短为${ActiveBuffConfigs_1.MIN_BUFF_EXECUTION_EFFECT_PERIOD}，配置周期${this.PeriodInternal}，已强制修改周期`, ["BuffId", this.Id]);
          this.PeriodInternal = ActiveBuffConfigs_1.MIN_BUFF_EXECUTION_EFFECT_PERIOD;
        }
      } else if (this.PeriodInternal < ActiveBuffConfigs_1.MIN_BUFF_PERIOD) {
        CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), `目前限制Buff周期最短为${ActiveBuffConfigs_1.MIN_BUFF_PERIOD}，配置周期${this.PeriodInternal}，已强制修改周期`, ["BuffId", this.Id]);
        this.PeriodInternal = ActiveBuffConfigs_1.MIN_BUFF_PERIOD;
      }
    }
  }
  SetPeriod() {
    this.RefreshPeriodInternal();
    this.ResetPeriodTimer(this.PeriodInternal);
    return true;
  }
  get Period() {
    return this.PeriodInternal;
  }
  OnTimeScaleChanged(t, i) {
    var e;
    if (i) {
      t = 0;
    } else if (this.Config.DurationAffectedByBulletTime) {
      if (this.Config.EffectInfos.some(t => t.ExtraEffectId === 4 || t.ExtraEffectId === 5 || t.ExtraEffectId === 17)) {
        CombatLog_1.CombatLog.Warn("Buff", this.GetOwner(), "带额外效果4、5、17的buff不应受子弹顿帧影响", ["buffId", this.Id]);
        t = this.GetOwner()?.TimeDilation ?? 1;
      }
    } else {
      t = this.GetOwnerBuffComponent()?.GetLogicTimeScale() ?? 1;
    }
    if ((t *= this.BuffTimeScale) !== this.j4l && (i = this.GetCurrentTime(), e = this.j4l, this.j4l = t, this.y6o > 0 && (t = (i - this.CB) * e / CommonDefine_1.MILLIONSECOND_PER_SECOND, t = this.sQo - t, this.fQo(t)), this.PeriodInternal > 0)) {
      t = (i - this.lQo) * e / CommonDefine_1.MILLIONSECOND_PER_SECOND;
      i = this._Qo - t;
      this.ResetPeriodTimer(i);
    }
  }
  DurationCallback() {
    var t;
    if (this.IsValid() && (t = this.GetOwnerBuffComponent())) {
      t.RemoveBuffWhenTimeout(this);
    }
  }
  gQo() {
    if (this.uQo !== undefined) {
      if (TimerSystem_1.TimerSystem.Has(this.uQo)) {
        TimerSystem_1.TimerSystem.Remove(this.uQo);
      }
      this.uQo = undefined;
    }
  }
  ResetPeriodTimer(t) {
    var i;
    this.gQo();
    if (!(this.PeriodInternal <= 0)) {
      this._Qo = t;
      this.lQo = this.GetCurrentTime();
      if (this.j4l > 0) {
        t = this._Qo / this.j4l * CommonDefine_1.MILLIONSECOND_PER_SECOND;
        i = this.cQo;
        this.uQo = t >= TimerSystem_1.MIN_TIME ? TimerSystem_1.TimerSystem.Delay(this.pQo.bind(this), t, i, undefined, false) : TimerSystem_1.TimerSystem.Next(this.pQo.bind(this), i);
      }
    }
  }
  pQo() {
    if (this.IsValid()) {
      var t = this.PeriodInternal;
      var i = this.GetRemainPeriod();
      var e = Math.floor(1 - i / t);
      var i = (i % t + t) % t;
      this.RefreshPeriodInternal();
      if (this.IsActive()) {
        this.ResetPeriodTimer(i);
        var s = this.GetOwnerBuffComponent();
        for (let t = 0; t < e; t++) {
          s?.ApplyPeriodExecution(this);
        }
      } else {
        this.ResetPeriodTimer(i);
      }
    }
  }
  GetRemainPeriod() {
    var t = (this.GetCurrentTime() - this.lQo) * this.j4l;
    if (!(this.PeriodInternal < 0)) {
      return this._Qo - t / CommonDefine_1.MILLIONSECOND_PER_SECOND;
    }
  }
  IsActive() {
    return this.mQo;
  }
  SetActivate(t) {
    if (this.mQo === t) {
      return false;
    }
    this.mQo = t;
    const i = this.GetOwnerBuffComponent()?.GetExactEntity()?.CheckGetComponent(209);
    if (!i) {
      CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "buff更改激活状态时无法获取到持有者", ["handle", this.Handle], ["buffId", this.Id], ["持有者", this.oQo?.GetDebugName()]);
      return false;
    }
    if (t) {
      ActiveBuffInternal.f__.Start();
      this.ResetModifiers();
      this.Config.GrantedTags?.forEach(t => {
        if (GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t)) {
          i.TagContainer.UpdateExactTag(2, t, this.StackCount);
        }
      });
      if (this.PeriodInternal > 0) {
        switch (this.Config.PeriodicInhibitionPolicy) {
          case 2:
            this.ResetPeriodTimer(TimerSystem_1.MIN_TIME / CommonDefine_1.MILLIONSECOND_PER_SECOND);
            break;
          case 1:
            this.ResetPeriodTimer(this.PeriodInternal);
        }
      }
      ActiveBuffInternal.f__.Stop();
    } else {
      ActiveBuffInternal.v__.Start();
      this.ClearModifiers();
      this.Config.GrantedTags?.forEach(t => {
        if (GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t)) {
          i.TagContainer.UpdateExactTag(2, t, -this.StackCount);
        }
      });
      ActiveBuffInternal.v__.Stop();
    }
    return true;
  }
  get StackCount() {
    return this.StackCountInternal;
  }
  SetStackCount(i, t) {
    var e = this.Config;
    const s = this.StackCountInternal;
    this.StackCountInternal = i;
    const h = this.GetOwnerBuffComponent()?.GetExactEntity()?.CheckGetComponent(209);
    if (h) {
      if (t === 0 && e.StackPeriodResetPolicy === 0) {
        this.SetPeriod();
      }
      this.ResetModifiers();
      if (this.mQo) {
        e.GrantedTags?.forEach(t => {
          if (GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t)) {
            h.TagContainer.UpdateExactTag(2, t, i - s);
          }
        });
      }
    } else {
      CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "buff更改层数时无法获取到持有者", ["handle", this.Handle], ["buffId", this.Id], ["持有者", this.oQo?.GetDebugName()]);
    }
  }
  get Level() {
    return this.jGi;
  }
  ClearModifiers() {
    ActiveBuffInternal.y__.Start();
    this.StateModifiers.length = 0;
    var t = this.GetOwner()?.GetComponent(176);
    if (this.dQo.length > 0 && t) {
      for (const i of this.dQo) {
        t.RemoveModifier(i[0], i[1]);
      }
      this.dQo.length = 0;
    }
    ActiveBuffInternal.y__.Stop();
  }
  ResetModifiers() {
    ActiveBuffInternal.S__.Start();
    this.ClearModifiers();
    if (this.mQo) {
      for (const i of this.Config.Modifiers) {
        var t = i.AttributeId;
        if (CharacterAttributeTypes_1.stateAttributeIds.has(t)) {
          this.g__(i);
        } else {
          this.p__(i);
        }
      }
    }
    ActiveBuffInternal.S__.Stop();
  }
  g__(t) {
    ActiveBuffInternal.M__.Start();
    switch (t.CalculationPolicy[0]) {
      case 4:
      case 2:
      case 9:
        var [, i, e, s, h] = t.CalculationPolicy;
        var e = e === 1 ? this.GetInstigatorAttributeSet() : this.GetOwnerAttributeSet();
        if (h && !e) {
          CombatLog_1.CombatLog.Warn("Buff", this.GetOwner(), "buff找不到属性来源，快照将被取值为0", ["buffId", this.Id], ["handle", this.Handle], ["持有者", this.oQo?.GetDebugName()], ["施加者", this.InstigatorId]);
        }
        var h = h ? e ? AbilityUtils_1.AbilityUtils.GetAttrValue(e, i, s) : 0 : undefined;
        this.StateModifiers.push([t, h]);
        break;
      default:
        this.StateModifiers.push([t, undefined]);
    }
    ActiveBuffInternal.M__.Stop();
  }
  p__(i) {
    ActiveBuffInternal.E__.Start();
    var e = this.StackCountInternal ?? 1;
    var s = this.GetOwner()?.GetComponent(176);
    if (s) {
      let t = 0;
      var h = i.AttributeId;
      var r = AbilityUtils_1.AbilityUtils.GetLevelValue(i.Value1, this.jGi, 0);
      var f = AbilityUtils_1.AbilityUtils.GetLevelValue(i.Value2, this.jGi, 0);
      switch (i.CalculationPolicy[0]) {
        case 0:
        case 1:
        case 3:
          t = s.AddModifier(h, {
            Type: i.CalculationPolicy[0],
            Value1: r * e
          });
          break;
        case 2:
        case 4:
        case 9:
          var [a, n, o, u, c, l, _, v] = i.CalculationPolicy;
          var A = o === 1 ? this.GetInstigatorAttributeSet() : this.GetOwnerAttributeSet();
          var o = o === 1 ? this.InstigatorId : 0;
          if (!A || o === undefined) {
            CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "持续型buff设置属性modifier时缺少来源", ["buffId", this.Id], ["handle", this.Handle], ["持有者", this.oQo?.GetDebugName()], ["施加者", this.InstigatorId], ["attrId", h]);
            ActiveBuffInternal.E__.Stop();
            return;
          }
          t = s.AddModifier(h, {
            Type: a,
            Value1: r * e,
            Value2: f * e,
            SourceEntity: o,
            SourceAttributeId: n,
            SourceCalculationType: u,
            SnapshotSource: c ? AbilityUtils_1.AbilityUtils.GetAttrValue(A, n, u) : undefined,
            Min: l,
            Ratio: _,
            Max: v
          });
          break;
        case 5:
        case 6:
          CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "不能对非状态属性使用时间膨胀类属性修改", ["buffId", this.Id]);
      }
      this.dQo.push([h, t]);
    } else {
      CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "buff设置属性modifier时无法获取到属性组件", ["buffId", this.Id]);
    }
    ActiveBuffInternal.E__.Stop();
  }
  static ModifyStateAttribute(t, e, i, s, h, r, f) {
    ActiveBuffInternal.I__.Start();
    var a = i.AttributeId;
    if (CharacterAttributeTypes_1.stateAttributeIds.has(a)) {
      var n = AbilityUtils_1.AbilityUtils.GetLevelValue(i.Value1, s, 0);
      var o = AbilityUtils_1.AbilityUtils.GetLevelValue(i.Value2, s, 0);
      switch (i.CalculationPolicy[0]) {
        case 0:
          e.AddBaseValue(a, n * r);
          ActiveBuffInternal.I__.Stop();
          return;
        case 1:
          var u = e.GetBaseValue(a);
          var c = n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * r + 1;
          e.SetBaseValue(a, u * c);
          ActiveBuffInternal.I__.Stop();
          return;
        case 2:
        case 4:
        case 9:
          var [u, c, l, _,, v, A, B] = i.CalculationPolicy;
          var l = l === 1 ? t : e;
          if (l) {
            let i = f ?? AbilityUtils_1.AbilityUtils.GetAttrValue(l, c, _);
            if (!v || !((i -= v) <= 0)) {
              if (A) {
                i /= A;
              }
              if (u === 9) {
                l = e.GetBaseValue(a);
                e.AddBaseValue(a, n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * l * r);
              } else {
                let t = n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * i + o;
                if (B && t > B) {
                  t = B;
                }
                if (u === 2) {
                  e.AddBaseValue(a, t * r);
                } else {
                  e.SetBaseValue(a, t);
                }
              }
            }
          } else {
            CombatLog_1.CombatLog.Error("Buff", e.Entity, "瞬间/周期buff属性修改时缺少来源", ["attrId", a]);
          }
          ActiveBuffInternal.I__.Stop();
          return;
        case 3:
          e.SetBaseValue(a, n);
          ActiveBuffInternal.I__.Stop();
          return;
        case 5:
          e.AddBaseValue(a, n * h * r);
          ActiveBuffInternal.I__.Stop();
          return;
        case 6:
          var [, c] = i.CalculationPolicy;
          var _ = f ?? AbilityUtils_1.AbilityUtils.GetAttrValue(e, c, 0);
          e.AddBaseValue(a, (n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * _ + o) * h * r);
      }
    }
    ActiveBuffInternal.I__.Stop();
  }
}
(exports.ActiveBuffInternal = ActiveBuffInternal).BuffPool = [];
ActiveBuffInternal.f__ = Stats_1.Stat.Create("ActiveBuffInternal.SetActivate_Enable");
ActiveBuffInternal.v__ = Stats_1.Stat.Create("ActiveBuffInternal.SetActivate_Disable");
ActiveBuffInternal.y__ = Stats_1.Stat.Create("ActiveBuffInternal.ClearModifiers");
ActiveBuffInternal.S__ = Stats_1.Stat.Create("ActiveBuffInternal.ResetModifiers");
ActiveBuffInternal.M__ = Stats_1.Stat.Create("ActiveBuffInternal.SetStateModifier");
ActiveBuffInternal.E__ = Stats_1.Stat.Create("ActiveBuffInternal.SetNonStateModifier");
ActiveBuffInternal.I__ = Stats_1.Stat.Create("ActiveBuffInternal.ModifyStateAttribute"); //# sourceMappingURL=ActiveBuff.js.map