"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckIsPlayerUsingVehicle = undefined;
const UnionOnlinePlayerConditionTargetHelper_1 = require("./UnionOnlinePlayerConditionTargetHelper");
class FbCheckIsPlayerUsingVehicle {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.AXh = false;
    this.xXh = undefined;
    this.wJh = false;
    this.PJh = false;
    this.czh = false;
    this.uzh = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbCheckIsPlayerUsingVehicle(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get VehicleType() {
    if (!this.AXh) {
      this.AXh = true;
      this.xXh = this.FbDataInternal.vehicleType();
    }
    return this.xXh;
  }
  get CheckType() {
    if (!this.wJh) {
      this.wJh = true;
      this.PJh = this.FbDataInternal.checkType();
    }
    return this.PJh;
  }
  get OnlinePlayerConditionTargetOption() {
    var i;
    var e;
    if (!this.czh && (this.czh = true, i = this.FbDataInternal.onlinePlayerConditionTargetOptionType(), e = UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.GetUnionOnlinePlayerConditionTargetObject(i))) {
      this.uzh = UnionOnlinePlayerConditionTargetHelper_1.UnionOnlinePlayerConditionTargetHelper.ReadUnionOnlinePlayerConditionTarget(i, this.FbDataInternal.onlinePlayerConditionTargetOption(e));
    }
    return this.uzh;
  }
}
exports.FbCheckIsPlayerUsingVehicle = FbCheckIsPlayerUsingVehicle;
//# sourceMappingURL=FbCheckIsPlayerUsingVehicle.js.map