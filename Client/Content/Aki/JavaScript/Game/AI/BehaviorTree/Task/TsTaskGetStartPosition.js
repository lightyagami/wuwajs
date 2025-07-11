"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const TsAiController_1 = require("../../Controller/TsAiController");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const START_POSITION_KEY = "StartPosition";
class TsTaskGetStartPosition extends TsTaskAbortImmediatelyBase_1.default {
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, r) {
    var o;
    var t;
    if (e instanceof TsAiController_1.default) {
      t = (o = e.AiController.CharActorComp).Entity;
      if (o?.Valid) {
        o = o.Entity.Id;
        t = t.GetComponent(0).GetInitLocation();
        ControllerHolder_1.ControllerHolder.BlackboardController.SetVectorValueByEntity(o, START_POSITION_KEY, t.X, t.Y, t.Z);
        this.FinishExecute(true);
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskGetStartPosition;
//# sourceMappingURL=TsTaskGetStartPosition.js.map