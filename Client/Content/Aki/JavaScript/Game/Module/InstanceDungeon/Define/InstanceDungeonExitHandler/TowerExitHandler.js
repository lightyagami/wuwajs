"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerExitHandler = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiTimeDilation_1 = require("../../../../Ui/Base/UiTimeDilation");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonExitHandlerBase_1 = require("./InstanceDungeonExitHandlerBase");
class TowerExitHandler extends InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerBase {
  Checker() {
    return ModelManager_1.ModelManager.TowerModel.CheckInTower();
  }
  HandleExit(e) {
    var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(133);
    r.IsEscViewTriggerCallBack = false;
    r.FunctionMap.set(1, () => {
      UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag("TowerGuide");
      ControllerHolder_1.ControllerHolder.TowerController.OpenTowerView(true);
      if (e?.CancelBack) {
        e?.CancelBack();
      }
    });
    r.FunctionMap.set(2, () => {
      if (!ModelManager_1.ModelManager.TowerModel.IsWaitTowerSettlement) {
        UiTimeDilation_1.UiTimeDilation.DeleteWaitSetTimeDilationTag("TowerGuide");
        ControllerHolder_1.ControllerHolder.TowerController.ReChallengeTower();
        if (e?.ConfirmBack) {
          e.ConfirmBack();
        }
      }
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
  }
}
exports.TowerExitHandler = TowerExitHandler;
//# sourceMappingURL=TowerExitHandler.js.map