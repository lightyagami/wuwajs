"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbActorLookAtPlayerData = undefined;
class FbActorLookAtPlayerData {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Yfh = false;
    this.d3l = false;
  }
  static Create(t) {
    if (t) {
      return new FbActorLookAtPlayerData(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Lock() {
    if (!this.Yfh) {
      this.Yfh = true;
      this.d3l = this.FbDataInternal.lock();
    }
    return this.d3l;
  }
}
exports.FbActorLookAtPlayerData = FbActorLookAtPlayerData;
//# sourceMappingURL=FbActorLookAtPlayerData.js.map