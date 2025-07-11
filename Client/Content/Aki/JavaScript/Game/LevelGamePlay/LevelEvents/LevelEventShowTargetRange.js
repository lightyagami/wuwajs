"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventShowTargetRange = undefined;
const SimpleNpcController_1 = require("../../NewWorld/Character/SimpleNpc/Logics/SimpleNpcController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventShowTargetRange extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, l) {
    if (!e) {
      this.FinishExecute(false);
    }
    SimpleNpcController_1.SimpleNpcController.SetClearOutState(1, false);
    this.FinishExecute(true);
  }
}
exports.LevelEventShowTargetRange = LevelEventShowTargetRange;
//# sourceMappingURL=LevelEventShowTargetRange.js.map