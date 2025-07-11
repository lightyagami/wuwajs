"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../../Core/Common/Log");
const BehaviorTreeDefines_1 = require("../../../../../LevelGamePlay/LevelAi/BehaviorTree/BehaviorTreeDefines");
const ControllerHolder_1 = require("../../../../../Manager/ControllerHolder");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskPatrolStateReset extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.SplineId = 0;
  }
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, r) {
    var o;
    var s = e.AiController;
    if (s) {
      if (!(o = ControllerHolder_1.ControllerHolder.BlackboardController.GetStringValueByEntity(s.CharAiDesignComp.Entity.Id, BehaviorTreeDefines_1.BehaviorTreeDefines.BehaviorTreePatrolStateName))?.endsWith(this.SplineId.toString()) || o === BehaviorTreeDefines_1.BehaviorTreeDefines.PatrolFinishName) {
        o = BehaviorTreeDefines_1.BehaviorTreeDefines.GetPatrolStateName(this.SplineId);
        ControllerHolder_1.ControllerHolder.BlackboardController.SetStringValueByEntity(s.CharAiDesignComp.Entity.Id, BehaviorTreeDefines_1.BehaviorTreeDefines.BehaviorTreePatrolStateName, o);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
    }
    this.FinishExecute(true);
  }
}
exports.default = TsTaskPatrolStateReset;
//# sourceMappingURL=TsTaskPatrolStateReset.js.map