"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskResetRandomWeights extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.NodeKey = "";
    this.ResetAll = false;
    this.WeightsOverride = new UE.TArray();
  }
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, s) {
    var t;
    if (e.AiController) {
      if (t = e.GetAiComp()) {
        if (this.ResetAll) {
          t.ResetRandomNodes(undefined, this.WeightsOverride);
        } else {
          t.ResetRandomNodes(this.NodeKey, this.WeightsOverride);
        }
        this.FinishExecute(true);
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 82, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskResetRandomWeights;
//# sourceMappingURL=TsTaskResetRandomWeights.js.map