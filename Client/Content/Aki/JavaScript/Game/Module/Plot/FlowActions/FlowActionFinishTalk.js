"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionFinishTalk = undefined;
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionFinishTalk extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.Runner;
    this.FinishExecute(true, false);
    e.FinishTalk();
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionFinishTalk = FlowActionFinishTalk;
//# sourceMappingURL=FlowActionFinishTalk.js.map