"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityVarContext = undefined;
class FbEntityVarContext {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.tgh = false;
    this.FFe = 0;
    this.qxh = false;
    this.kxh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEntityVarContext(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Id() {
    if (!this.tgh) {
      this.tgh = true;
      this.FFe = this.FbDataInternal.id();
    }
    return this.FFe;
  }
  get MatchType() {
    if (!this.qxh) {
      this.qxh = true;
      this.kxh = this.FbDataInternal.matchType();
    }
    return this.kxh;
  }
}
exports.FbEntityVarContext = FbEntityVarContext;
//# sourceMappingURL=FbEntityVarContext.js.map