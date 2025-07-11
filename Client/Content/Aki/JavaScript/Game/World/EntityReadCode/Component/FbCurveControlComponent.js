"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCurveControlComponent = undefined;
const UnionCurveControlConfigHelper_1 = require("./UnionCurveControlConfigHelper");
class FbCurveControlComponent {
  constructor(t) {
    this.FbDataInternal = t;
    this.q_h = false;
    this.k_h = false;
    this.Zu1 = false;
    this.ed1 = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCurveControlComponent(t);
    }
  }
  get Disabled() {
    if (!this.q_h) {
      this.q_h = true;
      this.k_h = this.FbDataInternal.disabled();
    }
    return this.k_h;
  }
  get CurveControlConfig() {
    var t;
    var o;
    if (!this.Zu1 && (this.Zu1 = true, t = this.FbDataInternal.curveControlConfigType(), o = UnionCurveControlConfigHelper_1.UnionCurveControlConfigHelper.GetUnionCurveControlConfigObject(t))) {
      this.ed1 = UnionCurveControlConfigHelper_1.UnionCurveControlConfigHelper.ReadUnionCurveControlConfig(t, this.FbDataInternal.curveControlConfig(o));
    }
    return this.ed1;
  }
}
exports.FbCurveControlComponent = FbCurveControlComponent;
//# sourceMappingURL=FbCurveControlComponent.js.map