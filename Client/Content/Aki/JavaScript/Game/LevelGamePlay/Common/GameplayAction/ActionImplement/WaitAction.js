"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WaitAction = undefined;
const GameplayAction_1 = require("../GameplayAction");
class WaitAction extends GameplayAction_1.GameplayAction {
  constructor() {
    super(...arguments);
    this.NeedTickInner = true;
    this.F4f = 0;
  }
  Init(t) {
    this.F4f = t;
  }
  OnExecuteAction() {}
  OnInterruptAction() {}
  TickAction(t) {
    this.F4f -= t;
    if (this.F4f <= 0) {
      this.FinishExecute();
    }
  }
}
exports.WaitAction = WaitAction;
//# sourceMappingURL=WaitAction.js.map