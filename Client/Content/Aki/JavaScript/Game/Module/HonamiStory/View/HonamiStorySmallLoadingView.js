"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStorySmallLoadingView = undefined;
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
class HonamiStorySmallLoadingView extends UiViewBase_1.UiViewBase {
  OnStart() {
    const e = this.OpenParam !== undefined;
    let i = undefined;
    this.UiViewSequence?.AddSequenceFinishEvent("Start", () => {
      if (e) {
        UiManager_1.UiManager.OpenViewAsync("HonamiStoryMainView", this.OpenParam).then(e => {
          if (e) {
            i = e;
          }
          this.CloseMe();
        });
      } else {
        TimerSystem_1.GameplayTimerSystem.Next(() => {
          this.CloseMe();
        });
      }
    });
    this.UiViewSequence?.AddSequenceFinishEvent("Close", () => {
      var e;
      if (i && (e = UiManager_1.UiManager.GetView(i))) {
        e.RefreshSpecialButtonsStates();
      }
    });
  }
}
exports.HonamiStorySmallLoadingView = HonamiStorySmallLoadingView;
//# sourceMappingURL=HonamiStorySmallLoadingView.js.map