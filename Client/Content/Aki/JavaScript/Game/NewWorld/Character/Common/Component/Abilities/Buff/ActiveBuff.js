"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ActiveBuffInternal = void 0;
const Stats_1 = require("../../../../../../../Core/Common/Stats"),
  Time_1 = require("../../../../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  GameplayTagUtils_1 = require("../../../../../../../Core/Utils/GameplayTagUtils"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  AbilityUtils_1 = require("../AbilityUtils"),
  CharacterAttributeTypes_1 = require("../CharacterAttributeTypes"),
  ActiveBuffConfigs_1 = require("./ActiveBuffConfigs"),
  MAX_POOL_COUNT = 100;
class ActiveBuffInternal {
  constructor(t) {
    this.TAe = t, this.tQo = ActiveBuffConfigs_1.INVALID_BUFF_HANDLE, this.PreMessageId = void 0, this.MessageId = -1n, this.iQo = "", this.oQo = void 0, this.f5l = !0, this.InstigatorIdInternal = ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, this.rQo = ActiveBuffConfigs_1.DEFAULT_GE_SERVER_ID, this.BuffTimeScaleMap = new Map, this.BuffTimeScale = 1, this.DurationTimer = void 0, this.y6o = 1, this.nQo = Stats_1.Stat.Create("ActiveBuff.ResetDurationTimer"), this.CB = 0, this.sQo = 0, this.j4l = 1, this.hQo = !1, this.lQo = 0, this._Qo = 0, this.PeriodInternal = 0, this.uQo = void 0, this.cQo = Stats_1.Stat.Create("ActiveBuff.ResetPeriodTimer"), this.mQo = !1, this.StackCountInternal = 0, this.jGi = 0, this.dQo = [], this.StateModifiers = []
  }
  static AllocBuff(...t) {
    let i = this.BuffPool.pop();
    return (i = i || new ActiveBuffInternal(t[0])).AU(...t), i
  }
  static ReleaseBuff(t) {
    t.IsValid() && t.Destroy(), t && this.BuffPool.length < MAX_POOL_COUNT && this.BuffPool.push(t)
  }
  AU(t, i, e, s, h, r, f, a, n, o, u) {
    if (this.TAe = t, this.tQo = i, this.InstigatorIdInternal = e ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID, this.oQo = s, this.iQo = s?.GetDebugName() ?? "unknown", this.f5l = u === Protocol_1.Aki.Protocol.uFs.Proto_Common && s.NeedCheck(t), this.rQo = h, this.MessageId = f ?? ModelManager_1.ModelManager.CombatMessageModel.GenMessageId(), this.PreMessageId = r, this.jGi = a, this.StackCountInternal = n, this.mQo = !1, this.hQo = !1, this.SetDuration(o), this.SetPeriod(), this.IsInstantBuff())
      for (const l of this.Config.Modifiers) {
        var c = l.AttributeId;
        CharacterAttributeTypes_1.stateAttributeIds.has(c) ? this.g__(l) : this.p__(l)
      } else this.ResetModifiers();
    return this
  }
  Destroy() {
    if (this.IsActive()) {
      const i = this.GetOwnerBuffComponent()?.GetExactEntity()?.CheckGetComponent(205);
      i?.Valid && this.Config.GrantedTags?.forEach(t => {
        i.TagContainer.UpdateExactTag(2, t, -this.StackCount)
      })
    }
    this.hQo = !0, this.CQo(), this.gQo(), this.ClearModifiers(), this.StackCountInternal = 0
  }
  IsValid() {
    return !this.hQo && (this.GetOwnerBuffComponent()?.GetExactEntity()?.Valid ?? !1)
  }
  get Config() {
    return this.TAe
  }
  get Handle() {
    return this.tQo
  }
  GetOwner() {
    return this.oQo?.Entity
  }
  GetOwnerDebugName() {
    return this.iQo
  }
  GetOwnerBuffComponent() {
    return this.oQo
  }
  get InstigatorId() {
    return this.InstigatorIdInternal
  }
  GetInstigator() {
    return this.InstigatorId ? ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.InstigatorId)?.Entity : void 0
  }
  GetInstigatorBuffComponent() {
    if (this.InstigatorId) return ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.InstigatorId)?.Entity?.GetComponent(174)
  }
  GetInstigatorActorComponent() {
    if (this.InstigatorId) return ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.InstigatorId)?.Entity?.GetComponent(3)
  }
  GetInstigatorAttributeSet() {
    if (this.InstigatorId) return ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.InstigatorId)?.Entity?.GetComponent(173)
  }
  GetOwnerAttributeSet() {
    return this.oQo?.GetEntity()?.GetComponent(173)
  }
  get Id() {
    return this.Config.Id ?? ActiveBuffConfigs_1.NULL_BUFF_ID
  }
  get ServerId() {
    return this.rQo
  }
  IsInstantBuff() {
    return 0 === this.Config.DurationPolicy
  }
  SetBuffTimeScale(t, i) {
    this.BuffTimeScaleMap.set(t, i), this.rdu()
  }
  RemoveBuffTimeScale(t) {
    this.BuffTimeScaleMap.has(t) && (this.BuffTimeScaleMap.delete(t), this.rdu())
  }
  rdu() {
    let t = 1;
    for (const s of this.BuffTimeScaleMap.values()) t *= s;
    var i, e;
    t !== this.BuffTimeScale && (this.BuffTimeScale = t, i = this.oQo?.GetTimeScale() ?? 1, e = this.oQo?.IsPaused() ?? !1, this.OnTimeScaleChanged(i, e))
  }
  get Duration() {
    return this.y6o
  }
  CQo() {
    void 0 !== this.DurationTimer && (TimerSystem_1.TimerSystem.Has(this.DurationTimer) && TimerSystem_1.TimerSystem.Remove(this.DurationTimer), this.DurationTimer = void 0)
  }
  fQo(t) {
    var i;
    this.CQo(), this.y6o <= 0 || (this.sQo = t, this.CB = this.GetCurrentTime(), this.f5l && 0 < this.j4l && (t = this.sQo / this.j4l * CommonDefine_1.MILLIONSECOND_PER_SECOND, i = this.nQo, this.DurationTimer = t >= TimerSystem_1.MIN_TIME ? TimerSystem_1.TimerSystem.Delay(this.DurationCallback.bind(this), t, i, void 0, !1) : TimerSystem_1.TimerSystem.Next(this.DurationCallback.bind(this), i)))
  }
  GetCurrentTime() {
    return Time_1.Time.Now
  }
  SetDuration(t = void 0) {
    var i, e, s, h, r = this.Config;
    let f = ActiveBuffConfigs_1.MIN_BUFF_PERIOD;
    f = 1 === r.DurationPolicy ? -1 : void 0 !== t ? t : 0 === r.DurationMagnitude.length || 0 === r.DurationCalculationPolicy.length ? (CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "Buff 配置为hasDuration 但未配置DurationMagnitude或DurationCalculationPolicy, 强制将时间设为" + ActiveBuffConfigs_1.MIN_BUFF_PERIOD, ["BuffId", this.Id]), ActiveBuffConfigs_1.MIN_BUFF_PERIOD) : (t = AbilityUtils_1.AbilityUtils.GetLevelValue(this.Config.DurationMagnitude, this.Level, 0), i = this.oQo?.CalculateDurationRate(this.Id, this.GetInstigatorBuffComponent()) ?? 1, 1 === (e = r.DurationCalculationPolicy)?.[0] ? e.length < 4 ? (CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "Buff 配置为hasDuration 但未配置DurationMagnitude或DurationCalculationPolicy, 将被重设为" + ActiveBuffConfigs_1.MIN_BUFF_PERIOD, ["BuffId", this.Id], ["handle", this.Handle], ["持有者", this.oQo?.GetDebugName()], ["释放者", this.InstigatorId]), ActiveBuffConfigs_1.MIN_BUFF_PERIOD) : (r = AbilityUtils_1.AbilityUtils.GetLevelValue(r.DurationMagnitude2, this.Level, 0), [, e, h, s] = e, (h = 1 === h ? this.GetInstigatorAttributeSet() : this.GetOwnerAttributeSet()) ? (h = AbilityUtils_1.AbilityUtils.GetAttrValue(h, e, s), Math.max((h * t * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND + r) * i, ActiveBuffConfigs_1.MIN_BUFF_PERIOD)) : (CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "Buff 找不到周期计算属性来源, 周期将被重设为" + ActiveBuffConfigs_1.MIN_BUFF_PERIOD, ["BuffId", this.Id], ["handle", this.Handle], ["持有者", this.oQo?.GetDebugName()], ["释放者", this.InstigatorId]), ActiveBuffConfigs_1.MIN_BUFF_PERIOD)) : t * i), this.y6o = f, this.fQo(f)
  }
  SetRemainDuration(t) {
    2 === this.Config.DurationPolicy && this.fQo(0 < t ? t : ActiveBuffConfigs_1.MIN_BUFF_PERIOD)
  }
  GetRemainDuration() {
    if (!this.IsValid()) return 0;
    switch (this.Config?.DurationPolicy) {
      case 1:
        return ActiveBuffConfigs_1.INFINITY_DURATION;
      case 0:
        return 0;
      default:
        var t = (this.GetCurrentTime() - this.CB) * this.j4l / CommonDefine_1.MILLIONSECOND_PER_SECOND;
        return this.y6o < 0 ? ActiveBuffConfigs_1.INFINITY_DURATION : Math.max(this.sQo - t, 0)
    }
  }
  RefreshPeriodInternal() {
    var t;
    this.PeriodInternal = this.Config.Period, 0 < this.PeriodInternal && (t = this.oQo?.CalculatePeriodRate(this.Id, this.GetInstigatorBuffComponent()) ?? 1, this.PeriodInternal *= t, this.Config.HasBuffPeriodExecution ? this.PeriodInternal < ActiveBuffConfigs_1.MIN_BUFF_EXECUTION_EFFECT_PERIOD && (CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), `目前限制带周期型额外效果的Buff周期最短为${ActiveBuffConfigs_1.MIN_BUFF_EXECUTION_EFFECT_PERIOD}，配置周期${this.PeriodInternal}，已强制修改周期`, ["BuffId", this.Id]), this.PeriodInternal = ActiveBuffConfigs_1.MIN_BUFF_EXECUTION_EFFECT_PERIOD) : this.PeriodInternal < ActiveBuffConfigs_1.MIN_BUFF_PERIOD && (CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), `目前限制Buff周期最短为${ActiveBuffConfigs_1.MIN_BUFF_PERIOD}，配置周期${this.PeriodInternal}，已强制修改周期`, ["BuffId", this.Id]), this.PeriodInternal = ActiveBuffConfigs_1.MIN_BUFF_PERIOD))
  }
  SetPeriod() {
    return this.RefreshPeriodInternal(), this.ResetPeriodTimer(this.PeriodInternal), !0
  }
  get Period() {
    return this.PeriodInternal
  }
  OnTimeScaleChanged(t, i) {
    var e;
    i ? t = 0 : this.Config.DurationAffectedByBulletTime ? this.Config.EffectInfos.some(t => 4 === t.ExtraEffectId || 5 === t.ExtraEffectId || 17 === t.ExtraEffectId) && (CombatLog_1.CombatLog.Warn("Buff", this.GetOwner(), "带额外效果4、5、17的buff不应受子弹顿帧影响", ["buffId", this.Id]), t = this.GetOwner()?.TimeDilation ?? 1) : t = this.GetOwner()?.TimeDilation ?? 1, (t *= this.BuffTimeScale) !== this.j4l && (i = this.GetCurrentTime(), e = this.j4l, this.j4l = t, 0 < this.y6o && (t = (i - this.CB) * e / CommonDefine_1.MILLIONSECOND_PER_SECOND, t = this.sQo - t, this.fQo(t)), 0 < this.PeriodInternal) && (t = (i - this.lQo) * e / CommonDefine_1.MILLIONSECOND_PER_SECOND, i = this._Qo - t, this.ResetPeriodTimer(i))
  }
  DurationCallback() {
    var t;
    this.IsValid() && (t = this.GetOwnerBuffComponent()) && t.RemoveBuffWhenTimeout(this)
  }
  gQo() {
    void 0 !== this.uQo && (TimerSystem_1.TimerSystem.Has(this.uQo) && TimerSystem_1.TimerSystem.Remove(this.uQo), this.uQo = void 0)
  }
  ResetPeriodTimer(t) {
    var i;
    this.gQo(), this.PeriodInternal <= 0 || (this._Qo = t, this.lQo = this.GetCurrentTime(), 0 < this.j4l && (t = this._Qo / this.j4l * CommonDefine_1.MILLIONSECOND_PER_SECOND, i = this.cQo, this.uQo = t >= TimerSystem_1.MIN_TIME ? TimerSystem_1.TimerSystem.Delay(this.pQo.bind(this), t, i, void 0, !1) : TimerSystem_1.TimerSystem.Next(this.pQo.bind(this), i)))
  }
  pQo() {
    if (this.IsValid()) {
      var t = this.PeriodInternal,
        i = this.GetRemainPeriod(),
        e = Math.floor(1 - i / t),
        i = (i % t + t) % t;
      if (this.RefreshPeriodInternal(), this.IsActive()) {
        this.ResetPeriodTimer(i);
        var s = this.GetOwnerBuffComponent();
        for (let t = 0; t < e; t++) s?.ApplyPeriodExecution(this)
      } else this.ResetPeriodTimer(i)
    }
  }
  GetRemainPeriod() {
    var t = (this.GetCurrentTime() - this.lQo) * this.j4l;
    if (!(this.PeriodInternal < 0)) return this._Qo - t / CommonDefine_1.MILLIONSECOND_PER_SECOND
  }
  IsActive() {
    return this.mQo
  }
  SetActivate(t) {
    if (this.mQo === t) return !1;
    this.mQo = t;
    const i = this.GetOwnerBuffComponent()?.GetExactEntity()?.CheckGetComponent(205);
    if (!i) return CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "buff更改激活状态时无法获取到持有者", ["handle", this.Handle], ["buffId", this.Id], ["持有者", this.oQo?.GetDebugName()]), !1;
    if (t) {
      if (ActiveBuffInternal.f__.Start(), this.ResetModifiers(), this.Config.GrantedTags?.forEach(t => {
          GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t) && i.TagContainer.UpdateExactTag(2, t, this.StackCount)
        }), 0 < this.PeriodInternal) switch (this.Config.PeriodicInhibitionPolicy) {
        case 2:
          this.ResetPeriodTimer(TimerSystem_1.MIN_TIME / CommonDefine_1.MILLIONSECOND_PER_SECOND);
          break;
        case 1:
          this.ResetPeriodTimer(this.PeriodInternal)
      }
      ActiveBuffInternal.f__.Stop()
    } else ActiveBuffInternal.v__.Start(), this.ClearModifiers(), this.Config.GrantedTags?.forEach(t => {
      GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t) && i.TagContainer.UpdateExactTag(2, t, -this.StackCount)
    }), ActiveBuffInternal.v__.Stop();
    return !0
  }
  get StackCount() {
    return this.StackCountInternal
  }
  SetStackCount(i, t) {
    var e = this.Config;
    const s = this.StackCountInternal,
      h = (this.StackCountInternal = i, this.GetOwnerBuffComponent()?.GetExactEntity()?.CheckGetComponent(205));
    h ? (0 === t && 0 === e.StackPeriodResetPolicy && this.SetPeriod(), this.ResetModifiers(), e.GrantedTags?.forEach(t => {
      GameplayTagUtils_1.GameplayTagUtils.GetGameplayTagById(t) && h.TagContainer.UpdateExactTag(2, t, i - s)
    })) : CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "buff更改层数时无法获取到持有者", ["handle", this.Handle], ["buffId", this.Id], ["持有者", this.oQo?.GetDebugName()])
  }
  get Level() {
    return this.jGi
  }
  ClearModifiers() {
    ActiveBuffInternal.y__.Start(), this.StateModifiers.length = 0;
    var t = this.GetOwner()?.GetComponent(172);
    if (0 < this.dQo.length && t) {
      for (const i of this.dQo) t.RemoveModifier(i[0], i[1]);
      this.dQo.length = 0
    }
    ActiveBuffInternal.y__.Stop()
  }
  ResetModifiers() {
    if (ActiveBuffInternal.S__.Start(), this.ClearModifiers(), this.mQo)
      for (const i of this.Config.Modifiers) {
        var t = i.AttributeId;
        CharacterAttributeTypes_1.stateAttributeIds.has(t) ? this.g__(i) : this.p__(i)
      }
    ActiveBuffInternal.S__.Stop()
  }
  g__(t) {
    switch (ActiveBuffInternal.M__.Start(), t.CalculationPolicy[0]) {
      case 4:
      case 2:
      case 9:
        var [, i, e, s, h] = t.CalculationPolicy, e = 1 === e ? this.GetInstigatorAttributeSet() : this.GetOwnerAttributeSet(), h = (h && !e && CombatLog_1.CombatLog.Warn("Buff", this.GetOwner(), "buff找不到属性来源，快照将被取值为0", ["buffId", this.Id], ["handle", this.Handle], ["持有者", this.oQo?.GetDebugName()], ["施加者", this.InstigatorId]), h ? e ? AbilityUtils_1.AbilityUtils.GetAttrValue(e, i, s) : 0 : void 0);
        this.StateModifiers.push([t, h]);
        break;
      default:
        this.StateModifiers.push([t, void 0])
    }
    ActiveBuffInternal.M__.Stop()
  }
  p__(i) {
    ActiveBuffInternal.E__.Start();
    var e = this.StackCountInternal ?? 1,
      s = this.GetOwner()?.GetComponent(172);
    if (s) {
      let t = 0;
      var h = i.AttributeId,
        r = AbilityUtils_1.AbilityUtils.GetLevelValue(i.Value1, this.jGi, 0),
        f = AbilityUtils_1.AbilityUtils.GetLevelValue(i.Value2, this.jGi, 0);
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
          var [a, n, o, u, c, l, v, _] = i.CalculationPolicy, A = 1 === o ? this.GetInstigatorAttributeSet() : this.GetOwnerAttributeSet(), o = 1 === o ? this.InstigatorId : 0;
          if (!A || void 0 === o) return CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "持续型buff设置属性modifier时缺少来源", ["buffId", this.Id], ["handle", this.Handle], ["持有者", this.oQo?.GetDebugName()], ["施加者", this.InstigatorId], ["attrId", h]), void ActiveBuffInternal.E__.Stop();
          t = s.AddModifier(h, {
            Type: a,
            Value1: r * e,
            Value2: f * e,
            SourceEntity: o,
            SourceAttributeId: n,
            SourceCalculationType: u,
            SnapshotSource: c ? AbilityUtils_1.AbilityUtils.GetAttrValue(A, n, u) : void 0,
            Min: l,
            Ratio: v,
            Max: _
          });
          break;
        case 5:
        case 6:
          CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "不能对非状态属性使用时间膨胀类属性修改", ["buffId", this.Id])
      }
      this.dQo.push([h, t])
    } else CombatLog_1.CombatLog.Error("Buff", this.GetOwner(), "buff设置属性modifier时无法获取到属性组件", ["buffId", this.Id]);
    ActiveBuffInternal.E__.Stop()
  }
  static ModifyStateAttribute(t, e, i, s, h, r, f) {
    ActiveBuffInternal.I__.Start();
    var a = i.AttributeId;
    if (CharacterAttributeTypes_1.stateAttributeIds.has(a)) {
      var n = AbilityUtils_1.AbilityUtils.GetLevelValue(i.Value1, s, 0),
        o = AbilityUtils_1.AbilityUtils.GetLevelValue(i.Value2, s, 0);
      switch (i.CalculationPolicy[0]) {
        case 0:
          return e.AddBaseValue(a, n * r), void ActiveBuffInternal.I__.Stop();
        case 1:
          var u = e.GetBaseValue(a),
            c = n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * r + 1;
          return e.SetBaseValue(a, u * c), void ActiveBuffInternal.I__.Stop();
        case 2:
        case 4:
        case 9:
          var [u, c, l, v, , _, A, B] = i.CalculationPolicy, l = 1 === l ? t : e;
          if (l) {
            let i = f ?? AbilityUtils_1.AbilityUtils.GetAttrValue(l, c, v);
            if (!(_ && (i -= _) <= 0))
              if (A && (i /= A), 9 === u) l = e.GetBaseValue(a), e.AddBaseValue(a, n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * i * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * l * r);
              else {
                let t = n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * i + o;
                B && t > B && (t = B), 2 === u ? e.AddBaseValue(a, t * r) : e.SetBaseValue(a, t)
              }
          } else CombatLog_1.CombatLog.Error("Buff", e.Entity, "瞬间/周期buff属性修改时缺少来源", ["attrId", a]);
          return void ActiveBuffInternal.I__.Stop();
        case 3:
          return e.SetBaseValue(a, n), void ActiveBuffInternal.I__.Stop();
        case 5:
          return e.AddBaseValue(a, n * h * r), void ActiveBuffInternal.I__.Stop();
        case 6:
          var [, c] = i.CalculationPolicy, v = f ?? AbilityUtils_1.AbilityUtils.GetAttrValue(e, c, 0);
          e.AddBaseValue(a, (n * CharacterAttributeTypes_1.DIVIDED_TEN_THOUSAND * v + o) * h * r)
      }
    }
    ActiveBuffInternal.I__.Stop()
  }
}(exports.ActiveBuffInternal = ActiveBuffInternal).BuffPool = [], ActiveBuffInternal.f__ = Stats_1.Stat.Create("ActiveBuffInternal.SetActivate_Enable"), ActiveBuffInternal.v__ = Stats_1.Stat.Create("ActiveBuffInternal.SetActivate_Disable"), ActiveBuffInternal.y__ = Stats_1.Stat.Create("ActiveBuffInternal.ClearModifiers"), ActiveBuffInternal.S__ = Stats_1.Stat.Create("ActiveBuffInternal.ResetModifiers"), ActiveBuffInternal.M__ = Stats_1.Stat.Create("ActiveBuffInternal.SetStateModifier"), ActiveBuffInternal.E__ = Stats_1.Stat.Create("ActiveBuffInternal.SetNonStateModifier"), ActiveBuffInternal.I__ = Stats_1.Stat.Create("ActiveBuffInternal.ModifyStateAttribute");
//# sourceMappingURL=ActiveBuff.js.map