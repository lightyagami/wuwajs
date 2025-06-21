"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.FbCombinationTriggerShape = void 0;
const UnionCombinationTriggerShapeHelper_1 = require("./UnionCombinationTriggerShapeHelper");
class FbCombinationTriggerShape {
  constructor(i) {
    this.FbDataInternal = i, this.u_h = !1, this.f8o = void 0, this.ac1 = !1, this.hc1 = void 0
  }
  static Create(i) {
    if (i) return new FbCombinationTriggerShape(i)
  }
  get Type() {
    return this.u_h || (this.u_h = !0, this.f8o = this.FbDataInternal.type()), this.f8o
  }
  get CombinationShapes() {
    if (!this.ac1) {
      this.ac1 = !0, this.hc1 = new Array;
      var e = this.FbDataInternal.combinationShapesLength();
      if (e)
        for (let i = 0; i < e; ++i) {
          var t = this.FbDataInternal.combinationShapesType(i),
            r = UnionCombinationTriggerShapeHelper_1.UnionCombinationTriggerShapeHelper.GetUnionCombinationTriggerShapeObject(t);
          r && void 0 !== (t = UnionCombinationTriggerShapeHelper_1.UnionCombinationTriggerShapeHelper.ReadUnionCombinationTriggerShape(t, this.FbDataInternal.combinationShapes(i, r))) && this.hc1.push(t)
        }
    }
    return this.hc1
  }
}
exports.FbCombinationTriggerShape = FbCombinationTriggerShape;
//# sourceMappingURL=FbCombinationTriggerShape.js.map