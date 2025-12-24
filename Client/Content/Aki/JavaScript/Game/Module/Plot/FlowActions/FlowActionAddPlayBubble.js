"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionAddPlayBubble = undefined;
const DynamicFlowController_1 = require("../../../NewWorld/Character/Common/Component/Flow/DynamicFlowController");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionAddPlayBubble extends FlowActionBase_1.FlowActionBase {
  OnExecute() {
    var o = this.ActionInfo.Params;
    if (o && o.EntityIds.length !== 0) {
      o = this.BTe(o);
      DynamicFlowController_1.DynamicFlowController.AddDynamicFlow(o);
      this.FinishExecute(true);
    }
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
  BTe(o) {
    var e = new DynamicFlowController_1.CharacterDynamicFlowData();
    var t = new DynamicFlowController_1.DynamicFlowActorInfo();
    t.PbDataId = o.EntityIds[0];
    e.MasterInfo = t;
    e.BubbleData = o;
    e.Type = 4;
    return e;
  }
}
exports.FlowActionAddPlayBubble = FlowActionAddPlayBubble;
//# sourceMappingURL=FlowActionAddPlayBubble.js.map