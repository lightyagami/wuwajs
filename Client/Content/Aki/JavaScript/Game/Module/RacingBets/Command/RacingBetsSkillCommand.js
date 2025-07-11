"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsSkillCommand = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const UiManager_1 = require("../../../Ui/UiManager");
const ChessController_1 = require("../../Activity/ActivityContent/ChessGameplay/ChessController");
const DangoManager_1 = require("../../Dango/DangoLogic/DangoManager");
const RacingBetsCommandBase_1 = require("./RacingBetsCommandBase");
class RacingBetsSkillCommand extends RacingBetsCommandBase_1.RacingBetsCommandBase {
  constructor() {
    super(...arguments);
    this.CommandType = 5;
    this.zFc = undefined;
  }
  Init(e) {
    this.zFc = e;
  }
  async OnExecute() {
    var e = new CustomPromise_1.CustomPromise();
    UiManager_1.UiManager.OpenView("RacingBetsDangoSkillTip", [this.zFc.Kz_, e]);
    if (DangoManager_1.DangoManager.GetDangoData(this.zFc.Kz_).GetSkillEffectConfig()?.TrigggerPerformance !== 2) {
      await ChessController_1.ChessController.ChessItemPerformAsync(this.zFc.Kz_, 2);
    }
    await e.Promise;
  }
  LogInfo() {
    return "RacingBetsSkillCommand";
  }
}
exports.RacingBetsSkillCommand = RacingBetsSkillCommand;
//# sourceMappingURL=RacingBetsSkillCommand.js.map