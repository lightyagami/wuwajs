"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoChangeHighCommand = undefined;
const ChessController_1 = require("../../Activity/ActivityContent/ChessGameplay/ChessController");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDangoChangeHighCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.CommandType = 6;
    this.ukc = undefined;
  }
  Init(e) {
    this.ukc = e;
  }
  async OnExecute() {
    let e = this.ukc.R5n[0].Kz_;
    let s = this.ukc.R5n[0].vJ_;
    for (const t of this.ukc.R5n) {
      if (s < t.vJ_) {
        e = t.Kz_;
        s = t.vJ_;
      }
    }
    ChessController_1.ChessController.ChangeItemToMaxPriorityInPoint(e);
    await ChessController_1.ChessController.ChessItemPerformAsync(e, 1);
  }
  LogInfo() {
    return "RacingBetsDangoChangeHighCommand";
  }
}
exports.RacingBetsDangoChangeHighCommand = RacingBetsDangoChangeHighCommand;
//# sourceMappingURL=RacingBetsDangoChangeHighCommand.js.map