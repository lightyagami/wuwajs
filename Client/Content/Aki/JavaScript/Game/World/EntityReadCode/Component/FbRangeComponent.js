"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRangeComponent = undefined;
const UnionTriggerShapeHelper_1 = require("../Shape/UnionTriggerShapeHelper");
class FbRangeComponent {
  constructor(e) {
    this.FbDataInternal = e;
    this.q_h = false;
    this.k_h = false;
    this.nRh = false;
    this.c6o = undefined;
    this.Zkh = false;
    this.eGh = 0;
  }
  static Create(e) {
    if (e) {
      return new FbRangeComponent(e);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Shape() {
    var e;
    var t;
    if (!this.nRh && (this.nRh = true, e = this.FbDataInternal.shapeType(), t = UnionTriggerShapeHelper_1.UnionTriggerShapeHelper.GetUnionTriggerShapeObject(e))) {
      this.c6o = UnionTriggerShapeHelper_1.UnionTriggerShapeHelper.ReadUnionTriggerShape(e, this.FbDataInternal.shape(t));
    }
    return this.c6o;
  }
  get ExtraRange() {
    if (!this.Zkh) {
      this.Zkh = true;
      this.eGh = this.FbDataInternal.extraRange();
    }
    return this.eGh;
  }
}
exports.FbRangeComponent = FbRangeComponent;
//# sourceMappingURL=FbRangeComponent.js.map