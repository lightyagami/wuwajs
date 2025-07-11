"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleComponent = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbPassengerTeleportConfig_1 = require("./FbPassengerTeleportConfig");
const FbVehiclePassengerConfig_1 = require("./FbVehiclePassengerConfig");
const UnionVehicleFeatureHelper_1 = require("./UnionVehicleFeatureHelper");
class FbVehicleComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.bSh = false;
    this.TAe = undefined;
    this.ijl = false;
    this.rjl = undefined;
    this.ojl = false;
    this.njl = undefined;
    this.sjl = false;
    this.ajl = undefined;
    this.SCc = false;
    this.MCc = undefined;
    this.Z8l = false;
    this.eHl = undefined;
    this.RXh = false;
    this.wXh = undefined;
    this.PXh = false;
    this.UXh = undefined;
    this.hjl = false;
    this.ljl = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbVehicleComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Config() {
    if (!this.bSh) {
      this.bSh = true;
      this.TAe = this.FbDataInternal.config();
    }
    return this.TAe;
  }
  get VehicleBornTag() {
    if (!this.ijl) {
      this.ijl = true;
      this.rjl = new Array();
      var i = this.FbDataInternal.vehicleBornTagLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.rjl.push(this.FbDataInternal.vehicleBornTag(t));
        }
      }
    }
    return this.rjl;
  }
  get VehicleRiddenTag() {
    if (!this.ojl) {
      this.ojl = true;
      this.njl = new Array();
      var i = this.FbDataInternal.vehicleRiddenTagLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.njl.push(this.FbDataInternal.vehicleRiddenTag(t));
        }
      }
    }
    return this.njl;
  }
  get RoleRiddingTag() {
    if (!this.sjl) {
      this.sjl = true;
      this.ajl = new Array();
      var i = this.FbDataInternal.roleRiddingTagLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.ajl.push(this.FbDataInternal.roleRiddingTag(t));
        }
      }
    }
    return this.ajl;
  }
  get TeleportPlayersWhenDestroyed() {
    if (!this.SCc) {
      this.SCc = true;
      this.MCc = FbPassengerTeleportConfig_1.FbPassengerTeleportConfig.Create(this.FbDataInternal.teleportPlayersWhenDestroyed());
    }
    return this.MCc;
  }
  get VehicleFeatures() {
    if (!this.Z8l) {
      this.Z8l = true;
      this.eHl = new Array();
      var i = this.FbDataInternal.vehicleFeaturesLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.vehicleFeaturesType(t);
          var s = UnionVehicleFeatureHelper_1.UnionVehicleFeatureHelper.GetUnionVehicleFeatureObject(e);
          if (s && (e = UnionVehicleFeatureHelper_1.UnionVehicleFeatureHelper.ReadUnionVehicleFeature(e, this.FbDataInternal.vehicleFeatures(t, s))) !== undefined) {
            this.eHl.push(e);
          }
        }
      }
    }
    return this.eHl;
  }
  get SeatCount() {
    if (!this.RXh) {
      this.RXh = true;
      this.wXh = this.FbDataInternal.seatCount();
    }
    return this.wXh;
  }
  get DriverSeat() {
    if (!this.PXh) {
      this.PXh = true;
      this.UXh = this.FbDataInternal.driverSeat();
    }
    return this.UXh;
  }
  get DefaultPassengers() {
    if (!this.hjl) {
      this.hjl = true;
      this.ljl = new Array();
      var i = this.FbDataInternal.defaultPassengersLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.defaultPassengers(t, new fb_component_1.VehiclePassengerConfig());
          this.ljl.push(FbVehiclePassengerConfig_1.FbVehiclePassengerConfig.Create(e));
        }
      }
    }
    return this.ljl;
  }
}
exports.FbVehicleComponent = FbVehicleComponent;
//# sourceMappingURL=FbVehicleComponent.js.map