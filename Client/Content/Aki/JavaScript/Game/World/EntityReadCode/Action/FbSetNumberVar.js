"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetNumberVar = undefined;
const UnionVarHelper_1 = require("./UnionVarHelper");
class FbSetNumberVar {
  constructor(t) {
    this.FbDataInternal = t;
    this.x_h = false;
    this.FGi = undefined;
    this.kmh = false;
    this.Gmh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetNumberVar(t);
    }
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
  get Value() {
    var t;
    var e;
    if (!this.kmh && (this.kmh = true, t = this.FbDataInternal.valueType(), e = UnionVarHelper_1.UnionVarHelper.GetUnionVarObject(t))) {
      this.Gmh = UnionVarHelper_1.UnionVarHelper.ReadUnionVar(t, this.FbDataInternal.value(e));
    }
    return this.Gmh;
  }
}
exports.FbSetNumberVar = FbSetNumberVar;
//# sourceMappingURL=FbSetNumberVar.js.map