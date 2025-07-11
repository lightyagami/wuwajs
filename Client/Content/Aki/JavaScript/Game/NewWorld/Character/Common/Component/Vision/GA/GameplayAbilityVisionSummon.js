"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayAbilityVisionSummon = undefined;
const Log_1 = require("../../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const PhantomUtil_1 = require("../../../../../../Module/Phantom/PhantomUtil");
const BulletController_1 = require("../../../../../Bullet/BulletController");
const RoleAudioController_1 = require("../../../../Role/RoleAudioController");
const GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase");
const GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
class GameplayAbilityVisionSummon extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
  constructor() {
    super(...arguments);
    this.MZo = undefined;
    this.oMt = undefined;
    this.ser = 0;
    this.OZo = undefined;
    this.kZo = undefined;
    this.aer = undefined;
    this.KZo = undefined;
    this.fAr = undefined;
    this.MAr = undefined;
    this.kQo = 0;
    this.ota = undefined;
    this.pAr = false;
    this.FZo = i => {
      if (i.BulletEntityId === this.ser) {
        this.EAr(i.MoveInfo.LastFramePosition.ToUeVector());
      }
    };
    this.b9_ = (i, t) => {
      if (this.pAr && this.MZo?.Valid && i === this.MZo.Id) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 28, "技能被全部打断，结束召唤幻象技能", ["reason", t]);
        }
        this.SAr();
      }
    };
  }
  OnCreate() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.BulletDestroy, this.FZo);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharStopAllSkills, this.b9_);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharStopGroup1Skill, this.b9_);
  }
  OnDestroy() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.BulletDestroy, this.FZo);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharStopAllSkills, this.b9_);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharStopGroup1Skill, this.b9_);
    this.eer();
  }
  OnActivateAbility() {
    if (!this.HZo()) {
      return false;
    }
    if (!this.her()) {
      this.BuffComponent.AddBuff(GameplayAbilityVisionMisc_1.ROLE_SUMMON_BUFF_ID, {
        InstigatorId: this.BuffComponent.CreatureDataId,
        Reason: "幻象召唤时触发子弹、镜头和特效"
      });
    }
    let t = undefined;
    var i = this.Entity.GetComponent(40);
    if (i?.Valid) {
      for (const e of i.GetAllActivatedSkill()) {
        if (e.SkillInfo?.SkillGenre === 9) {
          t = e.MNc;
          break;
        }
      }
    }
    for (let i = 0; i < this.oMt.葫芦轨迹子弹列表.Num(); ++i) {
      var s = this.oMt.葫芦轨迹子弹列表.Get(i);
      var s = BulletController_1.BulletController.CreateBulletCustomTarget(this.Entity, s.toString(), this.ActorComponent.ActorTransform, {}, t);
      if (s) {
        this.ser = s.Id;
        break;
      }
    }
    return true;
  }
  HZo() {
    this.MZo = PhantomUtil_1.PhantomUtil.GetSummonedEntity(this.VisionComponent.Entity, Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeConcomitantVision);
    return !!this.MZo.IsInit && !this.MZo.Entity.Active && (this.oMt = PhantomUtil_1.PhantomUtil.GetVisionData(this.VisionComponent.GetVisionId()), this.OZo = this.MZo.Entity.GetComponent(3), this.kZo = this.MZo.Entity.GetComponent(40), this.aer = this.MZo.Entity.GetComponent(205), this.KZo = this.MZo.Entity.GetComponent(174), this.fAr = this.MZo.Entity.GetComponent(21), true);
  }
  her() {
    return this.oMt.空中能否释放 && this.GameplayTagComponent.HasTag(40422668);
  }
  EAr(i) {
    var t = MathUtils_1.MathUtils.CommonTempVector;
    this.MoveComponent.GravityUp.Multiply(this.OZo.ScaledHalfHeight, t);
    this.OZo.SetActorLocationAndRotation(i.op_Addition(t.ToUeVector()), this.ActorComponent.ActorRotation, "召唤幻象生成位置");
    this.pAr = true;
    PhantomUtil_1.PhantomUtil.SetVisionEnable(this.VisionComponent.Entity, true, "GameplayAbilityVisionSummon.SetVisionEnable");
    this.GameplayTagComponent.AddTag(GameplayAbilityVisionMisc_1.summonTag);
    this.MAr ||= this.GameplayTagComponent.ListenForTagAddOrRemove(GameplayAbilityVisionMisc_1.summonTag, (i, t) => {
      if (!t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Battle", 28, "召唤幻象正常结束");
        }
        this.SAr();
      }
    });
    this.aer.AddTag(-993206571);
    this.KZo.AddBuff(GameplayAbilityVisionMisc_1.VISION_SUMMON_BUFF_ID, {
      InstigatorId: this.KZo.CreatureDataId,
      Reason: "召唤系幻象的出生特效"
    });
    this.kZo.SetSkillAcceptInput(true);
    var i = this.oMt.技能ID;
    if (i > 0) {
      this.kZo.BeginSkill(i, {
        Target: this.SkillComponent.SkillTarget?.Entity,
        SocketName: this.SkillComponent.SkillTargetSocket,
        Reason: "GameplayAbilityVisionSummon.BeginSkill"
      });
    }
    RoleAudioController_1.RoleAudioController.PlayRoleAudio(this.Entity, 2002);
  }
  SAr() {
    this.eer();
    this.NZo();
  }
  eer() {
    if (this.MAr) {
      this.MAr.EndTask();
      this.MAr = undefined;
    }
  }
  NZo() {
    this.ota = TimerSystem_1.TimerSystem.Delay(() => {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Battle", 28, "幻象消失材质没有正常结束，被保底");
      }
      this.iba();
    }, GameplayAbilityVisionMisc_1.VISION_HIDDEN_DELAY);
    this.fAr?.AddCue(GameplayAbilityVisionMisc_1.SUMMON_PARTICLE_CUE_ID, {
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
  iba() {
    this.ota = undefined;
    if (this.MZo?.Valid) {
      BulletController_1.BulletController.CreateBulletCustomTarget(this.MZo.Entity, GameplayAbilityVisionMisc_1.VISION_END_BULLET, undefined);
      this.pAr = false;
      PhantomUtil_1.PhantomUtil.SetVisionEnable(this.VisionComponent.Entity, false, "GameplayAbilityVisionSummon.SetVisionEnable");
      this.fAr?.RemoveCueByHandle(this.kQo);
    }
  }
}
exports.GameplayAbilityVisionSummon = GameplayAbilityVisionSummon;
//# sourceMappingURL=GameplayAbilityVisionSummon.js.map