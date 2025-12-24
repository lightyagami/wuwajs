"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const DynamicFlowController_1 = require("../../../../../NewWorld/Character/Common/Component/Flow/DynamicFlowController");
const TsAiController_1 = require("../../../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskClearPlayBubble extends TsTaskAbortImmediatelyBase_1.default {
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, o) {
    var r;
    var l;
    if (e instanceof TsAiController_1.default) {
      if (r = e.AiController.CharActorComp) {
        r = r.CreatureData.GetPbDataId();
        (l = new DynamicFlowController_1.DynamicFlowActorInfo()).PbDataId = r;
        ControllerHolder_1.ControllerHolder.DynamicFlowController.RemoveDynamicFlow(l);
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