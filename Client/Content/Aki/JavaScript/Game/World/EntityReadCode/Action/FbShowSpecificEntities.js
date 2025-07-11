"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbShowSpecificEntities = undefined;
class FbShowSpecificEntities {
  constructor(t) {
    this.FbDataInternal = t;
    this.V1h = false;
    this.j1h = undefined;
    this.WAh = false;
    this.QAh = false;
  }
  static Create(t) {
    if (t) {
      return new FbShowSpecificEntities(t);
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
  get DelayShow() {
    if (!this.WAh) {
      this.WAh = true;
      this.QAh = this.FbDataInternal.delayShow();
    }
    return this.QAh;
  }
}
exports.FbShowSpecificEntities = FbShowSpecificEntities;
//# sourceMappingURL=FbShowSpecificEntities.js.map