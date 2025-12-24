"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JumpInputActionLogic = undefined;
const InputActionLogicBase_1 = require("./InputActionLogicBase");
class JumpInputActionLogic extends InputActionLogicBase_1.InputActionLogicBase {
  IsAllowReleaseInput(t) {
    return t !== 3;
  }
}
exports.JumpInputActionLogic = JumpInputActionLogic;
//# sourceMappingURL=JumpInputActionLogic.js.map