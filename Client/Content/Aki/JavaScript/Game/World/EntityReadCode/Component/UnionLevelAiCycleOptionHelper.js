"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionLevelAiCycleOptionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbLevelAiCycleLooply_1 = require("./FbLevelAiCycleLooply");
class UnionLevelAiCycleOptionHelper {
  static GetUnionLevelAiCycleOptionObject(e) {
    if (e === fb_component_1.UnionLevelAiCycleOption.LevelAiCycleLooply) {
      return new fb_component_1.LevelAiCycleLooply();
    }
  }
  static ReadUnionLevelAiCycleOption(e, o) {
    if (o !== undefined && e === fb_component_1.UnionLevelAiCycleOption.LevelAiCycleLooply) {
      return FbLevelAiCycleLooply_1.FbLevelAiCycleLooply.Create(o);
    } else {
      return undefined;
    }
  }
}
exports.UnionLevelAiCycleOptionHelper = UnionLevelAiCycleOptionHelper;
//# sourceMappingURL=UnionLevelAiCycleOptionHelper.js.map