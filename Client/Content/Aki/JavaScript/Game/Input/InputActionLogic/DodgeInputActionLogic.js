"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DodgeInputActionLogic = undefined;
const InputActionLogicBase_1 = require("./InputActionLogicBase");
class DodgeInputActionLogic extends InputActionLogicBase_1.InputActionLogicBase {
  IsAllowReleaseInput(e) {
    return e !== 3;
  }
}
exports.DodgeInputActionLogic = DodgeInputActionLogic;
//# sourceMappingURL=DodgeInputActionLogic.js.map