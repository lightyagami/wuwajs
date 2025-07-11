"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventBvbPlayerOperationConstraint = undefined;
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventBvbPlayerOperationConstraint extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    var r;
    if (e && (r = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView"))) {
      (r = r.OpenParam).GuideManager.RegisterGuideInterface(this);
      r.GuideManager.RegisterBehaviorTreeGuideData(e);
    }
  }
  FinishCurrentGuide() {
    this.FinishExecute(true);
  }
}
exports.LevelEventBvbPlayerOperationConstraint = LevelEventBvbPlayerOperationConstraint;
//# sourceMappingURL=LevelEventBvbPlayerOperationConstraint.js.map