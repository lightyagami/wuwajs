"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerStageFsm = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
const GuessJokerDefine_1 = require("../GuessJokerDefine");
const GuessJokerFsmBase_1 = require("./GuessJokerFsmBase");
const GuessJokerDealCardStage_1 = require("./Stages/GuessJokerDealCardStage");
const GuessJokerFlipCoinStage_1 = require("./Stages/GuessJokerFlipCoinStage");
const GuessJokerGameExitStage_1 = require("./Stages/GuessJokerGameExitStage");
const GuessJokerGameStartStage_1 = require("./Stages/GuessJokerGameStartStage");
const GuessJokerRoundPlayStage_1 = require("./Stages/GuessJokerRoundPlayStage");
const GuessJokerSettleStage_1 = require("./Stages/GuessJokerSettleStage");
class GuessJokerStageFsm extends GuessJokerFsmBase_1.GuessJokerFsmBase {
  InitStateInstance() {
    this.CurrentStateType = 0;
    this.RegisterState(1, new GuessJokerGameStartStage_1.GuessJokerGameStartStage(this));
    this.RegisterState(2, new GuessJokerDealCardStage_1.GuessJokerDealCardStage(this));
    this.RegisterState(3, new GuessJokerFlipCoinStage_1.GuessJokerFlipCoinStage(this));
    this.RegisterState(4, new GuessJokerRoundPlayStage_1.GuessJokerRoundPlayStage(this));
    this.RegisterState(5, new GuessJokerSettleStage_1.GuessJokerSettleStage(this));
    this.RegisterState(6, new GuessJokerGameExitStage_1.GuessJokerGameExitStage(this));
  }
  CheckCanChangeState(e, s) {
    var t = GuessJokerDefine_1.guessJokerCardStageTransitionMap[e];
    return !!t && !!t.includes(s) || (Log_1.Log.CheckError() && Log_1.Log.Error("GuessJokerCard", 78, "GuessJokerStageFsm 检查状态转换失败", ["curStateType", e], ["nextStateType", s]), false);
  }
}
exports.GuessJokerStageFsm = GuessJokerStageFsm;
//# sourceMappingURL=GuessJokerStageFsm.js.map