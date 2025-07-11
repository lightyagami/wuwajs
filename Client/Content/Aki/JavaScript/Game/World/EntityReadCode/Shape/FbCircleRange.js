"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCircleRange = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCircleRange {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.uch = false;
    this.dch = undefined;
    this.sIh = false;
    this.s9o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCircleRange(t);
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
  get Radius() {
    if (!this.sIh) {
      this.sIh = true;
      this.s9o = this.FbDataInternal.radius();
    }
    return this.s9o;
  }
}
exports.FbCircleRange = FbCircleRange;
//# sourceMappingURL=FbCircleRange.js.map