"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSceneItemAiTypeHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbSceneItemPatrol_1 = require("./FbSceneItemPatrol");
class UnionSceneItemAiTypeHelper {
  static GetUnionSceneItemAiTypeObject(e) {
    if (e === fb_component_1.UnionSceneItemAiType.SceneItemPatrol) {
      return new fb_component_1.SceneItemPatrol();
    }
  }
  static ReadUnionSceneItemAiType(e, t) {
    if (t !== undefined && e === fb_component_1.UnionSceneItemAiType.SceneItemPatrol) {
      return FbSceneItemPatrol_1.FbSceneItemPatrol.Create(t);
    } else {
      return undefined;
    }
  }
}
exports.UnionSceneItemAiTypeHelper = UnionSceneItemAiTypeHelper;
//# sourceMappingURL=UnionSceneItemAiTypeHelper.js.map