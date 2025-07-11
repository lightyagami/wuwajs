"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityAngleWeight = undefined;
class FbEntityAngleWeight {
  constructor(t) {
    this.FbDataInternal = t;
    this.fqh = false;
    this.pqh = 0;
    this.jDh = false;
    this.HDh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbEntityAngleWeight(t);
    }
  }
  get Angle() {
    if (!this.fqh) {
      this.fqh = true;
      this.pqh = this.FbDataInternal.angle();
    }
    return this.pqh;
  }
  get Weight() {
    if (!this.jDh) {
      this.jDh = true;
      this.HDh = this.FbDataInternal.weight();
    }
    return this.HDh;
  }
}
exports.FbEntityAngleWeight = FbEntityAngleWeight;
//# sourceMappingURL=FbEntityAngleWeight.js.map