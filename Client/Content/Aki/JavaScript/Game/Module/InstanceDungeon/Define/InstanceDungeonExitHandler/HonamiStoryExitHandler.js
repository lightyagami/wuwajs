"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryExitHandler = undefined;
const HonamiStoryController_1 = require("../../../HonamiStory/HonamiStoryController");
const HonamiStoryUtil_1 = require("../../../HonamiStory/HonamiStoryUtil");
const InstanceDungeonExitHandlerBase_1 = require("./InstanceDungeonExitHandlerBase");
class HonamiStoryExitHandler extends InstanceDungeonExitHandlerBase_1.InstanceDungeonExitHandlerBase {
  Checker() {
    return HonamiStoryUtil_1.HonamiStoryUtil.CheckInHonamiStoryDungeon();
  }
  HandleExit(e) {
    HonamiStoryController_1.HonamiStoryController.TryHonamiStoryInstLeave();
  }
}
exports.HonamiStoryExitHandler = HonamiStoryExitHandler;
//# sourceMappingURL=HonamiStoryExitHandler.js.map