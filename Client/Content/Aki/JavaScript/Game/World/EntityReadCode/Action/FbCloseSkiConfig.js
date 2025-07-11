"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCloseSkiConfig = undefined;
const UnionTargetEntityHelper_1 = require("./UnionTargetEntityHelper");
class FbCloseSkiConfig {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.ldh = false;
    this.NHo = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCloseSkiConfig(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Target() {
    var t;
    var i;
    if (!this.ldh && (this.ldh = true, t = this.FbDataInternal.targetType(), i = UnionTargetEntityHelper_1.UnionTargetEntityHelper.GetUnionTargetEntityObject(t))) {
      this.NHo = UnionTargetEntityHelper_1.UnionTargetEntityHelper.ReadUnionTargetEntity(t, this.FbDataInternal.target(i));
    }
    return this.NHo;
  }
}
exports.FbCloseSkiConfig = FbCloseSkiConfig;
//# sourceMappingURL=FbCloseSkiConfig.js.map