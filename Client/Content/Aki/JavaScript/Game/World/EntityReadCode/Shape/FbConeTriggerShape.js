"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbConeTriggerShape = undefined;
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbConeTriggerShape {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.nIh = false;
    this.n9o = undefined;
    this.sIh = false;
    this.s9o = 0;
    this.mSh = false;
    this.CSh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbConeTriggerShape(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
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
  get Height() {
    if (!this.mSh) {
      this.mSh = true;
      this.CSh = this.FbDataInternal.height();
    }
    return this.CSh;
  }
}
exports.FbConeTriggerShape = FbConeTriggerShape;
//# sourceMappingURL=FbConeTriggerShape.js.map