"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FightPhotoExitHandler = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityControllerHolder_1 = require("../../../Activity/ActivityControllerHolder");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonExitHandlerBase_1 = require("./InstanceDungeonExitHandlerBase");
class FightPhotoExitHandler extends InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerBase {
  Checker() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !(e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), !(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) && e.InstSubType === 42;
  }
  HandleExit(e) {
    var r = ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController.GetActivityData().GetCurrentLevelData().IsFinished ? 395 : 394;
    var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(r);
    r.IsEscViewTriggerCallBack = false;
    r.FunctionMap.set(0, e?.CancelBack);
    r.FunctionMap.set(1, e?.CancelBack);
    r.FunctionMap.set(2, () => {
      ActivityControllerHolder_1.ActivityControllerHolder.FightPhotoController.LeaveInstanceDungeon();
      if (e?.ConfirmBack) {
        e?.ConfirmBack();
      }
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
  }
}
exports.FightPhotoExitHandler = FightPhotoExitHandler;
//# sourceMappingURL=FightPhotoExitHandler.js.map