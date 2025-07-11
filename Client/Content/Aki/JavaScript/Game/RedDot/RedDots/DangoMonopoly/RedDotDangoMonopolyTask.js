"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotDangoMonopolyTask = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ActivityDangoMonopolyController_1 = require("../../../Module/Activity/ActivityContent/DangoMonopoly/ActivityDangoMonopolyController");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoMonopolyTask extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "DangoMonopoly";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateDangoMonopolyTask];
  }
  OnCheck() {
    return ActivityDangoMonopolyController_1.ActivityDangoMonopolyController.GetData()?.IsRedDotDiceTask() ?? false;
  }
}
exports.RedDotDangoMonopolyTask = RedDotDangoMonopolyTask;
//# sourceMappingURL=RedDotDangoMonopolyTask.js.map