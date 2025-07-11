"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSpawnMonsterPreDependOnPreceding = undefined;
class FbSpawnMonsterPreDependOnPreceding {
  constructor(e) {
    this.FbDataInternal = e;
    this.u_h = false;
    this.f8o = undefined;
    this.tkh = false;
    this.ikh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbSpawnMonsterPreDependOnPreceding(e);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get Ids() {
    if (!this.tkh) {
      this.tkh = true;
      this.ikh = new Array();
      var t = this.FbDataInternal.idsLength();
      if (t) {
        for (let e = 0; e < t; ++e) {
          this.ikh.push(this.FbDataInternal.ids(e));
        }
      }
    }
    return this.ikh;
  }
}
exports.FbSpawnMonsterPreDependOnPreceding = FbSpawnMonsterPreDependOnPreceding;
//# sourceMappingURL=FbSpawnMonsterPreDependOnPreceding.js.map