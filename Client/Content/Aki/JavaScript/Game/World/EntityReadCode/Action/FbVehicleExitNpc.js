"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleExitNpc = undefined;
const UnionExitVehicleTypeHelper_1 = require("./UnionExitVehicleTypeHelper");
class FbVehicleExitNpc {
  constructor(t) {
    this.FbDataInternal = t;
    this.uMh = false;
    this.dMh = 0;
    this.pMh = false;
    this.vMh = false;
    this.mMh = false;
    this.CMh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbVehicleExitNpc(t);
    }
  }
  get TargetNpc() {
    if (!this.uMh) {
      this.uMh = true;
      this.dMh = this.FbDataInternal.targetNpc();
    }
    return this.dMh;
  }
  get DestroyVehicle() {
    if (!this.pMh) {
      this.pMh = true;
      this.vMh = this.FbDataInternal.destroyVehicle();
    }
    return this.vMh;
  }
  get ExitType() {
    var t;
    var e;
    if (!this.mMh && (this.mMh = true, t = this.FbDataInternal.exitTypeType(), e = UnionExitVehicleTypeHelper_1.UnionExitVehicleTypeHelper.GetUnionExitVehicleTypeObject(t))) {
      this.CMh = UnionExitVehicleTypeHelper_1.UnionExitVehicleTypeHelper.ReadUnionExitVehicleType(t, this.FbDataInternal.exitType(e));
    }
    return this.CMh;
  }
}
exports.FbVehicleExitNpc = FbVehicleExitNpc;
//# sourceMappingURL=FbVehicleExitNpc.js.map