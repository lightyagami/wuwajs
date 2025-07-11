"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableAlertUi = undefined;
class FbEnableAlertUi {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.Yph = false;
    this.zph = 0;
    this.Dch = false;
    this.bSo = false;
  }
  static Create(t) {
    if (t) {
      return new FbEnableAlertUi(t);
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
  get IsEnable() {
    if (!this.Dch) {
      this.Dch = true;
      this.bSo = this.FbDataInternal.isEnable();
    }
    return this.bSo;
  }
}
exports.FbEnableAlertUi = FbEnableAlertUi;
//# sourceMappingURL=FbEnableAlertUi.js.map