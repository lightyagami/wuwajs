"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotDangoMonopolyRound = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ActivityDangoMonopolyController_1 = require("../../../Module/Activity/ActivityContent/DangoMonopoly/ActivityDangoMonopolyController");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoMonopolyRound extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "DangoMonopoly";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateDangoMonopolyRound];
  }
  OnCheck() {
    return ActivityDangoMonopolyController_1.ActivityDangoMonopolyController.GetData()?.IsRoundReward() ?? false;
  }
}
exports.RedDotDangoMonopolyRound = RedDotDangoMonopolyRound;
//# sourceMappingURL=RedDotDangoMonopolyDiceRound.js.map