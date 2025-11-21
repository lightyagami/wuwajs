"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsRogueCommandResultSettle = undefined;
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiLayer_1 = require("../../../Ui/UiLayer");
const SurvivorsRogueCommandBase_1 = require("./SurvivorsRogueCommandBase");
const TIME_DEATH_DELAY = 3000;
class SurvivorsRogueCommandResultSettle extends SurvivorsRogueCommandBase_1.SurvivorsRogueCommandBase {
  constructor() {
    super(...arguments);
    this.StepSize = 1;
  }
  ToString() {
    return "[Settle] Reason: " + this.GetViewInfo()?.x9n;
  }
  OnUpdate() {}
  Back2Fore() {}
  Fore2Back() {}
  OnStartExecute() {
    var e;
    if (this.GetViewInfo()?.x9n === 1) {
      e = CommonParamById_1.configCommonParamById.GetIntConfig("SurvivorsDeathDelaySettleTime") ?? TIME_DEATH_DELAY;
      UiLayer_1.UiLayer.SetShowMaskLayer("SurvivorsRogueSettleView.DelayOpen", true);
      TimerSystem_1.TimerSystem.Delay(() => {
        this.OpenView("SurvivorsRogueSettleView", false);
        UiLayer_1.UiLayer.SetShowMaskLayer("SurvivorsRogueSettleView.DelayOpen", false);
      }, e);
    } else {
      this.OpenView("SurvivorsRogueSettleView", false);
    }
  }
  OnExecute() {}
  OnFinish() {}
  OnDelete() {}
  GetViewInfo() {
    return this.Data.KTd;
  }
}
exports.SurvivorsRogueCommandResultSettle = SurvivorsRogueCommandResultSettle;
//# sourceMappingURL=SurvivorsRogueCommandResultSettle.js.map