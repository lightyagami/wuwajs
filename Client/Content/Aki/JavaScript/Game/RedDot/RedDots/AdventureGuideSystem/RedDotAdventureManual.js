"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotAdventureManual = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotAdventureManual extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "FunctionAdventure";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotAdventureManualUpdate, EventDefine_1.EEventName.RedDotSilentFirstAward];
  }
  OnCheck(e) {
    return !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10023) && ControllerHolder_1.ControllerHolder.AdventureGuideController.CheckCanGetTaskAward();
  }
}
exports.RedDotAdventureManual = RedDotAdventureManual;
//# sourceMappingURL=RedDotAdventureManual.js.map