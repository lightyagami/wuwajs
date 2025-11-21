"use strict";

var __decorate = this && this.__decorate || function (t, e, i, r) {
  var o;
  var s = arguments.length;
  var n = s < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, i) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, r);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (o = t[h]) {
        n = (s < 3 ? o(n) : s > 3 ? o(e, i, n) : o(e, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPerformComponent = exports.DEFUALT_DITHER_TIME = undefined;
const cpp_1 = require("cpp");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const Global_1 = require("../../../../Global");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const EnvironmentalPerceptionController_1 = require("../../../../World/Enviroment/EnvironmentalPerceptionController");
const BasePerformComponent_1 = require("../../Common/Component/BasePerformComponent");
const CharacterActorComponent_1 = require("../../Common/Component/CharacterActorComponent");
const NpcMaterialController_1 = require("./NpcMaterialController");
exports.DEFUALT_DITHER_TIME = 3000;
const DEFAULT_EXIT_SHOW_RANGE_OFFSET = 500;
let NpcPerformComponent = class NpcPerformComponent extends BasePerformComponent_1.BasePerformComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.Owner = undefined;
    this.IsBeingImpacted = false;
    this.IsBeingAttacked = false;
    this.CollisionStrength = 0;
    this.CollisionDirection = 0;
    this.CurAnimState = 0;
    this.IsMultiAnimState = false;
    this.IsNoTransitionSwitch = false;
    this.IsAnimStateSwitching = false;
    this.VisibleDitherEvent = undefined;
    this.OverrideShowRange = 0;
    this.IsForceInShowRange = false;
    this.IsNpcOutShowRangeInternal = false;
    this.IsNpcVisible = true;
    this.IsNpcFirstVisible = true;
    this.CueHandles = new Set();
    this.MaterialController = undefined;
    this.IsPendingDestroy = false;
    this.IsUseFixLocation = false;
    this.DestroyVisibleDitherEvent = () => {
      if (this.VisibleDitherEvent) {
        EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.DestroyPlayerPerceptionEvent(this.VisibleDitherEvent);
        this.VisibleDitherEvent = undefined;
      }
    };
  }
  get IsNpcOutShowRange() {
    return this.IsNpcOutShowRangeInternal;
  }
  GetIsUseFixLocation() {
    return this.IsUseFixLocation;
  }
  OnStart() {
    super.OnStart();
    this.ActorComp = this.Entity.GetComponent(2);
    this.AnimComp = this.Entity.GetComponent(44);
    this.Owner = this.ActorComp.Owner;
    this.InitFromEntityData();
    this.MaterialController = new NpcMaterialController_1.NpcMaterialController(this.Entity);
    return true;
  }
  OnActivate() {
    super.OnActivate();
    this.InitVisibleDitherCheck();
    if (this.IsUseFixLocation) {
      this.FixNpcOnInitLocation();
    }
  }
  OnEnd() {
    this.MaterialController?.Dispose();
    this.DestroyVisibleDitherEvent();
    var t = this.Entity.GetComponent(229);
    for (const e of this.CueHandles) {
      t?.RemoveCueByHandle(e);
    }
    this.CueHandles.clear();
    super.OnEnd();
    return true;
  }
  OnPlayerAttack() {}
  OnPlayerAttackBegin() {}
  OnPlayerAttackEnd() {}
  OnPlayerImpact() {}
  OnPlayerImpactBegin() {}
  OnPlayerImpactEnd() {}
  SetNpcShowState(t, e) {
    if (this.IsNpcOutShowRangeInternal === t) {
      this.IsNpcOutShowRangeInternal = !t;
      this.RefreshNpcDither(e);
    }
  }
  TrySetNpcDither(t, e) {
    var i = this.ActorComp?.Actor?.DitherEffectController;
    if (i && !this.IsPendingDestroy) {
      if (t) {
        if (this.IsNpcFirstVisible && ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && (this.IsNpcFirstVisible = false, t = (t = Global_1.Global.BaseCharacter?.CharacterActorComponent?.ActorLocationProxy) ? Vector_1.Vector.Dist2D(t, this.ActorComp.ActorLocationProxy) : -1, Log_1.Log.CheckInfo())) {
          Log_1.Log.Info("NPC", 50, "NPC首次显示", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["EntityId", this.Entity.Id], ["CreatureId", this.ActorComp?.CreatureData.GetCreatureDataId()], ["ShowRange", this.GetNpcShowRange()], ["Dist", t], ["IsForce", this.IsForceInShowRange]);
        }
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("NPC", 50, "[NpcPerformComp] NPC显示", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["CreatureData", this.ActorComp?.CreatureData.GetCreatureDataId()], ["Reason", e]);
        }
        i.EnterAppearEffect(1, 1, false);
        this.Entity.GetComponent(82)?.EnableHeadInfo(true);
      } else {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("NPC", 50, "[NpcPerformComp] NPC隐藏", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["CreatureData", this.ActorComp?.CreatureData.GetCreatureDataId()], ["Reason", e]);
        }
        i.EnterDisappearEffect(1, 1, false);
        this.Entity.GetComponent(82)?.EnableHeadInfo(false);
      }
    }
  }
  RefreshNpcDither(t) {
    var e = this.IsForceInShowRange || !this.IsNpcOutShowRange;
    if (this.IsNpcVisible !== e) {
      this.IsNpcVisible = e;
      this.TrySetNpcDither(e, t);
    }
  }
  SetForceInShowRange(t) {
    if (this.IsForceInShowRange !== t) {
      this.IsForceInShowRange = t;
      this.RefreshNpcDither("SetForceInShowRange");
    }
  }
  HandlePendingDestroy() {
    this.IsPendingDestroy = true;
    this.ActorComp.Actor.DitherEffectController?.EnterDisappearEffect(MathUtils_1.MathUtils.SecondToMillisecond / exports.DEFUALT_DITHER_TIME, 1, false);
    TimerSystem_1.TimerSystem.Delay(() => {
      ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(this.Entity);
    }, exports.DEFUALT_DITHER_TIME);
  }
  InitVisibleDitherCheck() {
    this.SetNpcShowState(false, "默认出生隐藏");
    this.ActorComp.Actor.DitherEffectController.ForceResetDither();
    this.SetForceInShowRange(ControllerHolder_1.ControllerHolder.NpcPerformController.ForceNpcDitherVisibleMap.has(this.ActorComp.CreatureData.GetPbDataId()));
    var t = this.GetNpcShowRange();
    var e = t + DEFAULT_EXIT_SHOW_RANGE_OFFSET;
    var i = this.Entity.GameBudgetManagedToken;
    this.VisibleDitherEvent = EnvironmentalPerceptionController_1.EnvironmentalPerceptionController.CreatePlayerPerceptionEvent();
    this.VisibleDitherEvent.Init(t, i, () => {
      this.SetNpcShowState(true, "感知进入");
    }, () => {
      this.SetNpcShowState(false, "感知离开");
    }, this.DestroyVisibleDitherEvent, undefined, e, undefined);
    if (i) {
      cpp_1.FKuroPerceptionInterface.MarkElementDisable(i, !this.Entity.Active);
    }
  }
  OnEnable() {
    super.OnEnable();
    if (this.Entity.GameBudgetManagedToken) {
      cpp_1.FKuroPerceptionInterface.MarkElementDisable(this.Entity.GameBudgetManagedToken, false);
    }
  }
  OnDisable(t) {
    super.OnDisable(t);
    if (this.Entity.GameBudgetManagedToken) {
      cpp_1.FKuroPerceptionInterface.MarkElementDisable(this.Entity.GameBudgetManagedToken, true);
    }
  }
  GetNpcShowRange() {
    return this.OverrideShowRange || UE.KismetSystemLibrary.GetConsoleVariableFloatValue("r.Kuro.NpcDisappearDistance");
  }
  FixNpcOnInitLocation() {
    MathUtils_1.MathUtils.CommonTempVector.DeepCopy(this.ActorComp.CreatureData.GetInitLocation());
    this.ActorComp.Actor.KuroSetMovementMode({
      Mode: 5,
      Context: "[NpcPerformComponent.FixNpcOnInitLocation]"
    });
    this.ActorComp.SetActorLocation(MathUtils_1.MathUtils.CommonTempVector.ToUeVector(), "NPC待机表演使用固定位置", false);
    var t = this.Entity.GetComponent(185);
    var e = this.Entity.GetComponent(117);
    t?.Disable("NPC待机表演使用固定位置");
    e?.Disable("NPC待机表演使用固定位置");
  }
  CanSwitchAnimState(t) {
    return !!this.IsMultiAnimState && (t = this.GetAbstractAnimState(t)) !== -1 && this.CurAnimState !== t;
  }
  GetAbstractAnimState(t) {
    var e;
    if (!t || t === "" || !(e = this.ActorComp?.CreatureData.GetModelConfig().动画蓝图.ToAssetPathName()) || e.length < 2) {
      return -1;
    } else if (ModelManager_1.ModelManager.PlotModel.GetAbpStateConfig(e.slice(0, -2))?.State2 === t) {
      return 1;
    } else {
      return 0;
    }
  }
  GetAnimStateName(t) {
    if (t === 0 || t === 1) {
      var e = this.ActorComp?.CreatureData.GetModelConfig().动画蓝图.ToAssetPathName();
      if (e) {
        e = ModelManager_1.ModelManager.PlotModel.GetAbpStateConfig(e.slice(0, -2));
        if (t) {
          return e?.State2;
        } else {
          return e?.State1;
        }
      }
    }
  }
  SwitchAnimState(t) {
    var e = this.GetAbstractAnimState(t.TargetStateName);
    if (e !== -1 && this.CurAnimState !== e) {
      if (Log_1.Log.CheckInfo()) {
        Log_1.Log.Info("NPC", 50, "NPC切换动画状态", ["PbDataId", this.ActorComp?.CreatureData.GetPbDataId()], ["Pre", this.GetAnimStateName(this.CurAnimState)], ["Cur", this.GetAnimStateName(e)], ["IsNoTransition", !!t.IsNoTransition], ["Context", t.Context]);
      }
      this.CurAnimState = e;
      this.IsNoTransitionSwitch ||= !!t.IsNoTransition;
    }
  }
  MarkAnimStateSwitching(t) {
    if (this.IsMultiAnimState && t !== this.IsAnimStateSwitching) {
      if (this.IsAnimStateSwitching = t) {
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.NpcAnimStateSwitchBegin);
      } else {
        EventSystem_1.EventSystem.EmitWithTarget(this.Entity, EventDefine_1.EEventName.NpcAnimStateSwitchEnd);
      }
    }
  }
  InitFromEntityData() {
    var t = this.ActorComp?.CreatureData?.GetPbEntityInitData();
    if (t) {
      var e = (0, IComponent_1.getComponent)(t.ComponentsData, "EntityVisibleComponent");
      this.OverrideShowRange = e?.CustomVisibleRange ?? 0;
      var e = (0, IComponent_1.getComponent)(t.ComponentsData, "NpcPerformComponent");
      this.IsUseFixLocation = !!e?.FixedPosition;
      if (this.IsUseFixLocation && this.ActorComp instanceof CharacterActorComponent_1.CharacterActorComponent) {
        this.ActorComp.NeedFixBornLocation = false;
      }
      this.IsMultiAnimState = !!this.AnimComp?.MainAnimInstance?.IsA(UE.ABP_MultiStateNPC_C.StaticClass());
      if (this.CanSwitchAnimState(e?.DefaultAbpState)) {
        this.SwitchAnimState({
          TargetStateName: e?.DefaultAbpState,
          IsNoTransition: true,
          Context: "默认出生动画状态"
        });
      }
      if (e?.DefaultPerform?.BuffEffectIds) {
        var i = this.Entity.GetComponent(229);
        for (const r of e.DefaultPerform.BuffEffectIds) {
          this.CueHandles.add(i.AddCue(r));
        }
      }
    }
  }
};
NpcPerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(190)], NpcPerformComponent);
exports.NpcPerformComponent = NpcPerformComponent; //# sourceMappingURL=NpcPerformComponent.js.map