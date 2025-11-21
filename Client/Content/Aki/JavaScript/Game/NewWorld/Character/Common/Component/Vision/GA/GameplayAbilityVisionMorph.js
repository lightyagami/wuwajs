"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayAbilityVisionMorph = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const CollisionUtils_1 = require("../../../../../../../Core/Utils/CollisionUtils");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const TraceElementCommon_1 = require("../../../../../../../Core/Utils/TraceElementCommon");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const CombatLog_1 = require("../../../../../../Utils/CombatLog");
const BulletController_1 = require("../../../../../Bullet/BulletController");
const RoleAudioController_1 = require("../../../../Role/RoleAudioController");
const SkillUtils_1 = require("../../Skill/SkillUtils");
const GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase");
const GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionMorph extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
  constructor() {
    super(...arguments);
    this.VisionEntity = undefined;
    this.VisionData = undefined;
    this.VisionActorComponent = undefined;
    this.g6c = undefined;
    this.VisionBuffComponent = undefined;
    this.fAr = undefined;
    this.TSa = undefined;
    this.VisionSkillComponent = undefined;
    this.XZo = undefined;
    this.C6c = undefined;
    this.rta = undefined;
    this.ota = undefined;
    this.pAr = false;
    this.vAr = false;
    this.zZo = false;
    this.ZZo = false;
    this.kQo = 0;
  }
  OnCreate() {
    this.C6c = this.GameplayTagComponent.ListenForTagAddOrRemove(GameplayAbilityVisionMisc_1.stealthTag, (i, t) => {
      if (t) {
        this.g6c?.AddTag(GameplayAbilityVisionMisc_1.stealthTag);
      } else {
        this.g6c?.RemoveTag(GameplayAbilityVisionMisc_1.stealthTag);
      }
    });
  }
  OnDestroy() {
    this.eer();
    this.VisionSkillComponent?.OnVisionAbilityDestroy();
    this.C6c?.EndTask();
  }
  OnTick(i) {
    var t;
    var s;
    var e;
    if (this.zZo) {
      t = this.VisionActorComponent.ScaledHalfHeight - this.ActorComponent.ScaledHalfHeight;
      (s = GameplayAbilityVisionMisc_1.tempVector1).DeepCopy(this.VisionActorComponent.ActorLocationProxy);
      e = GameplayAbilityVisionMisc_1.tempVector2;
      this.MoveComponent.GravityUp.Multiply(t, e);
      s.SubtractionEqual(e);
      if (this.Wxr(this.ActorComponent.ActorLocationProxy, s)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 28, "变身OnTick过程穿墙，需打断幻象变身技能");
        }
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VisionMorphInterrupt);
        this.SkillComponent.EndSkill(this.SkillComponent.CurrentSkill?.SkillId ?? 0, "GameplayAbilityVisionMorph.IsHit");
      } else {
        this.ActorComponent.SetActorLocationAndRotation(s.ToUeVector(), this.VisionActorComponent.ActorRotation, "GameplayAbilityVisionMorph.OnTick", false);
        if (this.ZZo) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Battle", 28, "GameplayAbilityVisionMorph.OnTick设置位置", ["人的位置", this.ActorComponent.ActorLocationProxy], ["幻象的位置", this.VisionActorComponent.ActorLocationProxy]);
          }
          this.ZZo = false;
        }
      }
    }
  }
  OnActivateAbility() {
    return !this.pAr && !!this.AU() && !(this.pAr = true, this.VisionData.空中能否释放 || this.SkillComponent.PlaySkillMontage(0, "", 0), this.aZo(false), this.GameplayTagComponent.AddTag(GameplayAbilityVisionMisc_1.invincibleTag), this.BuffComponent.RemoveBuff(GameplayAbilityVisionMisc_1.ROLE_DODGE_FORBID_BUFF_ID, -1, "幻象变身技能激活时移除角色禁止闪避的Buff"), this.CueComponent.AddCue(GameplayAbilityVisionMisc_1.ROLE_HIDE_CUE_ID, {
      Sync: true,
      Instant: true
    }), this.rta = TimerSystem_1.TimerSystem.Delay(() => {
      this.ier(true);
    }, GameplayAbilityVisionMisc_1.CHARACTER_HIDDEN_DELAY * (ModelManager_1.ModelManager.CharacterModel?.SelfCenteredTimeDilation ?? 1)), this.oer(), 0);
  }
  OnEndAbility() {
    if (this.pAr) {
      this.pAr = false;
      this.ner(false);
      this.GameplayTagComponent.RemoveTag(GameplayAbilityVisionMisc_1.invincibleTag);
      this.GameplayTagComponent.RemoveTag(GameplayAbilityVisionMisc_1.morphTag);
    }
    return true;
  }
  OnChangeVision() {
    this.VisionSkillComponent?.ExitMultiSkillState();
    this.g6c = undefined;
  }
  HandlePress(i, t) {
    return !!this.VisionSkillComponent && this.VisionSkillComponent.HandlePress(i, t);
  }
  AU() {
    this.PreInit();
    return !!this.VisionEntity.IsInit && (!this.NeedNoActive() || !this.VisionEntity.Entity.Active) && !(this.NeedNoAi() && this.VisionEntity.Entity.GetComponent(47)?.IsEnabled() ? (CombatLog_1.CombatLog.Error("Skill", this.VisionEntity.Entity, "变身幻象不能配置AI，请检查一下AI配置"), 1) : (this.VisionActorComponent = this.VisionEntity.Entity.GetComponent(3), this.g6c = this.VisionEntity.Entity.GetComponent(209), this.VisionBuffComponent = this.VisionEntity.Entity.GetComponent(178), this.fAr = this.VisionEntity.Entity.GetComponent(21), this.TSa = this.VisionEntity.Entity.GetComponent(182), this.VisionSkillComponent = this.VisionEntity.Entity.GetComponent(42), this.VisionSkillComponent.InitVisionSkill(this.EntityHandle, true), 0));
  }
  aZo(i) {
    CollisionUtils_1.CollisionUtils.SetCollisionResponseToPawn(this.VisionActorComponent.Actor.CapsuleComponent, 2, i ? 2 : 0);
    this.VisionActorComponent.Actor.CapsuleComponent.IgnoreActorWhenMoving(this.ActorComponent.Actor, !i);
    this.ActorComponent.Actor.CapsuleComponent.IgnoreActorWhenMoving(this.VisionActorComponent.Actor, !i);
  }
  oer() {
    this.vAr = true;
    this.TSa.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
    this.SetVisionEnable(true);
    var i = GameplayAbilityVisionMisc_1.tempVector1;
    this.MoveComponent.GravityUp.Multiply(this.VisionActorComponent.ScaledHalfHeight - this.ActorComponent.ScaledHalfHeight, i);
    this.VisionActorComponent.SetActorLocationAndRotation(this.ActorComponent.ActorLocation.op_Addition(i.ToUeVector()), this.ActorComponent.ActorRotation, "幻象变身出现位置", false);
    this.ZZo = true;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Battle", 28, "GameplayAbilityVisionMorph.MorphBegin设置位置", ["人的位置", this.ActorComponent.ActorLocationProxy], ["幻象的位置", this.VisionActorComponent.ActorLocationProxy]);
    }
    this.zZo = true;
    this.GameplayTagComponent.AddTag(GameplayAbilityVisionMisc_1.morphTag);
    this.XZo ||= this.GameplayTagComponent.ListenForTagAddOrRemove(GameplayAbilityVisionMisc_1.morphTag, (i, t) => {
      if (!t) {
        this.ner(true);
      }
    });
    this.VisionBuffComponent.AddBuff(GameplayAbilityVisionMisc_1.VISION_APPEAR_BUFF_ID, {
      InstigatorId: this.VisionBuffComponent.CreatureDataId,
      Reason: "开始幻象变身时幻象自身的材质和粒子"
    });
    var i = this.VisionData.技能ID;
    if (i > 0) {
      this.VisionSkillComponent.BeginSkill(i, {
        Target: this.SkillComponent.SkillTarget?.Entity,
        SocketName: this.SkillComponent.SkillTargetSocket,
        Reason: "VisionSkill.BeginSkill",
        CheckMultiSkill: true
      });
      this.SkillComponent.SkillTarget = this.VisionSkillComponent.SkillTarget;
      this.SkillComponent.SkillTargetSocket = this.VisionSkillComponent.SkillTargetSocket;
    }
    RoleAudioController_1.RoleAudioController.PlayRoleAudio(this.Entity, 2001);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VisionMorphBegin, this.VisionEntity, this.EntityHandle);
    EventSystem_1.EventSystem.EmitWithTargets([this.EntityHandle.Entity, this.VisionEntity.Entity], EventDefine_1.EEventName.VisionMorphBegin, this.VisionEntity, this.EntityHandle);
  }
  ner(i) {
    var t;
    var s;
    if (this.vAr) {
      this.vAr = false;
      this.eer();
      this.NZo();
      this.ier(false);
      this.MoveComponent.SetForceSpeed(Vector_1.Vector.ZeroVectorProxy);
      t = this.rer();
      s = () => {
        this.SkillComponent.EndSkill(this.SkillComponent.CurrentSkill?.SkillId ?? 0, "GameplayAbilityVisionMorph.MorphEnd");
      };
      if (i && t) {
        this.SkillComponent.PlaySkillMontage(1, "", 0, s);
      } else {
        s();
      }
      this.VisionSkillComponent.OnMorphEnd();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.VisionMorphEnd, this.EntityHandle, this.VisionEntity);
      EventSystem_1.EventSystem.EmitWithTargets([this.EntityHandle.Entity, this.VisionEntity.Entity], EventDefine_1.EEventName.VisionMorphEnd, this.EntityHandle, this.VisionEntity);
    }
  }
  ier(i) {
    if (!i) {
      this.CueComponent.AddCue(GameplayAbilityVisionMisc_1.ROLE_APPEAR_CUE_ID, {
        Sync: true,
        Instant: true
      });
      MathUtils_1.MathUtils.LookRotationUpFirst(this.ActorComponent.ActorForwardProxy, this.MoveComponent.GravityUp, GameplayAbilityVisionMisc_1.tempRotator);
      this.ActorComponent.SetActorRotation(GameplayAbilityVisionMisc_1.tempRotator.ToUeRotator(), "GameplayAbilityVisionMorph.SetCharacterHidden");
    }
    ControllerHolder_1.ControllerHolder.CreatureController.SetActorVisible(this.Entity, !i, true, true, "幻象变身技能隐藏角色", true);
  }
  eer() {
    this.zZo = false;
    if (this.XZo) {
      this.XZo.EndTask();
      this.XZo = undefined;
    }
    if (this.rta && TimerSystem_1.TimerSystem.Has(this.rta)) {
      TimerSystem_1.TimerSystem.Remove(this.rta);
      this.rta = undefined;
    }
  }
  rer() {
    var i = SkillUtils_1.SkillUtils.GetStaticLineTrace();
    var t = this.ActorComponent.ActorLocationProxy;
    var s = this.ActorComponent.ScaledHalfHeight + 20;
    var e = GameplayAbilityVisionMisc_1.tempVector1;
    this.MoveComponent.GravityDirect.Multiply(s, e);
    e.AdditionEqual(t);
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(i, t);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(i, e);
    var s = TraceElementCommon_1.TraceElementCommon.LineTrace(i, "GameplayAbilityVisionMorph.FixMovementMode");
    return s && i.HitResult.bBlockingHit;
  }
  NZo() {
    this.ota = TimerSystem_1.TimerSystem.Delay(() => {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 28, "幻象消失材质没有正常结束，被保底");
      }
      this.iba();
    }, GameplayAbilityVisionMisc_1.VISION_HIDDEN_DELAY * (ModelManager_1.ModelManager.CharacterModel?.SelfCenteredTimeDilation ?? 1));
    this.fAr?.AddCue(GameplayAbilityVisionMisc_1.MORPH_PARTICLE_CUE_ID, {
      Sync: true,
      Instant: true
    });
    this.kQo = this.fAr.AddCue(GameplayAbilityVisionMisc_1.MATERIAL_CUE_ID, {
      EndCallback: () => {
        if (TimerSystem_1.TimerSystem.Has(this.ota)) {
          TimerSystem_1.TimerSystem.Remove(this.ota);
          this.iba();
        }
      },
      Sync: true
    });
  }
  Wxr(i, t) {
    var s = SkillUtils_1.SkillUtils.GetStaticLineTrace();
    TraceElementCommon_1.TraceElementCommon.SetStartLocation(s, i);
    TraceElementCommon_1.TraceElementCommon.SetEndLocation(s, t);
    var i = TraceElementCommon_1.TraceElementCommon.LineTrace(s, "GameplayAbilityVisionMorph.FixLocation");
    return i && s.HitResult.bBlockingHit;
  }
  iba() {
    this.ota = undefined;
    if (this.pAr) {
      this.GameplayTagComponent.RemoveTag(GameplayAbilityVisionMisc_1.invincibleTag);
    }
    if (this.VisionEntity?.Valid) {
      BulletController_1.BulletController.CreateBulletCustomTarget(this.VisionEntity.Entity, GameplayAbilityVisionMisc_1.VISION_END_BULLET, undefined);
      this.fAr?.RemoveCueByHandle(this.kQo);
      this.SetVisionEnable(false);
      this.aZo(true);
    }
  }
  SetVisionEnable(i) {
    PhantomUtil_1.PhantomUtil.SetVisionEnable(this.VisionComponent.Entity, i, "GameplayAbilityVisionMorph.SetVisionEnable");
  }
  NeedNoAi() {
    return true;
  }
  NeedNoActive() {
    return true;
  }
  PreInit() {
    this.VisionEntity = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.VisionComponent.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision);
    this.VisionData = PhantomUtil_1.PhantomUtil.GetVisionData(this.VisionComponent.GetVisionId());
  }
}
exports.GameplayAbilityVisionMorph = GameplayAbilityVisionMorph;
//# sourceMappingURL=GameplayAbilityVisionMorph.js.map