"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleMoveWithPathLine = undefined;
const UnionTargetVehicleHelper_1 = require("./UnionTargetVehicleHelper");
const UnionVehicleControlTypeHelper_1 = require("./UnionVehicleControlTypeHelper");
class FbVehicleMoveWithPathLine {
  constructor(e) {
    this.FbDataInternal = e;
    this._Mh = false;
    this.cMh = undefined;
    this.kuh = false;
    this.Guh = 0;
    this.byh = false;
    this.Lyh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbVehicleMoveWithPathLine(e);
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
  get SplineEntityId() {
    if (!this.kuh) {
      this.kuh = true;
      this.Guh = this.FbDataInternal.splineEntityId();
    }
    return this.Guh;
  }
  get ControlType() {
    var e;
    var t;
    if (!this.byh && (this.byh = true, e = this.FbDataInternal.controlTypeType(), t = UnionVehicleControlTypeHelper_1.UnionVehicleControlTypeHelper.GetUnionVehicleControlTypeObject(e))) {
      this.Lyh = UnionVehicleControlTypeHelper_1.UnionVehicleControlTypeHelper.ReadUnionVehicleControlType(e, this.FbDataInternal.controlType(t));
    }
    return this.Lyh;
  }
}
exports.FbVehicleMoveWithPathLine = FbVehicleMoveWithPathLine;
//# sourceMappingURL=FbVehicleMoveWithPathLine.js.map