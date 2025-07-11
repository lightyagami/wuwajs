"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbICenterTextTypeWriter = undefined;
class FbICenterTextTypeWriter {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.OCh = false;
    this.FCh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbICenterTextTypeWriter(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TextCountPerSecond() {
    if (!this.OCh) {
      this.OCh = true;
      this.FCh = this.FbDataInternal.textCountPerSecond();
    }
    return this.FCh;
  }
}
exports.FbICenterTextTypeWriter = FbICenterTextTypeWriter;
//# sourceMappingURL=FbICenterTextTypeWriter.js.map