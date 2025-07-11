"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSpecialAnimalConfigHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCollectAnimalConfig_1 = require("./FbCollectAnimalConfig");
class UnionSpecialAnimalConfigHelper {
  static GetUnionSpecialAnimalConfigObject(n) {
    if (n === fb_component_1.UnionSpecialAnimalConfig.CollectAnimalConfig) {
      return new fb_component_1.CollectAnimalConfig();
    }
  }
  static ReadUnionSpecialAnimalConfig(n, e) {
    if (e !== undefined && n === fb_component_1.UnionSpecialAnimalConfig.CollectAnimalConfig) {
      return FbCollectAnimalConfig_1.FbCollectAnimalConfig.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionSpecialAnimalConfigHelper = UnionSpecialAnimalConfigHelper;
//# sourceMappingURL=UnionSpecialAnimalConfigHelper.js.map