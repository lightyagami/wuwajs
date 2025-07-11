"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionAnimalModelTypeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbMeshAnimalModel_1 = require("./FbMeshAnimalModel");
class UnionAnimalModelTypeHelper {
  static GetUnionAnimalModelTypeObject(e) {
    if (e === fb_component_1.UnionAnimalModelType.MeshAnimalModel) {
      return new fb_component_1.MeshAnimalModel();
    }
  }
  static ReadUnionAnimalModelType(e, n) {
    if (n !== undefined && e === fb_component_1.UnionAnimalModelType.MeshAnimalModel) {
      return FbMeshAnimalModel_1.FbMeshAnimalModel.Create(n);
    } else {
      return undefined;
    }
  }
}
exports.UnionAnimalModelTypeHelper = UnionAnimalModelTypeHelper;
//# sourceMappingURL=UnionAnimalModelTypeHelper.js.map