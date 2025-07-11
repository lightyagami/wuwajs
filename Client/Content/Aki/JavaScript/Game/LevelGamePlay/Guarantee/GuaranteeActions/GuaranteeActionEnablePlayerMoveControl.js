"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuaranteeActionEnablePlayerMoveControl = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GuaranteeActionBase_1 = require("./GuaranteeActionBase");
class GuaranteeActionEnablePlayerMoveControl extends GuaranteeActionBase_1.GuaranteeActionBase {
  OnExecute(e) {
    ControllerHolder_1.ControllerHolder.InputController.SetMoveControlEnabled(true, true, true, true);
  }
}
exports.GuaranteeActionEnablePlayerMoveControl = GuaranteeActionEnablePlayerMoveControl;
//# sourceMappingURL=GuaranteeActionEnablePlayerMoveControl.js.map