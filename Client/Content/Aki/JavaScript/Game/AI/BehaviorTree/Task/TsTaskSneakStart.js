"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ActorUtils_1 = require("../../../Utils/ActorUtils");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskSneakStart extends TsTaskAbortImmediatelyBase_1.default {
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, t) {
    if (e.AiController) {
      if (t = ActorUtils_1.ActorUtils.GetEntityByActor(t)) {
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SneakMonsterStart, t.Id);
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskSneakStart;
//# sourceMappingURL=TsTaskSneakStart.js.map