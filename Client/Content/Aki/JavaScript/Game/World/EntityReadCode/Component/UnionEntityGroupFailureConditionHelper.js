"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionEntityGroupFailureConditionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbEntityGroupFailureArbitraryState_1 = require("./FbEntityGroupFailureArbitraryState");
const FbEntityGroupFailureSequentialState_1 = require("./FbEntityGroupFailureSequentialState");
class UnionEntityGroupFailureConditionHelper {
  static GetUnionEntityGroupFailureConditionObject(t) {
    switch (t) {
      case fb_component_1.UnionEntityGroupFailureCondition.EntityGroupFailureArbitraryState:
        return new fb_component_1.EntityGroupFailureArbitraryState();
      case fb_component_1.UnionEntityGroupFailureCondition.EntityGroupFailureSequentialState:
        return new fb_component_1.EntityGroupFailureSequentialState();
      default:
        return;
    }
  }
  static ReadUnionEntityGroupFailureCondition(t, e) {
    if (e !== undefined) {
      switch (t) {
        case fb_component_1.UnionEntityGroupFailureCondition.EntityGroupFailureArbitraryState:
          return FbEntityGroupFailureArbitraryState_1.FbEntityGroupFailureArbitraryState.Create(e);
        case fb_component_1.UnionEntityGroupFailureCondition.EntityGroupFailureSequentialState:
          return FbEntityGroupFailureSequentialState_1.FbEntityGroupFailureSequentialState.Create(e);
        default:
          return;
      }
    }
  }
}
exports.UnionEntityGroupFailureConditionHelper = UnionEntityGroupFailureConditionHelper;
//# sourceMappingURL=UnionEntityGroupFailureConditionHelper.js.map