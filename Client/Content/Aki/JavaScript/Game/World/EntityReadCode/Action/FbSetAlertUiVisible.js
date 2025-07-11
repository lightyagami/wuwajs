"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetAlertUiVisible = undefined;
class FbSetAlertUiVisible {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Yph = false;
    this.zph = 0;
    this.tMh = false;
    this.ASo = false;
  }
  static Create(t) {
    if (t) {
      return new FbSetAlertUiVisible(t);
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
  get IsVisible() {
    if (!this.tMh) {
      this.tMh = true;
      this.ASo = this.FbDataInternal.isVisible();
    }
    return this.ASo;
  }
}
exports.FbSetAlertUiVisible = FbSetAlertUiVisible;
//# sourceMappingURL=FbSetAlertUiVisible.js.map