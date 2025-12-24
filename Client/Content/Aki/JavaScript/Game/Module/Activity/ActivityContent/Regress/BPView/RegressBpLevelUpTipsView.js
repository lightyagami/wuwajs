"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegressBpLevelUpTipsView = undefined;
const UE = require("ue");
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
class RegressBpLevelUpTipsView extends UiViewBase_1.UiViewBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIText], [1, UE.UIText], [2, UE.UIItem], [3, UE.UIText]];
  }
  OnStart() {
    var e = this.OpenParam;
    if (e === undefined || e.PrevLevel === undefined) {
      this.GetItem(2)?.SetUIActive(false);
      this.GetText(3)?.SetUIActive(true);
    } else {
      this.GetItem(2)?.SetUIActive(true);
      this.GetText(3)?.SetUIActive(false);
      this.GetText(0)?.SetText(e.PrevLevel?.toString() ?? "");
      this.GetText(1)?.SetText(e.CurLevel?.toString() ?? "");
    }
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      this.CloseMe();
    }, 2000);
  }
}
exports.RegressBpLevelUpTipsView = RegressBpLevelUpTipsView;
//# sourceMappingURL=RegressBpLevelUpTipsView.js.map