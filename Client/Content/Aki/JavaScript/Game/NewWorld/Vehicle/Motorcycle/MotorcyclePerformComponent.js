"use strict";

var __decorate = this && this.__decorate || function (e, o, t, r) {
  var n;
  var c = arguments.length;
  var i = c < 3 ? o : r === null ? r = Object.getOwnPropertyDescriptor(o, t) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, o, t, r);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (n = e[s]) {
        i = (c < 3 ? n(i) : c > 3 ? n(o, t, i) : n(o, t)) || i;
      }
    }
  }
  if (c > 3 && i) {
    Object.defineProperty(o, t, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorcyclePerformComponent = undefined;
const UE = require("ue");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const VehiclePerformComponent_1 = require("../Common/VehiclePerformComponent");
let MotorcyclePerformComponent = class MotorcyclePerformComponent extends VehiclePerformComponent_1.VehiclePerformComponent {
  OnSetDriver() {
    var e;
    if (this.AnimComp?.MainAnimInstance && this.AnimComp.MainAnimInstance instanceof UE.KuroAnimInstanceVehicle) {
      e = this.DriverInternal?.GetComponent(3);
      this.AnimComp.MainAnimInstance.SetDriver(e ? e.Actor : undefined);
    }
  }
};
MotorcyclePerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(251)], MotorcyclePerformComponent);
exports.MotorcyclePerformComponent = MotorcyclePerformComponent; //# sourceMappingURL=MotorcyclePerformComponent.js.map