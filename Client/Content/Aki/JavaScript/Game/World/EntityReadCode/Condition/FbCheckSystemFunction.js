"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckSystemFunction = undefined;
class FbCheckSystemFunction {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Czh = false;
    this.gzh = 0;
    this._ch = false;
    this.cch = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckSystemFunction(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get SystemId() {
    if (!this.Czh) {
      this.Czh = true;
      this.gzh = this.FbDataInternal.systemId();
    }
    return this.gzh;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
}
exports.FbCheckSystemFunction = FbCheckSystemFunction;
//# sourceMappingURL=FbCheckSystemFunction.js.map