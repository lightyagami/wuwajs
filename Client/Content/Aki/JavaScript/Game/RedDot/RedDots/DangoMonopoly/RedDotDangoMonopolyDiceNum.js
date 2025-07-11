"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotDangoMonopolyDiceNum = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ActivityDangoMonopolyController_1 = require("../../../Module/Activity/ActivityContent/DangoMonopoly/ActivityDangoMonopolyController");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoMonopolyDiceNum extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "DangoMonopoly";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateDangoMonopolyNum];
  }
  OnCheck() {
    return ActivityDangoMonopolyController_1.ActivityDangoMonopolyController.GetData()?.IsCanUseDice() ?? false;
  }
}
exports.RedDotDangoMonopolyDiceNum = RedDotDangoMonopolyDiceNum;
//# sourceMappingURL=RedDotDangoMonopolyDiceNum.js.map