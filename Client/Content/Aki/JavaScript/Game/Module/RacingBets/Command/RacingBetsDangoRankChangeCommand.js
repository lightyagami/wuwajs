"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDangoRankChangeCommand = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsDangoRankChangeCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.CommandType = 13;
    this.dT1 = [];
  }
  Init(e) {
    this.dT1 = e;
  }
  async OnExecute() {
    var e;
    if (ModelManager_1.ModelManager.RacingBetsModel.RefreshBetsDangoRankInfo(this.dT1)) {
      e = new CustomPromise_1.CustomPromise();
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsDungeonDangoRankChange, e);
      await e.Promise;
    }
  }
  LogInfo() {
    return "RacingBetsDangoRankChangeCommand";
  }
}
exports.RacingBetsDangoRankChangeCommand = RacingBetsDangoRankChangeCommand;
//# sourceMappingURL=RacingBetsDangoRankChangeCommand.js.map