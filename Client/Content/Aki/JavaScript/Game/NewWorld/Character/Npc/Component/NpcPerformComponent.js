"use strict";
var __decorate = this && this.__decorate || function(t, e, i, r) {
  var o, s = arguments.length,
    n = s < 3 ? e : null === r ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) n = Reflect.decorate(t, e, i, r);
  else
    for (var h = t.length - 1; 0 <= h; h--)(o = t[h]) && (n = (s < 3 ? o(n) : 3 < s ? o(e, i, n) : o(e, i)) || n);
  return 3 < s && n && Object.defineProperty(e, i, n), n
};
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.NpcPerformComponent = exports.DEFUALT_DITHER_TIME = void 0;
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  Global_1 = require("../../../../Global"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  EnvironmentalPerceptionController_1 = require("../../../../World/Enviroment/EnvironmentalPerceptionController"),
  BasePerformComponent_1 = require("../../Common/Component/BasePerformComponent"),
  CharacterActorComponent_1 = require("../../Common/Component/CharacterActorComponent"),
  DEFAULT_EXIT_SHOW_RANGE_OFFSET = (exports.DEFUALT_DITHER_TIME = 3e3, 500);
let NpcPerformComponent = class NpcPerformComponent extends BasePerformComponent_1.BasePerformComponent {
  constructor() {
    super(...arguments), this.ActorComp = void 0, this.Owner = void 0, this.IsBeingImpacted = !1, this.IsBeingAttacked = !1, this.CollisionStrength = 0, this.CollisionDirection = 0, this.CurAnimState = 0, this.IsMultiAnimState = !1, this.IsNoTransitionSwitch = !1, this.IsAnimStateSwitching = !1, this.VisibleDitherEvent = void 0, this.OverrideShowRange = 0, this.IsForceInShowRange = !1, this.IsNpcOutShowRangeInternal = !1, this.IsNpcVisible = !0, this.IsNpcFirstVisible = !0, this.IsPendingDestroy = !1, this.IsUseFixLocation = !1, this.DestroyVisibleDitherEvent = () => {
      this.VisibleDitherEvent && (EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(this.VisibleDitherEvent), this.VisibleDitherEvent = void 0)
    }
  }
  get IsNpcOutShowRange() {
    return this.IsNpcOutShowRangeInternal
  }
  GetIsUseFixLocation() {
    return this.IsUseFixLocation
  }
  OnStart() {
    super.OnStart(), this.ActorComp = this.Entity.GetComponent(2), this.AnimComp = this.Entity.GetComponent(44), this.Owner = this.ActorComp.Owner;
    var t, e = this.ActorComp?.CreatureData?.GetPbEntityInitData();
    return e && (t = (0, IComponent_1.getComponent)(e.ComponentsData, "EntityVisibleComponent"), this.OverrideShowRange = t?.CustomVisibleRange ?? 0, t = (0, IComponent_1.getComponent)(e.ComponentsData, "NpcPerformComponent"), this.IsUseFixLocation = !!t?.FixedPosition, this.IsUseFixLocation && this.ActorComp instanceof CharacterActorComponent_1.CharacterActorComponent && (this.ActorComp.NeedFixBornLocation = !1), this.IsMultiAnimState = !!this.AnimComp?.MainAnimInstance?.IsA(UE.ABP_MultiStateNPC_C.StaticClass()), this.CanSwitchAnimState(t?.DefaultAbpState)) && this.SwitchAnimState({
      TargetStateName: t?.DefaultAbpState,
      IsNoTransition: !0,
      Context: "默认出生动画状态"
    }), !0
  }
  OnActivate() {
    super.OnActivate(), this.InitVisibleDitherCheck(), this.IsUseFixLocation && this.FixNpcOnInitLocation()
  }
  OnEnd() {
    return this.DestroyVisibleDitherEvent(), super.OnEnd(), !0
  }
  OnPlayerAttack() {}
  OnPlayerAttackBegin() {}
  OnPlayerAttackEnd() {}
  OnPlayerImpact() {}
  OnPlayerImpactBegin() {}
  OnPlayerImpactEnd() {}
  SetNpcShowState(t, e) {
    this.IsNpcOutShowRangeInternal === t && (this.IsNpcOutShowRangeInternal = !t, this.RefreshNpcDither(e))
  }
  TrySetNpcDither(t, e) {
    var i = this.ActorComp?.Actor?.DitherEffectController;
    i && !this.IsPendingDestroy && (t ? (this.IsNpcFirstVisible && ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && (this.IsNpcFirstVisible = !1, t = (t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy) ? Vector_1.Vector.Dist2D(t, this.ActorComp.ActorLocationProxy) : -1, Log_1.Log.CheckInfo()) && Log_1.Log.Info("NPC", 50, "NPC首次显示", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["EntityId", this.Entity.Id], ["CreatureId", this.ActorComp?.CreatureData.GetCreatureDataId()], ["ShowRange", this.GetNpcShowRange()], ["Dist", t], ["IsForce", this.IsForceInShowRange]), Log_1.Log.CheckDebug() && Log_1.Log.Debug("NPC", 50, "[NpcPerformComp] NPC显示", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["CreatureData", this.ActorComp?.CreatureData.GetCreatureDataId()], ["Reason", e]), i.EnterAppearEffect(1, 1, !1), this.Entity.GetComponent(82)?.EnableHeadInfo(!0)) : (Log_1.Log.CheckDebug() && Log_1.Log.Debug("NPC", 50, "[NpcPerformComp] NPC隐藏", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["CreatureData", this.ActorComp?.CreatureData.GetCreatureDataId()], ["Reason", e]), i.EnterDisappearEffect(1, 1, !1), this.Entity.GetComponent(82)?.EnableHeadInfo(!1)))
  }
  RefreshNpcDither(t) {
    var e = this.IsForceInShowRange || !this.IsNpcOutShowRange;
    this.IsNpcVisible !== e && (this.IsNpcVisible = e, this.TrySetNpcDither(e, t))
  }
  SetForceInShowRange(t) {
    this.IsForceInShowRange !== t && (this.IsForceInShowRange = t, this.RefreshNpcDither("SetForceInShowRange"))
  }
  HandlePendingDestroy() {
    this.IsPendingDestroy = !0, this.ActorComp.Actor.DitherEffectController?.EnterDisappearEffect(MathUtils_1.MathUtils.SecondToMillisecond / exports.DEFUALT_DITHER_TIME, 1, !1), TimerSystem_1.TimerSystem.Delay(() => {
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity)
    }, exports.DEFUALT_DITHER_TIME)
  }
  InitVisibleDitherCheck() {
    this.SetNpcShowState(!1, "默认出生隐藏"), this.ActorComp.Actor.DitherEffectController.ForceResetDither(), this.SetForceInShowRange(ControllerHolder_1.ControllerHolder.NpcPerformController.ForceNpcDitherVisibleMap.has(this.ActorComp.CreatureData.GetPbDataId()));
    var t = this.GetNpcShowRange(),
      e = t + DEFAULT_EXIT_SHOW_RANGE_OFFSET,
      i = this.Entity.GameBudgetManagedToken;
    this.VisibleDitherEvent = EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent(), this.VisibleDitherEvent.Init(t, i, () => {
      this.SetNpcShowState(!0, "感知进入")
    }, () => {
      this.SetNpcShowState(!1, "感知离开")
    }, this.DestroyVisibleDitherEvent, void 0, e, void 0), i && cpp_1.FKuroPerceptionInterface.MarkElementDisable(i, !this.Entity.Active)
  }
  OnEnable() {
    super.OnEnable(), this.Entity.GameBudgetManagedToken && cpp_1.FKuroPerceptionInterface.MarkElementDisable(this.Entity.GameBudgetManagedToken, !1)
  }
  OnDisable(t) {
    super.OnDisable(t), this.Entity.GameBudgetManagedToken && cpp_1.FKuroPerceptionInterface.MarkElementDisable(this.Entity.GameBudgetManagedToken, !0)
  }
  GetNpcShowRange() {
    return this.OverrideShowRange || UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.Kuro.NpcDisappearDistance")
  }
  FixNpcOnInitLocation() {
    MathUtils_1.MathUtils.CommonTempVector.DeepCopy(this.ActorComp.CreatureData.GetInitLocation()), this.ActorComp.Actor.KuroSetMovementMode({
      Mode: 5,
      Context: "[NpcPerformComponent.FixNpcOnInitLocation]"
    }), this.ActorComp.SetActorLocation(MathUtils_1.MathUtils.CommonTempVector.ToUeVector(), "NPC待机表演使用固定位置", !1);
    var t = this.Entity.GetComponent(181),
      e = this.Entity.GetComponent(113);
    t?.Disable("NPC待机表演使用固定位置"), e?.Disable("NPC待机表演使用固定位置")
  }
  CanSwitchAnimState(t) {
    return !!this.IsMultiAnimState && -1 !== (t = this.GetAbstractAnimState(t)) && this.CurAnimState !== t
  }
  GetAbstractAnimState(t) {
    var e;
    return !t || "" === t || !(e = this.ActorComp?.CreatureData.GetModelConfig().动画蓝图.ToAssetPathName()) || e.length < 2 ? -1 : ModelManager_1.ModelManager.PlotModel.GetAbpStateConfig(e.slice(0, -2))?.State2 === t ? 1 : 0
  }
  GetAnimStateName(t) {
    if (0 === t || 1 === t) {
      var e = this.ActorComp?.CreatureData.GetModelConfig().动画蓝图.ToAssetPathName();
      if (e) return e = ModelManager_1.ModelManager.PlotModel.GetAbpStateConfig(e.slice(0, -2)), t ? e?.State2 : e?.State1
    }
  }
  SwitchAnimState(t) {
    var e = this.GetAbstractAnimState(t.TargetStateName); - 1 !== e && this.CurAnimState !== e && (Log_1.Log.CheckInfo() && Log_1.Log.Info("NPC", 50, "NPC切换动画状态", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Pre", this.GetAnimStateName(this.CurAnimState)], ["Cur", this.GetAnimStateName(e)], ["IsNoTransition", !!t.IsNoTransition], ["Context", t.Context]), this.CurAnimState = e, this.IsNoTransitionSwitch ||= !!t.IsNoTransition)
  }
  MarkAnimStateSwitching(t) {
    this.IsMultiAnimState && t !== this.IsAnimStateSwitching && ((this.IsAnimStateSwitching = t) ? EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.NpcAnimStateSwitchBegin) : EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.NpcAnimStateSwitchEnd))
  }
};
NpcPerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(186)], NpcPerformComponent), exports.NpcPerformComponent = NpcPerformComponent;
//# sourceMappingURL=NpcPerformComponent.js.map