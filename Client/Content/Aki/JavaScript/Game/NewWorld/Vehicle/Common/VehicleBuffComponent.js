"use strict";

var __decorate = this && this.__decorate || function (e, t, r, o) {
  var n;
  var s = arguments.length;
  var a = s < 3 ? t : o === null ? o = Object.getOwnPropertyDescriptor(t, r) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    a = Reflect.decorate(e, t, r, o);
  } else {
    for (var i = e.length - 1; i >= 0; i--) {
      if (n = e[i]) {
        a = (s < 3 ? n(a) : s > 3 ? n(t, r, a) : n(t, r)) || a;
      }
    }
  }
  if (s > 3 && a) {
    Object.defineProperty(t, r, a);
  }
  return a;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VehicleBuffComponent = undefined;
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterBuffComponent_1 = require("../../Character/Common/Component/Abilities/CharacterBuffComponent");
const CharacterBuffIds_1 = require("../../Character/Common/Component/Abilities/CharacterBuffIds");
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
  NeedBroadcastBuff(e, t = false) {
    return (!e || !CharacterBuffIds_1.noBroadCastBuff.has(e.Id ?? 0)) && super.NeedBroadcastBuff(e, t);
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