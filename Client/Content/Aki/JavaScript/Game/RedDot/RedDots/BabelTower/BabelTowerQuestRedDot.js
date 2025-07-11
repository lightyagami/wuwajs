"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BabelTowerQuestRedDot = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const BabelTowerController_1 = require("../../../Module/Activity/ActivityContent/BabelTower/BabelTowerController");
const RedDotBase_1 = require("../../RedDotBase");
class BabelTowerQuestRedDot extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.BabelTowerRefreshQuestState];
  }
  OnCheck(e) {
    var t = BabelTowerController_1.BabelTowerController.GetBabelTowerData();
    return !!t && t.GetQuestAnyRedDot();
  }
}
exports.BabelTowerQuestRedDot = BabelTowerQuestRedDot;
//# sourceMappingURL=BabelTowerQuestRedDot.js.map