"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbVehicleEnteringPlayerTarget = undefined;
class FbVehicleEnteringPlayerTarget {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._Mh = false;
    this.cMh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbVehicleEnteringPlayerTarget(t);
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
}
exports.FbVehicleEnteringPlayerTarget = FbVehicleEnteringPlayerTarget;
//# sourceMappingURL=FbVehicleEnteringPlayerTarget.js.map