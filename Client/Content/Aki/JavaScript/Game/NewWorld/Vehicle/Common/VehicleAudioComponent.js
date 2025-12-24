"use strict";

var __decorate = this && this.__decorate || function (e, t, n, i) {
  var o;
  var s = arguments.length;
  var r = s < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, n) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    r = Reflect.decorate(e, t, n, i);
  } else {
    for (var u = e.length - 1; u >= 0; u--) {
      if (o = e[u]) {
        r = (s < 3 ? o(r) : s > 3 ? o(t, n, r) : o(t, n)) || r;
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
exports.VehicleAudioComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const BaseAudioComponent_1 = require("../../Character/Common/Component/BaseAudioComponent");
let VehicleAudioComponent = class VehicleAudioComponent extends BaseAudioComponent_1.BaseAudioComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
    this.OnVehicleBeenEntered = e => {};
    this.OnVehicleBeenLeaved = e => {};
  }
  OnInit() {
    super.OnInit();
    this.ActorComp = this.Entity.CheckGetComponent(247);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnVehicleBeenEntered);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnVehicleBeenLeaved);
    return true;
  }
  OnEnd() {
    super.OnEnd();
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.OnVehicleBeenEntered);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.OnVehicleBeenLeaved);
    return true;
  }
  OnStart() {
    super.OnStart();
    return !!this.ActorComp?.Valid && !!this.ActorComp.Owner && !(this.b2l(), 0);
  }
  b2l() {}
  UpdateVehicleMoveSound(e, t) {}
};
VehicleAudioComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(255)], VehicleAudioComponent);
exports.VehicleAudioComponent = VehicleAudioComponent; //# sourceMappingURL=VehicleAudioComponent.js.map