"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoDestinationCommand = undefined;
const ChessController_1 = require("../../Activity/ActivityContent/ChessGameplay/ChessController");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDangoDestinationCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.eyc = 0;
    this.CommandType = 12;
  }
  Init(e) {
    this.eyc = e;
  }
  async OnExecute() {
    await ChessController_1.ChessController.ChessItemPerformAsync(this.eyc, 3);
  }
}
exports.RacingBetsDangoDestinationCommand = RacingBetsDangoDestinationCommand;
//# sourceMappingURL=RacingBetsDangoDestinationCommand.js.map