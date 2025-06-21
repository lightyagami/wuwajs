"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SpecialSkillXiaKong = exports.SpecialSkillXiaKongSummoned = void 0;
const Log_1 = require("../../../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../../../Global"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil"),
  CombatLog_1 = require("../../../../../../Utils/CombatLog"),
  CharacterAttributeTypes_1 = require("../../Abilities/CharacterAttributeTypes"),
  SpecialSkillBase_1 = require("./SpecialSkillBase"),
  CHECK_DISTANCE_INTERVAL = 1e3,
  MAX_DISTANCE_SQUARED = 9e8,
  ULTRA_SKILL_ID = 1407200,
  ULTRA_SECOND_SKILL_ID = 1407201,
  LOOP_SKILL_ID = 1407004,
  LOOP_START_TIME = 4,
  LOOP_END_TIME = 22.333334,
  CIRCLE_NUM = 2,
  MAX_ATRR_VALUE = 3e4,
  SUCC_MAX_ATTR_VALUE = 3e4,
  SUCC_MIN_ATTR_VALUE = 48e4 / 21,
  SUCC_BACKSTAGE_ATRR_VALUE = 25e3,
  CIRCLE_SPEED_INIT = 3e4 / 2100,
  FRIST_CIRCLE_TIME = 2332,
  SECOND_CIRCLE_TIME = 1332,
  CIRCLE_INTERVAL = 23285.7,
  ULTRA_SKILL_TOTAL_TIME = 34e3,
  INPUT_START_TIME = 3664;
class SpecialSkillXiaKongSummoned {
  constructor() {
    this.EntityHandle = void 0, this.AnimComp = void 0, this.kiu = () => {
      this.EntityHandle?.Valid && this.AnimComp?.StartForceDisableAnimOptimization(4, !1)
    }, this.Oiu = () => {
      this.EntityHandle?.Valid && this.AnimComp?.CancelForceDisableAnimOptimization(4)
    }, this.zpe = () => {
      this.Destroy()
    }
  }
  Init(t) {
    t?.Valid && void 0 !== t.Entity && (this.EntityHandle = t, this.AnimComp = t.Entity.GetComponent(177), EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.kiu), EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.OnSkillEnd, this.Oiu), EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe))
  }
  Destroy() {
    this.EntityHandle?.Entity && (EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.kiu), EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.OnSkillEnd, this.Oiu), EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe)), this.EntityHandle = void 0, this.AnimComp = void 0
  }
}
exports.SpecialSkillXiaKongSummoned = SpecialSkillXiaKongSummoned;
class SpecialSkillXiaKong extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments), this.Jh = void 0, this.E0 = 0, this.Wpo = 0, this.TSo = void 0, this.a1c = void 0, this.Xte = void 0, this.Wwc = void 0, this.m1t = void 0, this.h1c = void 0, this.l1c = !1, this._1c = 0, this.YP1 = void 0, this.zP1 = void 0, this.RB1 = [], this.PG1 = [], this.wca = [], this.j3 = void 0, this.Ak1 = !1, this.IC1 = [], this.Qwc = 0, this.Bwc = 0, this.Xwc = [], this.Ywc = 0, this.zwc = !0, this.Jwc = 0, this.oUe = 0, this.hqa = 0, this.Zwc = !1, this._r1 = 0, this.JCl = 1, this.A91 = new Map, this.Jpe = (t, i) => {
      var t = t.GetCreatureDataId(),
        e = this.A91.get(t);
      void 0 !== e && (this.A91.delete(t), this.RB1[e] = i, EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, i.Entity, EventDefine_1.EEventName.OnSkillSimulateMontage, this.Pk1), this.A91.size <= 0) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateEntity, this.Jpe)
    }, this.LB1 = () => {
      if (this.Ak1) {
        var t, i = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
        if (i)
          for (const e of this.RB1) e?.Valid && (t = e.Entity?.GetComponent(1))?.DisableActorHandle.Empty && Vector_1.Vector.DistSquared(t.ActorLocationProxy, i) > MAX_DISTANCE_SQUARED && e.Entity.GetComponent(40)?.StopAllSkills("幻影距离主体过远")
      }
    }, this.BJe = (t, i, e) => {
      if (i === ULTRA_SKILL_ID) {
        if (this.l1c = !0, this._1c = Time_1.Time.Frame, this.h1c = this.TSo?.GetSkill(ULTRA_SKILL_ID), 0 === this.IC1.length) {
          var s = this.TSo?.GetSkillInfo(ULTRA_SKILL_ID)?.SpecialBuffInCode;
          if (s?.Num())
            for (let t = 0; t < s.Num(); ++t) {
              var h = s.Get(t);
              h && this.IC1.push(Number(h))
            }
        }
        this.eRc()
      }
    }, this.bJe = (t, i) => {
      i === ULTRA_SKILL_ID && (this.l1c = !1, this.tRc())
    }, this.Pk1 = (t, i, e, s) => {
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "OnSkillSimulateMontage", ["entityId", t], ["skillId", i], ["startTimeSeconds", s]);
      for (const _ of this.RB1)
        if (_?.Entity?.Id === t) {
          ControllerHolder_1.ControllerHolder.CreatureController.SetActorMovable(_.Entity, !0, "同步幻影技能动作");
          break
        } var h;
      i !== LOOP_SKILL_ID || s < LOOP_END_TIME || (i = LOOP_END_TIME - LOOP_START_TIME, i = s - Math.floor((s - LOOP_START_TIME) / i) * i, (h = EntitySystem_1.EntitySystem.GetComponent(t, 177))?.Valid && h.MontageSetPosition(i), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "夏空模拟端蒙太奇开始时间超过总长度，重设开始时间", ["修正前", s], ["修正后", i]))
    }, this.xG1 = (t, i) => {
      t !== i && this.DG1(t)
    }, this.UG1 = (t, i) => {
      t !== i && this.DG1(t)
    }, this.xie = (t, i) => {
      t = t.Entity === this.Jh;
      this.zwc !== t && (this.zwc = t, this.l1c) && this.zwc && (this.h1c?.ActiveAbility?.SetIsInterrupt(!0), this.TSo?.EndSkill(ULTRA_SKILL_ID, "夏空大招从后台切回来"))
    }
  }
  OnStart() {
    this.Jh = this.SpecialSkillComponent.Entity, this.E0 = this.Jh.Id;
    var t = this.Jh.GetComponent(0);
    this.Wpo = t.GetCreatureDataId(), this.TSo = this.Jh.GetComponent(40), this.a1c = this.Jh.GetComponent(179), this.Xte = this.Jh.GetComponent(193), this.Wwc = this.Jh.GetComponent(172), this.m1t = this.Jh.GetComponent(190), this.zP1 = [void 0, void 0, void 0, void 0], this.Ak1 = ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === t.GetPlayerId(), this.Ak1 && (EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharUseSkill, this.BJe), EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.OnSkillEnd, this.bJe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeChangeRole, this.xG1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeUpdateSceneTeam, this.UG1), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie)), this.wB1(), this.xk1()
  }
  wB1() {
    if (this.Ak1) {
      for (let t = 1; t <= 3; t++) {
        var i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Jh, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, t);
        i?.Valid ? (this.RB1.push(i), i = i.Entity.GetComponent(3).DisableActor("夏空幻影Start"), this.PG1.push(i)) : (CombatLog_1.CombatLog.Info("Skill", this.Jh, "夏空Start获取幻影实体失败", ["pos", t]), this.RB1.push(void 0), this.PG1.push(0))
      }
      this.j3 = TimerSystem_1.TimerSystem.Forever(this.LB1, CHECK_DISTANCE_INTERVAL)
    }
  }
  OnActivate() {
    if (this.Ak1)
      for (let i = 0; i < this.RB1.length; i++) {
        let t = this.RB1[i];
        var e;
        (t = t || PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Jh, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, i + 1))?.Valid ? ((e = new SpecialSkillXiaKongSummoned).Init(t), this.wca.push(e), ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t.Entity, !0, "夏空幻影初始化", !0), ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(t.Entity, !1, !1, !1, "夏空幻影Activate", !0), this.PG1[i] && t.Entity.GetComponent(3)?.EnableActor(this.PG1[i])) : CombatLog_1.CombatLog.Error("Skill", this.Jh, "夏空Activate获取幻影实体失败", ["pos", i + 1])
      }
  }
  xk1() {
    if (!this.Ak1) {
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.OnSkillSimulateMontage, this.Pk1), this.A91.clear();
      for (let t = 0; t < 3; t++) {
        var i = this.Jh.GetComponent(0).CustomServerEntityIds[t],
          e = ModelManager_1.ModelManager.CreatureModel.GetEntity(i);
        e?.Valid ? (this.RB1.push(e), EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e.Entity, EventDefine_1.EEventName.OnSkillSimulateMontage, this.Pk1)) : (this.A91.set(i, t), this.RB1.push(void 0))
      }
      0 < this.A91.size && EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateEntity, this.Jpe)
    }
  }
  OnTick(t) {
    this.l1c && this._1c !== Time_1.Time.Frame && this.oRc(t * this.u1c());
    t = this.JP1();
    t !== this.YP1 && (this.YP1?.Valid && this.YP1.RemoveForceTimeScale(), this.YP1 = t)
  }
  JP1() {
    if (this.zP1) {
      var i = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(this.E0, "VisionId");
      if (i) {
        let t = this.zP1[i];
        if (!t) {
          var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Jh, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, i);
          if (!e?.Valid) return;
          (t = e.Entity?.GetComponent(179)) && (this.zP1[i] = t)
        }
        return t ? (t.SetForceTimeScale(this.a1c.CurrentTimeScale), t) : void 0
      }
    }
  }
  OnEnd() {
    if (this.j3 && (TimerSystem_1.TimerSystem.Remove(this.j3), this.j3 = void 0), this.Ak1) {
      this.l1c && (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged, this.Jh.Id, 1407, !1), this.l1c = !1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeChangeRole, this.xG1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeUpdateSceneTeam, this.UG1), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie), this.Jh && (EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharUseSkill, this.BJe), EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.OnSkillEnd, this.bJe), this.Jh = void 0);
      for (const t of this.wca) t.Destroy();
      this.wca.length = 0
    } else {
      EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CreateEntity, this.Jpe) && EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateEntity, this.Jpe);
      for (const i of this.RB1) i?.Entity && EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, i.Entity, EventDefine_1.EEventName.OnSkillSimulateMontage, this.Pk1);
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this), this.Jh && (EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.OnSkillSimulateMontage, this.Pk1), this.Jh = void 0)
    }
    this.RB1.length = 0, this.TSo = void 0, this.a1c = void 0, this.h1c = void 0, this.zP1 = void 0
  }
  DG1(t) {
    this.l1c && t?.Entity === this.Jh && ((t = this.GetNextEndCircleAttrValue()) >= SUCC_MIN_ATTR_VALUE && t < SUCC_MAX_ATTR_VALUE && this.rRc(!0), this.Jh?.GetComponent(93)?.DisableRoleWithoutEffect())
  }
  u1c() {
    return this.Jh && this.a1c ? this.Jh.TimeDilation * this.a1c.CurrentTimeScale : 1
  }
  eRc() {
    this.Qwc = 0, this.Bwc = 0, this.Xwc.length = 0, this.Ywc = CIRCLE_SPEED_INIT, this.zwc = this.Xte?.HasTag(-1384309247) ?? !1, this.Jwc = FRIST_CIRCLE_TIME * this.Ywc, this.oUe = 0, this.hqa = 0, this.Zwc = !1, this._r1 = INPUT_START_TIME, this.JCl = 1, this.Xte?.TagContainer.UpdateExactTag(1, 1144073280, 1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged, this.Jh.Id, 1407, !0)
  }
  oRc(t) {
    this.Zwc || (this.oUe += t, this.oUe > ULTRA_SKILL_TOTAL_TIME && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]已达到最大时间，后续不再生成新光圈"), this.Zwc = !0)), 0 < this._r1 && (this._r1 -= t);
    var i = this.Ywc * t;
    this.nRc(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1, i), this.nRc(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2, i), this.sRc(), this.aRc(), this.hRc(t)
  }
  tRc() {
    Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]夏空大招结束");
    for (let t = this.Bwc; t < this.Qwc; t++) {
      var i = this.Xwc[t];
      this.m1t?.RemoveBuff(i, 1, "夏空大招结束清理", this.h1c.MNc)
    }
    this.Bwc = this.Qwc, this.Xte?.TagContainer.UpdateExactTag(1, 1144073280, -1), EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged, this.Jh.Id, 1407, !1)
  }
  sRc() {
    var t, i;
    if (!(this.Bwc >= this.Qwc)) return t = this.GetNextEndCircleAttrValue(), this.zwc ? (i = this.lRc()) <= 0 ? void(t >= MAX_ATRR_VALUE && this.rRc(!1)) : void(1 !== i && 2 !== i || t <= SUCC_MAX_ATTR_VALUE && t >= SUCC_MIN_ATTR_VALUE && (this.JCl = i, this.rRc(!0))) : void(t >= SUCC_BACKSTAGE_ATRR_VALUE && this.rRc(!0, !0))
  }
  hRc(t) {
    this.Zwc || (this.Jwc -= t * this.Ywc, 0 < this.Jwc) || this._Rc() && (this.Jwc = 1 === this.Qwc ? SECOND_CIRCLE_TIME * this.Ywc : CIRCLE_INTERVAL)
  }
  cRc(t) {
    return t % CIRCLE_NUM
  }
  uRc(t) {
    return 2 * t + CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1
  }
  dRc(t) {
    var i = this.IC1;
    return i[t] || (Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "[SpecialSkillXiaKong]不存在对应buff", ["index", t]), 0)
  }
  _Rc() {
    var t, i;
    return this.Qwc - this.Bwc >= CIRCLE_NUM ? (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]场上存在2个圈，不允许继续生成"), !1) : (i = this.cRc(this.Qwc), t = this.uRc(i), this.Wwc?.SetBaseValue(t, 0), t = this.dRc(i), this.Xwc.push(t), i = this.h1c.MNc, this.m1t?.AddBuff(Number(t), {
      InstigatorId: this.Wpo,
      Reason: "夏空大招逻辑添加",
      PreMessageId: i
    }), this.Qwc++, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]生成新的特效圈", ["", this.Qwc], ["buffId", t]), !0)
  }
  mRc() {
    this.Bwc >= this.Qwc && Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]没有圈可以销毁");
    var t = this.Xwc[this.Bwc];
    this.m1t?.RemoveBuff(t, 1, "夏空大招逻辑移除", this.h1c.MNc), this.Bwc++, Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]销毁特效圈", ["", this.Bwc], ["buffId", t])
  }
  GetNextEndCircleAttrValue(t = 0) {
    t = this.cRc(this.Bwc + t), t = this.uRc(t);
    return this.Wwc?.GetCurrentValue(t) ?? 0
  }
  rRc(t, i = !1) {
    this.mRc(), Log_1.Log.CheckDebug() && Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]判定结果", ["是否成功", t], ["类型", this.JCl], ["是否自动", i]), this.h1c?.ActiveAbility?.判定结果(t, i, this.JCl)
  }
  nRc(t, i) {
    this.Wwc && (i = this.Wwc.GetCurrentValue(t) + i, this.Wwc.SetBaseValue(t, i))
  }
  aRc() {
    this.hqa = 0
  }
  lRc() {
    return this.hqa
  }
  SetInputType(t) {
    !this.l1c || 0 < this._r1 || (4 === t ? (this.hqa = 0, this.h1c && 0 < this.Qwc && (this.h1c.ActiveAbility?.SetIsInterrupt(!0), this.TSo?.EndSkill(ULTRA_SKILL_ID, "夏空大招主动按键结束"), this.TSo?.BeginSkill(ULTRA_SECOND_SKILL_ID, {
      Reason: "夏空主动结束大招触发"
    }))) : this.hqa = t)
  }
  GetMinAttrValue() {
    return SUCC_MIN_ATTR_VALUE
  }
  GetNextGenCircleIndex() {
    return this.Qwc
  }
  GetNextEndCircleIndex() {
    return this.Bwc
  }
  GetIsUltraSkillState() {
    return this.l1c
  }
}
exports.SpecialSkillXiaKong = SpecialSkillXiaKong;
//# sourceMappingURL=SpecialSkillXiaKong.js.map