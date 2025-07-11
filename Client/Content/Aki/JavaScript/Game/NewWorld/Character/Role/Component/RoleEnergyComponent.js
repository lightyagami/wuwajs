"use strict";

var __decorate = this && this.__decorate || function (t, e, o, r) {
  var n;
  var i = arguments.length;
  var s = i < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, o, r);
  } else {
    for (var c = t.length - 1; c >= 0; c--) {
      if (n = t[c]) {
        s = (i < 3 ? n(s) : i > 3 ? n(e, o, s) : n(e, o)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(e, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleEnergyComponent = undefined;
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const energyAttrIds = [EAttributeId.Proto_Energy, EAttributeId.Proto_EnergyMax];
let RoleEnergyComponent = class RoleEnergyComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.n$t = undefined;
    this.$te = undefined;
    this.Qin = (t, e, o) => {
      this.RefreshStarScarMaterial();
    };
  }
  OnStart() {
    this.n$t = this.Entity.CheckGetComponent(3);
    this.$te = this.Entity.CheckGetComponent(173);
    this.$te.AddListeners(energyAttrIds, this.Qin, "RoleEnergyComponent");
    this.Qin();
    return true;
  }
  OnEnd() {
    this.$te.RemoveListeners(energyAttrIds, this.Qin);
    return true;
  }
  RefreshStarScarMaterial() {
    var t = this.$te.GetCurrentValue(EAttributeId.Proto_Energy);
    var e = this.$te.GetCurrentValue(EAttributeId.Proto_EnergyMax);
    this.n$t.Actor?.CharRenderingComponent.SetStarScarEnergy(t / e);
  }
};
RoleEnergyComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(92)], RoleEnergyComponent);
exports.RoleEnergyComponent = RoleEnergyComponent; //# sourceMappingURL=RoleEnergyComponent.js.map