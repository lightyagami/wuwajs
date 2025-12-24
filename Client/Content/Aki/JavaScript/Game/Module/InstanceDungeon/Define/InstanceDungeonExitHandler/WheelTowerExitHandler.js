"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WheelTowerExitHandler = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const ActivityControllerHolder_1 = require("../../../Activity/ActivityControllerHolder");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonExitHandlerBase_1 = require("./InstanceDungeonExitHandlerBase");
class WheelTowerExitHandler extends InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerBase {
  Checker() {
    return ModelManager_1.ModelManager.WheelTowerModel.CheckInInstanceDungeon();
  }
  HandleExit(e) {
    if (UiManager_1.UiManager.IsViewOpen("WheelTowerModeSelectView")) {
      const r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(406);
      r.FunctionMap.set(2, () => {
        ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
    } else {
      const r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(410);
      r.IsEscViewTriggerCallBack = false;
      r.FunctionMap.set(1, () => {
        ActivityControllerHolder_1.ActivityControllerHolder.WheelTowerController.SetBanTimeStop(false);
        var e = ModelManager_1.ModelManager.WheelTowerModel.SelectedRound;
        UiManager_1.UiManager.OpenView("WheelTowerRoundSelectView", e);
      });
      r.FunctionMap.set(2, () => {
        ActivityControllerHolder_1.ActivityControllerHolder.WheelTowerController.RequestSelectedRoundChallenge();
      });
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
    }
  }
}
exports.WheelTowerExitHandler = WheelTowerExitHandler;
//# sourceMappingURL=WheelTowerExitHandler.js.map