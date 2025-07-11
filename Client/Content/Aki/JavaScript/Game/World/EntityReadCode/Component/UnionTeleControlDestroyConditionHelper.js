"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionTeleControlDestroyConditionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbCreateBulletDestroyCondition_1 = require("./FbCreateBulletDestroyCondition");
const FbLetGoDestroyCondition_1 = require("./FbLetGoDestroyCondition");
const FbThrowDestroyCondition_1 = require("./FbThrowDestroyCondition");
class UnionTeleControlDestroyConditionHelper {
  static GetUnionTeleControlDestroyConditionObject(e) {
    switch (e) {
      case fb_component_1.UnionTeleControlDestroyCondition.CreateBulletDestroyCondition:
        return new fb_component_1.CreateBulletDestroyCondition();
      case fb_component_1.UnionTeleControlDestroyCondition.LetGoDestroyCondition:
        return new fb_component_1.LetGoDestroyCondition();
      case fb_component_1.UnionTeleControlDestroyCondition.ThrowDestroyCondition:
        return new fb_component_1.ThrowDestroyCondition();
      default:
        return;
    }
  }
  static ReadUnionTeleControlDestroyCondition(e, o) {
    if (o !== undefined) {
      switch (e) {
        case fb_component_1.UnionTeleControlDestroyCondition.CreateBulletDestroyCondition:
          return FbCreateBulletDestroyCondition_1.FbCreateBulletDestroyCondition.Create(o);
        case fb_component_1.UnionTeleControlDestroyCondition.LetGoDestroyCondition:
          return FbLetGoDestroyCondition_1.FbLetGoDestroyCondition.Create(o);
        case fb_component_1.UnionTeleControlDestroyCondition.ThrowDestroyCondition:
          return FbThrowDestroyCondition_1.FbThrowDestroyCondition.Create(o);
        default:
          return;
      }
    }
  }
}
exports.UnionTeleControlDestroyConditionHelper = UnionTeleControlDestroyConditionHelper;
//# sourceMappingURL=UnionTeleControlDestroyConditionHelper.js.map