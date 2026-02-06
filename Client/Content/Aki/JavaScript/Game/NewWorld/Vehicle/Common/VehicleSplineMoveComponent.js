"use strict";

var __decorate = this && this.__decorate || function (e, t, i, s) {
  var o;
  var n = arguments.length;
  var r = n < 3 ? t : s === null ? s = Object.getOwnPropertyDescriptor(t, i) : s;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, i, s);
  } else {
    for (var h = e.length - 1; h >= 0; h--) {
      if (o = e[h]) {
        r = (n < 3 ? o(r) : n > 3 ? o(t, i, r) : o(t, i)) || r;
      }
    }
  }
  if (n > 3 && r) {
    Object.defineProperty(t, i, r);
  }
  return r;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleSplineMoveComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const BaseSplineMoveComponent_1 = require("../../Common/Component/BaseSplineMoveComponent");
let VehicleSplineMoveComponent = class VehicleSplineMoveComponent extends BaseSplineMoveComponent_1.BaseSplineMoveComponent {
  constructor() {
    super(...arguments);
    this.CharActorComp = undefined;
    this.PerformComp = undefined;
    this.ExtraMoveParams = undefined;
    this.DisableKeyOfVehicle = undefined;
    this.OnEnterVehicle = e => {
      if (e.IsDriver && e.PassengerEntity?.GetComponent(3)?.IsRoleAndCtrlByMe && this.DisableKeyOfVehicle) {
        this.Enable(this.DisableKeyOfVehicle, "没有驾驶员");
        this.DisableKeyOfVehicle = undefined;
      }
    };
    this.OnLeaveVehicle = e => {
      if (!!e.IsDriver && !this.DisableKeyOfVehicle) {
        this.DisableKeyOfVehicle = this.Disable("没有驾驶员");
      }
    };
  }
  OnStart() {
    super.OnStart();
    if ((0, RegisterComponent_1.isComponentInstance)(this.ActorComp, 247)) {
      this.CharActorComp = this.ActorComp;
    }
    this.PerformComp = this.Entity.GetComponent(250);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnEnterVehicle);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnLeaveVehicle);
    if (!this.PerformComp?.Driver) {
      this.DisableKeyOfVehicle = this.Disable("没有驾驶员");
    }
    return true;
  }
  OnEnd() {
    this.OnSplineMoveDisable();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnEnterVehicle);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnLeaveVehicle);
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
  ApplySplineMoveDaConfig() {}
  ResetSplineMoveDaConfig() {
    this.PerformComp?.ResetVehicleConfig(true);
  }
  OnSplineMoveEnable(e, t) {
    super.OnSplineMoveEnable(e, t);
    this.ApplySplineMoveDaConfig();
    switch (this.PerformComp?.VehicleType) {
      case "Gongduola":
      case "AutoMoveGongduola":
        ControllerHolder_1.ControllerHolder.VehicleController.SetRideSharingEnable(false);
    }
  }
  OnSplineMoveDisable() {
    super.OnSplineMoveDisable();
    this.ResetSplineMoveDaConfig();
    switch (this.PerformComp?.VehicleType) {
      case "Gongduola":
      case "AutoMoveGongduola":
        ControllerHolder_1.ControllerHolder.VehicleController.SetRideSharingEnable(true);
    }
  }
  OnSelectNextSplineMoveEnd() {
    super.OnSelectNextSplineMoveEnd();
    this.CharActorComp?.ClearInput();
    this.LastLocation.DeepCopy(this.ActorComp.ActorLocationProxy);
  }
  UpdateSplineGravity(e = false) {
    var t;
    if (this.CurrentSplineMoveParams?.UseSplineGravity) {
      t = this.Entity.GetComponent(268);
      if (e) {
        t?.SetVehicleGravityDirect(Vector_1.Vector.DownVectorProxy, true);
      } else {
        this.TmpVector.DeepCopy(this.CurrentSplineMoveParams.Spline.GetUpVectorAtSplineInputKey(this.SplineTimeKey, 1));
        this.TmpVector.UnaryNegation(this.TmpVector);
        t?.SetVehicleGravityDirect(this.TmpVector, true);
      }
    }
  }
};
VehicleSplineMoveComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(119)], VehicleSplineMoveComponent);
exports.VehicleSplineMoveComponent = VehicleSplineMoveComponent; //# sourceMappingURL=VehicleSplineMoveComponent.js.map