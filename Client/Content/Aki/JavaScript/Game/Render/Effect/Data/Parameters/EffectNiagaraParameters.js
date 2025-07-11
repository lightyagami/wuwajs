"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const EffectParameterBase_1 = require("./EffectParameterBase");
class EffectNiagaraParameters extends EffectParameterBase_1.default {
  constructor(e = undefined, t = undefined, a = undefined) {
    super();
    if (e) {
      this.EffectParameter.FloatCurveMap = e;
    }
    if (t) {
      this.EffectParameter.VectorCurveMap = t;
    }
    if (a) {
      this.EffectParameter.LinearColorCurveMap = a;
    }
    if (e || t || a) {
      this.HasCurveParameters = true;
    }
  }
}
exports.default = EffectNiagaraParameters;
//# sourceMappingURL=EffectNiagaraParameters.js.map