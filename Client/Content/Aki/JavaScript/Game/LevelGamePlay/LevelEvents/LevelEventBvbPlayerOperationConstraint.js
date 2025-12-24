"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventBvbPlayerOperationConstraint = undefined;
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventBvbPlayerOperationConstraint extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    var t;
    if (e && (t = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView"))) {
      (t = t.OpenParam).GuideManager.RegisterGuideInterface(this);
      t.GuideManager.RegisterBehaviorTreeGuideData(e);
    }
  }
  FinishCurrentGuide() {
    this.FinishExecute(true);
  }
  ExitCurrentGuide() {
    this.FinishExecute(false);
  }
}
exports.LevelEventBvbPlayerOperationConstraint = LevelEventBvbPlayerOperationConstraint;
//# sourceMappingURL=LevelEventBvbPlayerOperationConstraint.js.map