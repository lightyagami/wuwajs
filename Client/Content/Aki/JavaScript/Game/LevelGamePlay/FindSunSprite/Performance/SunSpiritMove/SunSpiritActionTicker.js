"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SunSpiritActionTicker = undefined;
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const GameplayActionTicker_1 = require("../../../Common/GameplayAction/GameplayActionTicker");
class SunSpiritActionTicker extends GameplayActionTicker_1.GameplayActionTicker {
  constructor() {
    super(...arguments);
    this.X4f = undefined;
  }
  PushAction(i) {
    super.PushAction(i);
    if (this.ActionList.length > 0 && !this.X4f) {
      this.X4f = TimerSystem_1.TimerSystem.Forever(i => {
        this.TickAction(i);
      }, TimerSystem_1.MIN_TIME);
    }
  }
  TickAction(i) {
    super.TickAction(i);
    if (this.ActionList.length <= 0) {
      this.X4f?.Remove();
      this.X4f = undefined;
    }
  }
  Clear() {
    super.Clear();
    this.X4f?.Remove();
    this.X4f = undefined;
  }
}
exports.SunSpiritActionTicker = SunSpiritActionTicker;
//# sourceMappingURL=SunSpiritActionTicker.js.map