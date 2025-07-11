"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillXiaKong = exports.SpecialSkillXiaKongSummoned = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../../Core/Common/Time");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../../../Global");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const CharacterAttributeTypes_1 = require("../../Abilities/CharacterAttributeTypes");
const SpecialSkillBase_1 = require("./SpecialSkillBase");
const CHECK_DISTANCE_INTERVAL = 1000;
const MAX_DISTANCE_SQUARED = 900000000;
const ULTRA_SKILL_ID = 1407200;
const ULTRA_SECOND_SKILL_ID = 1407201;
const LOOP_SKILL_ID = 1407004;
const LOOP_START_TIME = 4;
const LOOP_END_TIME = 22.333334;
const CIRCLE_NUM = 2;
const MAX_ATRR_VALUE = 30000;
const SUCC_MAX_ATTR_VALUE = 30000;
const SUCC_MIN_ATTR_VALUE = 480000 / 21;
const SUCC_BACKSTAGE_ATRR_VALUE = 25000;
const CIRCLE_SPEED_INIT = 30000 / 2100;
const FRIST_CIRCLE_TIME = 2332;
const SECOND_CIRCLE_TIME = 1332;
const CIRCLE_INTERVAL = 23285.7;
const ULTRA_SKILL_TOTAL_TIME = 34000;
const INPUT_START_TIME = 3664;
class SpecialSkillXiaKongSummoned {
  constructor() {
    this.EntityHandle = undefined;
    this.AnimComp = undefined;
    this.Jnu = () => {
      if (this.EntityHandle?.Valid) {
        this.AnimComp?.StartForceDisableAnimOptimization(4, false);
      }
    };
    this.Znu = () => {
      if (this.EntityHandle?.Valid) {
        this.AnimComp?.CancelForceDisableAnimOptimization(4);
      }
    };
    this.zpe = () => {
      this.Destroy();
    };
  }
  Init(t) {
    if (t?.Valid && t.Entity !== undefined) {
      this.EntityHandle = t;
      this.AnimComp = t.Entity.GetComponent(177);
      EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.Jnu);
      EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.OnSkillEnd, this.Znu);
      EventSystem_1.EventSystem.AddWithTarget(this.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
  }
  Destroy() {
    if (this.EntityHandle?.Entity) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.Jnu);
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle.Entity, EventDefine_1.EEventName.OnSkillEnd, this.Znu);
      EventSystem_1.EventSystem.RemoveWithTarget(this.EntityHandle, EventDefine_1.EEventName.RemoveEntity, this.zpe);
    }
    this.EntityHandle = undefined;
    this.AnimComp = undefined;
  }
}
exports.SpecialSkillXiaKongSummoned = SpecialSkillXiaKongSummoned;
class SpecialSkillXiaKong extends SpecialSkillBase_1.SpecialSkillBase {
  constructor() {
    super(...arguments);
    this.Jh = undefined;
    this.E0 = 0;
    this.Wpo = 0;
    this.TSo = undefined;
    this.a1c = undefined;
    this.Xte = undefined;
    this.Wwc = undefined;
    this.m1t = undefined;
    this.h1c = undefined;
    this.l1c = false;
    this._1c = 0;
    this.Tx1 = undefined;
    this.bx1 = undefined;
    this.ok1 = [];
    this.hF1 = [];
    this.wca = [];
    this.j3 = undefined;
    this.aO1 = false;
    this.QC1 = [];
    this.Qwc = 0;
    this.Bwc = 0;
    this.Xwc = [];
    this.Ywc = 0;
    this.zwc = true;
    this.Jwc = 0;
    this.oUe = 0;
    this.hqa = 0;
    this.Zwc = false;
    this.Ar1 = 0;
    this.JCl = 1;
    this.dH1 = new Map();
    this.Jpe = (t, i) => {
      var t = t.GetCreatureDataId();
      var e = this.dH1.get(t);
      if (e !== undefined && (this.dH1.delete(t), this.ok1[e] = i, EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, i.Entity, EventDefine_1.EEventName.OnSkillSimulateMontage, this.hO1), this.dH1.size <= 0)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateEntity, this.Jpe);
      }
    };
    this.nk1 = () => {
      if (this.aO1) {
        var t;
        var i = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy;
        if (i) {
          for (const e of this.ok1) {
            if (e?.Valid && (t = e.Entity?.GetComponent(1))?.DisableActorHandle.Empty && Vector_1.Vector.DistSquared(t.ActorLocationProxy, i) > MAX_DISTANCE_SQUARED) {
              e.Entity.GetComponent(40)?.StopAllSkills("幻影距离主体过远");
            }
          }
        }
      }
    };
    this.BJe = (t, i, e) => {
      if (i === ULTRA_SKILL_ID) {
        this.l1c = true;
        this._1c = Time_1.Time.Frame;
        this.h1c = this.TSo?.GetSkill(ULTRA_SKILL_ID);
        if (this.QC1.length === 0) {
          var s = this.TSo?.GetSkillInfo(ULTRA_SKILL_ID)?.SpecialBuffInCode;
          if (s?.Num()) {
            for (let t = 0; t < s.Num(); ++t) {
              var h = s.Get(t);
              if (h) {
                this.QC1.push(Number(h));
              }
            }
          }
        }
        this.eRc();
      }
    };
    this.bJe = (t, i) => {
      if (i === ULTRA_SKILL_ID) {
        this.l1c = false;
        this.tRc();
      }
    };
    this.hO1 = (t, i, e, s) => {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "OnSkillSimulateMontage", ["entityId", t], ["skillId", i], ["startTimeSeconds", s]);
      }
      for (const _ of this.ok1) {
        if (_?.Entity?.Id === t) {
          ControllerHolder_1.ControllerHolder.CreatureController.SetActorMovable(_.Entity, true, "同步幻影技能动作");
          break;
        }
      }
      var h;
      if (i === LOOP_SKILL_ID && !(s < LOOP_END_TIME)) {
        i = LOOP_END_TIME - LOOP_START_TIME;
        i = s - Math.floor((s - LOOP_START_TIME) / i) * i;
        if ((h = EntitySystem_1.EntitySystem.GetComponent(t, 177))?.Valid) {
          h.MontageSetPosition(i);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "夏空模拟端蒙太奇开始时间超过总长度，重设开始时间", ["修正前", s], ["修正后", i]);
        }
      }
    };
    this.lF1 = (t, i) => {
      if (t !== i) {
        this._F1(t);
      }
    };
    this.uF1 = (t, i) => {
      if (t !== i) {
        this._F1(t);
      }
    };
    this.xie = (t, i) => {
      t = t.Entity === this.Jh;
      if (this.zwc !== t && (this.zwc = t, this.l1c) && this.zwc) {
        this.h1c?.ActiveAbility?.SetIsInterrupt(true);
        this.TSo?.EndSkill(ULTRA_SKILL_ID, "夏空大招从后台切回来");
      }
    };
  }
  OnStart() {
    this.Jh = this.SpecialSkillComponent.Entity;
    this.E0 = this.Jh.Id;
    var t = this.Jh.GetComponent(0);
    this.Wpo = t.GetCreatureDataId();
    this.TSo = this.Jh.GetComponent(40);
    this.a1c = this.Jh.GetComponent(179);
    this.Xte = this.Jh.GetComponent(193);
    this.Wwc = this.Jh.GetComponent(172);
    this.m1t = this.Jh.GetComponent(190);
    this.bx1 = [undefined, undefined, undefined, undefined];
    this.aO1 = ModelManager_1.ModelManager.CreatureModel.GetPlayerId() === t.GetPlayerId();
    if (this.aO1) {
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharUseSkill, this.BJe);
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.OnSkillEnd, this.bJe);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeChangeRole, this.lF1);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBeforeUpdateSceneTeam, this.uF1);
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnChangeRole, this.xie);
    }
    this.sk1();
    this.lO1();
  }
  sk1() {
    if (this.aO1) {
      for (let t = 1; t <= 3; t++) {
        var i = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Jh, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, t);
        if (i?.Valid) {
          this.ok1.push(i);
          i = i.Entity.GetComponent(3).DisableActor("夏空幻影Start");
          this.hF1.push(i);
        } else {
          CombatLog_1.CombatLog.Info("Skill", this.Jh, "夏空Start获取幻影实体失败", ["pos", t]);
          this.ok1.push(undefined);
          this.hF1.push(0);
        }
      }
      this.j3 = TimerSystem_1.TimerSystem.Forever(this.nk1, CHECK_DISTANCE_INTERVAL);
    }
  }
  OnActivate() {
    if (this.aO1) {
      for (let i = 0; i < this.ok1.length; i++) {
        let t = this.ok1[i];
        var e;
        if ((t = t || PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Jh, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, i + 1))?.Valid) {
          (e = new SpecialSkillXiaKongSummoned()).Init(t);
          this.wca.push(e);
          ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t.Entity, true, "夏空幻影初始化", true);
          ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(t.Entity, false, false, false, "夏空幻影Activate", true);
          if (this.hF1[i]) {
            t.Entity.GetComponent(3)?.EnableActor(this.hF1[i]);
          }
        } else {
          CombatLog_1.CombatLog.Error("Skill", this.Jh, "夏空Activate获取幻影实体失败", ["pos", i + 1]);
        }
      }
    }
  }
  lO1() {
    if (!this.aO1) {
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.OnSkillSimulateMontage, this.hO1);
      this.dH1.clear();
      for (let t = 0; t < 3; t++) {
        var i = this.Jh.GetComponent(0).CustomServerEntityIds[t];
        var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(i);
        if (e?.Valid) {
          this.ok1.push(e);
          EventSystem_1.EventSystem.AddWithTargetUseHoldKey(this, e.Entity, EventDefine_1.EEventName.OnSkillSimulateMontage, this.hO1);
        } else {
          this.dH1.set(i, t);
          this.ok1.push(undefined);
        }
      }
      if (this.dH1.size > 0) {
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CreateEntity, this.Jpe);
      }
    }
  }
  OnTick(t) {
    if (this.l1c && this._1c !== Time_1.Time.Frame) {
      this.oRc(t * this.u1c());
    }
    t = this.Rx1();
    if (t !== this.Tx1) {
      if (this.Tx1?.Valid) {
        this.Tx1.RemoveForceTimeScale();
      }
      this.Tx1 = t;
    }
  }
  Rx1() {
    if (this.bx1) {
      var i = ControllerHolder_1.ControllerHolder.BlackboardController.GetIntValueByEntity(this.E0, "VisionId");
      if (i) {
        let t = this.bx1[i];
        if (!t) {
          var e = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.Jh, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantCustom, i);
          if (!e?.Valid) {
            return;
          }
          if (t = e.Entity?.GetComponent(179)) {
            this.bx1[i] = t;
          }
        }
        if (t) {
          t.SetForceTimeScale(this.a1c.CurrentTimeScale);
          return t;
        } else {
          return undefined;
        }
      }
    }
  }
  OnEnd() {
    if (this.j3) {
      TimerSystem_1.TimerSystem.Remove(this.j3);
      this.j3 = undefined;
    }
    if (this.aO1) {
      if (this.l1c) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged, this.Jh.Id, 1407, false);
        this.l1c = false;
      }
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeChangeRole, this.lF1);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBeforeUpdateSceneTeam, this.uF1);
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnChangeRole, this.xie);
      if (this.Jh) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharUseSkill, this.BJe);
        EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.OnSkillEnd, this.bJe);
        this.Jh = undefined;
      }
      for (const t of this.wca) {
        t.Destroy();
      }
      this.wca.length = 0;
    } else {
      if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.CreateEntity, this.Jpe)) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CreateEntity, this.Jpe);
      }
      for (const i of this.ok1) {
        if (i?.Entity) {
          EventSystem_1.EventSystem.RemoveWithTargetUseKey(this, i.Entity, EventDefine_1.EEventName.OnSkillSimulateMontage, this.hO1);
        }
      }
      EventSystem_1.EventSystem.RemoveAllTargetUseKey(this);
      if (this.Jh) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.OnSkillSimulateMontage, this.hO1);
        this.Jh = undefined;
      }
    }
    this.ok1.length = 0;
    this.TSo = undefined;
    this.a1c = undefined;
    this.h1c = undefined;
    this.bx1 = undefined;
  }
  _F1(t) {
    if (this.l1c && t?.Entity === this.Jh) {
      if ((t = this.GetNextEndCircleAttrValue()) >= SUCC_MIN_ATTR_VALUE && t < SUCC_MAX_ATTR_VALUE) {
        this.rRc(true);
      }
      this.Jh?.GetComponent(93)?.DisableRoleWithoutEffect();
    }
  }
  u1c() {
    if (this.Jh && this.a1c) {
      return this.Jh.TimeDilation * this.a1c.CurrentTimeScale;
    } else {
      return 1;
    }
  }
  eRc() {
    this.Qwc = 0;
    this.Bwc = 0;
    this.Xwc.length = 0;
    this.Ywc = CIRCLE_SPEED_INIT;
    this.zwc = this.Xte?.HasTag(-1384309247) ?? false;
    this.Jwc = FRIST_CIRCLE_TIME * this.Ywc;
    this.oUe = 0;
    this.hqa = 0;
    this.Zwc = false;
    this.Ar1 = INPUT_START_TIME;
    this.JCl = 1;
    this.Xte?.TagContainer.UpdateExactTag(1, 1144073280, 1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged, this.Jh.Id, 1407, true);
  }
  oRc(t) {
    if (!this.Zwc) {
      this.oUe += t;
      if (this.oUe > ULTRA_SKILL_TOTAL_TIME) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]已达到最大时间，后续不再生成新光圈");
        }
        this.Zwc = true;
      }
    }
    if (this.Ar1 > 0) {
      this.Ar1 -= t;
    }
    var i = this.Ywc * t;
    this.nRc(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1, i);
    this.nRc(CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2, i);
    this.sRc();
    this.aRc();
    this.hRc(t);
  }
  tRc() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]夏空大招结束");
    }
    for (let t = this.Bwc; t < this.Qwc; t++) {
      var i = this.Xwc[t];
      this.m1t?.RemoveBuff(i, 1, "夏空大招结束清理", this.h1c.MNc);
    }
    this.Bwc = this.Qwc;
    this.Xte?.TagContainer.UpdateExactTag(1, 1144073280, -1);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.BattleUiSpecialSkillEnableChanged, this.Jh.Id, 1407, false);
  }
  sRc() {
    var t;
    var i;
    if (!(this.Bwc >= this.Qwc)) {
      t = this.GetNextEndCircleAttrValue();
      if (this.zwc) {
        if ((i = this.lRc()) <= 0) {
          if (t >= MAX_ATRR_VALUE) {
            this.rRc(false);
          }
          return;
        } else {
          if (i === 1 || i === 2) {
            if (t <= SUCC_MAX_ATTR_VALUE && t >= SUCC_MIN_ATTR_VALUE) {
              this.JCl = i;
              this.rRc(true);
            }
          }
          return;
        }
      } else {
        if (t >= SUCC_BACKSTAGE_ATRR_VALUE) {
          this.rRc(true, true);
        }
        return;
      }
    }
  }
  hRc(t) {
    if (!this.Zwc && !(this.Jwc -= t * this.Ywc, this.Jwc > 0)) {
      if (this._Rc()) {
        this.Jwc = this.Qwc === 1 ? SECOND_CIRCLE_TIME * this.Ywc : CIRCLE_INTERVAL;
      }
    }
  }
  cRc(t) {
    return t % CIRCLE_NUM;
  }
  uRc(t) {
    return t * 2 + CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1;
  }
  dRc(t) {
    var i = this.QC1;
    return i[t] || (Log_1.Log.CheckError() && Log_1.Log.Error("Battle", 17, "[SpecialSkillXiaKong]不存在对应buff", ["index", t]), 0);
  }
  _Rc() {
    var t;
    var i;
    if (this.Qwc - this.Bwc >= CIRCLE_NUM) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]场上存在2个圈，不允许继续生成");
      }
      return false;
    } else {
      i = this.cRc(this.Qwc);
      t = this.uRc(i);
      this.Wwc?.SetBaseValue(t, 0);
      t = this.dRc(i);
      this.Xwc.push(t);
      i = this.h1c.MNc;
      this.m1t?.AddBuff(Number(t), {
        InstigatorId: this.Wpo,
        Reason: "夏空大招逻辑添加",
        PreMessageId: i
      });
      this.Qwc++;
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]生成新的特效圈", ["", this.Qwc], ["buffId", t]);
      }
      return true;
    }
  }
  mRc() {
    if (this.Bwc >= this.Qwc && Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]没有圈可以销毁");
    }
    var t = this.Xwc[this.Bwc];
    this.m1t?.RemoveBuff(t, 1, "夏空大招逻辑移除", this.h1c.MNc);
    this.Bwc++;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]销毁特效圈", ["", this.Bwc], ["buffId", t]);
    }
  }
  GetNextEndCircleAttrValue(t = 0) {
    t = this.cRc(this.Bwc + t);
    t = this.uRc(t);
    return this.Wwc?.GetCurrentValue(t) ?? 0;
  }
  rRc(t, i = false) {
    this.mRc();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Battle", 17, "[SpecialSkillXiaKong]判定结果", ["是否成功", t], ["类型", this.JCl], ["是否自动", i]);
    }
    this.h1c?.ActiveAbility?.判定结果(t, i, this.JCl);
  }
  nRc(t, i) {
    if (this.Wwc) {
      i = this.Wwc.GetCurrentValue(t) + i;
      this.Wwc.SetBaseValue(t, i);
    }
  }
  aRc() {
    this.hqa = 0;
  }
  lRc() {
    return this.hqa;
  }
  SetInputType(t) {
    if (!!this.l1c && !(this.Ar1 > 0)) {
      if (t === 4) {
        this.hqa = 0;
        if (this.h1c && this.Qwc > 0) {
          this.h1c.ActiveAbility?.SetIsInterrupt(true);
          this.TSo?.EndSkill(ULTRA_SKILL_ID, "夏空大招主动按键结束");
          this.TSo?.BeginSkill(ULTRA_SECOND_SKILL_ID, {
            Reason: "夏空主动结束大招触发"
          });
        }
      } else {
        this.hqa = t;
      }
    }
  }
  GetMinAttrValue() {
    return SUCC_MIN_ATTR_VALUE;
  }
  GetNextGenCircleIndex() {
    return this.Qwc;
  }
  GetNextEndCircleIndex() {
    return this.Bwc;
  }
  GetIsUltraSkillState() {
    return this.l1c;
  }
}
exports.SpecialSkillXiaKong = SpecialSkillXiaKong;
//# sourceMappingURL=SpecialSkillXiaKong.js.map