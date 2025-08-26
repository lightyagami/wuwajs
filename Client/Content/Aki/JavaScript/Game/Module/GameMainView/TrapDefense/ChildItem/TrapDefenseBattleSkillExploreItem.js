"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseBattleSkillExploreItem = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const BattleSkillExploreItem_1 = require("../../../BattleUi/Views/BattleSkillExploreItem");
const TrapDefenseRouletteMainViewProxy_1 = require("../../../Roulette/ViewProxy/TrapDefenseRouletteMainViewProxy");
class TrapDefenseBattleSkillExploreItem extends BattleSkillExploreItem_1.BattleSkillExploreItem {
  OpenRouletteMainView(e) {
    var l = new TrapDefenseRouletteMainViewProxy_1.TrapDefenseRouletteMainViewProxy();
    l.TouchId = e;
    ControllerHolder_1.ControllerHolder.RouletteController.OpenRouletteMainView(l);
  }
}
exports.TrapDefenseBattleSkillExploreItem = TrapDefenseBattleSkillExploreItem;
//# sourceMappingURL=TrapDefenseBattleSkillExploreItem.js.map