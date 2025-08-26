"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotAdventureNewSoundAreaGeneral = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotAdventureNewSoundAreaGeneral extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "AdventureNewSoundAreaTab";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.CrossDay, EventDefine_1.EEventName.RedDotNewSoundAreaTabUpdate];
  }
  OnCheck(e) {
    return !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) && ModelManager_1.ModelManager.AdventureGuideModel.CheckRedDotAdventureNewSoundAreaTab();
  }
}
exports.RedDotAdventureNewSoundAreaGeneral = RedDotAdventureNewSoundAreaGeneral;
//# sourceMappingURL=RedDotAdventureNewSoundAreaGeneral.js.map