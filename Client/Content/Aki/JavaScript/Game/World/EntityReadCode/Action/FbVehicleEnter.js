"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleEnter = undefined;
const UnionVehicleEnteringTargetHelper_1 = require("./UnionVehicleEnteringTargetHelper");
class FbVehicleEnter {
  constructor(e) {
    this.FbDataInternal = e;
    this.sMh = false;
    this.aMh = undefined;
    this.hMh = false;
    this.lMh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbVehicleEnter(e);
    }
  }
  get EnteringTarget() {
    var e;
    var t;
    if (!this.sMh && (this.sMh = true, e = this.FbDataInternal.enteringTargetType(), t = UnionVehicleEnteringTargetHelper_1.UnionVehicleEnteringTargetHelper.GetUnionVehicleEnteringTargetObject(e))) {
      this.aMh = UnionVehicleEnteringTargetHelper_1.UnionVehicleEnteringTargetHelper.ReadUnionVehicleEnteringTarget(e, this.FbDataInternal.enteringTarget(t));
    }
    return this.aMh;
  }
  get Seat() {
    if (!this.hMh) {
      this.hMh = true;
      this.lMh = this.FbDataInternal.seat();
    }
    return this.lMh;
  }
}
exports.FbVehicleEnter = FbVehicleEnter;
//# sourceMappingURL=FbVehicleEnter.js.map