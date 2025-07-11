"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckAlertAreaEnabled = undefined;
class FbCheckAlertAreaEnabled {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Yph = false;
    this.zph = 0;
  }
  static Create(t) {
    if (t) {
      return new FbCheckAlertAreaEnabled(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get AreaId() {
    if (!this.Yph) {
      this.Yph = true;
      this.zph = this.FbDataInternal.areaId();
    }
    return this.zph;
  }
}
exports.FbCheckAlertAreaEnabled = FbCheckAlertAreaEnabled;
//# sourceMappingURL=FbCheckAlertAreaEnabled.js.map