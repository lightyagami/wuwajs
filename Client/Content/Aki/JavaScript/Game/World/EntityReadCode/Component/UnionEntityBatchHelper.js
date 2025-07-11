"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionEntityBatchHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEntityListBatch_1 = require("./FbEntityListBatch");
class UnionEntityBatchHelper {
  static GetUnionEntityBatchObject(t) {
    if (t === fb_component_1.UnionEntityBatch.EntityListBatch) {
      return new fb_component_1.EntityListBatch();
    }
  }
  static ReadUnionEntityBatch(t, n) {
    if (n !== undefined && t === fb_component_1.UnionEntityBatch.EntityListBatch) {
      return FbEntityListBatch_1.FbEntityListBatch.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionEntityBatchHelper = UnionEntityBatchHelper;
//# sourceMappingURL=UnionEntityBatchHelper.js.map