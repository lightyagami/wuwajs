"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleBabelTowerExitHandler = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const BabelTowerController_1 = require("../../../Activity/ActivityContent/BabelTower/BabelTowerController");
const InstanceDungeonExitHandlerBase_1 = require("./InstanceDungeonExitHandlerBase");
class BattleBabelTowerExitHandler extends InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerBase {
  Checker() {
    return ModelManager_1.ModelManager.BabelTowerModel.CheckInBattleBabelTower();
  }
  HandleExit(e) {
    BabelTowerController_1.BabelTowerController.OnClickInstanceDungeonExitButton();
  }
}
exports.BattleBabelTowerExitHandler = BattleBabelTowerExitHandler;
//# sourceMappingURL=BattleBabelTowerExitHandler.js.map