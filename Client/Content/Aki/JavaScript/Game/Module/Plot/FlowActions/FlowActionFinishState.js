"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionFinishState = undefined;
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionFinishState extends FlowActionBase_1.FlowActionBase {
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
exports.FlowActionFinishState = FlowActionFinishState;
//# sourceMappingURL=FlowActionFinishState.js.map