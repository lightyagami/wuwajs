"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LordInInstanceExitHandler = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonExitHandlerBase_1 = require("./InstanceDungeonExitHandlerBase");
class LordInInstanceExitHandler extends InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerBase {
  Checker() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !(e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), !(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) && (e.InstSubType === 3 || e.InstSubType === 4);
  }
  HandleExit(e) {
    var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(352);
    r.IsEscViewTriggerCallBack = false;
    r.FunctionMap.set(0, e?.CancelBack);
    r.FunctionMap.set(1, () => {
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.RestartInstanceDungeon();
      if (e?.CancelBack) {
        e.CancelBack();
      }
    });
    r.FunctionMap.set(2, () => {
      ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
      if (e?.ConfirmBack) {
        e?.ConfirmBack();
      }
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
  }
}
exports.LordInInstanceExitHandler = LordInInstanceExitHandler;
//# sourceMappingURL=LordInInstanceExitHandler.js.map