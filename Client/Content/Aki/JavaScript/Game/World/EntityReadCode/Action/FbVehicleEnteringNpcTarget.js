"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleEnteringNpcTarget = undefined;
class FbVehicleEnteringNpcTarget {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._Mh = false;
    this.cMh = 0;
    this.uMh = false;
    this.dMh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbVehicleEnteringNpcTarget(t);
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
  get TargetNpc() {
    if (!this.uMh) {
      this.uMh = true;
      this.dMh = this.FbDataInternal.targetNpc();
    }
    return this.dMh;
  }
}
exports.FbVehicleEnteringNpcTarget = FbVehicleEnteringNpcTarget;
//# sourceMappingURL=FbVehicleEnteringNpcTarget.js.map