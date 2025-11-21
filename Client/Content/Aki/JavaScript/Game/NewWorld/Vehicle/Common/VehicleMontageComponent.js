"use strict";

var __decorate = this && this.__decorate || function (e, t, o, n) {
  var r;
  var s = arguments.length;
  var i = s < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, o) : n;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    i = Reflect.decorate(e, t, o, n);
  } else {
    for (var a = e.length - 1; a >= 0; a--) {
      if (r = e[a]) {
        i = (s < 3 ? r(i) : s > 3 ? r(t, o, i) : r(t, o)) || i;
      }
    }
  }
  if (s > 3 && i) {
    Object.defineProperty(t, o, i);
  }
  return i;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleMontageComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const BaseMontageComponent_1 = require("../../Character/Common/Component/Abilities/BaseMontageComponent");
let VehicleMontageComponent = class VehicleMontageComponent extends BaseMontageComponent_1.BaseMontageComponent {
  constructor() {
    super(...arguments);
    this.AnimationComponent = undefined;
  }
  OnStart() {
    this.AnimationComponent = this.Entity.CheckGetComponent(239);
    return !!super.OnStart();
  }
  GetMainAnimInstance() {
    return this.AnimationComponent.MainAnimInstance;
  }
};
VehicleMontageComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(283)], VehicleMontageComponent);
exports.VehicleMontageComponent = VehicleMontageComponent; //# sourceMappingURL=VehicleMontageComponent.js.map