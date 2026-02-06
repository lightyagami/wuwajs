"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayAbilityVisionShowNew = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const CalabashDevelopRewardByMonsterId_1 = require("../../../../../../../Core/Define/ConfigQuery/CalabashDevelopRewardByMonsterId");
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../../../../../Core/Net/Net");
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const CollisionUtils_1 = require("../../../../../../../Core/Utils/CollisionUtils");
const MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const EffectSystem_1 = require("../../../../../../Effect/EffectSystem");
const Global_1 = require("../../../../../../Global");
const GlobalData_1 = require("../../../../../../GlobalData");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const WaitEntityTask_1 = require("../../../../../../World/Define/WaitEntityTask");
const BulletController_1 = require("../../../../../Bullet/BulletController");
const CharacterBuffIds_1 = require("../../Abilities/CharacterBuffIds");
const InputDefine_1 = require("../../Input/InputLayerFunction/InputDefine");
const GameplayAbilityVisionBase_1 = require("./GameplayAbilityVisionBase");
const GameplayAbilityVisionMisc_1 = require("./GameplayAbilityVisionMisc");
const CREATE_VISION_EFFECT_PATH = "/Game/Aki/Effect/EffectGroup/Common/Vision/DA_Fx_Group_Vision_Summon_Loop.DA_Fx_Group_Vision_Summon_Loop";
const CANNOT_SHOW_VISION_BUFF_ID = 70067005;
class GameplayAbilityVisionShowNew extends GameplayAbilityVisionBase_1.GameplayAbilityVisionBase {
  constructor() {
    super(...arguments);
    this.HasNoNewTag = true;
    this.dJf = false;
    this.qUf = undefined;
    this._Ef = undefined;
    this.fAr = undefined;
    this.vDr = undefined;
    this.PCg = undefined;
    this.FZo = i => {
      if (i.BulletDataMain.Execution.SendGameplayEventTagToAttackerOnEnd.TagId === -1140906579 && !this.GameplayTagComponent.HasTag(GameplayAbilityVisionMisc_1.morphTag) && i.AttackerActorComp?.IsAutonomousProxy && ModelManager_1.ModelManager.PhantomInteractModel.SummonMonsterId > 0) {
        this.OUf(i.MoveInfo.LastFramePosition);
        this.Summon(i.MoveInfo.LastFramePosition.ToUeVector());
      }
    };
    this.mJf = i => {
      if (this.TQ_ !== undefined && i.BulletEntityId === this.TQ_) {
        this.mEf();
      }
    };
    this.uEf = undefined;
    this.kZo = undefined;
    this.MAr = undefined;
    this.cEf = i => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Temp", 31, "[GameplayAbilityVisionShowNew.OnWaitVisionSummon] ", ["result", i]);
      }
      GameplayAbilityVisionShowNew.lEf &&= undefined;
      if (this.qUf !== undefined) {
        EffectSystem_1.EffectSystem.StopEffectById(this.qUf, "VisionEffectCreated", true);
        this.qUf = undefined;
      }
      if (i && this._Ef && (GameplayAbilityVisionShowNew.MZo = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this._Ef), GameplayAbilityVisionShowNew.MZo) && GameplayAbilityVisionShowNew.MZo.Valid && (this.uEf = GameplayAbilityVisionShowNew.MZo.Entity.GetComponent(3), this.uEf) && this.uEf.Valid && (this.fAr = GameplayAbilityVisionShowNew.MZo.Entity.GetComponent(21), this.fAr) && this.fAr.Valid && (i = GameplayAbilityVisionShowNew.MZo.Entity.GetComponent(222)) && i.Valid && (i.AddBuff(CharacterBuffIds_1.gameplayAbilityVisionBuffId.VisionSummonBuffId, {
        InstigatorId: i.CreatureDataId,
        Reason: "GameplayAbilityVisionShow.Summon"
      }), ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(GameplayAbilityVisionShowNew.MZo.Entity, true, "GameplayAbilityVisionSummon.SetVisionEnable", true), this.aZo(true), this.PlayerTagComp?.AddTag(GameplayAbilityVisionMisc_1.newShowVisionTag), this.MAr ||= this.PlayerTagComp?.ListenForTagAddOrRemove(GameplayAbilityVisionMisc_1.newShowVisionTag, (i, t) => {
        if (!t) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Battle", 28, "召唤幻象正常结束");
          }
          this.SAr();
        }
      }), this.kZo = GameplayAbilityVisionShowNew.MZo.Entity.GetComponent(43), this.kZo) && this.kZo.Valid) {
        if (!!this.HasNoNewTag || !this.dJf) {
          this.kZo.BeginSkillAsync(GameplayAbilityVisionMisc_1.EXPLORE_SKILL_ID, {
            Reason: "GameplayAbilityVisionShow.PostSummon"
          });
        }
        EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.zpe);
      }
    };
    this.ota = undefined;
    this.kQo = 0;
    this.TQ_ = undefined;
    this.zpe = (i, t) => {
      if (t.CreatureDataId === this._Ef) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Temp", 31, "[GameplayAbilityVisionShowNew.OnRemoveEntity] Vision被移除", ["removeType", i]);
        }
        this.eer();
        this.PlayerTagComp?.RemoveTag(GameplayAbilityVisionMisc_1.newShowVisionTag);
        this._Ef = undefined;
        GameplayAbilityVisionShowNew.MZo = undefined;
        this.uEf = undefined;
        this.kZo = undefined;
        this.PlayerBuffComp?.RemoveBuff(CANNOT_SHOW_VISION_BUFF_ID, 1, "GameplayAbilityVisionShowNew");
        this.dSe();
      }
    };
    this.M6l = () => {
      this.PCg = this.UXf;
      if (this.GameplayTagComponent.HasTag(-1281364710)) {
        this.PCg?.AddTag(-1281364710);
      }
      if (this.GameplayTagComponent.HasTag(508505238)) {
        this.PCg?.AddTag(508505238);
      }
    };
    this.E6l = () => {
      this.PCg?.RemoveTag(-1281364710);
      this.PCg?.RemoveTag(508505238);
      this.PCg = undefined;
    };
    this.syg = (i, t) => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Temp", 31, "[GameplayAbilityVisionShowNew.OnVisionTagChange] ", ["tagId", i], ["tagExist", t]);
      }
      if (i === -1281364710 && (this.UXf || this.PCg)) {
        if (t) {
          this.UXf?.AddTag(-1281364710);
          this.PCg = this.UXf;
        } else {
          this.UXf?.RemoveTag(-1281364710);
          this.PCg = undefined;
        }
      }
      if (i === 508505238 && (this.UXf || this.PCg)) {
        if (t) {
          this.UXf?.AddTag(508505238);
          this.PCg = this.UXf;
        } else {
          this.UXf?.RemoveTag(508505238);
          this.PCg = undefined;
        }
      }
    };
  }
  OnCreate() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.BulletDestroy, this.FZo);
  }
  OnDestroy() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.BulletDestroy, this.FZo);
    if (!GameplayAbilityVisionShowNew.MZo && !GameplayAbilityVisionShowNew.lEf) {
      this.PlayerBuffComp?.RemoveBuff(CANNOT_SHOW_VISION_BUFF_ID, 1, "GameplayAbilityVisionShowNew");
    }
    if (this.vDr) {
      TimerSystem_1.TimerSystem.Remove(this.vDr);
      this.vDr = undefined;
    }
    this.dSe();
  }
  OnActivateAbility() {
    if (GameplayAbilityVisionShowNew.MZo && GameplayAbilityVisionShowNew.MZo.Valid) {
      this.SkillComponent.EndSkill(this.SkillComponent.CurrentSkill?.SkillId ?? 0, "GameplayAbilityVisionShow.HadVisionEntity");
      return false;
    } else {
      this.HasNoNewTag = !this.PlayerTagComp?.HasTag(GameplayAbilityVisionMisc_1.newVisionInteractTag);
      if (this.hgf()) {
        this.SkillComponent.EndSkill(this.SkillComponent.CurrentSkill?.SkillId ?? 0, "GameplayAbilityVisionShow.OnActivateAbility");
      } else {
        this.SkillComponent.PlaySkillMontage(0, "", 0, () => {
          this.SkillComponent.EndSkill(this.SkillComponent.CurrentSkill?.SkillId ?? 0, "GameplayAbilityVisionShow.OnActivateAbility");
        });
      }
      this.mSe();
      return true;
    }
  }
  OUf(i) {
    if (this.qUf !== undefined) {
      EffectSystem_1.EffectSystem.StopEffectById(this.qUf, "NeedShowNewEffect", true);
      this.qUf = undefined;
    }
    var t = new UE.TransformDouble();
    t.SetLocation(i.ToUeVector());
    this.qUf = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, t, CREATE_VISION_EFFECT_PATH, "WaitVisionEntityCreate");
  }
  Summon(i) {
    var t = ModelManager_1.ModelManager.PhantomInteractModel.SummonMonsterId;
    var e = CalabashDevelopRewardByMonsterId_1.configCalabashDevelopRewardByMonsterId.GetConfig(t);
    this.dJf = e?.IsWorldInteractable ?? false;
    var e = this.ActorComponent.CreatureData.GetCreatureDataId();
    var s = ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId();
    var o = Protocol_1.Aki.Protocol.s4s.create();
    o.r5n = InputDefine_1.SKILL_ID_SHOW_VISION;
    o.rVn = false;
    o.l8n = i;
    var i = Protocol_1.Aki.Protocol.D2s.create();
    var a = this.ActorComponent.ActorRotationProxy;
    i.Pitch = 0;
    i.Yaw = a.Yaw;
    i.Roll = 0;
    o._8n = i;
    o.UKn = t;
    o.RKn = MathUtils_1.MathUtils.NumberToLong(s);
    var a = Protocol_1.Aki.Protocol.rSf.create();
    a.DKn = o;
    a.AKn = MathUtils_1.MathUtils.NumberToLong(e);
    GameplayAbilityVisionShowNew.lEf = WaitEntityTask_1.WaitEntityTask.Create("[GameplayAbilityVisionShow.Summon] WaitVisionSummon", s, this.cEf, -1, false, true);
    this.dEf(a, s);
    this._Ef = s;
  }
  async dEf(i, t) {
    i = await Net_1.Net.CallAsync(28196, i);
    if (i.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(t, "GameplayAbilityVisionShowNew");
      if (GameplayAbilityVisionShowNew.lEf) {
        GameplayAbilityVisionShowNew.lEf.Cancel();
      }
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(i.Q4n, 15057);
      this.PlayerBuffComp?.RemoveBuff(CANNOT_SHOW_VISION_BUFF_ID, 1, "GameplayAbilityVisionShowNew");
      this.dSe();
    }
    return true;
  }
  aZo(i) {
    CollisionUtils_1.CollisionUtils.SetCollisionResponseToPawn(this.uEf.Actor.CapsuleComponent, 2, i ? 2 : 0);
    this.uEf.Actor.CapsuleComponent.IgnoreActorWhenMoving(this.ActorComponent.Actor, !i);
    this.ActorComponent.Actor.CapsuleComponent.IgnoreActorWhenMoving(this.uEf.Actor, !i);
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
    var i;
    this.ota = undefined;
    if (GameplayAbilityVisionShowNew.MZo?.Valid) {
      if ((i = BulletController_1.BulletController.CreateBulletCustomTarget(GameplayAbilityVisionShowNew.MZo.Entity, GameplayAbilityVisionMisc_1.VISION_END_BULLET, undefined)) && i.Valid) {
        this.TQ_ = i.Id;
        EventSystem_1.EventSystem.OnceWithTarget(GameplayAbilityVisionShowNew.MZo.Entity, EventDefine_1.EEventName.BulletDestroy, this.mJf);
      }
      this.SetVisionEnable(false);
      this.vDr = TimerSystem_1.TimerSystem.Delay(() => {
        if (EventSystem_1.EventSystem.HasWithTarget(GameplayAbilityVisionShowNew.MZo.Entity, EventDefine_1.EEventName.BulletDestroy, this.mJf)) {
          EventSystem_1.EventSystem.RemoveWithTarget(GameplayAbilityVisionShowNew.MZo.Entity, EventDefine_1.EEventName.BulletDestroy, this.mJf);
        }
        this.mEf();
      }, 5000);
      this.fAr?.RemoveCueByHandle(this.kQo);
    }
  }
  async mEf() {
    var i;
    var t;
    if (TimerSystem_1.TimerSystem.Has(this.vDr)) {
      TimerSystem_1.TimerSystem.Remove(this.vDr);
      this.vDr = undefined;
    }
    return !!this._Ef && !!GameplayAbilityVisionShowNew.MZo && !!GameplayAbilityVisionShowNew.MZo.Valid && (t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), t = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(t)?.GetComponent(0)?.GetCreatureDataId(), (i = Protocol_1.Aki.Protocol.scs.create()).xKn = [GameplayAbilityVisionShowNew.MZo.CreatureDataId], i.PKn = Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce, i.r5n = InputDefine_1.SKILL_ID_SHOW_VISION, i.YWn = t, (t = await Net_1.Net.CallAsync(16689, i)).G9n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.G9n, 16968), false) : (this._Ef = undefined, GameplayAbilityVisionShowNew.MZo = undefined, this.uEf = undefined, this.kZo = undefined, this.PlayerBuffComp?.RemoveBuff(CANNOT_SHOW_VISION_BUFF_ID, 1, "GameplayAbilityVisionShowNew"), this.dSe(), true));
  }
  SetVisionEnable(i) {
    ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(GameplayAbilityVisionShowNew.MZo.Entity, i, "GameplayAbilityVisionSummon.SetVisionEnable", true);
    if (this.TQ_ === undefined) {
      this.mEf();
    }
  }
  get PlayerEntity() {
    var i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    return ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(i);
  }
  get PlayerTagComp() {
    return this.PlayerEntity?.GetComponent(217);
  }
  get PlayerBuffComp() {
    return this.PlayerEntity?.GetComponent(222);
  }
  hgf() {
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return !!i && !!(i = i.Entity.CheckGetComponent(242)) && i.VehicleType === "Motorcycle";
  }
  get UXf() {
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (i) {
      i = i.Entity.CheckGetComponent(242);
      if (i && i.VehicleType === "Motorcycle") {
        i = i.VehicleEntity?.CheckGetComponent(217);
        if (i) {
          return i;
        }
      }
    }
  }
  mSe() {
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnEnterVehicle, this.M6l)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    }
    if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l)) {
      EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    }
    if (!this.GameplayTagComponent.HasTagAddOrRemoveListener(-1281364710, this.syg)) {
      this.GameplayTagComponent.AddTagAddOrRemoveListener(-1281364710, this.syg);
    }
    if (!this.GameplayTagComponent.HasTagAddOrRemoveListener(508505238, this.syg)) {
      this.GameplayTagComponent.AddTagAddOrRemoveListener(508505238, this.syg);
    }
    if (this.hgf() && (this.GameplayTagComponent.HasTag(-1281364710) && (this.UXf?.AddTag(-1281364710), this.PCg = this.UXf), this.GameplayTagComponent.HasTag(508505238))) {
      this.UXf?.AddTag(508505238);
      this.PCg = this.UXf;
    }
  }
  dSe() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnEnterVehicle, this.M6l)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    }
    if (this.Entity && this.GameplayTagComponent.HasTagAddOrRemoveListener(-1281364710, this.syg)) {
      this.GameplayTagComponent.RemoveTagAddOrRemoveListener(-1281364710, this.syg);
    }
    if (this.Entity && this.GameplayTagComponent.HasTagAddOrRemoveListener(508505238, this.syg)) {
      this.GameplayTagComponent.RemoveTagAddOrRemoveListener(508505238, this.syg);
    }
  }
}
(exports.GameplayAbilityVisionShowNew = GameplayAbilityVisionShowNew).lEf = undefined;
GameplayAbilityVisionShowNew.MZo = undefined; //# sourceMappingURL=GameplayAbilityVisionShowNew.js.map