"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionChangeState = undefined;
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionChangeState extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var t;
    this.Context.IsBreakdown = true;
    if (this.Context.CurShowTalk) {
      t = this.Runner;
      this.FinishExecute(true, false);
      t.FinishTalk();
    } else {
      this.FinishExecute(true);
    }
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionChangeState = FlowActionChangeState;
//# sourceMappingURL=FlowActionChangeState.js.map