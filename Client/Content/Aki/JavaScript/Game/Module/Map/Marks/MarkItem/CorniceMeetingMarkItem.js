"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CorniceMeetingMarkItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ActivityCorniceMeetingController_1 = require("../../../Activity/ActivityContent/CorniceMeeting/ActivityCorniceMeetingController");
const SceneGameplayMarkItem_1 = require("./SceneGameplayMarkItem");
class CorniceMeetingMarkItem extends SceneGameplayMarkItem_1.SceneGameplayMarkItem {
  CheckCanShowView() {
    var e;
    var t = ConfigManager_1.ConfigManager.ActivityCorniceMeetingConfig.GetCorniceMeetingChallengeByMarkId(this.MarkId);
    return t !== undefined && (e = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData()) !== undefined && e.GetIsShow(t.Id);
  }
}
exports.CorniceMeetingMarkItem = CorniceMeetingMarkItem;
//# sourceMappingURL=CorniceMeetingMarkItem.js.map