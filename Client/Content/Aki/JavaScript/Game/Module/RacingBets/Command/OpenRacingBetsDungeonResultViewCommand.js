"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OpenRacingBetsDungeonResultViewCommand = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const UiManager_1 = require("../../../Ui/UiManager");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class OpenRacingBetsDungeonResultViewCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.CommandType = 53;
    this.Kxc = undefined;
  }
  Init(e) {
    this.Kxc = e;
  }
  async OnExecute() {
    var e = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.OpenView("RacingBetsDungeonResultView", [this.Kxc, e]);
    await e.Promise;
  }
  LogInfo() {
    return "RacingBetsDungeonResultView";
  }
}
exports.OpenRacingBetsDungeonResultViewCommand = OpenRacingBetsDungeonResultViewCommand;
//# sourceMappingURL=OpenRacingBetsDungeonResultViewCommand.js.map