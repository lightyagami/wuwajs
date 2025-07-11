"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleNewSplineMoveTarget = undefined;
const UnionTargetVehicleHelper_1 = require("./UnionTargetVehicleHelper");
class FbVehicleNewSplineMoveTarget {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this._Mh = false;
    this.cMh = undefined;
    this.zuh = false;
    this.Juh = false;
  }
  static Create(e) {
    if (e) {
      return new FbVehicleNewSplineMoveTarget(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TargetVehicle() {
    var e;
    var t;
    if (!this._Mh && (this._Mh = true, e = this.FbDataInternal.targetVehicleType(), t = UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.GetUnionTargetVehicleObject(e))) {
      this.cMh = UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.ReadUnionTargetVehicle(e, this.FbDataInternal.targetVehicle(t));
    }
    return this.cMh;
  }
  get IsLookDir() {
    if (!this.zuh) {
      this.zuh = true;
      this.Juh = this.FbDataInternal.isLookDir();
    }
    return this.Juh;
  }
}
exports.FbVehicleNewSplineMoveTarget = FbVehicleNewSplineMoveTarget;
//# sourceMappingURL=FbVehicleNewSplineMoveTarget.js.map