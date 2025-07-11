"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCompleteGuide = undefined;
const UnionCondition2Helper_1 = require("../Condition/UnionCondition2Helper");
class FbCompleteGuide {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.ich = false;
    this.rch = undefined;
    this.guh = false;
    this.fuh = 0;
  }
  static Create(i) {
    if (i) {
      return new FbCompleteGuide(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Conditions() {
    if (!this.ich) {
      this.ich = true;
      this.rch = new Array();
      var t = this.FbDataInternal.conditionsLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          var e = this.FbDataInternal.conditionsExtType(i);
          var s = UnionCondition2Helper_1.UnionCondition2Helper.GetUnionCondition2Object(e);
          var e = UnionCondition2Helper_1.UnionCondition2Helper.ReadUnionCondition2(e, this.FbDataInternal.conditions(i, s));
          if (e !== undefined) {
            this.rch.push(e);
          }
        }
      }
    }
    return this.rch;
  }
  get GuideId() {
    if (!this.guh) {
      this.guh = true;
      this.fuh = this.FbDataInternal.guideId();
    }
    return this.fuh;
  }
}
exports.FbCompleteGuide = FbCompleteGuide;
//# sourceMappingURL=FbCompleteGuide.js.map