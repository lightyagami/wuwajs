"use strict";

var MotorcycleExploreComponent_1;
var __decorate = this && this.__decorate || function (e, t, i, o) {
  var n;
  var s = arguments.length;
  var r = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, o);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (n = e[h]) {
        r = (s < 3 ? n(r) : s > 3 ? n(t, i, r) : n(t, i)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcycleExploreComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../../Core/Net/Net");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const InputDefine_1 = require("../Input/InputLayerFunction/InputDefine");
const BaseExploreComponent_1 = require("./BaseExploreComponent");
const InteractionTargetSelector_1 = require("./InteractionTargetSelector");
const BATCH_PULL_COLLECTION_MAX_RADIUS = 5000;
const BATCH_PULL_COLLECTION_MAX_NUM = 15;
let MotorcycleExploreComponent = MotorcycleExploreComponent_1 = class MotorcycleExploreComponent extends BaseExploreComponent_1.BaseExploreComponent {
  constructor() {
    super(...arguments);
    this.VehiclePerformComponent = undefined;
    this.M7f = new InteractionTargetSelector_1.InteractionTargetSelector();
    this.Ioe = [];
    this.VKf = false;
    this.JKf = undefined;
    this.DetectedTargetLegalOnceFlag = true;
    this.HXf = true;
    this.MJf = new Set();
    this.zJf = 0;
    this.Atg = undefined;
    this.PullingTargetEntityId = undefined;
    this.h5r = e => {
      this.DetectedTargetLegalOnceFlag = false;
    };
    this.fyf = e => {
      if (this.ActorComponent?.IsAutonomousProxy && MotorcycleExploreComponent_1.EJf.has(e)) {
        if (this.FocusTarget?.Valid) {
          this.IsHookEndByInterrupt = false;
          const i = this.FocusTarget;
          i.BeHooked(e);
          if (e === InputDefine_1.SKILL_ID_MOTORCYCLE_PULL_COLLECTION) {
            this.PullingTarget = i;
          } else {
            this.InteractingTarget = i;
            this.SendHookTargetRequest(() => {
              var e = this.Entity.GetComponent(42);
              this.IsHookEndByInterrupt = true;
              for (const t of MotorcycleExploreComponent_1.EJf) {
                e.EndSkill(t, "(摩托车)探索组件请求服务器返回错误码");
              }
              if (Log_1.Log.CheckError()) {
                Log_1.Log.Error("Vehicle", 79, "(摩托车)探索组件请求服务器返回错误码", ["PbDataId", i.EntityConfigId]);
              }
            });
          }
          this.HXf = false;
          this.MJf.add(e);
          if (!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.Fm)) {
            if (Log_1.Log.CheckInfo()) {
              Log_1.Log.Info("Vehicle", 79, "(摩托车)探索组件添加RemoveEntity事件监听", ["SkillId", e]);
            }
            EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.RemoveEntity, this.Fm);
          }
        } else if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Vehicle", 79, "使用探索技能时(摩托车)探索组件当前目标为空, 请检查技能Id配置", ["SkillId", e]);
        }
      }
    };
    this.bJe = (e, t) => {
      if (this.ActorComponent?.IsAutonomousProxy && MotorcycleExploreComponent_1.EJf.has(t)) {
        if (t === InputDefine_1.SKILL_ID_MOTORCYCLE_PULL_COLLECTION) {
          if (!this.PullingTarget) {
            if (Log_1.Log.CheckWarn()) {
              Log_1.Log.Warn("Vehicle", 79, "使用探索技能时(摩托车)探索组件当前目标为空, 请检查技能Id配置", ["SkillId", t]);
            }
            return;
          }
        } else if (!this.InteractingTarget) {
          if (Log_1.Log.CheckWarn()) {
            Log_1.Log.Warn("Vehicle", 79, "使用探索技能时(摩托车)探索组件当前目标为空, 请检查技能Id配置", ["SkillId", t]);
          }
          return;
        }
        this.jXf(t, "OnSkillEnd");
      }
    };
    this.vgl = (e, t) => {
      if (e === this.Entity.Id && MotorcycleExploreComponent_1.EJf.has(t)) {
        this.IsHookEndByInterrupt = true;
      }
    };
    this.Fm = (e, t) => {
      if (this.InteractingTargetEntityId === t.Id) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 79, "(摩托车)探索组件当前交互目标实体被移除");
        }
        this.InteractingTarget = undefined;
        var i = this.Entity.GetComponent(40);
        this.IsHookEndByInterrupt = true;
        for (const o of this.MJf) {
          if (o !== InputDefine_1.SKILL_ID_MOTORCYCLE_PULL_COLLECTION && (i.EndSkill(o, "(摩托车)探索组件当前交互目标实体被移除"), Log_1.Log.CheckError())) {
            Log_1.Log.Error("Vehicle", 79, "(摩托车)探索组件当前交互目标点在技能释放过程中被删除，请检查配置", ["EntityConfigId", t.Entity.GetComponent(0)?.GetPbDataId()], ["SkillId", o]);
          }
        }
      }
    };
    this.I7f = e => {
      if (e.IsDriver && e.PassengerEntity && e.IsRolePassenger(true)) {
        this.zJf = e.PassengerEntity.Id;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 79, "主控角色进入摩托车激活(摩托车)探索组件");
        }
        this.OnExploreComponentEnable("OnVehicleBeenEntered");
      }
    };
    this.mOf = e => {
      if (e.IsDriver && this.zJf === e.PassengerEntity?.Id) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 79, "主控角色离开摩托车关闭(摩托车)探索组件");
        }
        this.OnExploreComponentDisable("OnVehicleBeenLeaved");
      }
    };
  }
  get PullingTarget() {
    return this.Atg;
  }
  set PullingTarget(e) {
    if (this.Atg?.Valid && e !== this.Atg) {
      this.Atg.ChangeHookPointState(0);
    }
    this.Atg = e;
    this.PullingTargetEntityId = e?.Entity.Id;
  }
  OnStart() {
    super.OnStart();
    this.LogKey = "(摩托车)探索组件";
    this.M7f.InitForMotorcycle(this);
    this.JKf = ModelManager_1.ModelManager.RouletteModel.RouletteListDataMap.get(3);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.I7f);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.mOf);
    this.VehiclePerformComponent = this.Entity.GetComponent(246);
    if (this.VehiclePerformComponent.Driver && this.VehiclePerformComponent.Driver === ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity?.Entity) {
      this.OnExploreComponentEnable("(摩托车)探索组件OnStart时驾驶位为主控角色");
    }
    return true;
  }
  OnEnd() {
    super.OnEnd();
    this.T7f();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.I7f);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.mOf);
    this.OnExploreComponentDisable("OnEnd");
    var e = this.Entity.GetComponent(42);
    for (const t of this.MJf) {
      e.EndSkill(t, "(摩托车)探索组件OnEnd");
    }
    return true;
  }
  OnExploreComponentEnable(e) {
    return !!super.OnExploreComponentEnable(e) && (EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.ChangeVisionSkillByTab, this.h5r), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.fyf), EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.bJe), EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.CharInterruptSkill, this.vgl), this.JKf?.ChangeRouletteActivateStatus(true), true);
  }
  OnExploreComponentDisable(e) {
    return !!super.OnExploreComponentDisable(e) && (this.T7f(), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.ChangeVisionSkillByTab, this.h5r), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.CharBeforeSkillWithTarget, this.fyf), EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnSkillEnd, this.bJe), EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.CharInterruptSkill, this.vgl), this.JKf?.ChangeRouletteActivateStatus(false), true);
  }
  OnExploreComponentTick() {
    this.b7f();
    if (this.IsLockingTarget && !this.FocusTargetInternal?.Valid) {
      this.CancelLockTarget("FocusTarget is Invalid", true);
    }
  }
  CheckAllowLevelEventHighlightSkill() {
    return !this.IsLockingTarget;
  }
  OnLevelEventHighlightSkillUpdate(e) {
    this.VKf = e;
    var t = this.CurrentIconTagId;
    var i = this.CurrentIconHighlightTagId;
    if (e) {
      if (t && this.TagComponent.HasTag(t)) {
        this.TagComponent.RemoveTag(t);
      }
      if (i && this.TagComponent.HasTag(i)) {
        this.TagComponent.RemoveTag(i);
      }
    } else {
      if (t && !this.TagComponent.HasTag(t)) {
        this.TagComponent.AddTag(t);
      }
      if (i && !this.TagComponent.HasTag(i)) {
        this.TagComponent.AddTag(i);
      }
    }
  }
  GetSkillIdByCurrentTarget() {
    let e = this.HighlightLogic.GetHighlightSkillId();
    if (e === 0 && this.FocusTargetLegal && this.FocusTargetInternal) {
      switch (this.FocusTargetInternal?.GetHookInteractConfig()?.Type) {
        case "FollowerShoot":
          e = InputDefine_1.SKILL_ID_MOTORCYCLE_DRONE_SHOOT;
          break;
        case "MotorPullInteract":
          e = InputDefine_1.SKILL_ID_MOTORCYCLE_PULL_COLLECTION;
          break;
        case "PilotThrow":
          e = InputDefine_1.SKILL_ID_MOTORCYCLE_PILOT_THROW;
          break;
        case "CableWay":
          e = InputDefine_1.SKILL_ID_MOTORCYCLE_CABLE_WAY;
          break;
        default:
          e = InputDefine_1.SKILL_ID_MOTORCYCLE_FIX_HOOK;
      }
    }
    return e;
  }
  TryPullCollection() {
    var e = this.PullingTarget;
    return !!e?.Valid && this.G_f(e);
  }
  G_f(e) {
    var t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Entity;
    var i = new Protocol_1.Aki.Protocol.bZm();
    i.r6n = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    i.F4n = MathUtils_1.MathUtils.NumberToLong(e.ServerEntityId);
    var o = [];
    i.LZm = o;
    var n = CommonParamById_1.configCommonParamById.GetFloatConfig("MotorcycleBatchPullCollectionRadius") ?? BATCH_PULL_COLLECTION_MAX_RADIUS;
    if (n > BATCH_PULL_COLLECTION_MAX_RADIUS && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 79, "(摩托车)探索组件批量拉取采集物范围超过最大限制, 检查配置", ["Radius", n]);
    }
    var s = CommonParamById_1.configCommonParamById.GetIntConfig("MotorcycleBatchPullCollectionCount") ?? BATCH_PULL_COLLECTION_MAX_NUM;
    if (s > BATCH_PULL_COLLECTION_MAX_NUM && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Vehicle", 79, "(摩托车)探索组件批量拉取采集物数量超过最大限制, 检查配置", ["Count", s]);
    }
    ModelManager_1.ModelManager.CreatureModel?.GetEntitiesInRangeWithLocation(e.HookLocation, n, 7, this.Ioe);
    for (const h of this.Ioe) {
      var r = h.Entity.GetComponent(88);
      if (h.Id === e.Entity.Id) {
        if (r && !r.PullCollectionWithProgress) {
          ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(t, "200300046", e.HookTransform);
        }
      } else if (r && r.EntityType !== "HookSoundBox") {
        if (!(o.length < s)) {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Vehicle", 79, "(摩托车)探索组件拉取采集物失败, 数量超过限制");
          }
          break;
        }
        o.push(MathUtils_1.MathUtils.NumberToLong(r.ServerEntityId));
        ControllerHolder_1.ControllerHolder.BulletController.CreateBulletCustomTarget(t, "200300046", r.HookTransform);
      }
    }
    Net_1.Net.Call(29187, i, e => {
      if (e && e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(e.Q4n, 22068);
      }
    });
    return e.StartPulledMove();
  }
  T7f() {
    if (this.PullingTarget?.GetHookInteractType() === "MotorPullInteract") {
      this.PullingTarget.StopPulledMove();
    }
    this.PullingTarget = undefined;
  }
  b7f() {
    var e;
    var t;
    if (ModelManager_1.ModelManager.CameraModel && !this.IsLockingTarget) {
      if (this.VKf) {
        this.SetFocusTarget(undefined);
      } else {
        this.M7f.TraceDebugEnabled = MotorcycleExploreComponent_1.TraceDebug;
        this.M7f.DetectBestTargetForMotorcycle();
        e = this.M7f.DetectedTargetLegal && this.DetectedTargetLegalOnceFlag;
        t = this.M7f.DetectedTarget;
        if (this.FocusTargetInternal !== t) {
          this.DetectedTargetLegalOnceFlag = true;
        }
        if (this.FocusTargetInternal !== t || this.FocusTargetLegal !== e) {
          this.SetFocusTarget(t, e);
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Vehicle", 79, "(摩托车)探索组件锁定钩锁点", ["PbDataId", t?.Entity.GetComponent(0)?.GetPbDataId()]);
          }
        }
      }
    }
  }
  OnDetectedTargetChanged() {
    if (this.FocusTargetInternal !== undefined && this.FocusTargetLegal) {
      if (this.FocusTargetLegal) {
        this.HandleSkillIconLogic(true, this.FocusTargetInternal.GetTagId(), "(摩托车)探索组件当前选中的钩锁点有效, 且不需要切换技能");
      } else {
        this.HandleSkillIconLogic(false, undefined, "(摩托车)探索组件当前选中的钩锁点无效，且不需要切换技能");
      }
    } else {
      this.HandleSkillIconLogic(false, undefined, "(摩托车)探索组件当前未选中点，且不需要切换技能");
    }
  }
  jXf(e, t) {
    if (!this.HXf) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Vehicle", 79, "(摩托车)探索组件技能结束", ["SkillId", e], ["Reason", t]);
      }
      this.HXf = true;
      this.MJf.delete(e);
      if (e === InputDefine_1.SKILL_ID_MOTORCYCLE_PULL_COLLECTION) {
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
      if (this.MJf.size === 0 && EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.RemoveEntity, this.Fm)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Vehicle", 79, "(摩托车)探索组件移除RemoveEntity事件监听", ["SkillId", e]);
        }
        EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.RemoveEntity, this.Fm);
      }
    }
  }
};
MotorcycleExploreComponent.TraceDebug = false;
MotorcycleExploreComponent.EJf = new Set([InputDefine_1.SKILL_ID_MOTORCYCLE_FIX_HOOK, InputDefine_1.SKILL_ID_MOTORCYCLE_CABLE_WAY, InputDefine_1.SKILL_ID_MOTORCYCLE_PILOT_THROW, InputDefine_1.SKILL_ID_MOTORCYCLE_PULL_COLLECTION]);
MotorcycleExploreComponent = MotorcycleExploreComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(57)], MotorcycleExploreComponent);
exports.MotorcycleExploreComponent = MotorcycleExploreComponent; //# sourceMappingURL=MotorcycleExploreComponent.js.map