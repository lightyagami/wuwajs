"use strict";

var __decorate = this && this.__decorate || function (e, t, n, o) {
  var i;
  var s = arguments.length;
  var r = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, n) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, n, o);
  } else {
    for (var l = e.length - 1; l >= 0; l--) {
      if (i = e[l]) {
        r = (s < 3 ? i(r) : s > 3 ? i(t, n, r) : i(t, n)) || r;
      }
    }
  }
  if (s > 3 && r) {
    Object.defineProperty(t, n, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleSplineMoveComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
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
    if ((0, RegisterComponent_1.isComponentInstance)(this.ActorComp, 238)) {
      this.CharActorComp = this.ActorComp;
    }
    this.PerformComp = this.Entity.GetComponent(241);
    return true;
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
    var n = Global_1.Global.BaseCharacter?.GetEntityNoBlueprint();
    return !!n && !!this.PerformComp?.IsDriver(n) && super.StartMoveConditionCheck(e, t);
  }
  ApplySplineMoveDaConfig() {}
  ResetSplineMoveDaConfig() {
    this.PerformComp?.ResetVehicleConfig(true);
  }
  OnSplineMoveEnable(e, t) {
    super.OnSplineMoveEnable(e, t);
    this.ApplySplineMoveDaConfig();
    ControllerHolder_1.ControllerHolder.VehicleController.SetRideSharingEnable(false);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnVehicleBeenLeaved);
  }
  OnSplineMoveDisable() {
    super.OnSplineMoveDisable();
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
VehicleSplineMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(112)], VehicleSplineMoveComponent);
exports.VehicleSplineMoveComponent = VehicleSplineMoveComponent; //# sourceMappingURL=VehicleSplineMoveComponent.js.map