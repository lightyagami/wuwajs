"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsRoundStartCommand = undefined;
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsRoundStartCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.CommandType = 8;
  }
  LogInfo() {
    return "RacingBetsRoundStartCommand";
  }
}
exports.RacingBetsRoundStartCommand = RacingBetsRoundStartCommand;
//# sourceMappingURL=RacingBetsRoundStartCommand.js.map