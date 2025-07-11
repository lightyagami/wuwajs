"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionLevelAIBehaviourHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbInteractBehaviourActions_1 = require("./FbInteractBehaviourActions");
const FbLevelAIBehaviourSpline_1 = require("./FbLevelAIBehaviourSpline");
class UnionLevelAIBehaviourHelper {
  static GetUnionLevelAIBehaviourObject(e) {
    switch (e) {
      case fb_component_1.UnionLevelAIBehaviour.InteractBehaviourActions:
        return new fb_component_1.InteractBehaviourActions();
      case fb_component_1.UnionLevelAIBehaviour.LevelAIBehaviourSpline:
        return new fb_component_1.LevelAIBehaviourSpline();
      default:
        return;
    }
  }
  static ReadUnionLevelAIBehaviour(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_component_1.UnionLevelAIBehaviour.InteractBehaviourActions:
          return FbInteractBehaviourActions_1.FbInteractBehaviourActions.Create(n);
        case fb_component_1.UnionLevelAIBehaviour.LevelAIBehaviourSpline:
          return FbLevelAIBehaviourSpline_1.FbLevelAIBehaviourSpline.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionLevelAIBehaviourHelper = UnionLevelAIBehaviourHelper;
//# sourceMappingURL=UnionLevelAIBehaviourHelper.js.map