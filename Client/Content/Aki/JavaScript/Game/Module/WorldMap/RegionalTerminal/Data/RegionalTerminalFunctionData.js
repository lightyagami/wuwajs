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
    this.XBf = () => {
      var a = [];
      const r = ConfigManager_1.ConfigManager.FunctionConfig.GetFunctionCondition(this.GameplayId).OpenConditionId;
      var e = ConfigManager_1.ConfigManager.ConditionConfig.GetGroupConditionIds(r);
      for (const r of e) {
        var t;
        var n = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(r);
        let e = -1;
        if (!StringUtils_1.StringUtils.IsEmpty(n.Description)) {
          if (n.AccessId) {
            t = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(n.AccessId);
            e = t.SkipName;
          }
          const o = {
            ConditionId: r,
            ConditionTextId: n.Description,
            IsFinished: ModelManager_1.ModelManager.RegionalTerminalModel.GetFuncIdConditionFinishedState(this.GameplayId, r),
            AccessId: n.AccessId,
            AccessType: e
          };
          a.push(o);
        }
      }
      const o = new ConditionGroupData_1.ConditionGroupData(r, a);
      UiManager_1.UiManager.OpenView("CommonConditionView", o);
    };
  }
  TerminalFunction(e) {
    ControllerHolder_1.ControllerHolder.FunctionController.OpenFunctionRelateView(this.GameplayId);
    e?.(true);
  }
  BarFunction() {
    var e;
    if (this.GetLockState()) {
      ControllerHolder_1.ControllerHolder.RegionalTerminalController.OpenTerminalOverviewView(this.Id);
    } else if ((e = this.GetGameplayConfig()).AreaForbiddenTips && !ModelManager_1.ModelManager.RegionalTerminalModel.CheckGameplayAreaAvailable(this.Id)) {
      ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(e.AreaForbiddenTips);
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
      LockClickFunc: this.XBf,
      LockTxtId: e.OpenConditionId > 0 ? LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(e.OpenConditionId) ?? "" : "",
      ButtonTxtId: this.GetGameplayConfig().UnlockButtonText
    };
  }
}
exports.RegionalTerminalFunctionData = RegionalTerminalFunctionData;
//# sourceMappingURL=RegionalTerminalFunctionData.js.map