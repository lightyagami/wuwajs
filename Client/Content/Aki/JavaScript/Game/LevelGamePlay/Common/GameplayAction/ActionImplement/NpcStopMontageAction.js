"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NpcStopMontageAction = undefined;
const GameplayAction_1 = require("../GameplayAction");
class NpcStopMontageAction extends GameplayAction_1.GameplayAction {
  constructor() {
    super(...arguments);
    this.sDe = undefined;
    this.V4f = undefined;
    this.rxr = 0;
  }
  Init(t, e, i = 0.1) {
    this.sDe = t;
    this.V4f = e;
    this.rxr = i;
  }
  OnExecuteAction() {
    var t;
    var e = this.V4f;
    if (e?.IsValid() && (t = this.sDe)?.IsInit && (t = t.Entity.GetComponent(49))) {
      t.StopPerformMontage(2, {
        Method: 0,
        Montage: e,
        BlendOutTime: this.rxr
      });
    } else {
      this.FinishExecute();
    }
  }
  OnInterruptAction() {}
}
exports.NpcStopMontageAction = NpcStopMontageAction;
//# sourceMappingURL=NpcStopMontageAction.js.map