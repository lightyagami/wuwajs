"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.OpenRacingBetsDungeonResultViewCommand = void 0;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  UiManager_1 = require("../../../Ui/UiManager"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class OpenRacingBetsDungeonResultViewCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), this.CommandType = 53, this.Kxc = void 0
  }
  Init(e) {
    this.Kxc = e
  }
  async OnExecute() {
    var e = new CustomPromise_1.CustomPromise;
    UiManager_1.UiManager.OpenView("RacingBetsDungeonResultView", [this.Kxc, e]), await e.Promise
  }
  LogInfo() {
    return "RacingBetsDungeonResultView"
  }
}
exports.OpenRacingBetsDungeonResultViewCommand = OpenRacingBetsDungeonResultViewCommand;
//# sourceMappingURL=OpenRacingBetsDungeonResultViewCommand.js.map