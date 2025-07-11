"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleEnterPathMove = undefined;
const FbVehicleCruisingParams_1 = require("./FbVehicleCruisingParams");
const UnionSplineMovePatternHelper_1 = require("./UnionSplineMovePatternHelper");
class FbVehicleEnterPathMove {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.cic = false;
    this.uic = undefined;
    this.Pbh = false;
    this.Ubh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbVehicleEnterPathMove(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ControlParams() {
    if (!this.cic) {
      this.cic = true;
      this.uic = FbVehicleCruisingParams_1.FbVehicleCruisingParams.Create(this.FbDataInternal.controlParams());
    }
    return this.uic;
  }
  get Pattern() {
    var e;
    var t;
    if (!this.Pbh && (this.Pbh = true, e = this.FbDataInternal.patternType(), t = UnionSplineMovePatternHelper_1.UnionSplineMovePatternHelper.GetUnionSplineMovePatternObject(e))) {
      this.Ubh = UnionSplineMovePatternHelper_1.UnionSplineMovePatternHelper.ReadUnionSplineMovePattern(e, this.FbDataInternal.pattern(t));
    }
    return this.Ubh;
  }
}
exports.FbVehicleEnterPathMove = FbVehicleEnterPathMove;
//# sourceMappingURL=FbVehicleEnterPathMove.js.map