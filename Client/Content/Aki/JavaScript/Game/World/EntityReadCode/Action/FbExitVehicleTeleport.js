"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbExitVehicleTeleport = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbExitVehicleTeleport {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.uch = false;
    this.dch = undefined;
    this.Aph = false;
    this.xph = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbExitVehicleTeleport(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
  get Rot() {
    if (!this.Aph) {
      this.Aph = true;
      this.xph = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rot());
    }
    return this.xph;
  }
}
exports.FbExitVehicleTeleport = FbExitVehicleTeleport;
//# sourceMappingURL=FbExitVehicleTeleport.js.map