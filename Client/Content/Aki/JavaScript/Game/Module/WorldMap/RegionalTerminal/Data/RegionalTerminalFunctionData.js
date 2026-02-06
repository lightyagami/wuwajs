"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalFunctionData = undefined;
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ConditionGroupData_1 = require("../../../Activity/ConditionGroupData");
const RegionalTerminalGameplayData_1 = require("./RegionalTerminalGameplayData");
class RegionalTerminalFunctionData extends RegionalTerminalGameplayData_1.RegionalTerminalGameplayData {
  constructor() {
    super(...arguments);
    this.GNf = () => {
      var a = [];
      const n = ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(this.GameplayId).OpenConditionId;
      var e = ConfigManager_1.ConfigManager.ConditionConfig.GetGroupConditionIds(n);
      for (const n of e) {
        var r;
        var t = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(n);
        let e = -1;
        if (!StringUtils_1.StringUtils.IsEmpty(t.Description)) {
          if (t.AccessId) {
            r = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(t.AccessId);
            e = r.SkipName;
          }
          const o = {
            ConditionId: n,
            ConditionTextId: t.Description,
            IsFinished: ModelManager_1.ModelManager.RegionalTerminalModel.GetFuncIdConditionFinishedState(this.GameplayId, n),
            AccessId: t.AccessId,
            AccessType: e
          };
          a.push(o);
        }
      }
      const o = new ConditionGroupData_1.ConditionGroupData(n, a);
      UiManager_1.UiManager.OpenView("CommonConditionView", o);
    };
  }
  TerminalFunction(e) {
    ControllerHolder_1.ControllerHolder.FunctionController.OpenFunctionRelateView(this.GameplayId);
    e?.(true);
  }
  BarFunction() {
    if (this.GetLockState()) {
      ControllerHolder_1.ControllerHolder.RegionalTerminalController.OpenTerminalOverviewView(this.Id);
    } else {
      this.TerminalFunction();
    }
  }
  GetShowState() {
    return ModelManager_1.ModelManager.FunctionModel.IsShow(this.GameplayId);
  }
  GetRedDotName() {
    if (!this.GetLockState()) {
      return ModelManager_1.ModelManager.FunctionModel.GetFunctionItemRedDotName(this.GameplayId);
    }
  }
  GetRedDotId() {
    return 0;
  }
  GetRedDotState() {
    var e;
    return !this.GetLockState() && !!(e = this.GetRedDotName()) && !!(e = ModelManager_1.ModelManager.RedDotModel.GetRedDot(e)) && !!e.IsRedDotActive();
  }
  GetLockState() {
    return !ModelManager_1.ModelManager.FunctionModel.IsOpen(this.GameplayId);
  }
  GetViewParams() {
    var e = ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(this.GameplayId);
    var a = this.GetLockState();
    return {
      ShowLockPanel: a,
      ShowButton: !a,
      LockClickFunc: this.GNf,
      LockTxtId: e.OpenConditionId > 0 ? LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e.OpenConditionId) ?? "" : "",
      ButtonTxtId: this.GetGameplayConfig().UnlockButtonText
    };
  }
}
exports.RegionalTerminalFunctionData = RegionalTerminalFunctionData;
//# sourceMappingURL=RegionalTerminalFunctionData.js.map