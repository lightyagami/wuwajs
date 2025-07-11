"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsDungeonBeginTip = undefined;
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
class RacingBetsDungeonBeginTip extends UiViewBase_1.UiViewBase {
  OnAfterPlayStartSequence() {
    TimerSystem_1.TimerSystem.Next(() => {
      var e = this.OpenParam;
      this.CloseMe();
      e.SetResult(undefined);
    });
  }
}
exports.RacingBetsDungeonBeginTip = RacingBetsDungeonBeginTip;
//# sourceMappingURL=RacingBetsDungeonBeginTip.js.map