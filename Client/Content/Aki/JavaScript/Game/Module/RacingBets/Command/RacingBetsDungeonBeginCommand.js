"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDungeonBeginCommand = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const UiManager_1 = require("../../../Ui/UiManager");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDungeonBeginCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.CommandType = 7;
  }
  async OnExecute() {
    var e = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.OpenView("RacingBetsDungeonBeginTip", e);
    await e.Promise;
  }
  LogInfo() {
    return "RacingBetsDungeonBeginCommand";
  }
}
exports.RacingBetsDungeonBeginCommand = RacingBetsDungeonBeginCommand;
//# sourceMappingURL=RacingBetsDungeonBeginCommand.js.map