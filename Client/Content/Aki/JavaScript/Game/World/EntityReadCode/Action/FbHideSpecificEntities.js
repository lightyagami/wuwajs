"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbHideSpecificEntities = undefined;
class FbHideSpecificEntities {
  constructor(i) {
    this.FbDataInternal = i;
    this.V1h = false;
    this.j1h = undefined;
  }
  static Create(i) {
    if (i) {
      return new FbHideSpecificEntities(i);
    }
  }
  get EntityIds() {
    if (!this.V1h) {
      this.V1h = true;
      this.j1h = new Array();
      var t = this.FbDataInternal.entityIdsLength();
      if (t) {
        for (let i = 0; i < t; ++i) {
          this.j1h.push(this.FbDataInternal.entityIds(i));
        }
      }
    }
    return this.j1h;
  }
}
exports.FbHideSpecificEntities = FbHideSpecificEntities;
//# sourceMappingURL=FbHideSpecificEntities.js.map