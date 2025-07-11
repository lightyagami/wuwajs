"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSpawnConfigHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbTemplateMatrix_1 = require("./FbTemplateMatrix");
class UnionSpawnConfigHelper {
  static GetUnionSpawnConfigObject(e) {
    if (e === fb_component_1.UnionSpawnConfig.TemplateMatrix) {
      return new fb_component_1.TemplateMatrix();
    }
  }
  static ReadUnionSpawnConfig(e, n) {
    if (n !== undefined && e === fb_component_1.UnionSpawnConfig.TemplateMatrix) {
      return FbTemplateMatrix_1.FbTemplateMatrix.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionSpawnConfigHelper = UnionSpawnConfigHelper;
//# sourceMappingURL=UnionSpawnConfigHelper.js.map