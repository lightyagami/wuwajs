"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskPatrolPerformanceQuery extends TsTaskAbortImmediatelyBase_1.default {
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, r) {
    var o;
    var s;
    var t;
    if (e instanceof TsAiController_1.default) {
      if ((s = e.AiController?.AiPatrol) && (t = (o = e.AiController.CharActorComp.Entity).GetComponent(17), o = o.GetComponent(209), t) && o) {
        t.ClearLastPerformanceTag();
        if (s = s.GetNextPerformanceTag()) {
          t.AddPerformanceTag(s);
        } else if (o.HasTag(t = -1645015979)) {
          o.RemoveTag(t);
        }
        this.Finish(true);
      } else {
        this.Finish(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.Finish(false);
    }
  }
}
exports.default = TsTaskPatrolPerformanceQuery;
//# sourceMappingURL=TsTaskPatrolPerformanceQuery.js.map