"use strict";

var MotorcycleExploreComponent_1;
var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var n = arguments.length;
  var r = n < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (s = t[h]) {
        r = (n < 3 ? s(r) : n > 3 ? s(e, i, r) : s(e, i)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleExploreComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Time_1 = require("../../../../../../Core/Common/Time");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../../Core/Net/Net");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../../Effect/EffectSystem");
const LevelGeneralCommons_1 = require("../../../../../LevelGamePlay/LevelGeneralCommons");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleSceneInteractController_1 = require("../../../../../Module/CombatMessage/RoleSceneInteractController");
const FollowUtils_1 = require("../Abilities/Follow/FollowUtils");
const InputDefine_1 = require("../Input/InputLayerFunction/InputDefine");
const BaseExploreComponent_1 = require("./BaseExploreComponent");
const InteractionTargetSelector_1 = require("./InteractionTargetSelector");
const BATCH_PULL_COLLECTION_MAX_RADIUS = 5000;
const BATCH_PULL_COLLECTION_MAX_COUNT = 15;
let MotorcycleExploreComponent = MotorcycleExploreComponent_1 = class MotorcycleExploreComponent extends BaseExploreComponent_1.BaseExploreComponent {
  constructor() {
    super(...arguments);
    this.VehiclePerformComponent = undefined;
    this.itg = new InteractionTargetSelector_1.InteractionTargetSelector();
    this.Ioe = [];
    this.Wlg = false;
    this.R_g = undefined;
    this.DetectedTargetLegalOnceFlag = true;
    this.Tug = true;
    this.gCg = new Set();
    this.Zpg = 0;
    this.j8 = 0;
    this.cDg = undefined;
    this.PullingTargetEntityId = undefined;
    this.SimulatePullingTarget = undefined;
    this.E4g = undefined;
    this.Jjg = undefined;
    this.AutoDetectDistance = 0;
    this.AutoDetectInterval = 0.5;
    this.DisableAutoDetectTags = [];
    this.LastAutoDetectTimeStamp = 0;
    this.h5r = t => {
      this.DetectedTargetLegalOnceFlag = false;
    };
    this.wEf = t => {
      if (this.ActorComponent?.IsAutonomousProxy && MotorcycleExploreComponent_1.CCg.has(t)) {
        if (this.FocusTarget?.Valid) {
          this.IsHookEndByInterrupt = false;
          const e = this.FocusTarget;
          e.BeHooked(t);
          if (t === InputDefine_1.SKILL_ID_MOTORCYCLE_PULL_COLLECTION) {
            this.PullingTarget = e;
            this.mkg();
          } else {
            this.InteractingTarget = e;
            this.SendFixHookPush();
            this.SendHookTargetRequest(() => {
              this.IsHookEndByInterrupt = true;
              for (const t of MotorcycleExploreComponent_1.CCg) {
                this.SkillComponent?.EndSkill(t, "(摩托车)探索组件请求服务器返回错误码");
              }
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Vehicle", 79, "(摩托车)探索组件请求服务器返回错误码", ["PbDataId", e.EntityConfigId]);
              }
            });
          }
          this.Tug = false;
          this.gCg.add(t);
          if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.Fm)) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Vehicle", 79, "(摩托车)探索组件添加RemoveEntity事件监听", ["SkillId", t]);
            }
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.Fm);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Vehicle", 79, "使用探索技能时(摩托车)探索组件当前目标为空, 请检查技能Id配置", ["SkillId", t]);
        }
      }
    };
    this.bJe = (t, e) => {
      if (this.ActorComponent?.IsAutonomousProxy && MotorcycleExploreComponent_1.CCg.has(e)) {
        if (e === InputDefine_1.SKILL_ID_MOTORCYCLE_PULL_COLLECTION) {
          if (!this.PullingTarget) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Vehicle", 79, "使用探索技能时(摩托车)探索组件当前目标为空, 请检查技能Id配置", ["SkillId", e]);
            }
            return;
          }
        } else if (!this.InteractingTarget) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Vehicle", 79, "使用探索技能时(摩托车)探索组件当前目标为空, 请检查技能Id配置", ["SkillId", e]);
          }
          return;
        }
        this.bug(e, "OnSkillEnd");
      }
    };
    this.vgl = (t, e) => {
      if (t === this.Entity.Id && MotorcycleExploreComponent_1.CCg.has(e)) {
        this.IsHookEndByInterrupt = true;
      }
    };
    this.Fm = (t, e) => {
      if (this.InteractingTargetEntityId === e.Id) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 79, "(摩托车)探索组件当前交互目标实体被移除");
        }
        this.InteractingTarget = undefined;
        this.IsHookEndByInterrupt = true;
        for (const i of this.gCg) {
          if (i !== InputDefine_1.SKILL_ID_MOTORCYCLE_PULL_COLLECTION && (this.SkillComponent?.EndSkill(i, "(摩托车)探索组件当前交互目标实体被移除"), Log_1.Log.CheckError())) {
            Log_1.Log.Error("Vehicle", 79, "(摩托车)探索组件当前交互目标点在技能释放过程中被删除，请检查配置", ["EntityConfigId", e.Entity.GetComponent(0)?.GetPbDataId()], ["SkillId", i]);
          }
        }
      }
    };
    this.otg = t => {
      if (t.IsDriver && t.PassengerEntity && t.IsRolePassenger(true)) {
        this.Zpg = t.PassengerEntity.Id;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 79, "主控角色进入摩托车激活(摩托车)探索组件");
        }
        this.OnExploreComponentEnable("OnVehicleBeenEntered");
      }
    };
    this.E8f = t => {
      if (t.IsDriver && this.Zpg === t.PassengerEntity?.Id) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 79, "主控角色离开摩托车关闭(摩托车)探索组件");
        }
        this.OnExploreComponentDisable("OnVehicleBeenLeaved");
      }
    };
  }
  get PullingTarget() {
    if (this.ActorComponent?.IsAutonomousProxy) {
      return this.cDg;
    } else {
      return this.SimulatePullingTarget;
    }
  }
  set PullingTarget(t) {
    if (this.cDg?.Valid && t !== this.cDg) {
      this.cDg.ChangeHookPointState(0);
    }
    this.cDg = t;
    this.PullingTargetEntityId = t?.Entity.Id;
  }
  static get Dependencies() {
    return [...super.Dependencies, 246];
  }
  OnInitData() {
    super.OnInitData();
    this.AutoDetectDistance = CommonParamById_1.configCommonParamById.GetIntConfig("MotorcycleAutoDetectDistance") ?? 0;
    this.AutoDetectInterval = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorcycleAutoDetectInterval") ?? 0.5;
    var t = CommonParamById_1.configCommonParamById.GetStringArrayConfig("DisableFollowShooterAutoDetectedAwakeTags");
    if (t && t.length > 0) {
      this.DisableAutoDetectTags = t.map(t => GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t));
    }
    this.j8 = this.Entity.CheckGetComponent(0)?.GetPlayerId() ?? 0;
    this.Jjg = CommonParamById_1.configCommonParamById.GetStringConfig("MotorcycleBatchPullRangeEffectPath");
    return true;
  }
  OnStart() {
    super.OnStart();
    this.LogKey = "(摩托车)探索组件";
    this.itg.InitForMotorcycle(this);
    this.R_g = ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(3);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.otg);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E8f);
    this.VehiclePerformComponent = this.Entity.GetComponent(246);
    if (this.VehiclePerformComponent.Driver && this.VehiclePerformComponent.Driver === ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity) {
      this.OnExploreComponentEnable("(摩托车)探索组件OnStart时驾驶位为主控角色");
    }
    return true;
  }
  OnEnd() {
    super.OnEnd();
    this.ntg();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.otg);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E8f);
    this.OnExploreComponentDisable("OnEnd");
    for (const t of this.gCg) {
      this.SkillComponent?.EndSkill(t, "(摩托车)探索组件OnEnd");
    }
    return true;
  }
  OnExploreComponentEnable(t) {
    return !!super.OnExploreComponentEnable(t) && (EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeVisionSkillByTab, this.h5r), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.wEf), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.bJe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharInterruptSkill, this.vgl), this.R_g?.ChangeRouletteActivateStatus(true), true);
  }
  OnExploreComponentDisable(t) {
    return !!super.OnExploreComponentDisable(t) && (this.ntg(), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeVisionSkillByTab, this.h5r), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.wEf), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.bJe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharInterruptSkill, this.vgl), this.R_g?.ChangeRouletteActivateStatus(false), true);
  }
  OnExploreComponentTick(t) {
    this.pHg();
    this.stg();
    if (this.IsLockingTarget && !this.FocusTarget?.Valid) {
      this.CancelLockTarget("FocusTarget is Invalid", true);
    }
  }
  CheckAllowLevelEventHighlightSkill() {
    return !this.IsLockingTarget;
  }
  OnLevelEventHighlightSkillUpdate(t) {
    this.Wlg = t;
    var e = this.CurrentIconTagId;
    var i = this.CurrentIconHighlightTagId;
    if (t) {
      if (e && this.TagComponent.HasTag(e)) {
        this.TagComponent.RemoveTag(e);
      }
      if (i && this.TagComponent.HasTag(i)) {
        this.TagComponent.RemoveTag(i);
      }
    } else {
      if (e && !this.TagComponent.HasTag(e)) {
        this.TagComponent.AddTag(e);
      }
      if (i && !this.TagComponent.HasTag(i)) {
        this.TagComponent.AddTag(i);
      }
    }
  }
  GetSkillIdByCurrentTarget() {
    let t = this.HighlightLogic.GetHighlightSkillId();
    if (t === 0 && this.FocusTargetLegal && this.FocusTarget) {
      switch (this.FocusTarget?.GetHookInteractConfig()?.Type) {
        case "FollowerShoot":
          t = InputDefine_1.SKILL_ID_MOTORCYCLE_DRONE_SHOOT;
          break;
        case "MotorPullInteract":
          t = InputDefine_1.SKILL_ID_MOTORCYCLE_PULL_COLLECTION;
          break;
        case "PilotThrow":
          t = InputDefine_1.SKILL_ID_MOTORCYCLE_PILOT_THROW;
          break;
        case "CableWay":
          t = InputDefine_1.SKILL_ID_MOTORCYCLE_CABLE_WAY;
          break;
        default:
          t = InputDefine_1.SKILL_ID_MOTORCYCLE_FIX_HOOK;
      }
    }
    return t;
  }
  TryPullCollection() {
    var t = this.PullingTarget;
    return !!t?.Valid && this.mgf(t);
  }
  mgf(t) {
    const e = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    let i = undefined;
    if (t.AllowBatchCollect) {
      i = [];
      var o = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorcycleBatchPullCollectionRadius") ?? BATCH_PULL_COLLECTION_MAX_RADIUS;
      if (o > BATCH_PULL_COLLECTION_MAX_RADIUS && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 79, "(摩托车)探索组件批量拉取采集物范围超过最大限制, 检查配置", ["Radius", o]);
      }
      var s = CommonParamById_1.configCommonParamById.GetIntConfig("MotorcycleBatchPullCollectionCount") ?? BATCH_PULL_COLLECTION_MAX_COUNT;
      if (s > BATCH_PULL_COLLECTION_MAX_COUNT && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 79, "(摩托车)探索组件批量拉取采集物数量超过最大限制, 检查配置", ["MaxCount", s]);
      }
      ModelManager_1.ModelManager.CreatureModel?.GetEntitiesInRangeWithLocation(t.HookLocation, o, 7, this.Ioe);
      for (const l of this.Ioe) {
        var n = l.Entity.GetComponent(90);
        if (n?.HookInteractType === "MotorPullInteract" && l.Id !== t.Entity.Id && n && !n.PullCollectionWithProgress) {
          if (!(i.length < s)) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Vehicle", 79, "(摩托车)探索组件拉取采集物失败, 数量超过限制");
            }
            break;
          }
          i.push(MathUtils_1.MathUtils.NumberToLong(n.ServerEntityId));
          ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(e, "200300046", n.HookTransform);
        }
      }
    }
    const r = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    function h() {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Vehicle", 79, "(摩托车)探索组件拉取采集物失败, 回退采集客户端预表现的隐藏实体操作", ["EntityConfigId", t?.EntityConfigId], ["ServerEntityId", t?.ServerEntityId]);
      }
      t.StopPullMove();
      LevelGeneralCommons_1.LevelGeneralCommons.ChangeToDestroyState(t.EntityConfigId);
    }
    if (t.PullCollectionWithProgress) {
      if (i) {
        this.I4g(r, MathUtils_1.MathUtils.NumberToLong(0), i);
      }
      return t.StartPullMove(() => {
        this.I4g(r, MathUtils_1.MathUtils.NumberToLong(t.ServerEntityId), undefined, h);
        ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(e, "200300046", t.HookTransform);
      });
    } else {
      this.I4g(r, MathUtils_1.MathUtils.NumberToLong(t.ServerEntityId), i);
      return true;
    }
  }
  I4g(t, e, i, o) {
    var s = new Protocol_1.Aki.Protocol.snf();
    s.r6n = t;
    s.F4n = e;
    if (i) {
      s.lnf = i;
    }
    Net_1.Net.Call(28631, s, t => {
      if (t && t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Character", 79, "RequestBatchCollect失败", ["Q4n", t.Q4n]);
        }
        o?.();
      }
    });
  }
  ntg() {
    if (this.PullingTarget?.GetHookInteractType() === "MotorPullInteract") {
      this.PullingTarget.StopPullMove();
    }
    this.PullingTarget = undefined;
  }
  stg() {
    var t;
    var e;
    if (ModelManager_1.ModelManager.CameraModel && !this.IsLockingTarget) {
      if (this.Wlg) {
        this.SetFocusTarget(undefined);
      } else {
        this.itg.TraceDebugEnabled = MotorcycleExploreComponent_1.TraceDebug;
        this.itg.DetectBestTargetForMotorcycle();
        t = this.itg.DetectedTargetLegal && this.DetectedTargetLegalOnceFlag;
        e = this.itg.DetectedTarget;
        if (this.FocusTarget !== e) {
          this.DetectedTargetLegalOnceFlag = true;
        }
        if (this.FocusTarget !== e || this.FocusTargetLegal !== t) {
          this.SetFocusTarget(e, t);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Vehicle", 79, "(摩托车)探索组件锁定钩锁点", ["PbDataId", e?.Entity.GetComponent(0)?.GetPbDataId()]);
          }
        }
      }
    }
  }
  pHg() {
    if (!(Time_1.Time.WorldTimeSeconds - this.LastAutoDetectTimeStamp < this.AutoDetectInterval)) {
      this.LastAutoDetectTimeStamp = Time_1.Time.WorldTimeSeconds;
      let t = false;
      if (!this.TagComponent?.HasAnyTag(this.DisableAutoDetectTags)) {
        var e = FollowUtils_1.FollowUtils.GetPlayerFollowShooter(this.j8)?.Entity?.CheckGetComponent(235)?.FollowShooterConfig?.LockOnConfig.AutoDetectEnableTagContainer;
        if (!e || e.GameplayTags.Num() === 0) {
          return;
        }
        t = !!this.itg.DetectEntityByRestrictTags(this.AutoDetectDistance, 255, e);
      }
      e = this.Entity.CheckGetComponent(0);
      if (e) {
        FollowUtils_1.FollowUtils.SetPlayerFollowShooterEnable(e.GetPlayerId(), t, 2);
      }
    }
  }
  OnDetectedTargetChanged(t, e) {
    if (this.FocusTarget !== t || e !== this.FocusTargetLegal) {
      if (t?.Valid && t !== this.FocusTarget) {
        t.ChangeHookPointState(0);
      }
      if (this.FocusTarget?.Valid) {
        this.FocusTarget.ChangeHookPointState(this.FocusTargetLegal ? 1 : 2);
      }
      if (this.FocusTarget !== undefined && this.FocusTargetLegal) {
        this.HandleSkillIconLogic(true, "(摩托车)探索组件当前选中的钩锁点有效");
        this.T4g(this.FocusTarget);
      } else {
        this.HandleSkillIconLogic(false, "(摩托车)探索组件当前未选中点或者选中的点无效");
        this.b4g("(摩托车)探索组件当前未选中点或者选中的点无效");
      }
    }
  }
  T4g(t) {
    this.b4g("(摩托车)探索组件选中新目标时尝试移除旧目标的特效");
    if (t.HookInteractType === "MotorPullInteract" && !StringUtils_1.StringUtils.IsEmpty(this.Jjg)) {
      this.E4g = EffectSystem_1.EffectSystem.SpawnEffect(t.ActorComp.Owner, t.ActorComp.ActorTransform, this.Jjg, "[MotorcycleExploreComponent.OnDetectedTargetChanged]", new EffectContext_1.EffectContext(t.Entity.Id));
    }
  }
  b4g(t) {
    if (this.E4g) {
      EffectSystem_1.EffectSystem.StopEffectById(this.E4g, t, true);
      this.E4g = undefined;
    }
  }
  bug(t, e) {
    if (!this.Tug) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 79, "(摩托车)探索组件技能结束", ["SkillId", t], ["Reason", e]);
      }
      this.Tug = true;
      this.gCg.delete(t);
      if (t === InputDefine_1.SKILL_ID_MOTORCYCLE_PULL_COLLECTION) {
        if (this.PullingTarget?.Valid) {
          this.PullingTarget.OnFixHookSkillEnd();
        }
        this.PullingTarget = undefined;
      } else {
        this.SendHookEndRequest();
        if (this.InteractingTarget?.Valid) {
          this.InteractingTarget.OnFixHookSkillEnd();
        }
        this.InteractingTarget = undefined;
      }
      this.CancelLockTarget("DoSkillEnd", false);
      if (this.gCg.size === 0 && EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.Fm)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 79, "(摩托车)探索组件移除RemoveEntity事件监听", ["SkillId", t]);
        }
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.Fm);
      }
    }
  }
  mkg() {
    var t = this.PullingTarget;
    if (t?.Valid && this.ActorComponent?.IsAutonomousProxy) {
      RoleSceneInteractController_1.RoleSceneInteractController.SendPullCollectionPush(this.Entity, t);
    }
  }
};
MotorcycleExploreComponent.TraceDebug = false;
MotorcycleExploreComponent.CCg = new Set([InputDefine_1.SKILL_ID_MOTORCYCLE_FIX_HOOK, InputDefine_1.SKILL_ID_MOTORCYCLE_CABLE_WAY, InputDefine_1.SKILL_ID_MOTORCYCLE_PILOT_THROW, InputDefine_1.SKILL_ID_MOTORCYCLE_PULL_COLLECTION]);
MotorcycleExploreComponent = MotorcycleExploreComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(59)], MotorcycleExploreComponent);
exports.MotorcycleExploreComponent = MotorcycleExploreComponent; //# sourceMappingURL=MotorcycleExploreComponent.js.map