"use strict";

var __decorate = this && this.__decorate || function (t, e, r, o) {
  var n;
  var i = arguments.length;
  var s = i < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(t, e, r, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (n = t[h]) {
        s = (i < 3 ? n(s) : i > 3 ? n(e, r, s) : n(e, r)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(e, r, s);
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
    this.Rud = true;
    this.Qin = (t, e, r) => {
      this.RefreshStarScarMaterial();
    };
  }
  OnStart() {
    this.n$t = this.Entity.CheckGetComponent(3);
    this.$te = this.Entity.CheckGetComponent(184);
    this.$te.AddListeners(energyAttrIds, this.Qin, "RoleEnergyComponent");
    this.Qin();
    return true;
  }
  OnEnd() {
    this.$te.RemoveListeners(energyAttrIds, this.Qin);
    return true;
  }
  RefreshStarScarMaterial() {
    var t;
    var e;
    if (this.Rud) {
      t = this.$te.GetCurrentValue(EAttributeId.Proto_Energy);
      e = this.$te.GetCurrentValue(EAttributeId.Proto_EnergyMax);
      this.n$t.Actor?.CharRenderingComponent.SetStarScarEnergy(t / e);
    }
  }
  SetEnableRefreshStarScarByEnergy(t) {
    this.Rud = t;
  }
};
RoleEnergyComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(100)], RoleEnergyComponent);
exports.RoleEnergyComponent = RoleEnergyComponent; //# sourceMappingURL=RoleEnergyComponent.js.map