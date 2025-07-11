"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../Core/Common/Log");
const TsTaskAbortImmediatelyBase_1 = require("../TsTaskAbortImmediatelyBase");
const ControllerHolder_1 = require("../../../../Manager/ControllerHolder");
class TsTaskAnimalDestroySelf extends TsTaskAbortImmediatelyBase_1.default {
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, r) {
    var o;
    var s = e.AiController;
    if (s) {
      if (o = (s = s.CharActorComp.Entity).GetComponent(47)) {
        o.DisableAi("动物销毁");
      }
      if (o = s.GetComponent(171)) {
        o.PendingDestroy = false;
      }
      o = s.GetComponent(0);
      ControllerHolder_1.ControllerHolder.CreatureController.AnimalDestroyRequest(o.GetCreatureDataId());
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskAnimalDestroySelf;
//# sourceMappingURL=TsTaskAnimalDestroySelf.js.map