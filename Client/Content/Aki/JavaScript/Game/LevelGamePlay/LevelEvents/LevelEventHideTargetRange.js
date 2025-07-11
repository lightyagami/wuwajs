"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventHideTargetRange = undefined;
const SimpleNpcController_1 = require("../../NewWorld/Character/SimpleNpc/Logics/SimpleNpcController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventHideTargetRange extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    if (!e) {
      this.FinishExecute(false);
    }
    if (e.IsHideSimpleNpc) {
      SimpleNpcController_1.SimpleNpcController.SetClearOutState(1, true);
    }
    this.FinishExecute(true);
  }
}
exports.LevelEventHideTargetRange = LevelEventHideTargetRange;
//# sourceMappingURL=LevelEventHideTargetRange.js.map