"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerFloatTipsView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../../Ui/Base/UiViewBase");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const GuessJokerUtils_1 = require("../GuessJokerUtils");
class GuessJokerFloatTipsView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments);
    this.Data = undefined;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText]];
  }
  OnStart() {
    this.Data = this.OpenParam;
    if (this.Data) {
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), this.Data.TextId, ...(this.Data.TextParam ?? []));
      this.UiViewSequence?.AddSequenceFinishEvent("Start", () => {
        TimerSystem_1.TimerSystem.Delay(() => {
          this.CloseMe();
        }, GuessJokerUtils_1.GuessJokerUtils.GetJokerParamConfig("GuessJokerFloatTipTime"));
      });
    }
  }
}
exports.GuessJokerFloatTipsView = GuessJokerFloatTipsView;
//# sourceMappingURL=GuessJokerFloatTipsView.js.map