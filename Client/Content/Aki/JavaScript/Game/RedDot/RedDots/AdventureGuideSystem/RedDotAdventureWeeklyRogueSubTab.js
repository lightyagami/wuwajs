"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotAdventureWeeklyRogueSubTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotAdventureWeeklyRogueSubTab extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "AdventureNewSoundAreaTab";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.WeeklyRogueRedDotInfoRefresh, EventDefine_1.EEventName.ActivityCrossDayRefresh];
  }
  OnCheck(e) {
    return !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) && (ModelManager_1.ModelManager.WeeklyRogueModel.ActivityDataNew?.GetRogueRedDotState() ?? false);
  }
}
exports.RedDotAdventureWeeklyRogueSubTab = RedDotAdventureWeeklyRogueSubTab;
//# sourceMappingURL=RedDotAdventureWeeklyRogueSubTab.js.map