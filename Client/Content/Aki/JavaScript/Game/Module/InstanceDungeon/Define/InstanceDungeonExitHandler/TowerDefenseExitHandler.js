"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefenseExitHandler = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const TowerDefenceController_1 = require("../../../TowerDefence/TowerDefenceController");
const InstanceDungeonExitHandlerBase_1 = require("./InstanceDungeonExitHandlerBase");
class TowerDefenseExitHandler extends InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerBase {
  Checker() {
    return TowerDefenceController_1.TowerDefenseController.CheckInInstanceDungeon();
  }
  HandleExit(e) {
    ControllerHolder_1.ControllerHolder.InstanceDungeonController.OpenNormalInstanceDungeonExitConfirmBox(207, e.ConfirmBack, e.CancelBack, e.IsButton);
  }
}
exports.TowerDefenseExitHandler = TowerDefenseExitHandler;
//# sourceMappingURL=TowerDefenseExitHandler.js.map