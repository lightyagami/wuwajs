"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbEntityCategoryWeight = undefined;
const FbStaticEntitiyMatch_1 = require("./FbStaticEntitiyMatch");
class FbEntityCategoryWeight {
  constructor(t) {
    this.FbDataInternal = t;
    this.m2h = false;
    this.C2h = undefined;
    this.jDh = false;
    this.HDh = 0;
  }
  static Create(t) {
    if (t) {
      return new FbEntityCategoryWeight(t);
    }
  }
  get EntitiyMatch() {
    if (!this.m2h) {
      this.m2h = true;
      this.C2h = FbStaticEntitiyMatch_1.FbStaticEntitiyMatch.Create(this.FbDataInternal.entitiyMatch());
    }
    return this.C2h;
  }
  get Weight() {
    if (!this.jDh) {
      this.jDh = true;
      this.HDh = this.FbDataInternal.weight();
    }
    return this.HDh;
  }
}
exports.FbEntityCategoryWeight = FbEntityCategoryWeight;
//# sourceMappingURL=FbEntityCategoryWeight.js.map