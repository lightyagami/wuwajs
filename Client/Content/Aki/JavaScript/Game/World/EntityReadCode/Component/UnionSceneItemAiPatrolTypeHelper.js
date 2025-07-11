"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSceneItemAiPatrolTypeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbSceneItemAiPatrolByGameTime_1 = require("./FbSceneItemAiPatrolByGameTime");
class UnionSceneItemAiPatrolTypeHelper {
  static GetUnionSceneItemAiPatrolTypeObject(e) {
    if (e === fb_component_1.UnionSceneItemAiPatrolType.SceneItemAiPatrolByGameTime) {
      return new fb_component_1.SceneItemAiPatrolByGameTime();
    }
  }
  static ReadUnionSceneItemAiPatrolType(e, t) {
    if (t !== undefined && e === fb_component_1.UnionSceneItemAiPatrolType.SceneItemAiPatrolByGameTime) {
      return FbSceneItemAiPatrolByGameTime_1.FbSceneItemAiPatrolByGameTime.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionSceneItemAiPatrolTypeHelper = UnionSceneItemAiPatrolTypeHelper;
//# sourceMappingURL=UnionSceneItemAiPatrolTypeHelper.js.map