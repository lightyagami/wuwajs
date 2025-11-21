"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoguelikeExitHandler = undefined;
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiManager_1 = require("../../../../Ui/UiManager");
const InstanceDungeonExitHandlerBase_1 = require("./InstanceDungeonExitHandlerBase");
class RoguelikeExitHandler extends InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerBase {
  Checker() {
    return ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() || ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue();
  }
  HandleExit(e) {
    UiManager_1.UiManager.OpenView("RoguelikeExitTips");
  }
}
exports.RoguelikeExitHandler = RoguelikeExitHandler;
//# sourceMappingURL=RoguelikeExitHandler.js.map