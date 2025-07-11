"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventFakePlayerInput = undefined;
const Log_1 = require("../../../Core/Common/Log");
const InputEnums_1 = require("../../Input/InputEnums");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventFakePlayerInput extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.OPt = undefined;
  }
  ExecuteNew(e, n) {
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 31, "[LevelEventFakePlayerInput] 参数配置错误");
      }
    }
    this.OPt = e;
    let t = InputEnums_1.EInputAction.None;
    switch (this.OPt.Input) {
      case 1:
        t = InputEnums_1.EInputAction.跳跃;
        break;
      case 2:
        t = InputEnums_1.EInputAction.攻击;
        break;
      case 3:
        t = InputEnums_1.EInputAction.闪避;
        break;
      case 4:
        t = InputEnums_1.EInputAction.技能1;
        break;
      case 5:
        t = InputEnums_1.EInputAction.幻象1;
        break;
      case 7:
        t = InputEnums_1.EInputAction.幻象2;
        break;
      case 6:
        t = InputEnums_1.EInputAction.大招;
    }
    if (t === InputEnums_1.EInputAction.None) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelEvent", 31, "[LevelEventFakePlayerInput] 未知的输入类型", ["Input", this.OPt.Input]);
      }
    } else {
      ControllerHolder_1.ControllerHolder.InputController.InputAction(t, 1);
      ControllerHolder_1.ControllerHolder.InputController.InputAction(t, 2);
    }
  }
}
exports.LevelEventFakePlayerInput = LevelEventFakePlayerInput;
//# sourceMappingURL=LevelEventFakePlayerInput.js.map