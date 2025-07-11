"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionModelTypeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbAnimalModel_1 = require("./FbAnimalModel");
const FbLevelPrefab_1 = require("./FbLevelPrefab");
const FbModelId_1 = require("./FbModelId");
const FbNpcModel_1 = require("./FbNpcModel");
class UnionModelTypeHelper {
  static GetUnionModelTypeObject(e) {
    switch (e) {
      case fb_component_1.UnionModelType.AnimalModel:
        return new fb_component_1.AnimalModel();
      case fb_component_1.UnionModelType.LevelPrefab:
        return new fb_component_1.LevelPrefab();
      case fb_component_1.UnionModelType.ModelId:
        return new fb_component_1.ModelId();
      case fb_component_1.UnionModelType.NpcModel:
        return new fb_component_1.NpcModel();
      default:
        return;
    }
  }
  static ReadUnionModelType(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_component_1.UnionModelType.AnimalModel:
          return FbAnimalModel_1.FbAnimalModel.Create(n);
        case fb_component_1.UnionModelType.LevelPrefab:
          return FbLevelPrefab_1.FbLevelPrefab.Create(n);
        case fb_component_1.UnionModelType.ModelId:
          return FbModelId_1.FbModelId.Create(n);
        case fb_component_1.UnionModelType.NpcModel:
          return FbNpcModel_1.FbNpcModel.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionModelTypeHelper = UnionModelTypeHelper;
//# sourceMappingURL=UnionModelTypeHelper.js.map