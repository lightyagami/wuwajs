"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCustomJsonCondition = undefined;
class FbCustomJsonCondition {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.x_h = false;
    this.FGi = undefined;
    this.NAh = false;
    this.VAh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCustomJsonCondition(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Name() {
    if (!this.x_h) {
      this.x_h = true;
      this.FGi = this.FbDataInternal.name();
    }
    return this.FGi;
  }
  get JsonString() {
    if (!this.NAh) {
      this.NAh = true;
      this.VAh = this.FbDataInternal.jsonString();
    }
    return this.VAh;
  }
}
exports.FbCustomJsonCondition = FbCustomJsonCondition;
//# sourceMappingURL=FbCustomJsonCondition.js.map