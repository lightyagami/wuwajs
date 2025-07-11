"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckUIState = undefined;
const Log_1 = require("../../../Core/Common/Log");
const UiManager_1 = require("../../Ui/UiManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckUIState extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var a = e.LimitParams.get("UIName");
    var n = Number(e.LimitParams.get("UIState"));
    if (!a || isNaN(n)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckUIState}的定义`);
      }
      return false;
    } else if (n) {
      return UiManager_1.UiManager.IsViewShow(a);
    } else {
      return !UiManager_1.UiManager.IsViewShow(a);
    }
  }
}
exports.LevelConditionCheckUIState = LevelConditionCheckUIState;
//# sourceMappingURL=LevelConditionCheckUIState.js.map