"use strict";

var __decorate = this && this.__decorate || function (e, t, o, r) {
  var n;
  var i = arguments.length;
  var s = i < 3 ? t : r === null ? r = Object.getOwnPropertyDescriptor(t, o) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, t, o, r);
  } else {
    for (var f = e.length - 1; f >= 0; f--) {
      if (n = e[f]) {
        s = (i < 3 ? n(s) : i > 3 ? n(t, o, s) : n(t, o)) || s;
      }
    }
  }
  if (i > 3 && s) {
    Object.defineProperty(t, o, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleBuffComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterBuffComponent_1 = require("../../Character/Common/Component/Abilities/CharacterBuffComponent");
let VehicleBuffComponent = class VehicleBuffComponent extends CharacterBuffComponent_1.CharacterBuffComponent {
  constructor() {
    super(...arguments);
    this.VehiclePerformComp = undefined;
    this.MotorContextId = 0n;
  }
  OnStart() {
    this.VehiclePerformComp = this.Entity.GetComponent(246);
    this.MotorContextId = this.Entity.GetComponent(0)?.MotorContextId ?? 0n;
    return super.OnStart();
  }
  HasBuffAuthority() {
    var e = this.CreatureDataComponent?.GetPlayerId();
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() === e;
  }
  AddBuff(e, t) {
    if (!t.PreMessageId && 0n !== this.MotorContextId) {
      t.PreMessageId = this.MotorContextId;
    }
    super.AddBuff(e, t);
  }
};
VehicleBuffComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(257)], VehicleBuffComponent);
exports.VehicleBuffComponent = VehicleBuffComponent; //# sourceMappingURL=VehicleBuffComponent.js.map