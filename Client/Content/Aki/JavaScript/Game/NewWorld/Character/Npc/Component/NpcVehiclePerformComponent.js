"use strict";

var __decorate = this && this.__decorate || function (e, r, t, o) {
  var i;
  var n = arguments.length;
  var s = n < 3 ? r : o === null ? o = Object.getOwnPropertyDescriptor(r, t) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    s = Reflect.decorate(e, r, t, o);
  } else {
    for (var c = e.length - 1; c >= 0; c--) {
      if (i = e[c]) {
        s = (n < 3 ? i(s) : n > 3 ? i(r, t, s) : i(r, t)) || s;
      }
    }
  }
  if (n > 3 && s) {
    Object.defineProperty(r, t, s);
  }
  return s;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcVehiclePerformComponent = undefined;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BaseVehiclePerformComponent_1 = require("../../../Vehicle/Common/BaseVehiclePerformComponent");
const VehicleConfig_1 = require("../../../Vehicle/Common/VehicleConfig");
let NpcVehiclePerformComponent = class NpcVehiclePerformComponent extends BaseVehiclePerformComponent_1.BaseVehiclePerformComponent {
  constructor() {
    super(...arguments);
    this.ActorComp = undefined;
  }
  OnStart() {
    return !!super.OnStart() && (this.ActorComp = this.Entity.GetComponent(3), this.CanBeenManipulated = false, !!this.InitVehicleConfig());
  }
  InitVehicleConfig() {
    var e = this.LoadVehicleConfigAsset();
    this.Config = new VehicleConfig_1.VehicleConfig(this.Entity, e);
    this.ConfigInternal = this.Config.DeepCopy();
    return this.Config.Init();
  }
  TryEnter(e, r) {
    return !!this.EnterConditionCheck(e, r) && (this.Enter(e, r), true);
  }
  Enter(e, r) {
    var t = e.GetComponent(0);
    if (t?.IsRole()) {
      var o = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(t.GetPlayerId());
      if (!o) {
        return;
      }
      o = o.DeepCopy();
      o.EntityCreatureId = t.GetCreatureDataId();
      o.VehicleCreatureId = this.ActorComp.CreatureData.GetCreatureDataId();
      o.Seat = r;
      ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(o);
    }
    super.Enter(e, r);
  }
  TryLeave(e, r = 0) {
    return !!this.LeaveConditionCheck(e) && (this.Leave(e, r), true);
  }
  Leave(e, r = 0) {
    var t = e.GetComponent(0);
    if (t?.IsRole()) {
      t = ModelManager_1.ModelManager.VehicleModel.GetPlayerVehicleData(t.GetPlayerId());
      if (!t) {
        return;
      }
      t = t.DeepCopy();
      t.VehicleCreatureId = 0;
      t.ExitType = r;
      ModelManager_1.ModelManager.VehicleModel.UpdatePlayerVehicleData(t);
    }
    super.Leave(e, r);
  }
  GetVehicleVelocity(e) {
    if (this.ActorComp) {
      e.DeepCopy(this.ActorComp.ActorVelocityProxy);
    }
  }
};
NpcVehiclePerformComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(233)], NpcVehiclePerformComponent);
exports.NpcVehiclePerformComponent = NpcVehiclePerformComponent; //# sourceMappingURL=NpcVehiclePerformComponent.js.map