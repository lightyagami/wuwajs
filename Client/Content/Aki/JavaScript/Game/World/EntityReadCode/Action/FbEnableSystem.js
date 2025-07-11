"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableSystem = undefined;
class FbEnableSystem {
  constructor(t) {
    this.FbDataInternal = t;
    this.udh = false;
    this.ddh = undefined;
    this.Dch = false;
    this.bSo = false;
  }
  static Create(t) {
    if (t) {
      return new FbEnableSystem(t);
    }
  }
  get SystemType() {
    if (!this.udh) {
      this.udh = true;
      this.ddh = this.FbDataInternal.systemType();
    }
    return this.ddh;
  }
  get IsEnable() {
    if (!this.Dch) {
      this.Dch = true;
      this.bSo = this.FbDataInternal.isEnable();
    }
    return this.bSo;
  }
}
exports.FbEnableSystem = FbEnableSystem;
//# sourceMappingURL=FbEnableSystem.js.map