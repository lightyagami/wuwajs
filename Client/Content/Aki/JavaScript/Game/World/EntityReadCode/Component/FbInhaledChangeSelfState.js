"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInhaledChangeSelfState = undefined;
class FbInhaledChangeSelfState {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.GFh = false;
    this.OFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInhaledChangeSelfState(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get ChangeSelfState() {
    if (!this.GFh) {
      this.GFh = true;
      this.OFh = this.FbDataInternal.changeSelfState();
    }
    return this.OFh;
  }
}
exports.FbInhaledChangeSelfState = FbInhaledChangeSelfState;
//# sourceMappingURL=FbInhaledChangeSelfState.js.map