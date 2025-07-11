"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsNextRoundRequestCommand = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const RacingBetsController_1 = require("../RacingBetsController");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
const REQUEST_INTERVAL_TIME = 1000;
const REQUEST_MAX_COUNT = 5;
class RacingBetsNextRoundRequestCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.CommandType = 54;
    this.uat = undefined;
    this.LOe = 0;
    this.G11 = 0;
    this.F11 = 0;
  }
  Init(e, t, s) {
    this.LOe = e;
    this.G11 = t;
    this.F11 = s;
  }
  async OnExecute() {
    this.uat = new CustomPromise_1.CustomPromise();
    for (let e = 0; e <= REQUEST_MAX_COUNT; e++) {
      if (e >= REQUEST_MAX_COUNT) {
        this.uat.SetResult(undefined);
        break;
      }
      if (await RacingBetsController_1.RacingBetsController.RacingBetsMatchRoundActionRequestAsync(this.LOe, this.G11, this.F11)) {
        this.uat.SetResult(undefined);
        break;
      }
      await TimerSystem_1.TimerSystem.Wait(REQUEST_INTERVAL_TIME);
    }
    await this.uat.Promise;
    this.uat = undefined;
  }
  LogInfo() {
    return "RacingBetsNextRoundRequestCommand";
  }
}
exports.RacingBetsNextRoundRequestCommand = RacingBetsNextRoundRequestCommand;
//# sourceMappingURL=RacingBetsNextRoundRequestCommand.js.map