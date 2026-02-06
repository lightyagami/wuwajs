"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var s;
  var r = arguments.length;
  var h = r < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, i, o);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        h = (r < 3 ? s(h) : r > 3 ? s(e, i, h) : s(e, i)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(e, i, h);
  }
  return h;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseExploreComponent = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const Net_1 = require("../../../../../../Core/Net/Net");
const GameplayTagUtils_1 = require("../../../../../../Core/Utils/GameplayTagUtils");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleSceneInteractController_1 = require("../../../../../Module/CombatMessage/RoleSceneInteractController");
const FixHookClientLevelEventExecutor_1 = require("./FixHookClientLevelEventExecutor");
const HighlightExploreSkillLogic_1 = require("./HighlightExploreSkillLogic");
let BaseExploreComponent = class BaseExploreComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComponent = undefined;
    this.SkillComponent = undefined;
    this.TagComponent = undefined;
    this.HighlightLogic = undefined;
    this.CurrentIconTagId = undefined;
    this.CurrentIconHighlightTagId = undefined;
    this.LevelEventLightingSkill = false;
    this.Iug = undefined;
    this.InteractingTargetEntityId = undefined;
    this.FocusTargetInternal = undefined;
    this.FocusTargetLegalExceptSkill = false;
    this.FocusTargetLegalInternal = false;
    this.SimulateInteractingTarget = undefined;
    this.SimulateInteractingTargetLocation = undefined;
    this.SyncEnabled = true;
    this.IsHookEndByInterrupt = false;
    this.LogKey = "";
    this.ExploreComponentEnabled = false;
    this.PendingHighlightSkill = undefined;
    this.IsLockingTarget = false;
  }
  get InteractingTarget() {
    return this.Iug;
  }
  set InteractingTarget(t) {
    if (this.Iug?.Valid && t !== this.Iug) {
      this.Iug.ChangeHookPointState(0);
    }
    this.Iug = t;
    this.InteractingTargetEntityId = t?.Entity.Id;
  }
  get FocusTarget() {
    return this.FocusTargetInternal;
  }
  set FocusTarget(t) {
    this.FocusTargetInternal = t;
  }
  get FocusTargetLegal() {
    return this.FocusTargetLegalInternal;
  }
  set FocusTargetLegal(t) {
    this.FocusTargetLegalInternal = t;
  }
  static get Dependencies() {
    return [1, 42, 217];
  }
  OnStart() {
    this.ActorComponent = this.Entity.GetComponent(1);
    this.SkillComponent = this.Entity.GetComponent(42);
    this.TagComponent = this.Entity.GetComponent(217);
    if (this.CheckDisableComponent()) {
      this.Disable("CheckDisableComponent");
    } else {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, this.LogKey + "OnExploreComponentStart", ["EntityId", this.Entity.Id], ["PendingHighlightSkill", !!this.PendingHighlightSkill]);
      }
      this.InitHighlightHandle();
    }
    return true;
  }
  CheckDisableComponent() {
    return false;
  }
  OnEnd() {
    if (!this.CheckDisableComponent()) {
      this.HighlightLogic?.Dispose();
      this.HighlightLogic = undefined;
    }
    return true;
  }
  OnTick(t) {
    if (this.ExploreComponentEnabled) {
      this.OnExploreComponentTick(t);
    }
  }
  OnExploreComponentEnable(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, this.LogKey + "OnExploreComponentEnable", ["EntityId", this.Entity.Id], ["ExploreComponentEnabled", this.ExploreComponentEnabled], ["Reason", t]);
    }
    return !this.ExploreComponentEnabled && (ModelManager_1.ModelManager.ExploreModel.RegisterExploreComponent(this), this.ExploreComponentEnabled = true);
  }
  OnExploreComponentDisable(t) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, this.LogKey + "OnExploreComponentDisable", ["EntityId", this.Entity.Id], ["ExploreComponentEnabled", this.ExploreComponentEnabled], ["Reason", t]);
    }
    return !!this.ExploreComponentEnabled && !(this.SendHookEndRequest(), this.InteractingTarget = undefined, this.CancelLockTarget("OnExploreComponentDisable", true), ModelManager_1.ModelManager.ExploreModel.UnregisterExploreComponent(this), this.ExploreComponentEnabled = false);
  }
  OnExploreComponentTick(t) {}
  OnDetectedTargetChanged(t, e) {}
  ForceLockTarget(t, e) {
    if (t?.Valid) {
      if (t === this.InteractingTarget) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Character", 79, this.LogKey + "锁定目标失败, 锁定目标和当前正在交互的目标相同", ["Reason", e]);
        }
        return false;
      } else {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 79, this.LogKey + "锁定目标", ["TargetEntityConfigId", t?.EntityConfigId], ["Reason", e]);
        }
        this.IsLockingTarget = true;
        this.FocusTargetLegalExceptSkill = true;
        this.SetFocusTarget(t, true);
        return true;
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 79, this.LogKey + "锁定目标失败, 钩锁点实体不合法", ["EntityConfigId", t?.EntityConfigId], ["Reason", e]);
      }
      return false;
    }
  }
  CancelLockTarget(t, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, this.LogKey + "取消目标锁定", ["Reason", t]);
    }
    this.IsLockingTarget = false;
    if (e) {
      this.SetFocusTarget(undefined);
    }
  }
  SetFocusTarget(t, e = true) {
    var i = this.FocusTarget;
    var o = this.FocusTargetLegal;
    this.FocusTargetLegal = !!t?.Valid && e;
    this.FocusTarget = t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, this.LogKey + "设置当前交互目标", ["TargetEntityConfigId", t?.EntityConfigId], ["TargetLegal", !!t?.Valid && e]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ExploreComponentTargetChanged);
    this.OnDetectedTargetChanged(i, o);
  }
  GetInteractingTargetLocation() {
    if (this.ActorComponent?.IsAutonomousProxy) {
      return this.InteractingTarget?.HookLocation;
    } else {
      return this.SimulateInteractingTarget?.HookLocation ?? this.SimulateInteractingTargetLocation;
    }
  }
  InitHighlightHandle() {
    if (this.HighlightLogic) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, this.LogKey + "高亮模块已经完成初始化", ["ClientEntityId", this.Entity.Id]);
      }
    } else {
      this.HighlightLogic = new HighlightExploreSkillLogic_1.HighlightExploreSkillLogic();
      this.HighlightLogic.Init(this);
      this.PendingHighlightSkill?.();
      this.PendingHighlightSkill = undefined;
    }
  }
  ShowHighlightExploreSkill(t, e, i, o, s, r) {
    if (this.HighlightLogic) {
      this.HighlightLogic.ShowHighlightExploreSkill(t, e, i, o, s, r);
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 79, this.LogKey + "尝试高亮探索技能时, 组件还未初始化完成, 缓存高亮操作, 考虑修改配置", ["ClientEntityId", this.Entity.Id], ["ExploreToolId", t], ["Duration", e]);
      }
      this.PendingHighlightSkill = () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 79, this.LogKey + "执行缓存的高亮操作", ["ClientEntityId", this.Entity.Id], ["ExploreToolId", t], ["Duration", e]);
        }
        this.ShowHighlightExploreSkill(t, e, i, o, s, r);
      };
    }
  }
  HideHighlightExploreSkill() {
    if (this.HighlightLogic) {
      this.HighlightLogic.HideHighlightExploreSkill();
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 79, this.LogKey + "尝试取消探索技能高亮时, 组件还未初始化完成, 考虑修改配置", ["ClientEntityId", this.Entity.Id], ["PendingHighlightSkill", this.PendingHighlightSkill !== undefined]);
      }
      this.PendingHighlightSkill = undefined;
    }
  }
  GetHighlightSkillId() {
    return this.HighlightLogic?.GetHighlightSkillId();
  }
  GetHighlightExploreToolId() {
    return this.HighlightLogic?.GetHighlightExploreToolId();
  }
  HandleSkillIconLogic(t, e) {
    var i = this.FocusTarget?.GetTagId();
    var o = this.FocusTarget?.GetHighlightTagId();
    if (this.LevelEventLightingSkill) {
      this.CurrentIconTagId = i;
      this.CurrentIconHighlightTagId = o;
    } else {
      this.UpdateHookIconTag(t, i, e);
      this.UpdateHookIconHighlightTag(t, o);
    }
  }
  CheckAllowLevelEventHighlightSkill() {
    return true;
  }
  OnLevelEventHighlightSkillUpdate(t) {}
  UpdateHookIconTag(t, e, i) {
    var o = this.CurrentIconTagId;
    if (t) {
      if (o && e !== o && this.TagComponent.HasTag(o) && (this.TagComponent.RemoveTag(o), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Character", 79, this.LogKey + "添加定点钩索可用标签时删除旧的定点钩索标签", ["Reason", i], ["EntityId", this.Entity.Id], ["OldTag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(o)]);
      }
      if (e && !this.TagComponent.HasTag(e) && (this.TagComponent.AddTag(e), this.CurrentIconTagId = e, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Character", 79, this.LogKey + "添加定点钩索可用标签", ["Reason", i], ["EntityId", this.Entity.Id], ["Tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)]);
      }
    } else if (this.CurrentIconTagId && this.TagComponent.HasTag(this.CurrentIconTagId) && (this.TagComponent.RemoveTag(this.CurrentIconTagId), this.CurrentIconTagId = undefined, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Character", 79, this.LogKey + "删除定点钩索可用标签", ["Reason", i], ["EntityId", this.Entity.Id], ["OldTag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(o)]);
    }
  }
  UpdateHookIconHighlightTag(t, e) {
    var i = this.CurrentIconHighlightTagId;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, this.LogKey + "更新按钮高亮Tag", ["Add", t], ["EntityId", this.Entity.Id], ["CurrentIconHighlightTagId", this.CurrentIconHighlightTagId], ["TryAddTagId", e], ["HasTag", e && this.TagComponent.HasTag(e)]);
    }
    if (i !== 0) {
      if (t) {
        if (i && e !== i && this.TagComponent.HasTag(i)) {
          this.TagComponent.RemoveTag(i);
        }
        if (e && !this.TagComponent.HasTag(e)) {
          this.TagComponent.AddTag(e);
          this.CurrentIconHighlightTagId = e;
        }
      } else if (this.CurrentIconHighlightTagId && this.TagComponent.HasTag(this.CurrentIconHighlightTagId)) {
        this.TagComponent.RemoveTag(this.CurrentIconHighlightTagId);
        this.CurrentIconHighlightTagId = undefined;
      }
    }
  }
  SendFixHookPush() {
    var t = this.InteractingTarget;
    if (t?.Valid && this.ActorComponent.IsAutonomousProxy) {
      RoleSceneInteractController_1.RoleSceneInteractController.SendHookMovePush(this.Entity, t);
    }
  }
  SendHookTargetRequest(e) {
    const i = this.InteractingTarget;
    var t;
    if (i?.Valid && this.ActorComponent.IsAutonomousProxy) {
      (t = Protocol_1.Aki.Protocol.dms.create()).F4n = MathUtils_1.MathUtils.NumberToLong(i.Entity.GetComponent(0).GetCreatureDataId());
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, this.LogKey + "SendHookTargetRequest", ["EntityConfigId", i.EntityConfigId]);
      }
      FixHookClientLevelEventExecutor_1.FixHookClientLevelEventExecutor.ExecuteHookActions(0, i);
      Net_1.Net.Call(23844, t, t => {
        switch (t.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_HookLockPointLocked:
          case Protocol_1.Aki.Protocol.Q4n.Proto_HookLockPointConditionNotMet:
            break;
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 79, "SendHookTargetRequest错误, 钩锁点不存在", ["EntityConfigId", i?.EntityConfigId], ["ServerEntityId", i?.ServerEntityId]);
            }
            break;
          default:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 79, "SendHookTargetRequest错误", ["EntityConfigId", i?.EntityConfigId], ["ServerEntityId", i?.ServerEntityId], ["Q4n", t.Q4n]);
            }
        }
        if (t?.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs) {
          e?.();
        }
      });
    }
  }
  SendHookEndRequest() {
    var t = this.InteractingTarget;
    if (t?.Valid && this.ActorComponent.IsAutonomousProxy) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, this.LogKey + "SendHookEndRequest", ["EntityConfigId", t.EntityConfigId]);
      }
      var e = t.Entity.GetComponent(0).GetCreatureDataId();
      const i = Protocol_1.Aki.Protocol.DC_.create();
      i.F4n = MathUtils_1.MathUtils.NumberToLong(e);
      i.Zlh = this.IsHookEndByInterrupt ? Protocol_1.Aki.Protocol.Zlh.Proto_Midway : Protocol_1.Aki.Protocol.Zlh.Proto_Endpoint;
      FixHookClientLevelEventExecutor_1.FixHookClientLevelEventExecutor.ExecuteHookActions(this.IsHookEndByInterrupt ? 1 : 2, t);
      Net_1.Net.Call(16335, i, t => {});
      if (t?.WillBeDestroyedAfterHook) {
        const i = Protocol_1.Aki.Protocol.Wgs.create();
        i.F4n = MathUtils_1.MathUtils.NumberToLong(e);
        Net_1.Net.Call(23757, i, t => {});
      } else if (t?.WillBeHideAfterHook) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t.Entity, false, this.LogKey + "SendHookEndRequest", true);
      }
    }
  }
};
BaseExploreComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(57)], BaseExploreComponent);
exports.BaseExploreComponent = BaseExploreComponent; //# sourceMappingURL=BaseExploreComponent.js.map