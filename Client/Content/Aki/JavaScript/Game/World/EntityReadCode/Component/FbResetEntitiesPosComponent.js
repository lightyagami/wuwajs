"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbResetEntitiesPosComponent = undefined;
const UnionTriggerShapeHelper_1 = require("../Shape/UnionTriggerShapeHelper");
class FbResetEntitiesPosComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.M_h = false;
    this.E_h = undefined;
    this.V1h = false;
    this.j1h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbResetEntitiesPosComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get Range() {
    var t;
    var e;
    if (!this.M_h && (this.M_h = true, t = this.FbDataInternal.rangeType(), e = UnionTriggerShapeHelper_1.UnionTriggerShapeHelper.GetUnionTriggerShapeObject(t))) {
      this.E_h = UnionTriggerShapeHelper_1.UnionTriggerShapeHelper.ReadUnionTriggerShape(t, this.FbDataInternal.range(e));
    }
    return this.E_h;
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var e = this.FbDataInternal.entityIdsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
}
exports.FbResetEntitiesPosComponent = FbResetEntitiesPosComponent;
//# sourceMappingURL=FbResetEntitiesPosComponent.js.map