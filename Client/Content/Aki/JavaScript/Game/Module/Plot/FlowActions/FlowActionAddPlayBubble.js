"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionAddPlayBubble = undefined;
const DynamicFlowController_1 = require("../../../NewWorld/Character/Common/Component/Flow/DynamicFlowController");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionAddPlayBubble extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var e = this.ActionInfo.Params;
    if (e && e.EntityIds.length !== 0) {
      e = this.BTe(e);
      DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(e);
      this.FinishExecute(true);
    }
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
  BTe(e) {
    var o = new DynamicFlowController_1.CharacterDynamicFlowData();
    o.BubbleData = e;
    o.Type = 4;
    return o;
  }
}
exports.FlowActionAddPlayBubble = FlowActionAddPlayBubble;
//# sourceMappingURL=FlowActionAddPlayBubble.js.map