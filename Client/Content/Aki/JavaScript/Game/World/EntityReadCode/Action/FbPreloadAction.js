"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbPreloadAction = undefined;
const UnionPreloadObjectTypeConfigHelper_1 = require("./UnionPreloadObjectTypeConfigHelper");
class FbPreloadAction {
  constructor(e) {
    this.FbDataInternal = e;
    this.xSh = false;
    this.RSh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbPreloadAction(e);
    }
  }
  get PreloadObjectType() {
    var e;
    var t;
    if (!this.xSh && (this.xSh = true, e = this.FbDataInternal.preloadObjectTypeType(), t = UnionPreloadObjectTypeConfigHelper_1.UnionPreloadObjectTypeConfigHelper.GetUnionPreloadObjectTypeConfigObject(e))) {
      this.RSh = UnionPreloadObjectTypeConfigHelper_1.UnionPreloadObjectTypeConfigHelper.ReadUnionPreloadObjectTypeConfig(e, this.FbDataInternal.preloadObjectType(t));
    }
    return this.RSh;
  }
}
exports.FbPreloadAction = FbPreloadAction;
//# sourceMappingURL=FbPreloadAction.js.map