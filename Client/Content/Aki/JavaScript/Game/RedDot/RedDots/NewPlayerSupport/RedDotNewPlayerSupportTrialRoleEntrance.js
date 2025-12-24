"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotNewPlayerSupportTrialRoleEntrance = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ActivityControllerHolder_1 = require("../../../Module/Activity/ActivityControllerHolder");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotNewPlayerSupportTrialRoleEntrance extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.CurWorldLevelChange, EventDefine_1.EEventName.OnActivityNewPlayerSupportEntranceRedDotUpdate, EventDefine_1.EEventName.OnGroupTrialRoleChanged];
  }
  OnCheck(e) {
    var t = ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController?.ActivityData;
    return !!t && (t.IsTrialRoleUpgradeRedPoint() || t.IsTrialRoleEntranceRedDot());
  }
}
exports.RedDotNewPlayerSupportTrialRoleEntrance = RedDotNewPlayerSupportTrialRoleEntrance;
//# sourceMappingURL=RedDotNewPlayerSupportTrialRoleEntrance.js.map