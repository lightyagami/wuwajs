"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionTargetGearGroupFailureConditionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbFailureConditionArbitraryState_1 = require("./FbFailureConditionArbitraryState");
const FbFailureConditionHitTargetEntity_1 = require("./FbFailureConditionHitTargetEntity");
const FbFailureConditionSequentialState_1 = require("./FbFailureConditionSequentialState");
class UnionTargetGearGroupFailureConditionHelper {
  static GetUnionTargetGearGroupFailureConditionObject(e) {
    switch (e) {
      case fb_component_1.UnionTargetGearGroupFailureCondition.FailureConditionArbitraryState:
        return new fb_component_1.FailureConditionArbitraryState();
      case fb_component_1.UnionTargetGearGroupFailureCondition.FailureConditionHitTargetEntity:
        return new fb_component_1.FailureConditionHitTargetEntity();
      case fb_component_1.UnionTargetGearGroupFailureCondition.FailureConditionSequentialState:
        return new fb_component_1.FailureConditionSequentialState();
      default:
        return;
    }
  }
  static ReadUnionTargetGearGroupFailureCondition(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_component_1.UnionTargetGearGroupFailureCondition.FailureConditionArbitraryState:
          return FbFailureConditionArbitraryState_1.FbFailureConditionArbitraryState.Create(t);
        case fb_component_1.UnionTargetGearGroupFailureCondition.FailureConditionHitTargetEntity:
          return FbFailureConditionHitTargetEntity_1.FbFailureConditionHitTargetEntity.Create(t);
        case fb_component_1.UnionTargetGearGroupFailureCondition.FailureConditionSequentialState:
          return FbFailureConditionSequentialState_1.FbFailureConditionSequentialState.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionTargetGearGroupFailureConditionHelper = UnionTargetGearGroupFailureConditionHelper;
//# sourceMappingURL=UnionTargetGearGroupFailureConditionHelper.js.map