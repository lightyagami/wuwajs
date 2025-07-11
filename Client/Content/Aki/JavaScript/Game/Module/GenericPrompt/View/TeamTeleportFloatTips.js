"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeamTeleportFloatTips = undefined;
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const LguiUtil_1 = require("../../Util/LguiUtil");
const GenericPromptFloatTipsBase_1 = require("./GenericPromptFloatTipsBase");
class TeamTeleportFloatTips extends GenericPromptFloatTipsBase_1.GenericPromptFloatTipsBase {
  OnStart() {
    this.TickDuration = (this.OpenParam.Duration ?? 0) * CommonDefine_1.MILLIONSECOND_PER_SECOND;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.MainText, "TeamTeleport_Tips", TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(this.TickDuration));
  }
  SetMainText() {}
  SetExtraText() {}
  OnTick(e) {
    if (this.TickTime >= this.TickDuration) {
      this.CloseMe();
    } else {
      this.TickTime += e;
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.MainText, "TeamTeleport_Tips", TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(this.TickDuration - this.TickTime));
    }
  }
}
exports.TeamTeleportFloatTips = TeamTeleportFloatTips;
//# sourceMappingURL=TeamTeleportFloatTips.js.map