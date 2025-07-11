"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompleteCertainFishingEntrust = undefined;
class FbCompleteCertainFishingEntrust {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tgh = false;
    this.FFe = 0;
    this.luh = false;
    this.v4i = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCompleteCertainFishingEntrust(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get Count() {
    if (!this.luh) {
      this.luh = true;
      this.v4i = this.FbDataInternal.count();
    }
    return this.v4i;
  }
}
exports.FbCompleteCertainFishingEntrust = FbCompleteCertainFishingEntrust;
//# sourceMappingURL=FbCompleteCertainFishingEntrust.js.map