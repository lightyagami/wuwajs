"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongPressWithProgressComponent = undefined;
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class LongPressWithProgressComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments);
    this.gct = undefined;
    this.ikf = () => {
      var e = this.OnGetProgress();
      if (this.IsPress) {
        if (e >= 1) {
          this.CurComponent?.SetLongPressState(0);
          this.ReleaseWithoutCheck();
          this.rkf();
          return;
        }
      } else if (e <= 0) {
        this.CurComponent?.SetLongPressState(0);
        this.rkf();
        return;
      }
      this.CurComponent?.SetLongPressState(e);
    };
  }
  okf() {
    this.gct ||= TimerSystem_1.GameplayTimerSystem.Forever(this.ikf, TimerSystem_1.MIN_TIME);
  }
  OnPress(e) {
    UiNavigationNewController_1.UiNavigationNewController.SimulationPointDown(e.BindButtonTag);
    this.okf();
  }
  OnRelease(e) {
    UiNavigationNewController_1.UiNavigationNewController.SimulationPointUp(e.BindButtonTag);
  }
  rkf() {
    if (this.gct) {
      TimerSystem_1.GameplayTimerSystem.Remove(this.gct);
      this.gct = undefined;
    }
  }
  OnClear() {
    this.rkf();
  }
  OnGetProgress() {
    return 0;
  }
  GetIsLongPress() {
    return true;
  }
}
exports.LongPressWithProgressComponent = LongPressWithProgressComponent;
//# sourceMappingURL=LongPressWithProgressComponent.js.map