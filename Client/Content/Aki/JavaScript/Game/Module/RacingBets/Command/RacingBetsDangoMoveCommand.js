"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoMoveCommand = undefined;
const ChessController_1 = require("../../Activity/ActivityContent/ChessGameplay/ChessController");
const RacingBetsDefine_1 = require("../RacingBetsDefine");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDangoMoveCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.CommandType = 3;
    this.dkc = undefined;
  }
  Init(e) {
    this.dkc = e;
  }
  async OnExecute() {
    var e = RacingBetsDefine_1.RACING_BETS_MAP_POINT_COUNT;
    var e = ((this.dkc.SJ_ - 1) % e + e) % e + 1;
    await ChessController_1.ChessController.MoveItemToPointAsync(this.dkc.Kz_, e);
  }
  LogInfo() {
    return "RacingBetsDangoMoveCommand";
  }
}
exports.RacingBetsDangoMoveCommand = RacingBetsDangoMoveCommand;
//# sourceMappingURL=RacingBetsDangoMoveCommand.js.map