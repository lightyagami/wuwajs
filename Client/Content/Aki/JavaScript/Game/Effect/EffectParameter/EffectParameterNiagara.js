"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EffectParameterNiagara = undefined;
const cpp_1 = require("cpp");
class EffectParameterNiagara {
  constructor() {
    this.UserParameterFloat = undefined;
    this.UserParameterColor = undefined;
    this.UserParameterVector = undefined;
    this.UserParameterArrayVector = undefined;
    this.MaterialParameterFloat = undefined;
    this.MaterialParameterColor = undefined;
  }
  ToKuroEffectParameterNiagara(t) {
    if (this.UserParameterFloat) {
      for (const a of this.UserParameterFloat) {
        var i = new cpp_1.FParameterFloat();
        i.Name = a[0];
        i.Value = a[1];
        t.UserParameterFloat.Add(i);
      }
    }
    if (this.UserParameterColor) {
      for (const c of this.UserParameterColor) {
        var o = new cpp_1.FParameterLinearColor();
        o.Name = c[0];
        o.Value = c[1];
        t.UserParameterColor.Add(o);
      }
    }
    if (this.UserParameterVector) {
      for (const p of this.UserParameterVector) {
        var s = new cpp_1.FParameterVector();
        s.Name = p[0];
        s.Value = p[1];
        t.UserParameterVector.Add(s);
      }
    }
    if (this.UserParameterArrayVector) {
      for (const h of this.UserParameterArrayVector) {
        var r = new cpp_1.FParameterArrayVector();
        r.Name = h[0];
        r.Value = h[1];
        t.UserParameterArrayVector.Add(r);
      }
    }
    if (this.MaterialParameterFloat) {
      for (const n of this.MaterialParameterFloat) {
        var e = new cpp_1.FParameterFloat();
        e.Name = n[0];
        e.Value = n[1];
        t.MaterialParameterFloat.Add(e);
      }
    }
    if (this.MaterialParameterColor) {
      for (const v of this.MaterialParameterColor) {
        var f = new cpp_1.FParameterLinearColor();
        f.Name = v[0];
        f.Value = v[1];
        t.MaterialParameterColor.Add(f);
      }
    }
  }
}
exports.EffectParameterNiagara = EffectParameterNiagara;
//# sourceMappingURL=EffectParameterNiagara.js.map