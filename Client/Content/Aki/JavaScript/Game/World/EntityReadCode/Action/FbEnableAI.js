"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEnableAI = undefined;
class FbEnableAI {
  constructor(t) {
    this.FbDataInternal = t;
    this.V1h = false;
    this.j1h = undefined;
    this.Dch = false;
    this.bSo = false;
  }
  static Create(t) {
    if (t) {
      return new FbEnableAI(t);
    }
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
  get IsEnable() {
    if (!this.Dch) {
      this.Dch = true;
      this.bSo = this.FbDataInternal.isEnable();
    }
    return this.bSo;
  }
}
exports.FbEnableAI = FbEnableAI;
//# sourceMappingURL=FbEnableAI.js.map