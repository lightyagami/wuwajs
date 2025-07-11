"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenRacingBetsGamePlayPreviewViewCommand = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const UiSceneDangoActorManager_1 = require("../../UiComponent/UiSceneDangoActorManager");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class OpenRacingBetsGamePlayPreviewViewCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.CommandType = 52;
  }
  async OnExecute() {
    await UiManager_1.UiManager.OpenViewAsync("RacingBetsGamePlayPreviewView");
    UiSceneDangoActorManager_1.UiSceneDangoActorManager.SetAllActorVisible(false);
  }
  LogInfo() {
    return "RacingBetsGamePlayPreviewView";
  }
}
exports.OpenRacingBetsGamePlayPreviewViewCommand = OpenRacingBetsGamePlayPreviewViewCommand;
//# sourceMappingURL=OpenRacingBetsGamePlayPreviewViewCommand.js.map