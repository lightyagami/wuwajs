"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionDisableAlertConditionHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbDisableAlertAreaDungeonCondition_1 = require("./FbDisableAlertAreaDungeonCondition");
const FbDisableAlertAreaQuestCondition_1 = require("./FbDisableAlertAreaQuestCondition");
class UnionDisableAlertConditionHelper {
  static GetUnionDisableAlertConditionObject(e) {
    switch (e) {
      case fb_action_1.UnionDisableAlertCondition.DisableAlertAreaDungeonCondition:
        return new fb_action_1.DisableAlertAreaDungeonCondition();
      case fb_action_1.UnionDisableAlertCondition.DisableAlertAreaQuestCondition:
        return new fb_action_1.DisableAlertAreaQuestCondition();
      default:
        return;
    }
  }
  static ReadUnionDisableAlertCondition(e, t) {
    if (t !== undefined) {
      switch (e) {
        case fb_action_1.UnionDisableAlertCondition.DisableAlertAreaDungeonCondition:
          return FbDisableAlertAreaDungeonCondition_1.FbDisableAlertAreaDungeonCondition.Create(t);
        case fb_action_1.UnionDisableAlertCondition.DisableAlertAreaQuestCondition:
          return FbDisableAlertAreaQuestCondition_1.FbDisableAlertAreaQuestCondition.Create(t);
        default:
          return;
      }
    }
  }
}
exports.UnionDisableAlertConditionHelper = UnionDisableAlertConditionHelper;
//# sourceMappingURL=UnionDisableAlertConditionHelper.js.map