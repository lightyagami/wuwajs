"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionSetAudioState = undefined;
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionSetAudioState extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    if (e) {
      ControllerHolder_1.ControllerHolder.GameAudioController.UpdateAudioStatebyClient(e.AudioConfig);
    }
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
}
exports.FlowActionSetAudioState = FlowActionSetAudioState;
//# sourceMappingURL=FlowActionSetAudioState.js.map