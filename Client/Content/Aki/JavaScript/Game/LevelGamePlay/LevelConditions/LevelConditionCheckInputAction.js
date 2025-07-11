"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckInputAction = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralDefine_1 = require("../LevelGeneralDefine");
class LevelConditionCheckInputAction extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    if (e.LimitParams.size === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, "配置错误！条件的参数不应该为空", ["inConditionInfo.Id", e.Id]);
      }
      return false;
    }
    var o = e.LimitParams.get("Action");
    var i = Number(e.LimitParams.get("Kind"));
    if (!o || !i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckInputAction}的定义`);
      }
      return false;
    }
    switch (i) {
      case 1:
        if (Object.values(InputMappingsDefine_1.actionMappings).includes(o)) {
          return o === ControllerHolder_1.ControllerHolder.InputDistributeController.GetCurrentActionName();
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的Kind配了${i}(操作映射)，但${o}不是操作映射`);
          }
          return false;
        }
      case 2:
        if (Object.values(InputMappingsDefine_1.axisMappings).includes(o)) {
          return o === ControllerHolder_1.ControllerHolder.InputDistributeController.GetCurrentAxisName();
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的Kind配了${i}(轴映射)，但${o}用不是轴映射`);
          }
          return false;
        }
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelCondition", 16, `配置错误！条件${e.Id}的Kind参数不符合条件类型${LevelGeneralDefine_1.ELevelGeneralCondition.CheckInputAction}的定义`);
        }
        return false;
    }
  }
}
exports.LevelConditionCheckInputAction = LevelConditionCheckInputAction;
//# sourceMappingURL=LevelConditionCheckInputAction.js.map