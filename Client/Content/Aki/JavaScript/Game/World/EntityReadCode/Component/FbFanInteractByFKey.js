"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbFanInteractByFKey = undefined;
class FbFanInteractByFKey {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.uQh = false;
    this.dQh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbFanInteractByFKey(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get TidInteractOptionText() {
    if (!this.uQh) {
      this.uQh = true;
      this.dQh = this.FbDataInternal.tidInteractOptionText();
    }
    return this.dQh;
  }
}
exports.FbFanInteractByFKey = FbFanInteractByFKey;
//# sourceMappingURL=FbFanInteractByFKey.js.map