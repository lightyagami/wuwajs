"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const TsAiController_1 = require("../../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskClearPlayBubble extends TsTaskAbortImmediatelyBase_1.default {
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, r) {
    var o;
    if (e instanceof TsAiController_1.default) {
      if (o = e.AiController.CharActorComp) {
        o = o.CreatureData.GetPbDataId();
        ControllerHolder_1.ControllerHolder.DynamicFlowController.RemoveDynamicFlow(o);
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 50, "[TsTaskPlayBubble]无效的ActorComp", ["Type", e.GetClass().GetName()]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
    }
    this.FinishExecute(true);
  }
}
exports.default = TsTaskClearPlayBubble;
//# sourceMappingURL=TsTaskClearPlayBubble.js.map