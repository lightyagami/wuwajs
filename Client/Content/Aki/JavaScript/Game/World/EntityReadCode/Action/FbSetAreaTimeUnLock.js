"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbSetAreaTimeUnLock = undefined;
class FbSetAreaTimeUnLock {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.g5h = false;
    this.f5h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbSetAreaTimeUnLock(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get AreaIds() {
    if (!this.g5h) {
      this.g5h = true;
      this.f5h = new Array();
      var e = this.FbDataInternal.areaIdsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.f5h.push(this.FbDataInternal.areaIds(t));
        }
      }
    }
    return this.f5h;
  }
}
exports.FbSetAreaTimeUnLock = FbSetAreaTimeUnLock;
//# sourceMappingURL=FbSetAreaTimeUnLock.js.map