"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPatrolRange = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbPatrolRange {
  constructor(t) {
    this.FbDataInternal = t;
    this.nIh = false;
    this.n9o = undefined;
    this.sIh = false;
    this.s9o = 0;
  }
  static Create(t) {
    if (t) {
      return new FbPatrolRange(t);
    }
  }
  get Center() {
    if (!this.nIh) {
      this.nIh = true;
      this.n9o = FbVectorInfo_1.FbVectorInfo.Create(this.FbDataInternal.center());
    }
    return this.n9o;
  }
  get Radius() {
    if (!this.sIh) {
      this.sIh = true;
      this.s9o = this.FbDataInternal.radius();
    }
    return this.s9o;
  }
}
exports.FbPatrolRange = FbPatrolRange;
//# sourceMappingURL=FbPatrolRange.js.map