"use strict";

var __decorate = this && this.__decorate || function (t, e, i, o) {
  var r;
  var s = arguments.length;
  var n = s < 3 ? e : o === null ? o = Object.getOwnPropertyDescriptor(e, i) : o;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    n = Reflect.decorate(t, e, i, o);
  } else {
    for (var h = t.length - 1; h >= 0; h--) {
      if (r = t[h]) {
        n = (s < 3 ? r(n) : s > 3 ? r(e, i, n) : r(e, i)) || n;
      }
    }
  }
  if (s > 3 && n) {
    Object.defineProperty(e, i, n);
  }
  return n;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NearestRoadway = exports.MotorcycleRoadWayComponent = undefined;
const puerts_1 = require("puerts");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const TransportDefine_1 = require("../../../Module/Transport/TransportDefine");
const DISABLE_REASON = "OnVehicleBeenEntered";
const motorRoadUnlimitedNitroTag = 1909821484;
const motorBanRoadUnlimitedNitroTag = -1512852789;
let MotorcycleRoadWayComponent = class MotorcycleRoadWayComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments);
    this.Rne = undefined;
    this.bDg = false;
    this.sqg = undefined;
    this.Hte = undefined;
    this.Lie = undefined;
    this.tLg = false;
    this.BKs = Vector_1.Vector.Create();
    this.aqg = (0, puerts_1.$ref)(undefined);
    this.zwf = new NearestRoadway();
    this.otg = t => {
      if (t.IsDriver && t.VehicleType === "Motorcycle" && t.IsRolePassenger(true)) {
        if (this.Rne !== undefined) {
          this.Enable(this.Rne, DISABLE_REASON);
        }
        this.Rne = undefined;
      }
    };
    this.E8f = t => {
      if (t.IsDriver && t.VehicleType === "Motorcycle" && t.IsRolePassenger(true)) {
        this.Rne = this.Disable(DISABLE_REASON);
      }
    };
    this.mqg = () => {
      if (!this.bDg && this.tLg) {
        var t = (0, TransportDefine_1.getRoadwayAutopilotSprintConfig)(this.zwf.Roadway);
        if (t === 1 || t === 2) {
          this.NHg();
          return;
        }
      }
      this.VHg();
    };
    this.dqg = (t, e) => {
      this.bDg = e;
    };
  }
  get TransportSystem() {
    if (!this.sqg || !this.sqg.IsValid()) {
      this.sqg = ControllerHolder_1.ControllerHolder.TransportController.GetTransportSystem();
    }
    return this.sqg;
  }
  static get Dependencies() {
    return [247, 217];
  }
  OnStart() {
    this.Hte = this.Entity.GetComponent(247);
    this.Lie = this.Entity.GetComponent(217);
    this.Lie?.ListenForTagAddOrRemove(motorBanRoadUnlimitedNitroTag, this.dqg);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.otg);
    EventSystem_1.EventSystem.AddWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E8f);
    return true;
  }
  OnEnd() {
    this.Hte = undefined;
    this.Lie?.RemoveTagAddOrRemoveListener(motorBanRoadUnlimitedNitroTag, this.dqg);
    this.Lie = undefined;
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenEntered, this.otg);
    EventSystem_1.EventSystem.RemoveWithTarget(this.Entity, EventDefine_1.EEventName.OnVehicleBeenLeaved, this.E8f);
    return true;
  }
  OnTick(t) {
    this.UJf();
    this.mqg();
  }
  UJf() {
    if (this.Hte && !this.BKs.Equals(this.Hte.ActorLocationProxy, 1)) {
      var e = this.TransportSystem;
      if (e && e.IsValid()) {
        this.BKs.DeepCopy(this.Hte.ActorLocationProxy);
        e = e.D_GetNearestRoadwayAtWorldPosition(this.BKs.ToUeVector(true), this.aqg, undefined, undefined, true, 3001);
        let t = undefined;
        if (e) {
          t = (0, puerts_1.$unref)(this.aqg);
        }
        this.SetNearestRoadway(t, e);
      }
    }
  }
  NHg() {
    if (!this.Lie?.HasTag(motorRoadUnlimitedNitroTag)) {
      this.Lie?.AddTag(motorRoadUnlimitedNitroTag);
    }
  }
  VHg() {
    if (this.Lie?.HasTag(motorRoadUnlimitedNitroTag)) {
      this.Lie?.RemoveTag(motorRoadUnlimitedNitroTag);
    }
  }
  GetNearestRoadway() {
    return this.zwf;
  }
  SetNearestRoadway(t, e) {
    if (e && t && this.Hte) {
      this.zwf.NearestPos ||= Vector_1.Vector.Create();
      this.zwf.NearestPos.FromUeVector(t);
      this.zwf.Roadway = e;
      t = Vector_1.Vector.DistSquared(this.zwf.NearestPos, this.Hte.ActorLocationProxy);
      e = e.Width / 2 + ModelManager_1.ModelManager.AutoPilotModel.AutoPilotRoadWayWidthOffset;
      e = Math.pow(e, 2);
      this.tLg = !(e < t);
    } else {
      this.tLg = false;
    }
  }
  GetIsOnNearestRoadway() {
    return this.tLg;
  }
};
MotorcycleRoadWayComponent = __decorate([(0, RegisterComponent_1.RegisterComponent)(348)], MotorcycleRoadWayComponent);
exports.MotorcycleRoadWayComponent = MotorcycleRoadWayComponent;
class NearestRoadway {
  constructor() {
    this.NearestPos = Vector_1.Vector.Create();
    this.Roadway = undefined;
  }
  ClearObject() {
    this.NearestPos.Reset();
    return !(this.Roadway = undefined);
  }
}
exports.NearestRoadway = NearestRoadway;
//# sourceMappingURL=MotorcycleRoadwayComponent.js.map