"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionSpawnMonsterStartConditionHelper = undefined;
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
const FbImmediateStartCondition_1 = require("./FbImmediateStartCondition");
const FbTriggerRangeStartCondition_1 = require("./FbTriggerRangeStartCondition");
class UnionSpawnMonsterStartConditionHelper {
  static GetUnionSpawnMonsterStartConditionObject(t) {
    switch (t) {
      case fb_component_1.UnionSpawnMonsterStartCondition.ImmediateStartCondition:
        return new fb_component_1.ImmediateStartCondition();
      case fb_component_1.UnionSpawnMonsterStartCondition.TriggerRangeStartCondition:
        return new fb_component_1.TriggerRangeStartCondition();
      default:
        return;
    }
  }
  static ReadUnionSpawnMonsterStartCondition(t, n) {
    if (n !== undefined) {
      switch (t) {
        case fb_component_1.UnionSpawnMonsterStartCondition.ImmediateStartCondition:
          return FbImmediateStartCondition_1.FbImmediateStartCondition.Create(n);
        case fb_component_1.UnionSpawnMonsterStartCondition.TriggerRangeStartCondition:
          return FbTriggerRangeStartCondition_1.FbTriggerRangeStartCondition.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionSpawnMonsterStartConditionHelper = UnionSpawnMonsterStartConditionHelper;
//# sourceMappingURL=UnionSpawnMonsterStartConditionHelper.js.map