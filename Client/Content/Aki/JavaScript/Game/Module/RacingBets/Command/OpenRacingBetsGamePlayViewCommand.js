"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenRacingBetsGamePlayViewCommand = undefined;
const UiManager_1 = require("../../../Ui/UiManager");
const UiSceneDangoActorManager_1 = require("../../UiComponent/UiSceneDangoActorManager");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class OpenRacingBetsGamePlayViewCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.CommandType = 51;
  }
  async OnExecute() {
    await UiManager_1.UiManager.OpenViewAsync("RacingBetsGamePlayView");
    UiSceneDangoActorManager_1.UiSceneDangoActorManager.SetAllActorVisible(false);
  }
  LogInfo() {
    return "OpenRacingBetsGamePlayViewCommand";
  }
}
exports.OpenRacingBetsGamePlayViewCommand = OpenRacingBetsGamePlayViewCommand;
//# sourceMappingURL=OpenRacingBetsGamePlayViewCommand.js.map