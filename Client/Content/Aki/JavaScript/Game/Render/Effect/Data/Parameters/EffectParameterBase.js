"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const CPP = require("cpp");
class EffectParametersBase {
  constructor() {
    this.HasCurveParameters = false;
    this.EffectParameter = new CPP.KuroEffectParameters();
  }
  CollectFloatCurve(t, e) {
    this.HasCurveParameters = true;
    if (e.bUseCurve) {
      this.EffectParameter.FloatCurveMap.Set(t, e);
    } else {
      this.CollectFloatConst(t, e.Constant);
    }
  }
  CollectFloatConst(t, e) {
    this.EffectParameter.FloatConstMap.Set(t, e);
  }
  CollectLinearColorCurve(t, e) {
    this.HasCurveParameters = true;
    if (e.bUseCurve) {
      this.EffectParameter.LinearColorCurveMap.Set(t, e);
    } else {
      this.CollectLinearColorConst(t, e.Constant);
    }
  }
  CollectLinearColorConst(t, e) {
    this.EffectParameter.LinearColorConstMap.Set(t, e);
  }
  CollectVectorCurve(t, e) {
    this.HasCurveParameters = true;
    if (e.bUseCurve) {
      this.EffectParameter.VectorCurveMap.Set(t, e);
    } else {
      this.CollectVectorConst(t, e.Constant);
    }
  }
  CollectVectorConst(t, e) {
    this.EffectParameter.VectorConstMap.Set(t, e);
  }
  RemoveFloatCurveOrConst(t) {
    this.EffectParameter.FloatCurveMap.Remove(t);
    this.EffectParameter.FloatConstMap.Remove(t);
  }
  RemoveLinearColorCurveOrConst(t) {
    this.EffectParameter.LinearColorCurveMap.Remove(t);
    this.EffectParameter.LinearColorConstMap.Remove(t);
  }
  RemoveVectorCurveOrConst(t) {
    this.EffectParameter.VectorCurveMap.Remove(t);
    this.EffectParameter.VectorConstMap.Remove(t);
  }
  Apply(t, e, s) {
    if (t && (s || this.HasCurveParameters)) {
      this.EffectParameter.Apply(t, e, s);
    }
  }
}
exports.default = EffectParametersBase;
//# sourceMappingURL=EffectParameterBase.js.map