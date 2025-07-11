"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetRegionMpc = undefined;
class FbSetRegionMpc {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.mAh = false;
    this.CAh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbSetRegionMpc(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get RegionMpcId() {
    if (!this.mAh) {
      this.mAh = true;
      this.CAh = this.FbDataInternal.regionMpcId();
    }
    return this.CAh;
  }
}
exports.FbSetRegionMpc = FbSetRegionMpc;
//# sourceMappingURL=FbSetRegionMpc.js.map