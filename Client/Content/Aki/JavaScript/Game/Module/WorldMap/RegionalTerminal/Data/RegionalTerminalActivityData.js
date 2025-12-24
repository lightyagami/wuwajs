"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalActivityData = undefined;
const LevelGeneralCommons_1 = require("../../../../LevelGamePlay/LevelGeneralCommons");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RegionalTerminalGameplayData_1 = require("./RegionalTerminalGameplayData");
class RegionalTerminalActivityData extends RegionalTerminalGameplayData_1.RegionalTerminalGameplayData {
  get b4c() {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(this.GameplayId);
  }
  TerminalFunction(e) {
    if (this.b4c && this.GetShowState()) {
      if (this.b4c.CanPreOpen() && !this.b4c.IsUnLock()) {
        ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(this.b4c.Id);
      } else {
        ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityContentView(this.b4c);
      }
      e?.(true);
    } else {
      e?.(false);
    }
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
    return ModelManager_1.ModelManager.ActivityModel.IsActivityOpen(this.GameplayId);
  }
  GetRedDotName() {
    if (!this.GetLockState()) {
      return this.b4c?.GetExternalButtonRedPointName() ?? undefined;
    }
  }
  GetRedDotId() {
    return this.b4c?.GetExternalButtonRedPointId() ?? 0;
  }
  GetRedDotState() {
    return !this.GetLockState() && (this.b4c?.GetExternalButtonRedPointState() ?? false);
  }
  GetLockState() {
    return !this.GetShowState() || !this.b4c?.IsUnLock();
  }
  GetViewParams() {
    var e = this.GetLockState();
    var t = this.b4c.CanPreOpen() && e;
    var e = !t && e;
    let r = 0;
    if (this.b4c.HasPreOpenCondition()) {
      if (!t) {
        r = this.b4c.PreOpenConditionGroupId;
      }
    } else {
      r = this.b4c.ConditionGroupId;
    }
    return {
      ShowLockPanel: e,
      ShowButton: !e,
      LockClickFunc: () => {
        ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityConditionView(this.b4c.Id);
      },
      LockTxtId: r > 0 ? LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(r) ?? "" : "",
      ButtonTxtId: t ? "Terminal_Area_UnlockInAdvance" : this.GetGameplayConfig().UnlockButtonText
    };
  }
}
exports.RegionalTerminalActivityData = RegionalTerminalActivityData;
//# sourceMappingURL=RegionalTerminalActivityData.js.map