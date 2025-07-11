"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbBoxRange = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbBoxRange {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.uch = false;
    this.dch = undefined;
    this.oRh = false;
    this.n6 = undefined;
    this.EZh = false;
    this.kJ = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbBoxRange(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Pos() {
    if (!this.uch) {
      this.uch = true;
      this.dch = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.pos());
    }
    return this.dch;
  }
  get Size() {
    if (!this.oRh) {
      this.oRh = true;
      this.n6 = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.size());
    }
    return this.n6;
  }
  get Rotator() {
    if (!this.EZh) {
      this.EZh = true;
      this.kJ = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.rotator());
    }
    return this.kJ;
  }
}
exports.FbBoxRange = FbBoxRange;
//# sourceMappingURL=FbBoxRange.js.map