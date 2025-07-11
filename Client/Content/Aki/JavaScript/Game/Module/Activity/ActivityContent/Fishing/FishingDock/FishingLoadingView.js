"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FishingLoadingView = undefined;
const TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../../../Ui/UiManager");
class FishingLoadingView extends UiViewBase_1.UiViewBase {
  OnStart() {
    const e = this.OpenParam;
    this.UiViewSequence?.AddSequenceFinishEvent("Start", () => {
      if (e) {
        UiManager_1.UiManager.OpenView("FishingDockView", undefined, () => {
          this.CloseMe();
        });
      } else {
        TimerSystem_1.GameplayTimerSystem.Next(() => {
          this.CloseMe();
        });
      }
    });
  }
}
exports.FishingLoadingView = FishingLoadingView;
//# sourceMappingURL=FishingLoadingView.js.map