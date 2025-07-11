"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTeleportVehicle = undefined;
const UnionTargetVehicleHelper_1 = require("./UnionTargetVehicleHelper");
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbTeleportVehicle {
  constructor(t) {
    this.FbDataInternal = t;
    this._Mh = false;
    this.cMh = undefined;
    this.uch = false;
    this.dch = undefined;
    this.Aph = false;
    this.xph = undefined;
    this.GKl = false;
    this.FKl = 0;
    this.NKl = false;
    this.VKl = false;
  }
  static Create(t) {
    if (t) {
      return new FbTeleportVehicle(t);
    }
  }
  get TargetVehicle() {
    var t;
    var e;
    if (!this._Mh && (this._Mh = true, t = this.FbDataInternal.targetVehicleType(), e = UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.GetUnionTargetVehicleObject(t))) {
      this.cMh = UnionTargetVehicleHelper_1.UnionTargetVehicleHelper.ReadUnionTargetVehicle(t, this.FbDataInternal.targetVehicle(e));
    }
    return this.cMh;
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
  get AppointedDock() {
    if (!this.GKl) {
      this.GKl = true;
      this.FKl = this.FbDataInternal.appointedDock();
    }
    return this.FKl;
  }
  get IsTeleportNoLoading() {
    if (!this.NKl) {
      this.NKl = true;
      this.VKl = this.FbDataInternal.isTeleportNoLoading();
    }
    return this.VKl;
  }
}
exports.FbTeleportVehicle = FbTeleportVehicle;
//# sourceMappingURL=FbTeleportVehicle.js.map