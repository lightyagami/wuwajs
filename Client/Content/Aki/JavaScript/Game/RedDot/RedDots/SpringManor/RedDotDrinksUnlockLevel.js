"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotDrinksUnlockLevel = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotDrinksUnlockLevel extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnDrinksUnlockClickedNotify, EventDefine_1.EEventName.SpringManorFunctionOpenNotify];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.DrinksModel.CheckRedDot();
  }
  OnGetParentName() {
    return "SpringManorGameEntrance";
  }
}
exports.RedDotDrinksUnlockLevel = RedDotDrinksUnlockLevel;
//# sourceMappingURL=RedDotDrinksUnlockLevel.js.map