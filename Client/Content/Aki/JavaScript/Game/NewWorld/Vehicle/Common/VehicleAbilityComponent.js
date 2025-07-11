"use strict";

var __decorate = this && this.__decorate || function (e, t, o, i) {
  var n;
  var r = arguments.length;
  var l = r < 3 ? t : i === null ? i = Object.getOwnPropertyDescriptor(t, o) : i;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    l = Reflect.decorate(e, t, o, i);
  } else {
    for (var s = e.length - 1; s >= 0; s--) {
      if (n = e[s]) {
        l = (r < 3 ? n(l) : r > 3 ? n(t, o, l) : n(t, o)) || l;
      }
    }
  }
  if (r > 3 && l) {
    Object.defineProperty(t, o, l);
  }
  return l;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleAbilityComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const BaseAbilityComponent_1 = require("../../Character/Common/Component/Abilities/BaseAbilityComponent");
let VehicleAbilityComponent = class VehicleAbilityComponent extends BaseAbilityComponent_1.BaseAbilityComponent {
  GetAbilitySystemComponent() {
    var e = this.Entity.GetComponent(234);
    if (e) {
      e.Actor.TryAddTsAbilitySystemComponent();
      return e.Actor.AbilitySystemComponent;
    }
  }
};
VehicleAbilityComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(239)], VehicleAbilityComponent);
exports.VehicleAbilityComponent = VehicleAbilityComponent; //# sourceMappingURL=VehicleAbilityComponent.js.map