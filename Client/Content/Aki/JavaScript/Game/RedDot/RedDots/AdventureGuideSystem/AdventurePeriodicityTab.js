"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdventurePeriodicityTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class AdventurePeriodicityTab extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FunctionAdventure";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotAdventurePeriodicityTabUpdate];
  }
  OnCheck() {
    return !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) && ModelManager_1.ModelManager.AdventureGuideModel.CheckRedDotPeriodicityTab();
  }
}
exports.AdventurePeriodicityTab = AdventurePeriodicityTab;
//# sourceMappingURL=AdventurePeriodicityTab.js.map