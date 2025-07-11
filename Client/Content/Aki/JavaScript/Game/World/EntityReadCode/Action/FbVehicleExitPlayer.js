"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleExitPlayer = undefined;
const UnionExitVehicleTypeHelper_1 = require("./UnionExitVehicleTypeHelper");
class FbVehicleExitPlayer {
  constructor(e) {
    this.FbDataInternal = e;
    this.pMh = false;
    this.vMh = false;
    this.mMh = false;
    this.CMh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbVehicleExitPlayer(e);
    }
  }
  get DestroyVehicle() {
    if (!this.pMh) {
      this.pMh = true;
      this.vMh = this.FbDataInternal.destroyVehicle();
    }
    return this.vMh;
  }
  get ExitType() {
    var e;
    var i;
    if (!this.mMh && (this.mMh = true, e = this.FbDataInternal.exitTypeType(), i = UnionExitVehicleTypeHelper_1.UnionExitVehicleTypeHelper.GetUnionExitVehicleTypeObject(e))) {
      this.CMh = UnionExitVehicleTypeHelper_1.UnionExitVehicleTypeHelper.ReadUnionExitVehicleType(e, this.FbDataInternal.exitType(i));
    }
    return this.CMh;
  }
}
exports.FbVehicleExitPlayer = FbVehicleExitPlayer;
//# sourceMappingURL=FbVehicleExitPlayer.js.map