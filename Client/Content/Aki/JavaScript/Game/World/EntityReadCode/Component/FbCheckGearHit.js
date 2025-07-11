"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbCheckGearHit = undefined;
class FbCheckGearHit {
  constructor(t) {
    this.FbDataInternal = t;
    this.VOh = false;
    this.jOh = 0;
    this.HOh = false;
    this.WOh = undefined;
    this.QOh = false;
    this.KOh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbCheckGearHit(t);
    }
  }
  get HitIndex() {
    if (!this.VOh) {
      this.VOh = true;
      this.jOh = this.FbDataInternal.hitIndex();
    }
    return this.jOh;
  }
  get AffectIndex() {
    if (!this.HOh) {
      this.HOh = true;
      this.WOh = new Array();
      var i = this.FbDataInternal.affectIndexLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.WOh.push(this.FbDataInternal.affectIndex(t));
        }
      }
    }
    return this.WOh;
  }
  get AffectType() {
    if (!this.QOh) {
      this.QOh = true;
      this.KOh = this.FbDataInternal.affectType();
    }
    return this.KOh;
  }
}
exports.FbCheckGearHit = FbCheckGearHit;
//# sourceMappingURL=FbCheckGearHit.js.map