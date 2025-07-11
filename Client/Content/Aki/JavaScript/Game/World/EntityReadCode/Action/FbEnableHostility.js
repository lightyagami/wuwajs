"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableHostility = undefined;
class FbEnableHostility {
  constructor(t) {
    this.FbDataInternal = t;
    this.Dch = false;
    this.bSo = false;
    this.V1h = false;
    this.j1h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbEnableHostility(t);
    }
  }
  get IsEnable() {
    if (!this.Dch) {
      this.Dch = true;
      this.bSo = this.FbDataInternal.isEnable();
    }
    return this.bSo;
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var s = this.FbDataInternal.entityIdsLength();
      if (s) {
        for (let t = 0; t < s; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
}
exports.FbEnableHostility = FbEnableHostility;
//# sourceMappingURL=FbEnableHostility.js.map