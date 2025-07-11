"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleUiNiagaraItem = undefined;
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const DEFAULT_DURATION = 1000;
class BattleUiNiagaraItem {
  constructor(t) {
    this.IRe = undefined;
    this.q7e = () => {
      this.IRe = undefined;
      this.Oot();
    };
    this.Item = t;
    this.Duration = DEFAULT_DURATION;
    this.Item.bIsAlphaZeroClip = false;
  }
  Play() {
    this.Item.SetUIActive(true);
    this.Item.ActivateSystem(true);
    this.xHe();
    this.kot();
  }
  Stop() {
    if (this.IRe) {
      this.xHe();
      this.Oot();
    }
  }
  Oot() {
    this.Item.SetUIActive(false);
  }
  kot() {
    this.IRe = TimerSystem_1.TimerSystem.Delay(this.q7e, this.Duration);
  }
  xHe() {
    if (this.IRe) {
      TimerSystem_1.TimerSystem.Remove(this.IRe);
      this.IRe = undefined;
    }
  }
}
exports.BattleUiNiagaraItem = BattleUiNiagaraItem;
//# sourceMappingURL=BattleUiNiagaraItem.js.map