"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LongPressButton = undefined;
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const SECOND_0_1 = 100;
class LongPressButton {
  constructor(s, t, e = SECOND_0_1) {
    this.IRe = undefined;
    this.e0t = undefined;
    this.jGo = () => {
      TimerSystem_1.GameplayTimerSystem.Resume(this.IRe);
    };
    this.K7t = () => {
      if (!TimerSystem_1.GameplayTimerSystem.IsPause(this.IRe)) {
        TimerSystem_1.GameplayTimerSystem.Pause(this.IRe);
      }
    };
    s.OnPointDownCallBack.Bind(this.jGo);
    s.OnPointUpCallBack.Bind(this.K7t);
    s.OnPointExitCallBack.Bind(this.K7t);
    this.e0t = s;
    this.IRe = TimerSystem_1.GameplayTimerSystem.Forever(t, e);
    TimerSystem_1.GameplayTimerSystem.Pause(this.IRe);
  }
  OnDestroy() {
    this.e0t.OnPointDownCallBack.Unbind();
    this.e0t.OnPointUpCallBack.Unbind();
    TimerSystem_1.GameplayTimerSystem.Remove(this.IRe);
  }
}
exports.LongPressButton = LongPressButton;
//# sourceMappingURL=LongPressButton.js.map