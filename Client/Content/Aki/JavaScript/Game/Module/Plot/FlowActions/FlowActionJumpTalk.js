"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionJumpTalk = undefined;
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionJumpTalk extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    var t = this.Runner;
    this.FinishExecute(true, false);
    t.JumpTalk(e.TalkId);
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionJumpTalk = FlowActionJumpTalk;
//# sourceMappingURL=FlowActionJumpTalk.js.map