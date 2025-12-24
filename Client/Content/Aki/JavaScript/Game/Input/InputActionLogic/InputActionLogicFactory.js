"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InputActionLogicFactory = undefined;
const InputEnums_1 = require("../InputEnums");
const DodgeInputActionLogic_1 = require("./DodgeInputActionLogic");
const JumpInputActionLogic_1 = require("./JumpInputActionLogic");
class InputActionLogicFactory {
  static Initialize() {
    InputActionLogicFactory.Aeg.set(InputEnums_1.EInputAction.跳跃, new JumpInputActionLogic_1.JumpInputActionLogic());
    InputActionLogicFactory.Aeg.set(InputEnums_1.EInputAction.闪避, new DodgeInputActionLogic_1.DodgeInputActionLogic());
  }
  static GetInputActionLogic(t) {
    return InputActionLogicFactory.Aeg.get(t);
  }
}
(exports.InputActionLogicFactory = InputActionLogicFactory).Aeg = new Map();
//# sourceMappingURL=InputActionLogicFactory.js.map