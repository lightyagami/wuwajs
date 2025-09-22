"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueExitHandler = undefined;
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
const InstanceDungeonExitHandlerBase_1 = require("./InstanceDungeonExitHandlerBase");
class MapRogueExitHandler extends InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerBase {
  Checker() {
    return ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance();
  }
  HandleExit(e) {
    ControllerHolder_1.ControllerHolder.MapRogueController.OpenExploreEnd(true);
  }
}
exports.MapRogueExitHandler = MapRogueExitHandler;
//# sourceMappingURL=MapRogueExitHandler.js.map