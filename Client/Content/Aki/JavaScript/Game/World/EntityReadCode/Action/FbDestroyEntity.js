"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbDestroyEntity = undefined;
class FbDestroyEntity {
  constructor(t) {
    this.FbDataInternal = t;
    this.V1h = false;
    this.j1h = undefined;
    this.Ych = false;
    this.zch = false;
  }
  static Create(t) {
    if (t) {
      return new FbDestroyEntity(t);
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
  get DelayDestroy() {
    if (!this.Ych) {
      this.Ych = true;
      this.zch = this.FbDataInternal.delayDestroy();
    }
    return this.zch;
  }
}
exports.FbDestroyEntity = FbDestroyEntity;
//# sourceMappingURL=FbDestroyEntity.js.map