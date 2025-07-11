"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbStaticEntitiyMatch = undefined;
const FbEntityCategory_1 = require("./FbEntityCategory");
class FbStaticEntitiyMatch {
  constructor(t) {
    this.FbDataInternal = t;
    this.Rwh = false;
    this.wwh = undefined;
    this.yFh = false;
    this.SFh = undefined;
  }
  static Create(t) {
    if (t) {
      return new FbStaticEntitiyMatch(t);
    }
  }
  get Category() {
    if (!this.Rwh) {
      this.Rwh = true;
      this.wwh = FbEntityCategory_1.FbEntityCategory.Create(this.FbDataInternal.category());
    }
    return this.wwh;
  }
  get CategoryType() {
    if (!this.yFh) {
      this.yFh = true;
      this.SFh = this.FbDataInternal.categoryType();
    }
    return this.SFh;
  }
}
exports.FbStaticEntitiyMatch = FbStaticEntitiyMatch;
//# sourceMappingURL=FbStaticEntitiyMatch.js.map