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
    this.zvf = undefined;
    this.HasNoNewTag = true;
    this.Y6f = false;
    this.hRf = undefined;
    this.Jvf = undefined;
    this.fAr = undefined;
    this.vDr = undefined;
    this.TJf = undefined;
    this.FZo = i => {
      if (i.BulletDataMain.Execution.SendGameplayEventTagToAttackerOnEnd.TagId === -1140906579 && !this.GameplayTagComponent.HasTag(GameplayAbilityVisionMisc_1.morphTag) && i.AttackerActorComp?.IsAutonomousProxy) {
        this.lRf(i.MoveInfo.LastFramePosition);
        this.Summon(i.MoveInfo.LastFramePosition.ToUeVector());
      }
    };
    this.z6f = i => {
      if (this.TQ_ !== undefined && i.BulletEntityId === this.TQ_) {
        this.iyf();
      }
    };
    this.MZo = undefined;
    this.Zvf = undefined;
    this.kZo = undefined;
    this.MAr = undefined;
    this.eyf = i => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Temp", 31, "[GameplayAbilityVisionShowNew.OnWaitVisionSummon] ", ["result", i]);
      }
      this.zvf &&= undefined;
      if (this.hRf !== undefined) {
        EffectSystem_1.EffectSystem.StopEffectById(this.hRf, "VisionEffectCreated", true);
        this.hRf = undefined;
      }
      if (i && this.Jvf && (this.MZo = ModelManager_1.ModelManager.CreatureModel?.GetEntity(this.Jvf), this.MZo) && this.MZo.Valid && (this.Zvf = this.MZo.Entity.GetComponent(3), this.Zvf) && this.Zvf.Valid && (this.fAr = this.MZo.Entity.GetComponent(21), this.fAr) && this.fAr.Valid && (i = this.MZo.Entity.GetComponent(220)) && i.Valid && (i.AddBuff(CharacterBuffIds_1.gameplayAbilityVisionBuffId.VisionSummonBuffId, {
        InstigatorId: i.CreatureDataId,
        Reason: "GameplayAbilityVisionShow.Summon"
      }), ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.MZo.Entity, true, "GameplayAbilityVisionSummon.SetVisionEnable", true), this.aZo(true), this.PlayerTagComp.AddTag(GameplayAbilityVisionMisc_1.newShowVisionTag), this.MAr ||= this.PlayerTagComp.ListenForTagAddOrRemove(GameplayAbilityVisionMisc_1.newShowVisionTag, (i, t) => {
        if (!t) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Battle", 28, "召唤幻象正常结束");
          }
          this.SAr();
        }
      }), this.kZo = this.MZo.Entity.GetComponent(41), this.kZo) && this.kZo.Valid) {
        if (!!this.HasNoNewTag || !this.Y6f) {
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
      if (t.CreatureDataId === this.Jvf) {
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.zpe);
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Temp", 31, "[GameplayAbilityVisionShowNew.OnRemoveEntity] Vision被移除", ["removeType", i]);
        }
        this.eer();
        this.PlayerTagComp.RemoveTag(GameplayAbilityVisionMisc_1.newShowVisionTag);
        this.Jvf = undefined;
        this.MZo = undefined;
        this.Zvf = undefined;
        this.kZo = undefined;
        this.PlayerBuffComp.RemoveBuff(CANNOT_SHOW_VISION_BUFF_ID, 1, "GameplayAbilityVisionShowNew");
        this.dSe();
      }
    };
    this.M6l = () => {
      this.TJf = this.TVf;
      if (this.GameplayTagComponent.HasTag(-1281364710)) {
        this.TJf?.AddTag(-1281364710);
      }
      if (this.GameplayTagComponent.HasTag(508505238)) {
        this.TJf?.AddTag(508505238);
      }
    };
    this.E6l = () => {
      this.TJf?.RemoveTag(-1281364710);
      this.TJf?.RemoveTag(508505238);
      this.TJf = undefined;
    };
    this.fZf = (i, t) => {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Temp", 31, "[GameplayAbilityVisionShowNew.OnVisionTagChange] ", ["tagId", i], ["tagExist", t]);
      }
      if (i === -1281364710 && (this.TVf || this.TJf)) {
        if (t) {
          this.TVf?.AddTag(-1281364710);
          this.TJf = this.TVf;
        } else {
          this.TVf?.RemoveTag(-1281364710);
          this.TJf = undefined;
        }
      }
      if (i === 508505238 && (this.TVf || this.TJf)) {
        if (t) {
          this.TVf?.AddTag(508505238);
          this.TJf = this.TVf;
        } else {
          this.TVf?.RemoveTag(508505238);
          this.TJf = undefined;
        }
      }
    };
  }
  OnCreate() {
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.BulletDestroy, this.FZo);
  }
  OnDestroy() {
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.BulletDestroy, this.FZo);
  }
  OnActivateAbility() {
    if (this.MZo && this.MZo.Valid) {
      this.SkillComponent.EndSkill(this.SkillComponent.CurrentSkill?.SkillId ?? 0, "GameplayAbilityVisionShow.HadVisionEntity");
      return false;
    } else {
      this.HasNoNewTag = !this.PlayerTagComp.HasTag(GameplayAbilityVisionMisc_1.newVisionInteractTag);
      if (this.F_f()) {
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
  lRf(i) {
    if (this.hRf !== undefined) {
      EffectSystem_1.EffectSystem.StopEffectById(this.hRf, "NeedShowNewEffect", true);
      this.hRf = undefined;
    }
    var t = new UE.TransformDouble();
    t.SetLocation(i.ToUeVector());
    this.hRf = EffectSystem_1.EffectSystem.SpawnEffect(GlobalData_1.GlobalData.World, t, CREATE_VISION_EFFECT_PATH, "WaitVisionEntityCreate");
  }
  Summon(i) {
    var t = ModelManager_1.ModelManager.PhantomInteractModel.SummonMonsterId;
    var e = CalabashDevelopRewardByMonsterId_1.configCalabashDevelopRewardByMonsterId.GetConfig(t);
    this.Y6f = e?.IsWorldInteractable ?? false;
    var e = this.ActorComponent.CreatureData.GetCreatureDataId();
    var s = ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId();
    var o = Protocol_1.Aki.Protocol.s4s.create();
    o.r5n = InputDefine_1.SKILL_ID_SHOW_VISION;
    o.rVn = false;
    o.l8n = i;
    var i = Protocol_1.Aki.Protocol.D2s.create();
    var h = this.ActorComponent.ActorRotationProxy;
    i.Pitch = 0;
    i.Yaw = h.Yaw;
    i.Roll = 0;
    o._8n = i;
    o.UKn = t;
    o.RKn = MathUtils_1.MathUtils.NumberToLong(s);
    var h = Protocol_1.Aki.Protocol.ypf.create();
    h.DKn = o;
    h.AKn = MathUtils_1.MathUtils.NumberToLong(e);
    this.zvf = WaitEntityTask_1.WaitEntityTask.Create("[GameplayAbilityVisionShow.Summon] WaitVisionSummon", s, this.eyf, -1, false, true);
    this.tyf(h, s);
    this.Jvf = s;
  }
  async tyf(i, t) {
    i = await Net_1.Net.CallAsync(17712, i);
    if (i.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
      ControllerHolder_1.ControllerHolder.CreatureController.RemoveEntity(t, "GameplayAbilityVisionShowNew");
      if (this.zvf) {
        this.zvf.Cancel();
      }
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(i.Q4n, 21698);
      this.PlayerBuffComp.RemoveBuff(CANNOT_SHOW_VISION_BUFF_ID, 1, "GameplayAbilityVisionShowNew");
      this.dSe();
    }
    return true;
  }
  aZo(i) {
    CollisionUtils_1.CollisionUtils.SetCollisionResponseToPawn(this.Zvf.Actor.CapsuleComponent, 2, i ? 2 : 0);
    this.Zvf.Actor.CapsuleComponent.IgnoreActorWhenMoving(this.ActorComponent.Actor, !i);
    this.ActorComponent.Actor.CapsuleComponent.IgnoreActorWhenMoving(this.Zvf.Actor, !i);
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
    if (this.MZo?.Valid) {
      if ((i = BulletController_1.BulletController.CreateBulletCustomTarget(this.MZo.Entity, GameplayAbilityVisionMisc_1.VISION_END_BULLET, undefined)) && i.Valid) {
        this.TQ_ = i.Id;
        EventSystem_1.EventSystem.OnceWithTarget(this.MZo.Entity, EventDefine_1.EEventName.BulletDestroy, this.z6f);
      }
      this.SetVisionEnable(false);
      this.vDr = TimerSystem_1.TimerSystem.Delay(() => {
        if (EventSystem_1.EventSystem.HasWithTarget(this.MZo.Entity, EventDefine_1.EEventName.BulletDestroy, this.z6f)) {
          EventSystem_1.EventSystem.RemoveWithTarget(this.MZo.Entity, EventDefine_1.EEventName.BulletDestroy, this.z6f);
        }
        this.iyf();
      }, 5000);
      this.fAr?.RemoveCueByHandle(this.kQo);
    }
  }
  async iyf() {
    var i;
    var t;
    if (TimerSystem_1.TimerSystem.Has(this.vDr)) {
      TimerSystem_1.TimerSystem.Remove(this.vDr);
      this.vDr = undefined;
    }
    return !!this.Jvf && !!this.MZo && !!this.MZo.Valid && (t = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), t = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(t)?.GetComponent(0)?.GetCreatureDataId(), (i = Protocol_1.Aki.Protocol.scs.create()).xKn = [this.MZo.CreatureDataId], i.PKn = Protocol_1.Aki.Protocol.Fks.Proto_RemoveTypeForce, i.r5n = InputDefine_1.SKILL_ID_SHOW_VISION, i.YWn = t, (t = await Net_1.Net.CallAsync(27142, i)).G9n !== Protocol_1.Aki.Protocol.Q4n.KRs ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.G9n, 19429), false) : (this.Jvf = undefined, this.MZo = undefined, this.Zvf = undefined, this.kZo = undefined, this.PlayerBuffComp.RemoveBuff(CANNOT_SHOW_VISION_BUFF_ID, 1, "GameplayAbilityVisionShowNew"), this.dSe(), true));
  }
  SetVisionEnable(i) {
    ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(this.MZo.Entity, i, "GameplayAbilityVisionSummon.SetVisionEnable", true);
    if (this.TQ_ === undefined) {
      this.iyf();
    }
  }
  get PlayerEntity() {
    var i = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    return ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(i);
  }
  get PlayerTagComp() {
    return this.PlayerEntity.GetComponent(215);
  }
  get PlayerBuffComp() {
    return this.PlayerEntity.GetComponent(220);
  }
  F_f() {
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    return !!i && !!(i = i.Entity.CheckGetComponent(242)) && i.VehicleType === "Motorcycle";
  }
  get TVf() {
    var i = Global_1.Global.BaseCharacter?.CharacterActorComponent;
    if (i) {
      i = i.Entity.CheckGetComponent(242);
      if (i && i.VehicleType === "Motorcycle") {
        i = i.VehicleEntity?.CheckGetComponent(215);
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
    if (!this.GameplayTagComponent.HasTagAddOrRemoveListener(-1281364710, this.fZf)) {
      this.GameplayTagComponent.AddTagAddOrRemoveListener(-1281364710, this.fZf);
    }
    if (!this.GameplayTagComponent.HasTagAddOrRemoveListener(508505238, this.fZf)) {
      this.GameplayTagComponent.AddTagAddOrRemoveListener(508505238, this.fZf);
    }
    if (this.F_f() && (this.GameplayTagComponent.HasTag(-1281364710) && (this.TVf?.AddTag(-1281364710), this.TJf = this.TVf), this.GameplayTagComponent.HasTag(508505238))) {
      this.TVf?.AddTag(508505238);
      this.TJf = this.TVf;
    }
  }
  dSe() {
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnEnterVehicle, this.M6l)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnEnterVehicle, this.M6l);
    }
    if (EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l)) {
      EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnLeaveVehicle, this.E6l);
    }
    if (this.GameplayTagComponent.HasTagAddOrRemoveListener(-1281364710, this.fZf)) {
      this.GameplayTagComponent.RemoveTagAddOrRemoveListener(-1281364710, this.fZf);
    }
    if (this.GameplayTagComponent.HasTagAddOrRemoveListener(508505238, this.fZf)) {
      this.GameplayTagComponent.RemoveTagAddOrRemoveListener(508505238, this.fZf);
    }
  }
}
exports.GameplayAbilityVisionShowNew = GameplayAbilityVisionShowNew;
//# sourceMappingURL=GameplayAbilityVisionShowNew.js.map