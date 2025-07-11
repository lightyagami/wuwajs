"use strict";

var __decorate = this && this.__decorate || function (e, t, i, o) {
  var n;
  var s = arguments.length;
  var r = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, o);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (n = e[l]) {
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
exports.VehicleSplineMoveComponent = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const Global_1 = require("../../../Global");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const BaseSplineMoveComponent_1 = require("../../Common/Component/BaseSplineMoveComponent");
let VehicleSplineMoveComponent = class VehicleSplineMoveComponent extends BaseSplineMoveComponent_1.BaseSplineMoveComponent {
  constructor() {
    super(...arguments);
    this.CharActorComp = undefined;
    this.PerformComp = undefined;
    this.ExtraMoveParams = undefined;
    this.OnVehicleBeenLeaved = e => {
      if (e.IsRolePassenger(true)) {
        this.ForceStopSplineMove();
      }
    };
  }
  OnStart() {
    super.OnStart();
    if ((0, RegisterComponent_1.isComponentInstance)(this.ActorComp, 234)) {
      this.CharActorComp = this.ActorComp;
    }
    this.PerformComp = this.Entity.GetComponent(237);
    return true;
  }
  OnTick(e) {
    var t = this.CurrentSplineMoveParams;
    if (t) {
      if (!!this.SplineMoveParamsMap.has(t.Id) || !(t.EarliestLeaveTime <= Time_1.Time.NowSeconds) || !!this.SelectNextSplineMove()) {
        this.UpdateSplineLocationAndDirection();
        this.UpdateLastSplineLocationAndDirection();
        t = e * MathUtils_1.MathUtils.MillisecondToSecond;
        this.PositionAdjust(this.SplineTimeKey, t);
        this.InputAdjust();
        this.LastLocation.DeepCopy(this.TargetLocation);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Movement", 6, "Tick in No SplineMove!");
      }
      this.DisableKey = this.Disable("[SplineMoveComponent.OnTick] this.CurrentSplineMoveParams为false");
    }
  }
  OnEnd() {
    this.OnSplineMoveDisable();
    return super.OnEnd();
  }
  InputAdjust() {
    var e = this.CharActorComp.InputDirectProxy;
    if (this.CurrentSplineMoveType === "SlideTrack") {
      this.InputAdjustSlideTrack(e);
    }
  }
  InputAdjustSlideTrack(e) {}
  SetExtraMoveParams(e) {
    this.ExtraMoveParams = e;
  }
  ResetExtraMoveParams() {
    this.ExtraMoveParams = undefined;
  }
  StartMoveConditionCheck(e, t) {
    var i = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
    return !!i && !!this.PerformComp?.IsDriver(i) && super.StartMoveConditionCheck(e, t);
  }
  ApplySplineMoveDaConfig() {}
  ResetSplineMoveDaConfig() {
    this.PerformComp?.ResetVehicleConfig(true);
  }
  OnSplineMoveEnable(e, t) {
    this.ApplySplineMoveDaConfig();
    ControllerHolder_1.ControllerHolder.VehicleController.SetRideSharingEnable(false);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnVehicleBeenLeaved);
  }
  OnSplineMoveDisable() {
    this.ResetSplineMoveDaConfig();
    ControllerHolder_1.ControllerHolder.VehicleController.SetRideSharingEnable(true);
    if (EventSystem_1.EventSystem.HasWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnVehicleBeenLeaved)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnVehicleBeenLeaved);
    }
  }
  OnSelectNextSplineMoveEnd() {
    this.CharActorComp?.ClearInput();
    this.LastLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
  }
};
VehicleSplineMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(109)], VehicleSplineMoveComponent);
exports.VehicleSplineMoveComponent = VehicleSplineMoveComponent; //# sourceMappingURL=VehicleSplineMoveComponent.js.map