"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventInputDistribute = undefined;
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const LevelEventLockInputState_1 = require("../../../LevelGamePlay/LevelEventLockInputState");
const InputManager_1 = require("../../Input/InputManager");
const InputDistributeDefine_1 = require("../InputDistributeDefine");
const InputDistributeSetup_1 = require("./InputDistributeSetup");
class LevelEventInputDistribute extends InputDistributeSetup_1.InputDistributeSetup {
  OnRefresh() {
    return !!LevelEventLockInputState_1.LevelEventLockInputState.IsLockInput() && (InputManager_1.InputManager.IsAltPress && Info_1.Info.IsInKeyBoard() && LevelEventLockInputState_1.LevelEventLockInputState.IsInputTagHasUiInputRoot ? (Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "[InputDistribute]刷新关卡事件输入Tag时，处于键鼠设备并且通过Alt显示鼠标，设置输入分发Tag为 UiInputRootTag"), this.SetInputDistributeTag(InputDistributeDefine_1.inputDistributeTagDefine.UiInputRootTag)) : (Log_1.Log.CheckInfo() && Log_1.Log.Info("Input", 10, "[InputDistribute]刷新关卡事件输入Tag时", ["输入TAG", LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames]), this.SetInputDistributeTags(LevelEventLockInputState_1.LevelEventLockInputState.InputTagNames)), true);
  }
}
exports.LevelEventInputDistribute = LevelEventInputDistribute;
//# sourceMappingURL=LevelEventInputDistribute.js.map