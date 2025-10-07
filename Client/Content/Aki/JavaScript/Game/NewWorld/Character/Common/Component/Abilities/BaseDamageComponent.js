"use strict";

var BaseDamageComponent_1;
var __decorate = this && this.__decorate || function (e, t, a, o) {
  var r;
  var i = arguments.length;
  var s = i < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, a) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, a, o);
  } else {
    for (var n = e.length - 1; n >= 0; n--) {
      if (r = e[n]) {
        s = (i < 3 ? r(s) : i > 3 ? r(t, a, s) : r(t, a)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(t, a, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseDamageComponent = exports.BaseAttributeSet = exports.DamageCompPayload = exports.SnapshotPayload = exports.DamageTransfer = undefined;
const Stats_1 = require("../../../../../../Core/Common/Stats");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage");
const SceneTeamController_1 = require("../../../../../Module/SceneTeam/SceneTeamController");
const CombatLog_1 = require("../../../../../Utils/CombatLog");
const ExpressionTreeController_1 = require("../../../../../Utils/Trigger/ExpressionTreeController");
const GameplayAbilityVisionControl_1 = require("../Vision/GA/GameplayAbilityVisionControl");
const AbilityUtils_1 = require("./AbilityUtils");
const BaseAbilityComponent_1 = require("./BaseAbilityComponent");
const ActiveBuffConfigs_1 = require("./Buff/ActiveBuffConfigs");
const CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
const CharacterBuffIds_1 = require("./CharacterBuffIds");
const CharacterDamageCalculations_1 = require("./CharacterDamageCalculations");
const ExtraEffectBaseTypes_1 = require("./ExtraEffect/ExtraEffectBaseTypes");
const ExtraEffectDamageAccumulation_1 = require("./ExtraEffect/ExtraEffectDamageAccumulation");
const ExtraEffectDamageShare_1 = require("./ExtraEffect/ExtraEffectDamageShare");
const ExtraEffectDamageTransferRecipients_1 = require("./ExtraEffect/ExtraEffectDamageTransferRecipients");
const ExtraEffectMisc_1 = require("./ExtraEffect/ExtraEffectMisc");
const ExtraEffectSnapModifier_1 = require("./ExtraEffect/ExtraEffectSnapModifier");
const DIVIDED_TEN_THOUSAND = 0.0001;
class DamageTransfer {
  constructor() {
    this.TransferTarget = undefined;
    this.ToughRecoverDelayTime = 0;
    this.WeakTime = 0;
  }
}
exports.DamageTransfer = DamageTransfer;
class SnapshotPayload {
  constructor() {
    this.Target = undefined;
    this.Attacker = undefined;
    this.TargetSnapshot = undefined;
    this.AttackerSnapshot = undefined;
    this.HasDamageTransfer = false;
    this.DamageTransfers = undefined;
  }
}
exports.SnapshotPayload = SnapshotPayload;
class DamageCompPayload {
  constructor() {
    this.Target = undefined;
    this.Attacker = undefined;
  }
}
exports.DamageCompPayload = DamageCompPayload;
class BaseAttributeSet {}
exports.BaseAttributeSet = BaseAttributeSet;
let BaseDamageComponent = BaseDamageComponent_1 = class BaseDamageComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.AttributeComponent = undefined;
    this.TagComponent = undefined;
    this.BuffComponent = undefined;
    this.Ybr = undefined;
    this.Jbr = undefined;
    this.tRr = undefined;
    this.ActorComponent = undefined;
    this.CreatureDataComponent = undefined;
    this.zbr = undefined;
    this.Zbr = undefined;
    this.iqr = new Map();
  }
  get OwnerBuffComponent() {
    return this.BuffComponent;
  }
  OnStart() {
    this.AttributeComponent = this.Entity.CheckGetComponent(173);
    this.TagComponent = this.Entity.CheckGetComponent(206);
    this.BuffComponent = this.Entity.CheckGetComponent(175);
    this.Ybr = this.Entity.GetComponent(56);
    this.Jbr = this.Entity.GetComponent(96);
    this.tRr = this.Entity.GetComponent(39);
    this.ActorComponent = this.Entity.CheckGetComponent(1);
    this.CreatureDataComponent = this.Entity.CheckGetComponent(0);
    return true;
  }
  OnClear() {
    this.rqr();
    return true;
  }
  ExecuteBulletDamage(e, t, a) {
    var o = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(t.DamageDataId);
    if (!o) {
      return 0;
    }
    if (o.Condition) {
      this.ProcessDamageExpression(r = {
        ContextType: 0,
        DamageParam: t,
        BulletEntityId: e,
        ContextId: a,
        ToughResult: 0,
        Victim: this
      }, o);
      return r.ToughResult;
    }
    var r = EntitySystem_1.EntitySystem.Get(e);
    var e = r.GetBulletInfo();
    if (o.CalculateType === 0 && this.TagComponent.HasAnyTag([1940180710])) {
      return 0;
    }
    BaseDamageComponent_1.nqr.Start();
    var i = new ExtraEffectBaseTypes_1.RequirementPayload();
    i.BulletId = BigInt(e.BulletRowName);
    i.BulletMessageId = a;
    i.SkillId = Number(e.BulletInitParams.SkillId);
    i.SkillMessageId = e.BulletInitParams.SkillContextId;
    i.SkillDamageCount = ModelManager_1.ModelManager.CombatMessageModel?.AddSkillDamageCount(e.BulletInitParams.SkillContextId);
    i.BulletDamageCount = ModelManager_1.ModelManager.CombatMessageModel?.AddBulletDamageCount(e.ContextId);
    i.BulletTags = e.Tags ?? [];
    i.BattleFlags = e.BulletInitParams.BattleFlags ?? [];
    i.PartId = t.PartId;
    if (i.PartId >= 0) {
      i.PartTag = this.Entity.GetComponent(69).GetPartByIndex(i.PartId).PartTag?.TagId;
    }
    i.CounterType = t.CounterType;
    var s = t.Attacker.CheckGetComponent(19);
    var n = t.Attacker.CheckGetComponent(210);
    if (s) {
      s = {
        ...t,
        DamageData: o,
        Attacker: s,
        SourceType: Protocol_1.Aki.Protocol.XAs.Proto_FromBullet,
        Accumulation: ExtraEffectDamageAccumulation_1.DamageAccumulation.GetAccumulation(r.Id),
        Element: ExtraEffectSnapModifier_1.ModifyDamageElement.ApplyEffects(n, o.Id) ?? o.Element,
        PartId: t.PartId,
        RandomSeed: ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed(),
        ContextId: a,
        SkillContextId: e.BulletInitParams.SkillContextId
      };
      BaseDamageComponent_1.nqr.Stop();
      BaseDamageComponent_1.sqr.Start();
      this.aqr(s);
      BaseDamageComponent_1.sqr.Stop();
      BaseDamageComponent_1.hqr.Start();
      r = this.ProcessDamage(i, s);
      BaseDamageComponent_1.hqr.Stop();
      return r;
    } else {
      CombatLog_1.CombatLog.Error("Damage", this.Entity, "伤害结算无合法施加者", ["damageId", o.Id], ["attacker id", t.Attacker?.Id]);
      BaseDamageComponent_1.nqr.Stop();
      return 0;
    }
  }
  ExecuteBuffDamage(e, t, a) {
    var o;
    var r;
    var i;
    var s = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(Number(e.DamageDataId));
    if (s) {
      if (s.Condition) {
        this.ProcessDamageExpression({
          ContextType: 1,
          DamageParam: e,
          Payload: t,
          ContextId: a,
          Victim: this
        }, s);
      } else {
        e.Attacker = e.Attacker?.GetComponent(56)?.GetAttributeHolder() ?? e.Attacker;
        (o = new ExtraEffectBaseTypes_1.RequirementPayload()).PartialAssign(t);
        i = e.Attacker.CheckGetComponent(19);
        r = e.Attacker.CheckGetComponent(210);
        if (i) {
          i = {
            ...e,
            DamageData: s,
            Attacker: i,
            DirectTarget: this.Entity,
            SourceType: Protocol_1.Aki.Protocol.XAs.Proto_FromEffect,
            IsAddEnergy: false,
            IsCounterAttack: false,
            ForceCritical: false,
            IsBlocked: false,
            PartId: -1,
            ExtraRate: 1,
            Accumulation: 0,
            Element: ExtraEffectSnapModifier_1.ModifyDamageElement.ApplyEffects(r, s.Id) ?? s.Element,
            RandomSeed: ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed(),
            ContextId: a,
            SkillContextId: undefined
          };
          this.aqr(i);
          this?.ProcessDamage(o, i);
          ExtraEffectDamageShare_1.DamageShare.ApplyBuffShare(this.Entity, s, e, t, a);
        } else {
          CombatLog_1.CombatLog.Error("Damage", this.Entity, "伤害结算无合法施加者", ["damageId", s.Id], ["attacker id", e.Attacker?.Id]);
        }
      }
    }
  }
  ExecuteBuffShareDamage(e, t, a, o) {
    var r;
    var i;
    var s = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(Number(e.DamageDataId));
    if (s) {
      if (s.Condition) {
        this.ProcessDamageExpression({
          ContextType: 2,
          DamageParam: e,
          Payload: t,
          ExtraRate: a,
          ContextId: o,
          Victim: this
        }, s);
      } else {
        (r = new ExtraEffectBaseTypes_1.RequirementPayload()).PartialAssign(t);
        t = e.Attacker.CheckGetComponent(19);
        i = e.Attacker.CheckGetComponent(210);
        if (t) {
          t = {
            ...e,
            DamageData: s,
            Attacker: t,
            DirectTarget: this.Entity,
            SourceType: Protocol_1.Aki.Protocol.XAs.Proto_FromEffect,
            IsAddEnergy: false,
            IsCounterAttack: false,
            ForceCritical: false,
            IsBlocked: false,
            PartId: -1,
            ExtraRate: a,
            Accumulation: 0,
            Element: ExtraEffectSnapModifier_1.ModifyDamageElement.ApplyEffects(i, s.Id) ?? s.Element,
            RandomSeed: ModelManager_1.ModelManager.PlayerInfoModel.GetRandomSeed(),
            ContextId: o,
            SkillContextId: undefined
          };
          this.aqr(t);
          this.ProcessDamage(r, t);
        } else {
          CombatLog_1.CombatLog.Error("Damage", this.Entity, "伤害结算无合法施加者", ["damageId", s.Id], ["attacker id", e.Attacker?.Id]);
        }
      }
    }
  }
  ProcessDamageExpression(e, t) {
    CombatLog_1.CombatLog.Info("Damage", this.Entity, "执行伤害表达式", ["结算id", t.Id], ["formula", t.Condition]);
    ExpressionTreeController_1.ExpressionTreeController.GetDamageExpression(t.Id, t.Condition, t.ConstVariables).Evaluate(e, {
      Victim: this.Entity,
      Attacker: e.DamageParam.Attacker
    });
  }
  ProcessDamage(e, t) {
    if (this.TagComponent.HasTag(1918148596) && t.DamageData.ImmuneType === 0) {
      return 0;
    }
    var a = t.Attacker;
    if (e.SkillId > 0) {
      o = a.tRr?.GetSkill(e.SkillId);
      e.SkillGenre = o?.SkillInfo?.SkillGenre ?? -1;
    }
    e.DamageType = t.DamageData.Type;
    e.DamageSubTypes = t.DamageData.SubType;
    e.CalculateType = t.DamageData.CalculateType;
    e.SmashType = t.DamageData.SmashType;
    e.ElementType = t.Element;
    BaseDamageComponent_1.lqr.Start();
    var o = this._qr(a, t);
    e.WeaponType = o.Attacker.Jbr?.GetWeaponType() ?? ExtraEffectBaseTypes_1.DEFAULT_WEAPON_TYPE_NOT_PASS;
    this.nj1(e, t, o);
    let r = undefined;
    if (t.PartId >= 0) {
      r = this.Entity.GetComponent(69)?.GetPartByIndex(t.PartId);
    }
    a = (e.SkillGenre === 5 ? this.GetExtraToughRate("ToughRateOnCounter") : this.GetExtraToughRate("ToughRate")) / CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    this.INc(t, e, t.ContextId, r);
    e = this.QE1(t, o, a);
    this.KE1(t, o, e);
    BaseDamageComponent_1.lqr.Stop();
    return e;
  }
  static OnDamageExecuteNotify(e, t) {
    ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(t.TVn))?.Entity?.GetComponent(19)?.ProcessRemoteDamage(t);
  }
  ProcessRemoteDamage(e) {
    var t;
    var a = e.Njn ?? {};
    var o = ModelManager_1.ModelManager.CreatureModel.GetEntity(MathUtils_1.MathUtils.LongToNumber(e.kjn));
    var r = MathUtils_1.MathUtils.LongToNumber(e.Fjn);
    var i = ModelManager_1.ModelManager.DamageModel?.GetDamageConfigById(r);
    var s = o?.Entity?.GetComponent(19);
    if (i && o && s) {
      o = {
        ...e,
        ShieldCoverDamage: e.hAs,
        DamageData: i,
        Damage: -e.nAs,
        ChangeLife: e.jQ_,
        IsCounterAttack: false,
        IsCritical: e.sAs,
        IsTargetKilled: e.aAs,
        IsBlocked: false,
        SourceType: a.Vjn ?? Protocol_1.Aki.Protocol.XAs.Proto_FromEffect,
        IsImmune: e.lAs === Protocol_1.Aki.Protocol.G4s.Proto_EDamageImmune_BuffEffectElement,
        Element: e.wHn
      };
      (t = new ExtraEffectBaseTypes_1.RequirementPayload()).BulletId = MathUtils_1.MathUtils.LongToBigInt(a.Mjn ?? -1);
      t.SkillId = MathUtils_1.MathUtils.LongToNumber(a.r5n ?? 0);
      t.BulletTags = [...(a.Hjn ?? [])];
      t.PartId = e.jjn;
      t.DamageType = i.Type;
      t.DamageSubTypes = i.SubType;
      t.CalculateType = i.CalculateType;
      t.IsTargetKilled = o.IsTargetKilled;
      if (t.SkillId > 0) {
        a = s.tRr?.GetSkill(t.SkillId);
        t.SkillGenre = a?.SkillInfo?.SkillGenre ?? -1;
      }
      if (t.PartId >= 0) {
        i = this.Entity.GetComponent(69);
        t.PartTag = i?.GetPartByIndex(t.PartId).PartTag?.TagId;
      }
      t.IsCritical = o.IsCritical;
      t.IsImmune = o.IsImmune;
      a = this.ActorComponent.ActorLocation;
      this.uqr(o, {
        Attacker: s,
        HitPosition: a
      }, t);
      this.dqr(o, s, t);
    } else {
      CombatLog_1.CombatLog.Error("Damage", this.Entity, "收到服务端伤害广播时找不到合法的攻击者或有效伤害配置", ["攻击方", e.kjn], ["受击方", e.TVn], ["结算id", r]);
    }
  }
  _qr(e, t) {
    var a;
    var o;
    var r = (e.Ybr?.GetAttributeHolder() ?? e.Entity).CheckGetComponent(174).TakeSnapshot();
    var i = (this.Ybr?.GetAttributeHolderExceptVisionSummon() ?? this.Entity).CheckGetComponent(174).TakeSnapshot() ?? this.AttributeComponent.TakeSnapshot();
    var t = ExtraEffectDamageTransferRecipients_1.DamageTransferRecipients.ApplyEffects(t.DirectTarget);
    var s = [];
    for (const n of t) {
      if (n?.Valid && !n.GetComponent(15)?.IsDead() && (a = n.GetComponent(19), o = n.GetComponent(174), a) && o) {
        s.push({
          TransferTarget: a,
          ToughRecoverDelayTime: o.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_ToughRecoverDelayTime),
          WeakTime: o.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_WeakTime)
        });
      }
    }
    return {
      Attacker: this.Cqr(e),
      AttackerSnapshot: r,
      Target: this,
      TargetSnapshot: i,
      DamageTransfers: s,
      HasDamageTransfer: t.size > 0
    };
  }
  Cqr(e) {
    if (GameplayAbilityVisionControl_1.GameplayAbilityVisionControl.VisionControlHandle && e.CreatureDataComponent.SummonType === Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantPhantomRole) {
      return ModelManager_1.ModelManager.CreatureModel.GetEntity(e.CreatureDataComponent.GetSummonerId()).Entity?.GetComponent(19);
    } else {
      return e;
    }
  }
  vqr(e, t, a) {
    if (t.IsCounterAttack) {
      a.Attacker.BuffComponent.TriggerEvents(11, a.Target.BuffComponent, e);
      this.BuffComponent.TriggerEvents(12, a.Attacker.BuffComponent, e);
    }
  }
  INc(a, o, e, r) {
    var t = a.Attacker;
    var i = a.DamageData;
    var i = Protocol_1.Aki.Protocol.U3n.create({
      Fjn: MathUtils_1.MathUtils.NumberToLong(i.Id),
      Wjn: a.SkillLevel,
      kjn: MathUtils_1.MathUtils.NumberToLong(t.Entity.GetComponent(0).GetCreatureDataId()),
      TVn: MathUtils_1.MathUtils.NumberToLong(a.DirectTarget.GetComponent(0).GetCreatureDataId()),
      Kjn: a.IsAddEnergy,
      Qjn: a.IsCounterAttack,
      Xjn: a.ForceCritical,
      $jn: a.IsBlocked,
      jjn: a.PartId,
      Yjn: a.CounterSkillMessageId ? MathUtils_1.MathUtils.BigIntToLong(a.CounterSkillMessageId) : 0,
      Njn: {
        Vjn: a.SourceType,
        Mjn: MathUtils_1.MathUtils.BigIntToLong(o.BulletId ?? BigInt(-1)),
        Hjn: o.BulletTags.filter(e => e !== undefined),
        r5n: o.SkillId,
        ptc: a.SkillContextId ? MathUtils_1.MathUtils.BigIntToLong(a.SkillContextId) : undefined
      },
      lHn: ModelManager_1.ModelManager.PlayerInfoModel.AdvanceRandomSeed(0)
    });
    CombatMessage_1.CombatNet.Call(24498, this.Entity, i, e => {
      var t;
      if (e && e.lAs !== Protocol_1.Aki.Protocol.G4s.Proto_EDamageImmune_Invincible && (t = {
        ...a,
        Damage: -e.nAs,
        ChangeLife: e.jQ_,
        ShieldCoverDamage: e.hAs,
        IsCritical: e.sAs,
        IsTargetKilled: e.aAs,
        IsImmune: e.lAs === Protocol_1.Aki.Protocol.G4s.Proto_EDamageImmune_BuffEffectElement,
        Element: e.wHn
      }, o.IsCritical = t.IsCritical, o.IsImmune = t.IsImmune, o.IsTargetKilled = t.IsTargetKilled, e.Q4n === 0)) {
        this.sj1(o, a, t, r);
      }
    }, e, undefined);
  }
  sj1(e, t, a, o) {
    if (this.Entity?.Valid && t.Attacker?.Entity?.Valid) {
      this.uqr(a, t, e);
      this.cqr(a, t, e);
      o?.OnDamage(a.Damage, t.ForceCritical, t.Attacker.Entity, false);
    }
  }
  cqr(e, t, a) {
    this.Mqr(t, a);
    this.dqr(e, t.Attacker, a);
  }
  uqr(e, t, a) {
    var o = t.Attacker.Entity;
    var r = this.Entity;
    BaseDamageComponent_1.Eqr.Start();
    var a = [o, r, a, e, t.HitPosition];
    if (e.DamageData.CalculateType === 1) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.FormationPanelUIShowRoleHeal, r);
    }
    SceneTeamController_1.SceneTeamController.EmitEvent(r, EventDefine_1.EEventName.CharBeDamage, ...a);
    SceneTeamController_1.SceneTeamController.EmitEvent(o, EventDefine_1.EEventName.CharDamage, ...a);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.GlobalCharDamage, ...a);
    BaseDamageComponent_1.Eqr.Stop();
  }
  dqr(e, t, a) {
    var o = t.BuffComponent;
    if (o && this.BuffComponent) {
      if (e.SourceType !== Protocol_1.Aki.Protocol.XAs.Proto_FromEffect) {
        BaseDamageComponent_1.Sqr.Start();
        o.TriggerEvents(0, this.BuffComponent, a);
        this.BuffComponent.TriggerEvents(1, o, a);
        BaseDamageComponent_1.Sqr.Stop();
      }
      if (e.IsTargetKilled) {
        BaseDamageComponent_1.yqr.Start();
        o.TriggerEvents(6, this.BuffComponent, a);
        BaseDamageComponent_1.yqr.Stop();
      }
      BaseDamageComponent_1.Iqr.Start();
      ExtraEffectDamageAccumulation_1.DamageAccumulation.ApplyEffects(e, a, t, this);
      BaseDamageComponent_1.Iqr.Stop();
    }
  }
  Mqr(e, t) {
    var a = e.Attacker?.AttributeComponent;
    if (a && e.IsAddEnergy) {
      var o;
      var r;
      var i = e.SkillLevel;
      var s = e.DamageData;
      for ([o, r] of [s.SpecialEnergy1, s.SpecialEnergy2, s.SpecialEnergy3, s.SpecialEnergy4, s.SpecialEnergy5].entries()) {
        var n;
        var m = CharacterAttributeTypes_1.specialEnergyIds[o];
        var _ = AbilityUtils_1.AbilityUtils.GetLevelValue(r, i, 0);
        if (_ !== 0) {
          n = ExtraEffectMisc_1.SpecialEnergyModifier.ApplyEffects(e.Attacker?.Entity, this.BuffComponent, m, t);
          a.AddBaseValue(m, _ * (1 + n * DIVIDED_TEN_THOUSAND));
        }
      }
    }
  }
  QE1(e, t, a = 1) {
    var o = t.AttackerSnapshot;
    var t = t.TargetSnapshot;
    BaseDamageComponent_1.Tqr.Start();
    var e = AbilityUtils_1.AbilityUtils.GetLevelValue(e.DamageData.ToughLv, e.SkillLevel, 0);
    BaseDamageComponent_1.Tqr.Stop();
    BaseDamageComponent_1.Lqr.Start();
    var o = CharacterDamageCalculations_1.Calculation.ToughCalculation(o, t, e * a);
    BaseDamageComponent_1.Lqr.Stop();
    return o;
  }
  KE1(e, t, a) {
    if (t.HasDamageTransfer) {
      for (const o of t.DamageTransfers) {
        o.TransferTarget?.mqr(e, o.ToughRecoverDelayTime, o.WeakTime, a);
      }
    } else {
      t = t.TargetSnapshot.CurrentValues;
      this.mqr(e, t.Proto_ToughRecoverDelayTime, t.Proto_WeakTime, a);
    }
  }
  mqr(e, t, a, o) {
    e = e.Attacker;
    if (o !== 0) {
      BaseDamageComponent_1.Dqr.Start();
      let e = 1;
      var r = this.Entity.GetComponent(0);
      if (ModelManager_1.ModelManager.GameModeModel.IsMulti && r.IsMonster()) {
        if (!((r = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize()) <= 1)) {
          e = r <= 2 ? CommonParamById_1.configCommonParamById.GetFloatConfig("MutiWorldToughRatio2") : CommonParamById_1.configCommonParamById.GetFloatConfig("MutiWorldToughRatio3");
        }
      }
      this.AttributeComponent.AddBaseValue(CharacterAttributeTypes_1.EAttributeId.Proto_Tough, -o * e);
      BaseDamageComponent_1.Dqr.Stop();
    }
    BaseDamageComponent_1.Rqr.Start();
    if (this.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_Tough) > 0) {
      if (t > 0 && o !== 0) {
        this.BuffComponent.AddBuff(CharacterBuffIds_1.buffId.ToughRecoverDelay, {
          InstigatorId: e.CreatureDataComponent?.GetCreatureDataId() ?? ActiveBuffConfigs_1.NULL_INSTIGATOR_ID,
          ApplyType: BaseAbilityComponent_1.EBuffApplyType.Proto_UseExtraTime,
          Reason: "韧性扣减后触发"
        });
      }
    } else if (!this.TagComponent.HasTag(-1112841587) && a > 0) {
      this.Uqr(true);
      r = this.AttributeComponent.GetCurrentValue(CharacterAttributeTypes_1.EAttributeId.Proto_WeakTime);
      this.Zbr = TimerSystem_1.TimerSystem.Delay(() => {
        if (this.TagComponent) {
          if (this.TagComponent.HasTag(31862857)) {
            this.Aqr();
          } else {
            this.Uqr(false);
          }
        }
        this.Zbr = undefined;
      }, r);
      this.AttributeComponent.SetBaseValue(CharacterAttributeTypes_1.EAttributeId.Proto_ToughRecover, 0);
    }
    BaseDamageComponent_1.Rqr.Stop();
  }
  Uqr(e) {
    if (e) {
      this.TagComponent.AddTag(-1112841587);
    } else {
      this.TagComponent.RemoveTag(-1112841587);
      this.zbr?.EndTask();
    }
    var t = Protocol_1.Aki.Protocol.T4n.create();
    t.F4n = this.Entity.GetComponent(0).GetCreatureDataId();
    t.o5n = e;
    CombatMessage_1.CombatNet.Call(29704, this.Entity, t, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (this.Zbr) {
          TimerSystem_1.TimerSystem.Remove(this.Zbr);
          this.Zbr = undefined;
        }
        this.TagComponent?.RemoveTag(-1112841587);
      }
    });
  }
  Aqr() {
    this.zbr = this.TagComponent.ListenForTagAddOrRemove(31862857, (e, t) => {
      if (!t) {
        this.Uqr(false);
      }
    });
  }
  TryExitWeakTime() {
    if (this.TagComponent.HasTag(-1112841587)) {
      if (this.Zbr) {
        TimerSystem_1.TimerSystem.Remove(this.Zbr);
        this.Zbr = undefined;
      }
      this.Uqr(false);
    }
  }
  rqr() {
    if (this.zbr) {
      this.zbr.EndTask();
      this.zbr = undefined;
    }
  }
  aqr(e) {
    var t = e.DamageData.Id;
    var a = e.Attacker.Jbr?.GetSkillLevelByDamageId(t);
    var t = e.Attacker.Entity.GetComponent(43)?.GetVisionLevelByDamageId(t);
    if (a && a > 0) {
      e.SkillLevel = a;
    } else if (t && t > 0) {
      e.SkillLevel = t;
    }
  }
  AddToughModifier(e, t) {
    if (!this.iqr.has(e)) {
      this.iqr.set(e, new Map());
    }
    e = this.iqr.get(e);
    e.set(t, 1 + (e.get(t) ?? 0));
  }
  RemoveToughModifier(e, t) {
    var a;
    var e = this.iqr.get(e);
    if (e) {
      if ((a = e.get(t)) >= 1) {
        e.set(t, a - 1);
      } else {
        e.delete(t);
      }
    }
  }
  GetExtraToughRate(e) {
    var t;
    var a;
    var e = this.iqr.get(e);
    if (!e) {
      return CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    }
    let o = CharacterAttributeTypes_1.PER_TEN_THOUSAND;
    for ([t, a] of e.entries()) {
      if (a > 0) {
        o *= Math.pow(t / CharacterAttributeTypes_1.PER_TEN_THOUSAND, a);
      }
    }
    return o;
  }
  nj1(e, t, a) {
    BaseDamageComponent_1.aj1.Start();
    this.vqr(e, t, a);
    ExtraEffectSnapModifier_1.SnapModifier.PreCriticalModify(e, a);
    ExtraEffectSnapModifier_1.SnapModifier.PostCriticalModify(e, a);
    BaseDamageComponent_1.aj1.Stop();
  }
};
BaseDamageComponent.nqr = Stats_1.Stat.Create("ExecuteBulletDamage1");
BaseDamageComponent.sqr = Stats_1.Stat.Create("ExecuteBulletDamage2");
BaseDamageComponent.hqr = Stats_1.Stat.Create("ExecuteBulletDamage3");
BaseDamageComponent.lqr = Stats_1.Stat.Create("ProcessDamage");
BaseDamageComponent.aj1 = Stats_1.Stat.Create("DamageDamageOptimize");
BaseDamageComponent.Eqr = Stats_1.Stat.Create("EventCharDamage");
BaseDamageComponent.Sqr = Stats_1.Stat.Create("PostExecDamageResult1");
BaseDamageComponent.yqr = Stats_1.Stat.Create("PostExecDamageResult2");
BaseDamageComponent.Iqr = Stats_1.Stat.Create("PostExecDamageResult3");
BaseDamageComponent.Tqr = Stats_1.Stat.Create("ExecToughReduce1");
BaseDamageComponent.Lqr = Stats_1.Stat.Create("ExecToughReduce2");
BaseDamageComponent.Dqr = Stats_1.Stat.Create("ExecToughReduce3");
BaseDamageComponent.Rqr = Stats_1.Stat.Create("ExecToughReduce4");
__decorate([CombatMessage_1.CombatNet.Listen("EFn", false)], BaseDamageComponent, "OnDamageExecuteNotify", null);
BaseDamageComponent = BaseDamageComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(19)], BaseDamageComponent);
exports.BaseDamageComponent = BaseDamageComponent; //# sourceMappingURL=BaseDamageComponent.js.map