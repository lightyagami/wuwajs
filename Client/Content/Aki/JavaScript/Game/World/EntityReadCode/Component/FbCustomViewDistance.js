"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCustomViewDistance = undefined;
class FbCustomViewDistance {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.rdh = false;
    this.odh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCustomViewDistance(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Distance() {
    if (!this.rdh) {
      this.rdh = true;
      this.odh = this.FbDataInternal.distance();
    }
    return this.odh;
  }
}
exports.FbCustomViewDistance = FbCustomViewDistance;
//# sourceMappingURL=FbCustomViewDistance.js.map