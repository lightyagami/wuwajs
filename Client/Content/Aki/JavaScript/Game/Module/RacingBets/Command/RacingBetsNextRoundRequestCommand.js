"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsNextRoundRequestCommand = void 0;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase"),
  REQUEST_INTERVAL_TIME = 1e3,
  REQUEST_MAX_COUNT = 5;
class RacingBetsNextRoundRequestCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), this.CommandType = 54, this.uat = void 0, this.LOe = 0, this.g11 = 0, this.C11 = 0
  }
  Init(e, t, s) {
    this.LOe = e, this.g11 = t, this.C11 = s
  }
  async OnExecute() {
    this.uat = new CustomPromise_1.CustomPromise;
    for (let e = 0; e <= REQUEST_MAX_COUNT; e++) {
      if (e >= REQUEST_MAX_COUNT) {
        this.uat.SetResult(void 0);
        break
      }
      if (await RacingBetsController_1.RacingBetsController.RacingBetsMatchRoundActionRequestAsync(this.LOe, this.g11, this.C11)) {
        this.uat.SetResult(void 0);
        break
      }
      await TimerSystem_1.TimerSystem.Wait(REQUEST_INTERVAL_TIME)
    }
    await this.uat.Promise, this.uat = void 0
  }
  LogInfo() {
    return "RacingBetsNextRoundRequestCommand"
  }
}
exports.RacingBetsNextRoundRequestCommand = RacingBetsNextRoundRequestCommand;
//# sourceMappingURL=RacingBetsNextRoundRequestCommand.js.map