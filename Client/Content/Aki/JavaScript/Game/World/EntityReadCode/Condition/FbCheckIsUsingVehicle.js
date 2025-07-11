"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckIsUsingVehicle = undefined;
class FbCheckIsUsingVehicle {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._Mh = false;
    this.cMh = 0;
    this.hMh = false;
    this.lMh = undefined;
    this.WJh = false;
    this.QJh = false;
  }
  static Create(t) {
    if (t) {
      return new FbCheckIsUsingVehicle(t);
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
    if (!this._Mh) {
      this._Mh = true;
      this.cMh = this.FbDataInternal.targetVehicle();
    }
    return this.cMh;
  }
  get Seat() {
    if (!this.hMh) {
      this.hMh = true;
      this.lMh = this.FbDataInternal.seat();
    }
    return this.lMh;
  }
  get CheckIsBeingUsed() {
    if (!this.WJh) {
      this.WJh = true;
      this.QJh = this.FbDataInternal.checkIsBeingUsed();
    }
    return this.QJh;
  }
}
exports.FbCheckIsUsingVehicle = FbCheckIsUsingVehicle;
//# sourceMappingURL=FbCheckIsUsingVehicle.js.map