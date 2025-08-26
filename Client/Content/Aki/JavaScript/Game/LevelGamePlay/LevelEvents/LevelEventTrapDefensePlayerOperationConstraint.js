"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventTrapDefensePlayerOperationConstraint = undefined;
const TrapDefenseBattleGuideManager_1 = require("../../Module/GameMainView/TrapDefense/Guide/TrapDefenseBattleGuideManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventTrapDefensePlayerOperationConstraint extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    if (e) {
      TrapDefenseBattleGuideManager_1.TrapDefenseBattleGuideManager.RegisterBehaviorTreeGuideData(e);
      this.FinishExecute(true);
    }
  }
}
exports.LevelEventTrapDefensePlayerOperationConstraint = LevelEventTrapDefensePlayerOperationConstraint;
//# sourceMappingURL=LevelEventTrapDefensePlayerOperationConstraint.js.map