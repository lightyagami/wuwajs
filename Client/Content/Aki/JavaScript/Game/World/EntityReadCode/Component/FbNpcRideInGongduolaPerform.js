"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNpcRideInGongduolaPerform = undefined;
class FbNpcRideInGongduolaPerform {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.mgh = false;
    this.Cgh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNpcRideInGongduolaPerform(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Montage() {
    if (!this.mgh) {
      this.mgh = true;
      this.Cgh = this.FbDataInternal.montage();
    }
    return this.Cgh;
  }
}
exports.FbNpcRideInGongduolaPerform = FbNpcRideInGongduolaPerform;
//# sourceMappingURL=FbNpcRideInGongduolaPerform.js.map