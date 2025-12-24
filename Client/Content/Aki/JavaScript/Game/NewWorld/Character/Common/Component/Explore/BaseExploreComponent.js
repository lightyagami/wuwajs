"use strict";

var BaseExploreComponent_1;
var __decorate = this && this.__decorate || function (t, e, o, i) {
  var s;
  var r = arguments.length;
  var h = r < 3 ? e : i === null ? i = Object.getOwnPropertyDescriptor(e, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    h = Reflect.decorate(t, e, o, i);
  } else {
    for (var n = t.length - 1; n >= 0; n--) {
      if (s = t[n]) {
        h = (r < 3 ? s(h) : r > 3 ? s(e, o, h) : s(e, o)) || h;
      }
    }
  }
  if (r > 3 && h) {
    Object.defineProperty(e, o, h);
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
const HighlightExploreSkillLogic_1 = require("./HighlightExploreSkillLogic");
let BaseExploreComponent = BaseExploreComponent_1 = class BaseExploreComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComponent = undefined;
    this.SkillComponent = undefined;
    this.TagComponent = undefined;
    this.HighlightLogic = undefined;
    this.CurrentIconTagId = undefined;
    this.CurrentIconHighlightTagId = undefined;
    this.LevelEventLightingSkill = false;
    this.VXf = undefined;
    this.InteractingTargetEntityId = undefined;
    this.FocusTargetInternal = undefined;
    this.FocusTargetLegalInternal = false;
    this.NextLegalExceptSkill = false;
    this.IsHookEndByInterrupt = false;
    this.LogKey = "";
    this.ExploreComponentEnabled = false;
    this.PendingHighlightSkill = undefined;
    this.IsLockingTarget = false;
  }
  get InteractingTarget() {
    return this.VXf;
  }
  set InteractingTarget(t) {
    if (this.VXf?.Valid && t !== this.VXf) {
      this.VXf.ChangeHookPointState(0);
    }
    this.VXf = t;
    this.InteractingTargetEntityId = t?.Entity.Id;
  }
  get FocusTarget() {
    return this.FocusTargetInternal;
  }
  get FocusTargetLegal() {
    return this.FocusTargetLegalInternal;
  }
  set FocusTargetLegal(t) {
    this.FocusTargetLegalInternal = t;
  }
  OnStart() {
    this.ActorComponent = this.Entity.GetComponent(1);
    this.SkillComponent = this.Entity.GetComponent(41);
    this.TagComponent = this.Entity.GetComponent(215);
    this.HighlightLogic = new HighlightExploreSkillLogic_1.HighlightExploreSkillLogic();
    this.HighlightLogic.Init(this);
    this.PendingHighlightSkill?.();
    return !(this.PendingHighlightSkill = undefined);
  }
  OnEnd() {
    this.HighlightLogic?.Dispose();
    return !(this.HighlightLogic = undefined);
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
  OnDetectedTargetChanged() {}
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
        this.NextLegalExceptSkill = true;
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
    if (this.FocusTargetInternal?.Valid) {
      this.FocusTargetInternal.ChangeHookPointState(0);
    }
    if (t?.Valid) {
      t.ChangeHookPointState(e ? 1 : 2);
    }
    this.FocusTargetLegalInternal = !!t?.Valid && e;
    this.FocusTargetInternal = t;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, this.LogKey + "设置当前交互目标", ["TargetEntityConfigId", t?.EntityConfigId], ["TargetLegal", !!t?.Valid && e]);
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ExploreComponentTargetChanged);
    this.OnDetectedTargetChanged();
  }
  ShowHighlightExploreSkill(t, e, o, i, s, r) {
    if (this.HighlightLogic) {
      this.HighlightLogic.ShowHighlightExploreSkill(t, e, o, i, s, r);
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 79, this.LogKey + "尝试高亮探索技能时, 组件还未初始化完成, 缓存高亮操作, 考虑修改配置", ["ExploreToolId", t], ["Duration", e]);
      }
      this.PendingHighlightSkill = () => {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("Character", 79, this.LogKey + "执行缓存的高亮操作", ["ExploreToolId", t], ["Duration", e]);
        }
        this.ShowHighlightExploreSkill(t, e, o, i, s, r);
      };
    }
  }
  HideHighlightExploreSkill() {
    if (this.HighlightLogic) {
      this.HighlightLogic.HideHighlightExploreSkill();
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Character", 79, this.LogKey + "尝试取消探索技能高亮时, 组件还未初始化完成, 考虑修改配置", ["PendingHighlightSkill", this.PendingHighlightSkill !== undefined]);
      }
      this.PendingHighlightSkill = undefined;
    }
  }
  HandleSkillIconLogic(t, e, o) {
    if (this.LevelEventLightingSkill) {
      this.CurrentIconTagId = e;
      this.CurrentIconHighlightTagId = BaseExploreComponent_1.kKf;
    } else {
      this.UpdateHookIconTag(t, e, o);
      this.UpdateHookIconHighlightTag(t);
    }
  }
  CheckAllowLevelEventHighlightSkill() {
    return true;
  }
  OnLevelEventHighlightSkillUpdate(t) {}
  UpdateHookIconTag(t, e, o) {
    var i = this.CurrentIconTagId;
    if (t) {
      if (i && e !== i && this.TagComponent.HasTag(i) && (this.TagComponent.RemoveTag(i), Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Character", 79, this.LogKey + "添加定点钩索可用标签时删除旧的定点钩索标签", ["Reason", o], ["EntityId", this.Entity.Id], ["OldTag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(i)]);
      }
      if (e && !this.TagComponent.HasTag(e) && (this.TagComponent.AddTag(e), this.CurrentIconTagId = e, Log_1.Log.CheckInfo())) {
        Log_1.Log.Info("Character", 79, this.LogKey + "添加定点钩索可用标签", ["Reason", o], ["EntityId", this.Entity.Id], ["Tag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(e)]);
      }
    } else if (this.CurrentIconTagId && this.TagComponent.HasTag(this.CurrentIconTagId) && (this.TagComponent.RemoveTag(this.CurrentIconTagId), this.CurrentIconTagId = undefined, Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Character", 79, this.LogKey + "删除定点钩索可用标签", ["Reason", o], ["EntityId", this.Entity.Id], ["OldTag", GameplayTagUtils_1.GameplayTagUtils.GetNameByTagId(i)]);
    }
  }
  UpdateHookIconHighlightTag(t) {
    var e = BaseExploreComponent_1.kKf;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Character", 79, this.LogKey + "更新按钮高亮Tag", ["Add", t], ["EntityId", this.Entity.Id], ["CurrentIconHighlightTagId", this.CurrentIconHighlightTagId], ["TryAddTagId", e], ["HasTag", this.TagComponent.HasTag(e)]);
    }
    if (t) {
      if (!this.CurrentIconHighlightTagId && !this.TagComponent.HasTag(e)) {
        this.TagComponent.AddTag(e);
        this.CurrentIconHighlightTagId = e;
      }
    } else if (this.CurrentIconHighlightTagId && this.TagComponent.HasTag(e)) {
      this.TagComponent.RemoveTag(e);
      this.CurrentIconHighlightTagId = undefined;
    }
  }
  SendHookTargetRequest(e) {
    const o = this.InteractingTarget;
    var t;
    if (o?.Valid && this.ActorComponent.IsAutonomousProxy) {
      (t = Protocol_1.Aki.Protocol.dms.create()).F4n = MathUtils_1.MathUtils.NumberToLong(o.Entity.GetComponent(0).GetCreatureDataId());
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("Character", 79, this.LogKey + "SendHookTargetRequest", ["EntityConfigId", o.EntityConfigId]);
      }
      Net_1.Net.Call(19182, t, t => {
        switch (t.Q4n) {
          case Protocol_1.Aki.Protocol.Q4n.KRs:
          case Protocol_1.Aki.Protocol.Q4n.Proto_HookLockPointLocked:
          case Protocol_1.Aki.Protocol.Q4n.Proto_HookLockPointConditionNotMet:
            break;
          case Protocol_1.Aki.Protocol.Q4n.Proto_ErrSceneEntityNotExist:
            if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Character", 79, "钩锁点不存在", ["EntityConfigId", o?.EntityConfigId]);
            }
            break;
          default:
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(t.Q4n, 25582);
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
      const o = Protocol_1.Aki.Protocol.DC_.create();
      o.F4n = MathUtils_1.MathUtils.NumberToLong(e);
      o.Zlh = this.IsHookEndByInterrupt ? Protocol_1.Aki.Protocol.Zlh.Proto_Midway : Protocol_1.Aki.Protocol.Zlh.Proto_Endpoint;
      Net_1.Net.Call(29303, o, t => {});
      if (t?.WillBeDestroyedAfterHook) {
        const o = Protocol_1.Aki.Protocol.Wgs.create();
        o.F4n = MathUtils_1.MathUtils.NumberToLong(e);
        Net_1.Net.Call(20887, o, t => {});
      } else if (t?.WillBeHideAfterHook) {
        ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(t.Entity, false, this.LogKey + "SendHookEndRequest", true);
      }
    }
  }
};
BaseExploreComponent.kKf = 1628786673;
BaseExploreComponent = BaseExploreComponent_1 = __decorate([(0, RegisterComponent_1.RegisterComponent)(55)], BaseExploreComponent);
exports.BaseExploreComponent = BaseExploreComponent; //# sourceMappingURL=BaseExploreComponent.js.map