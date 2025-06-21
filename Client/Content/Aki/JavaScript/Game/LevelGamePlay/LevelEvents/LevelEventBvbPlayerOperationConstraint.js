"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventBvbPlayerOperationConstraint = void 0;
const UiManager_1 = require("../../Ui/UiManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventBvbPlayerOperationConstraint extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    var r;
    e && (r = UiManager_1.UiManager.GetViewByName("PhantomArenaBattleView")) && ((r = r.OpenParam).GuideManager.RegisterGuideInterface(this), r.GuideManager.RegisterBehaviorTreeGuideData(e))
  }
  FinishCurrentGuide() {
    this.FinishExecute(!0)
  }
}
exports.LevelEventBvbPlayerOperationConstraint = LevelEventBvbPlayerOperationConstraint;
//# sourceMappingURL=LevelEventBvbPlayerOperationConstraint.js.map