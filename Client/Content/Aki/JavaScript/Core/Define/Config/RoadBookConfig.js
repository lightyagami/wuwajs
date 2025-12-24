"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoadBookConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class RoadBookConfig {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get ActivityId() {
    return this.activityid();
  }
  get MaxLevel() {
    return this.maxlevel();
  }
  get ExpItemId() {
    return this.expitemid();
  }
  get FinalRewardId() {
    return this.finalrewardid();
  }
  get VehicleClassificationName() {
    return GameUtils_1.GameUtils.ConvertToMap(this.vehicleclassificationnameLength(), this.vehicleclassificationnameKey, this.vehicleclassificationnameValue, this);
  }
  vehicleclassificationnameKey(t) {
    return this.vehicleclassificationname(t)?.key();
  }
  vehicleclassificationnameValue(t) {
    return this.vehicleclassificationname(t)?.value();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsRoadBookConfig(t, i) {
    return (i || new RoadBookConfig()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  activityid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxlevel() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  expitemid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  finalrewardid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetVehicleclassificationnameAt(t, i) {
    return this.vehicleclassificationname(t);
  }
  vehicleclassificationname(t, i) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  vehicleclassificationnameLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.RoadBookConfig = RoadBookConfig;
//# sourceMappingURL=RoadBookConfig.js.map