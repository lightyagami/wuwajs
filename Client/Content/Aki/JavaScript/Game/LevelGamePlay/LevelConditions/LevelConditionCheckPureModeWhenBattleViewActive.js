"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckPureModeWhenBattleViewActive = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckPureModeWhenBattleViewActive extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var r = ModelManager_1.ModelManager.BattleUiModel.PureModeData?.IsOpen ?? false;
    var n = UiManager_1.UiManager.IsViewShow("BattleView");
    return r && n;
  }
}
exports.LevelConditionCheckPureModeWhenBattleViewActive = LevelConditionCheckPureModeWhenBattleViewActive;
//# sourceMappingURL=LevelConditionCheckPureModeWhenBattleViewActive.js.map