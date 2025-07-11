"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCustomAoizRadius = undefined;
class FbCustomAoizRadius {
  constructor(t) {
    this.FbDataInternal = t;
    this.hUh = false;
    this.lUh = 0;
    this._Uh = false;
    this.cUh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCustomAoizRadius(t);
    }
  }
  get Up() {
    if (!this.hUh) {
      this.hUh = true;
      this.lUh = this.FbDataInternal.up();
    }
    return this.lUh;
  }
  get Down() {
    if (!this._Uh) {
      this._Uh = true;
      this.cUh = this.FbDataInternal.down();
    }
    return this.cUh;
  }
}
exports.FbCustomAoizRadius = FbCustomAoizRadius;
//# sourceMappingURL=FbCustomAoizRadius.js.map