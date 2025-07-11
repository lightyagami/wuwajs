"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCombinationTriggerShape = undefined;
const UnionCombinationTriggerShapeHelper_1 = require("./UnionCombinationTriggerShapeHelper");
class FbCombinationTriggerShape {
  constructor(i) {
    this.FbDataInternal = i;
    this.u_h = false;
    this.f8o = undefined;
    this.Rc1 = false;
    this.Lc1 = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbCombinationTriggerShape(i);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get CombinationShapes() {
    if (!this.Rc1) {
      this.Rc1 = true;
      this.Lc1 = new Array();
      var e = this.FbDataInternal.combinationShapesLength();
      if (e) {
        for (let i = 0; i < e; ++i) {
          var t = this.FbDataInternal.combinationShapesType(i);
          var r = UnionCombinationTriggerShapeHelper_1.UnionCombinationTriggerShapeHelper.GetUnionCombinationTriggerShapeObject(t);
          if (r && (t = UnionCombinationTriggerShapeHelper_1.UnionCombinationTriggerShapeHelper.ReadUnionCombinationTriggerShape(t, this.FbDataInternal.combinationShapes(i, r))) !== undefined) {
            this.Lc1.push(t);
          }
        }
      }
    }
    return this.Lc1;
  }
}
exports.FbCombinationTriggerShape = FbCombinationTriggerShape;
//# sourceMappingURL=FbCombinationTriggerShape.js.map