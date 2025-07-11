"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventSetWuYinQuState = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetWuYinQuState extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, r) {
    if (e) {
      ControllerHolder_1.ControllerHolder.RenderModuleController.SetBattleState(e.WuYinQuName, e.State);
    }
  }
}
exports.LevelEventSetWuYinQuState = LevelEventSetWuYinQuState;
//# sourceMappingURL=LevelEventSetWuYinQuState.js.map