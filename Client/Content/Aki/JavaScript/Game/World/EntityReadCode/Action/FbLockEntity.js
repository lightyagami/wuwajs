"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbLockEntity = undefined;
class FbLockEntity {
  constructor(t) {
    this.FbDataInternal = t;
    this.V1h = false;
    this.j1h = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbLockEntity(t);
    }
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var i = this.FbDataInternal.entityIdsLength();
      if (i) {
        for (let t = 0; t < i; ++t) {
          this.j1h.push(this.FbDataInternal.entityIds(t));
        }
      }
    }
    return this.j1h;
  }
}
exports.FbLockEntity = FbLockEntity;
//# sourceMappingURL=FbLockEntity.js.map