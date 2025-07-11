"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotAdventureNewSoundAreaTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotAdventureNewSoundAreaTab extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FunctionAdventure";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.CrossDay, EventDefine_1.EEventName.RedDotNewSoundAreaTabUpdate];
  }
  OnCheck(e) {
    return !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) && ModelManager_1.ModelManager.AdventureGuideModel.CheckRedDotAdventureNewSoundAreaTab();
  }
}
exports.RedDotAdventureNewSoundAreaTab = RedDotAdventureNewSoundAreaTab;
//# sourceMappingURL=RedDotAdventureNewSoundAreaTab.js.map