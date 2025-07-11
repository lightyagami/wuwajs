"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckLockEnemyMode = undefined;
const Info_1 = require("../../../Core/Common/Info");
const GameSettingsDefine_1 = require("../../GameSettings/GameSettingsDefine");
const GameSettingsManager_1 = require("../../GameSettings/GameSettingsManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckLockEnemyMode extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = e.LimitParams.get("ModeIndex");
    if (e === undefined) {
      return false;
    }
    var t = parseInt(e);
    var a = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.KeyboardLockEnemyMode);
    var r = GameSettingsManager_1.GameSettingsManager.GetCurrentValue(GameSettingsDefine_1.EFunction.GamepadLockEnemyMode);
    switch (Info_1.Info.InputControllerMainType) {
      case 1:
        return t === a;
      case 2:
        return t === r;
      case 3:
        return t === 0;
      default:
        return false;
    }
  }
}
exports.LevelConditionCheckLockEnemyMode = LevelConditionCheckLockEnemyMode;
//# sourceMappingURL=LevelConditionCheckLockEnemyMode.js.map