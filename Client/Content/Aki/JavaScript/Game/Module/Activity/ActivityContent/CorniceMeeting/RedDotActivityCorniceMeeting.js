"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotActivityCorniceMeeting = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const RedDotBase_1 = require("../../../../RedDot/RedDotBase");
const ActivityCorniceMeetingController_1 = require("./ActivityCorniceMeetingController");
class RedDotActivityCorniceMeeting extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshCorniceMeetingRedDot];
  }
  OnCheck(e) {
    var t = ActivityCorniceMeetingController_1.ActivityCorniceMeetingController.GetCurrentActivityData();
    return !!t && !!(t = t.GetLevelEntryData(e)) && t.GetRedDot();
  }
}
exports.RedDotActivityCorniceMeeting = RedDotActivityCorniceMeeting;
//# sourceMappingURL=RedDotActivityCorniceMeeting.js.map