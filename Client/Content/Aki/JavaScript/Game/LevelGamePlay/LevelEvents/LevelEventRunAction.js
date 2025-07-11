"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventRunAction = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralContextDefine_1 = require("../LevelGeneralContextDefine");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class LevelEventRunAction extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t) {
    if (e) {
      ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(e.ActionList, LevelGeneralContextDefine_1.GeneralContext.Copy(t), this.IsAsync ? () => {} : e => {
        this.FinishExecute(e === 1);
      });
      if (this.IsAsync) {
        this.FinishExecute(true);
      }
    } else {
      this.FinishExecute(false);
    }
  }
}
exports.LevelEventRunAction = LevelEventRunAction;
//# sourceMappingURL=LevelEventRunAction.js.map