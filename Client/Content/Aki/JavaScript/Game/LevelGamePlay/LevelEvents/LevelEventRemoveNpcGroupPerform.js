"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventRemoveNpcGroupPerform = undefined;
const HoldingHandsController_1 = require("../../Module/HoldHands/HoldingHandsController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventRemoveNpcGroupPerform extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, o) {
    HoldingHandsController_1.HoldingHandsController.RequestReleaseHands(e.Key, "关卡行为");
    this.FinishExecute(true);
  }
}
exports.LevelEventRemoveNpcGroupPerform = LevelEventRemoveNpcGroupPerform;
//# sourceMappingURL=LevelEventRemoveNpcGroupPerform.js.map