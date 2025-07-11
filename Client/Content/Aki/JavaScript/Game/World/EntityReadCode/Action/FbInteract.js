"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbInteract = undefined;
class FbInteract {
  constructor(t) {
    this.FbDataInternal = t;
    this.i_h = false;
    this.r_h = 0;
    this.o_h = false;
    this.n_h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbInteract(t);
    }
  }
  get Who() {
    if (!this.i_h) {
      this.i_h = true;
      this.r_h = this.FbDataInternal.who();
    }
    return this.r_h;
  }
  get Param() {
    if (!this.o_h) {
      this.o_h = true;
      this.n_h = this.FbDataInternal.param();
    }
    return this.n_h;
  }
}
exports.FbInteract = FbInteract;
//# sourceMappingURL=FbInteract.js.map