"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleEntity = undefined;
const UnionTargetVehicleHelper_1 = require("./UnionTargetVehicleHelper");
class FbVehicleEntity {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.Tic = false;
    this.bic = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbVehicleEntity(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Vehicle() {
    var e;
    var t;
    if (!this.Tic && (this.Tic = true, e = this.FbDataInternal.vehicleType(), t = UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.GetUnionTargetVehicleObject(e))) {
      this.bic = UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.ReadUnionTargetVehicle(e, this.FbDataInternal.vehicle(t));
    }
    return this.bic;
  }
}
exports.FbVehicleEntity = FbVehicleEntity;
//# sourceMappingURL=FbVehicleEntity.js.map