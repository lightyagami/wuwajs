"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbTimeStopTarget = undefined;
const FbDynamicEntityMatch_1 = require("./FbDynamicEntityMatch");
class FbTimeStopTarget {
  constructor(t) {
    this.FbDataInternal = t;
    this.V1h = false;
    this.j1h = undefined;
    this.gFh = false;
    this.fFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbTimeStopTarget(t);
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
  get EntityMatch() {
    if (!this.gFh) {
      this.gFh = true;
      this.fFh = FbDynamicEntityMatch_1.FbDynamicEntityMatch.Create(this.FbDataInternal.entityMatch());
    }
    return this.fFh;
  }
}
exports.FbTimeStopTarget = FbTimeStopTarget;
//# sourceMappingURL=FbTimeStopTarget.js.map