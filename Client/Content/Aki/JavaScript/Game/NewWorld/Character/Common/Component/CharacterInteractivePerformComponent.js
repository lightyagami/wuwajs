"use strict";

var __decorate = this && this.__decorate || function (t, e, i, s) {
  var n;
  var h = arguments.length;
  var r = h < 3 ? e : s === null ? s = Object.getOwnPropertyDescriptor(e, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(t, e, i, s);
  } else {
    for (var o = t.length - 1; o >= 0; o--) {
      if (n = t[o]) {
        r = (h < 3 ? n(r) : h > 3 ? n(e, i, r) : n(e, i)) || r;
      }
    }
  }
  if (h > 3 && r) {
    Object.defineProperty(e, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterInteractivePerformComponent = undefined;
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
let CharacterInteractivePerformComponent = class CharacterInteractivePerformComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.AnimComp = undefined;
    this.TagComp = undefined;
    this.RequestCacheList = new Map();
    this.ResponseCacheList = new Set();
    this.CurHandleRequest = undefined;
    this.CurHandleConfig = undefined;
    this.ListenCharActionType = undefined;
    this.CurResponseMontage = undefined;
    this.OnPlotBegin = () => {
      this.TryInterruptResponse("剧情开始");
    };
    this.OnBattleBegin = t => {
      if (t) {
        this.TryInterruptResponse("战斗开始");
      }
    };
    this.OnUseSkill = () => {
      this.TryInterruptResponse("使用技能");
    };
    this.OnRemoveEntity = () => {
      this.TryInterruptResponse("实体移除");
    };
    this.OnPositionStateChange = (t, e) => {
      if (e !== CharacterUnifiedStateTypes_1.ECharPositionState.Ground) {
        this.TryInterruptResponse("位置模式改变");
      }
    };
    this.OnMoveStateChange = (t, e) => {
      if (e !== CharacterUnifiedStateTypes_1.ECharMoveState.Stand) {
        this.TryInterruptResponse("移动模式改变");
      }
    };
    this.OnCharHoldingHandsChange = () => {
      this.TryInterruptResponse("牵手状态改变");
    };
    this.OnCharActionStateChange = (t, e) => {
      if (this.ListenCharActionType === t && !e) {
        this.TryInterruptResponse("角色交互行为状态改变");
      }
    };
    this.OnResponseMontageEnd = (t, e) => {
      if (t === this.CurResponseMontage) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BasePerform", 50, "[InteractivePerform] 响应Montage播放完成", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Signal", this.CurHandleRequest?.Signal], ["Montage", t?.GetName()]);
        }
        this.TagComp?.RemoveTag(-275469498);
        this.AnimComp?.MainAnimInstance?.OnMontageEnded.Remove(this.OnResponseMontageEnd);
        this.CurResponseMontage = undefined;
        this.FinishRequest();
      }
    };
  }
  OnStart() {
    this.ActorComp = this.Entity.GetComponent(3);
    this.AnimComp = this.Entity.GetComponent(178);
    this.TagComp = this.Entity.GetComponent(206);
    return true;
  }
  OnEnd() {
    this.FinishRequest();
    return true;
  }
  AddGlobalEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.PlotNetworkStart, this.OnPlotBegin);
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnBattleStateChanged, this.OnBattleBegin);
  }
  AddEntityEvents(t) {
    EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharUseSkill, this.OnUseSkill);
    EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
    EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharOnPositionStateChanged, this.OnPositionStateChange);
    EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.OnMoveStateChange);
  }
  RemoveGlobalEvents() {
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.PlotNetworkStart, this.OnPlotBegin);
    EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnBattleStateChanged, this.OnBattleBegin);
  }
  RemoveEntityEvents(t) {
    EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharUseSkill, this.OnUseSkill);
    EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.OnRemoveEntity);
    EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharOnPositionStateChanged, this.OnPositionStateChange);
    EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged, this.OnMoveStateChange);
  }
  CanResponse() {
    return !!this.TagComp && !this.ActorComp?.MoveComp?.HasMoveInput && !ModelManager_1.ModelManager.PlotModel.IsInPlot && !!this.TagComp.HasTag(-1898186757) && !this.TagComp.HasTag(1996802261) && !this.TagComp.HasTag(-1371021686);
  }
  AddConditionEvents(t, e) {
    if (e === "HandInSeat") {
      this.ListenCharActionType = 0;
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharActionStateChange, this.OnCharActionStateChange);
      EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.CharHoldingHandsChanged, this.OnCharHoldingHandsChange);
    }
  }
  RemoveConditionEvents(t, e) {
    if (e === "HandInSeat") {
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharHoldingHandsChanged, this.OnCharHoldingHandsChange);
      EventSystem_1.EventSystem.RemoveWithTarget(t, EventDefine_1.EEventName.CharActionStateChange, this.OnCharActionStateChange);
      this.ListenCharActionType = undefined;
    }
  }
  CanResponseForHandInSeat() {
    return !!this.Entity.GetComponent(29)?.IsSitDown && !!this.Entity.GetComponent(298)?.IsSitDownWithHoldingHands();
  }
  AddRequestSignal(t) {
    this.RequestCacheList.set(t.Signal, t);
    this.TryResponse(t.Signal);
  }
  RemoveRequestSignal(t) {
    this.RequestCacheList.delete(t);
  }
  AddResponseSignal(t, e = 0) {
    this.ResponseCacheList.add(t);
    this.TryResponse(t);
  }
  RemoveResponseSignal(t) {
    this.ResponseCacheList.delete(t);
  }
  TryResponse(t) {
    var e;
    return !!this.CanResponse() && !this.CurHandleRequest && !!this.ResponseCacheList.has(t) && !!(t = this.RequestCacheList.get(t)) && !!(e = ConfigManager_1.ConfigManager.AnsPerformConfig.GetConfigData(t.Signal)) && !!this.RequestConditionCheck(t, e) && !(this.ResponseToRequest(t, e), 0);
  }
  RequestConditionCheck(t, e) {
    return e.Condition === "HandInSeat" && this.CanResponseForHandInSeat();
  }
  ResponseToRequest(t, e) {
    if (this.ResponseActionStart(e)) {
      this.CurHandleRequest = t;
      this.CurHandleConfig = e;
      this.RemoveRequestSignal(t.Signal);
      this.RemoveResponseSignal(t.Signal);
      this.AddGlobalEvents();
      this.AddEntityEvents(this.Entity);
      this.AddEntityEvents(t.Source);
      this.AddConditionEvents(this.Entity, e.Condition);
    }
  }
  ResponseActionStart(e) {
    if (!this.AnimComp) {
      return false;
    }
    const i = this.GetRoleMontagePathFromName(e.Action);
    return i !== "" && (ResourceSystem_1.ResourceSystem.LoadAsync(i, UE.AnimMontage, t => {
      if (t?.IsValid()) {
        this.PlayResponseMontage(t);
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("BasePerform", 50, "[InteractivePerform] 播放响应Montage", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Signal", e.Id], ["Montage", t.GetName()]);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("BasePerform", 50, "[InteractivePerform] 加载响应Montage失败", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Signal", e.Id], ["Path", i]);
        }
        this.FinishRequest();
      }
    }), true);
  }
  ResponseActionAbort() {
    if (this.CurResponseMontage) {
      this.AnimComp?.MainAnimInstance?.Montage_Stop(0, this.CurResponseMontage);
    }
  }
  TryInterruptResponse(t) {
    return !!this.CurHandleRequest && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("BasePerform", 50, "[InteractivePerform] 打断响应表演", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Reason", t]), this.ResponseActionAbort(), this.FinishRequest(), true);
  }
  FinishRequest() {
    if (this.CurHandleRequest) {
      this.RemoveGlobalEvents();
      this.RemoveEntityEvents(this.Entity);
      this.RemoveEntityEvents(this.CurHandleRequest.Source);
      this.RemoveConditionEvents(this.Entity, this.CurHandleConfig.Condition);
      this.CurHandleRequest = undefined;
      this.CurHandleConfig = undefined;
    }
  }
  PlayResponseMontage(t) {
    this.AnimComp?.MainAnimInstance?.Montage_Play(t);
    this.AnimComp?.MainAnimInstance?.OnMontageEnded.Add(this.OnResponseMontageEnd);
    this.TagComp?.AddTag(-275469498);
    this.CurResponseMontage = t;
  }
  GetRoleMontagePathFromName(t) {
    var e = this.ActorComp?.CreatureData.GetModelConfig().蓝图.ToAssetPathName();
    if (e && e !== "" && e !== "None") {
      return e.substring(0, e.lastIndexOf("/", e.lastIndexOf("/") - 1)) + "/BaseAnim/" + t + "." + t;
    } else {
      return "";
    }
  }
};
CharacterInteractivePerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(300)], CharacterInteractivePerformComponent);
exports.CharacterInteractivePerformComponent = CharacterInteractivePerformComponent; //# sourceMappingURL=CharacterInteractivePerformComponent.js.map