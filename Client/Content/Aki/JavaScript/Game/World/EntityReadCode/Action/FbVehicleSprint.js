"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleSprint = undefined;
const UnionTargetVehicleHelper_1 = require("./UnionTargetVehicleHelper");
class FbVehicleSprint {
  constructor(e) {
    this.FbDataInternal = e;
    this._Mh = false;
    this.cMh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbVehicleSprint(e);
    }
  }
  get TargetVehicle() {
    var e;
    var t;
    if (!this._Mh && (this._Mh = true, e = this.FbDataInternal.targetVehicleType(), t = UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.GetUnionTargetVehicleObject(e))) {
      this.cMh = UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.ReadUnionTargetVehicle(e, this.FbDataInternal.targetVehicle(t));
    }
    return this.cMh;
  }
}
exports.FbVehicleSprint = FbVehicleSprint;
//# sourceMappingURL=FbVehicleSprint.js.map