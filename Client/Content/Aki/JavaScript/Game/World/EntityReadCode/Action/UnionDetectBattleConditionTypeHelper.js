"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionDetectBattleConditionTypeHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbDetectBattleTag_1 = require("./FbDetectBattleTag");
class UnionDetectBattleConditionTypeHelper {
  static GetUnionDetectBattleConditionTypeObject(t) {
    if (t === fb_action_1.UnionDetectBattleConditionType.DetectBattleTag) {
      return new fb_action_1.DetectBattleTag();
    }
  }
  static ReadUnionDetectBattleConditionType(t, e) {
    if (e !== undefined && t === fb_action_1.UnionDetectBattleConditionType.DetectBattleTag) {
      return FbDetectBattleTag_1.FbDetectBattleTag.Create(e);
    } else {
      return undefined;
    }
  }
}
exports.UnionDetectBattleConditionTypeHelper = UnionDetectBattleConditionTypeHelper;
//# sourceMappingURL=UnionDetectBattleConditionTypeHelper.js.map