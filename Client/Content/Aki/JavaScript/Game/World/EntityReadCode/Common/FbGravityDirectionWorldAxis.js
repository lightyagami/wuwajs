"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbGravityDirectionWorldAxis = undefined;
class FbGravityDirectionWorldAxis {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.pRh = false;
    this.vRh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbGravityDirectionWorldAxis(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get WorldAxis() {
    if (!this.pRh) {
      this.pRh = true;
      this.vRh = this.FbDataInternal.worldAxis();
    }
    return this.vRh;
  }
}
exports.FbGravityDirectionWorldAxis = FbGravityDirectionWorldAxis;
//# sourceMappingURL=FbGravityDirectionWorldAxis.js.map