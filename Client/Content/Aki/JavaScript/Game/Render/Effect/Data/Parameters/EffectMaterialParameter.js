"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const EffectParameterBase_1 = require("./EffectParameterBase");
class EffectMaterialParameters extends EffectParameterBase_1.default {
  constructor(e = undefined, t = undefined) {
    super();
    this.zpl = false;
    if (e) {
      this.EffectParameter.FloatCurveMap = e;
    }
    if (t) {
      this.EffectParameter.LinearColorCurveMap = t;
    }
    if (e || t) {
      this.HasCurveParameters = true;
    }
  }
  CollectFloatCurve(e, t) {
    super.CollectFloatCurve(e, t);
    this.zpl = true;
  }
  CollectVectorCurve(e, t) {
    super.CollectVectorCurve(e, t);
    this.zpl = true;
  }
  CollectLinearColorCurve(e, t) {
    super.CollectLinearColorCurve(e, t);
    this.zpl = true;
  }
  CollectFloatConst(e, t) {
    super.CollectFloatConst(e, t);
    this.zpl = true;
  }
  CollectVectorConst(e, t) {
    super.CollectVectorConst(e, t);
    this.zpl = true;
  }
  CollectLinearColorConst(e, t) {
    super.CollectLinearColorConst(e, t);
    this.zpl = true;
  }
  RemoveFloatCurveOrConst(e) {
    super.RemoveFloatCurveOrConst(e);
    this.zpl = true;
  }
  RemoveLinearColorCurveOrConst(e) {
    super.RemoveLinearColorCurveOrConst(e);
    this.zpl = true;
  }
  RemoveVectorCurveOrConst(e) {
    super.RemoveVectorCurveOrConst(e);
    this.zpl = true;
  }
  Tick(e, t) {
    this.Apply(e, t, this.zpl);
    this.zpl = false;
  }
}
exports.default = EffectMaterialParameters;
//# sourceMappingURL=EffectMaterialParameter.js.map