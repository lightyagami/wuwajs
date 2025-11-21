"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleShipTowerExitHandler = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ConfirmBoxDefine_1 = require("../../../ConfirmBox/ConfirmBoxDefine");
const InstanceDungeonExitHandlerBase_1 = require("./InstanceDungeonExitHandlerBase");
class BattleShipTowerExitHandler extends InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerBase {
  Checker() {
    return ModelManager_1.ModelManager.ShipTowerModel.CheckInBattleShipTower();
  }
  HandleExit(e) {
    var r = new ConfirmBoxDefine_1.ConfirmBoxDataNew(252);
    r.IsEscViewTriggerCallBack = false;
    r.FunctionMap.set(1, () => {
      ModelManager_1.ModelManager.ShipTowerModel?.OpenViewMainFromFight();
      e.CancelBack?.();
    });
    r.FunctionMap.set(2, () => {
      ModelManager_1.ModelManager.ShipTowerModel?.AgainChallenge();
      e.ConfirmBack?.();
    });
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(r);
  }
}
exports.BattleShipTowerExitHandler = BattleShipTowerExitHandler;
//# sourceMappingURL=BattleShipTowerExitHandler.js.map