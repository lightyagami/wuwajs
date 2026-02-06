"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorFightExitHandler = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const InstanceDungeonExitHandlerBase_1 = require("./InstanceDungeonExitHandlerBase");
class MotorFightExitHandler extends InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerBase {
  Checker() {
    var e;
    return !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() && !(e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(), !(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e))) && e.InstSubType === 44;
  }
  HandleExit(e) {
    UiManager_1.UiManager.OpenView("MotorFightPauseView");
  }
}
exports.MotorFightExitHandler = MotorFightExitHandler;
//# sourceMappingURL=MotorFightExitHandler.js.map