"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionTargetGearGroupSuccessConditionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbSuccessConditionCountDownState_1 = require("./FbSuccessConditionCountDownState");
const FbSuccessConditionSameArbitraryState_1 = require("./FbSuccessConditionSameArbitraryState");
const FbSuccessConditionSameSpecificState_1 = require("./FbSuccessConditionSameSpecificState");
const FbSuccessConditionSpecificTargetState_1 = require("./FbSuccessConditionSpecificTargetState");
class UnionTargetGearGroupSuccessConditionHelper {
  static GetUnionTargetGearGroupSuccessConditionObject(e) {
    switch (e) {
      case fb_component_1.UnionTargetGearGroupSuccessCondition.SuccessConditionCountDownState:
        return new fb_component_1.SuccessConditionCountDownState();
      case fb_component_1.UnionTargetGearGroupSuccessCondition.SuccessConditionSameArbitraryState:
        return new fb_component_1.SuccessConditionSameArbitraryState();
      case fb_component_1.UnionTargetGearGroupSuccessCondition.SuccessConditionSameSpecificState:
        return new fb_component_1.SuccessConditionSameSpecificState();
      case fb_component_1.UnionTargetGearGroupSuccessCondition.SuccessConditionSpecificTargetState:
        return new fb_component_1.SuccessConditionSpecificTargetState();
      default:
        return;
    }
  }
  static ReadUnionTargetGearGroupSuccessCondition(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_component_1.UnionTargetGearGroupSuccessCondition.SuccessConditionCountDownState:
          return FbSuccessConditionCountDownState_1.FbSuccessConditionCountDownState.Create(t);
        case fb_component_1.UnionTargetGearGroupSuccessCondition.SuccessConditionSameArbitraryState:
          return FbSuccessConditionSameArbitraryState_1.FbSuccessConditionSameArbitraryState.Create(t);
        case fb_component_1.UnionTargetGearGroupSuccessCondition.SuccessConditionSameSpecificState:
          return FbSuccessConditionSameSpecificState_1.FbSuccessConditionSameSpecificState.Create(t);
        case fb_component_1.UnionTargetGearGroupSuccessCondition.SuccessConditionSpecificTargetState:
          return FbSuccessConditionSpecificTargetState_1.FbSuccessConditionSpecificTargetState.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionTargetGearGroupSuccessConditionHelper = UnionTargetGearGroupSuccessConditionHelper;
//# sourceMappingURL=UnionTargetGearGroupSuccessConditionHelper.js.map