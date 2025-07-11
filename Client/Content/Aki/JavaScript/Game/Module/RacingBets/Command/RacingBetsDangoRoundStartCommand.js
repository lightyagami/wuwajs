"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoRoundStartCommand = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDangoRoundStartCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.CommandType = 1;
    this.eyc = 0;
  }
  Init(e) {
    this.eyc = e;
  }
  OnActive() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsDangoRoundStart, this.eyc);
  }
  LogInfo() {
    return "RacingBetsDangoRoundStartCommand";
  }
}
exports.RacingBetsDangoRoundStartCommand = RacingBetsDangoRoundStartCommand;
//# sourceMappingURL=RacingBetsDangoRoundStartCommand.js.map