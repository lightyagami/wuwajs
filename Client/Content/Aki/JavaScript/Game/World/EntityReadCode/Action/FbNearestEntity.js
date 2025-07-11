"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbNearestEntity = undefined;
class FbNearestEntity {
  constructor(t) {
    this.FbDataInternal = t;
    this.u_h = false;
    this.f8o = undefined;
    this.V1h = false;
    this.j1h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbNearestEntity(t);
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
exports.FbNearestEntity = FbNearestEntity;
//# sourceMappingURL=FbNearestEntity.js.map