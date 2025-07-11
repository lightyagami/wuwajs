"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbModelComponent = undefined;
const UnionModelTypeHelper_1 = require("./UnionModelTypeHelper");
class FbModelComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.FQh = false;
    this.NQh = undefined;
    this.VQh = false;
    this.jQh = 0;
    this.HQh = false;
    this.WQh = 0;
    this.QQh = false;
    this.KQh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbModelComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get ModelType() {
    var t;
    var e;
    if (!this.FQh && (this.FQh = true, t = this.FbDataInternal.modelTypeType(), e = UnionModelTypeHelper_1.UnionModelTypeHelper.GetUnionModelTypeObject(t))) {
      this.NQh = UnionModelTypeHelper_1.UnionModelTypeHelper.ReadUnionModelType(t, this.FbDataInternal.modelType(e));
    }
    return this.NQh;
  }
  get HalfHeight() {
    if (!this.VQh) {
      this.VQh = true;
      this.jQh = this.FbDataInternal.halfHeight();
    }
    return this.jQh;
  }
  get TrackHeight() {
    if (!this.HQh) {
      this.HQh = true;
      this.WQh = this.FbDataInternal.trackHeight();
    }
    return this.WQh;
  }
  get PerformanceTags() {
    if (!this.QQh) {
      this.QQh = true;
      this.KQh = new Array();
      var e = this.FbDataInternal.performanceTagsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.KQh.push(this.FbDataInternal.performanceTags(t));
        }
      }
    }
    return this.KQh;
  }
}
exports.FbModelComponent = FbModelComponent;
//# sourceMappingURL=FbModelComponent.js.map