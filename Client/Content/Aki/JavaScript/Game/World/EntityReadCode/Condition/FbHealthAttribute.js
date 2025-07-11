"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHealthAttribute = undefined;
class FbHealthAttribute {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this._ch = false;
    this.cch = undefined;
    this.kmh = false;
    this.Gmh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbHealthAttribute(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Compare() {
    if (!this._ch) {
      this._ch = true;
      this.cch = this.FbDataInternal.compare();
    }
    return this.cch;
  }
  get Value() {
    if (!this.kmh) {
      this.kmh = true;
      this.Gmh = this.FbDataInternal.value();
    }
    return this.Gmh;
  }
}
exports.FbHealthAttribute = FbHealthAttribute;
//# sourceMappingURL=FbHealthAttribute.js.map