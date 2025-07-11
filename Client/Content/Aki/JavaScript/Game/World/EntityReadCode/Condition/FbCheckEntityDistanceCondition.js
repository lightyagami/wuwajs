"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckEntityDistanceCondition = undefined;
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbCheckEntityDistanceCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.LJh = false;
    this.AJh = undefined;
    this.xJh = false;
    this.RJh = undefined;
    this._ch = false;
    this.cch = undefined;
    this.rdh = false;
    this.odh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCheckEntityDistanceCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TargetA() {
    var t;
    var i;
    if (!this.LJh && (this.LJh = true, t = this.FbDataInternal.targetAType(), i = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.AJh = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.targetA(i));
    }
    return this.AJh;
  }
  get TargetB() {
    var t;
    var i;
    if (!this.xJh && (this.xJh = true, t = this.FbDataInternal.targetBType(), i = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.RJh = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.targetB(i));
    }
    return this.RJh;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get Distance() {
    if (!this.rdh) {
      this.rdh = true;
      this.odh = this.FbDataInternal.distance();
    }
    return this.odh;
  }
}
exports.FbCheckEntityDistanceCondition = FbCheckEntityDistanceCondition;
//# sourceMappingURL=FbCheckEntityDistanceCondition.js.map