"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionChangeEntityPrefabPerformanceHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbChangeSelfEntityPrefabPerformance_1 = require("./FbChangeSelfEntityPrefabPerformance");
const FbChangeTargetEntityPrefabPerformance_1 = require("./FbChangeTargetEntityPrefabPerformance");
class UnionChangeEntityPrefabPerformanceHelper {
  static GetUnionChangeEntityPrefabPerformanceObject(e) {
    switch (e) {
      case fb_action_1.UnionChangeEntityPrefabPerformance.ChangeSelfEntityPrefabPerformance:
        return new fb_action_1.ChangeSelfEntityPrefabPerformance();
      case fb_action_1.UnionChangeEntityPrefabPerformance.ChangeTargetEntityPrefabPerformance:
        return new fb_action_1.ChangeTargetEntityPrefabPerformance();
      default:
        return;
    }
  }
  static ReadUnionChangeEntityPrefabPerformance(e, r) {
    if (r !== undefined) {
      switch (e) {
        case fb_action_1.UnionChangeEntityPrefabPerformance.ChangeSelfEntityPrefabPerformance:
          return FbChangeSelfEntityPrefabPerformance_1.FbChangeSelfEntityPrefabPerformance.Create(r);
        case fb_action_1.UnionChangeEntityPrefabPerformance.ChangeTargetEntityPrefabPerformance:
          return FbChangeTargetEntityPrefabPerformance_1.FbChangeTargetEntityPrefabPerformance.Create(r);
        default:
          return;
      }
    }
  }
}
exports.UnionChangeEntityPrefabPerformanceHelper = UnionChangeEntityPrefabPerformanceHelper;
//# sourceMappingURL=UnionChangeEntityPrefabPerformanceHelper.js.map