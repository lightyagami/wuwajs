"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.RacingBetsSkillCommand = void 0;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  UiManager_1 = require("../../../Ui/UiManager"),
  ChessController_1 = require("../../Activity/ActivityContent/ChessGameplay/ChessController"),
  DangoManager_1 = require("../../Dango/DangoLogic/DangoManager"),
  RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsSkillCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments), this.CommandType = 5, this.zFc = void 0
  }
  Init(e) {
    this.zFc = e
  }
  async OnExecute() {
    var e = new CustomPromise_1.CustomPromise;
    UiManager_1.UiManager.OpenView("RacingBetsDangoSkillTip", [this.zFc.Kz_, e]), 2 !== DangoManager_1.DangoManager.GetDangoData(this.zFc.Kz_).GetSkillEffectConfig()?.TrigggerPerformance && await ChessController_1.ChessController.ChessItemPerformAsync(this.zFc.Kz_, 2), await e.Promise
  }
  LogInfo() {
    return "RacingBetsSkillCommand"
  }
}
exports.RacingBetsSkillCommand = RacingBetsSkillCommand;
//# sourceMappingURL=RacingBetsSkillCommand.js.map