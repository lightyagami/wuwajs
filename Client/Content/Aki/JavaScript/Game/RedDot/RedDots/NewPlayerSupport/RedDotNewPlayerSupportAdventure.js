"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotNewPlayerSupportAdventure = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ActivityControllerHolder_1 = require("../../../Module/Activity/ActivityControllerHolder");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotNewPlayerSupportAdventure extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RecallActivityInfoUpdate];
  }
  OnCheck(e) {
    var t = ActivityControllerHolder_1.ActivityControllerHolder.ActivityNewPlayerSupportController?.ActivityData;
    return !!t && t.IsAdventureEntranceRedDot();
  }
}
exports.RedDotNewPlayerSupportAdventure = RedDotNewPlayerSupportAdventure;
//# sourceMappingURL=RedDotNewPlayerSupportAdventure.js.map