"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbResetTeleControlEntity = undefined;
class FbResetTeleControlEntity {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.V1h = false;
    this.j1h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbResetTeleControlEntity(t);
    }
  }
  get Type() {
    if (!this.u_h) {
      this.u_h = true;
      this.f8o = this.FbDataInternal.type();
    }
    return this.f8o;
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var e = this.FbDataInternal.entityIdsLength();
      if (e) {
        for (let t = 0; t < e; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
}
exports.FbResetTeleControlEntity = FbResetTeleControlEntity;
//# sourceMappingURL=FbResetTeleControlEntity.js.map