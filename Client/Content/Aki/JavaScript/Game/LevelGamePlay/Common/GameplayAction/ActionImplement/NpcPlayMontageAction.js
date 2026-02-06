"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcPlayMontageAction = undefined;
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const GameplayAction_1 = require("../GameplayAction");
class NpcPlayMontageAction extends GameplayAction_1.GameplayAction {
  constructor() {
    super(...arguments);
    this.sDe = undefined;
    this.V4f = undefined;
    this._Mg = true;
  }
  Init(t, e, i, s = true) {
    this.IsLoopInner = i;
    this.sDe = t;
    this.V4f = e;
    this._Mg = s;
  }
  OnExecuteAction() {
    var t;
    var e;
    var i = this.V4f;
    if (i?.IsValid() && (t = this.sDe)?.IsInit && (t = t.Entity.GetComponent(49))) {
      e = this.IsLoopInner;
      t.PlayPerformMontage(2, {
        MontageAsset: i,
        IsLoop: e
      }, undefined, e ? undefined : () => {
        TimerSystem_1.TimerSystem.Next(() => {
          this.FinishExecute();
        });
      });
    } else {
      this.FinishExecute();
    }
  }
  OnInterruptAction() {
    var t;
    var e;
    if (this._Mg && (t = this.V4f)?.IsValid() && (e = this.sDe)?.IsInit && (e = e.Entity.GetComponent(49))) {
      e.StopPerformMontage(2, {
        Method: 0,
        Montage: t,
        BlendOutTime: 0.1
      });
    }
  }
}
exports.NpcPlayMontageAction = NpcPlayMontageAction;
//# sourceMappingURL=NpcPlayMontageAction.js.map