"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FbRemovePreloadResourceAction = undefined;
const UnionRemovePreloadResourceConfigHelper_1 = require("./UnionRemovePreloadResourceConfigHelper");
class FbRemovePreloadResourceAction {
  constructor(e) {
    this.FbDataInternal = e;
    this.kSh = false;
    this.GSh = undefined;
  }
  static Create(e) {
    if (e) {
      return new FbRemovePreloadResourceAction(e);
    }
  }
  get RemovePreloadResourceObjectType() {
    var e;
    var o;
    if (!this.kSh && (this.kSh = true, e = this.FbDataInternal.removePreloadResourceObjectTypeType(), o = UnionRemovePreloadResourceConfigHelper_1.UnionRemovePreloadResourceConfigHelper.GetUnionRemovePreloadResourceConfigObject(e))) {
      this.GSh = UnionRemovePreloadResourceConfigHelper_1.UnionRemovePreloadResourceConfigHelper.ReadUnionRemovePreloadResourceConfig(e, this.FbDataInternal.removePreloadResourceObjectType(o));
    }
    return this.GSh;
  }
}
exports.FbRemovePreloadResourceAction = FbRemovePreloadResourceAction;
//# sourceMappingURL=FbRemovePreloadResourceAction.js.map