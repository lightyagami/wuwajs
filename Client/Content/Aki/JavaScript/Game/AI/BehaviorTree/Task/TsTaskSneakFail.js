"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSneakFail extends TsTaskAbortImmediatelyBase_1.default {
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, s) {
    if (e.AiController) {
      ActorUtils_1.ActorUtils.GetEntityByActor(s)?.Entity?.GetComponent(215)?.TagContainer?.UpdateExactTag(3, -1951091619, 0);
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskSneakFail;
//# sourceMappingURL=TsTaskSneakFail.js.map