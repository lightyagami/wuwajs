"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskChangeInteractionState extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.InteractionState = true;
    this.IsInitTsVariables = false;
    this.TsInteractionState = false;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsInteractionState = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsInteractionState = this.InteractionState;
    }
  }
  ReceiveExecuteAI(e, t) {
    this.InitTsVariables();
    var s;
    var a = e.AiController;
    if (a) {
      if (s = a.CharActorComp.Entity.GetComponent(198)) {
        s.SetInteractionState(this.TsInteractionState, "TsTaskChangeInteractionState ReceiveExecuteAI");
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "实体交互组件无效", ["CreatureDataId", a.CharActorComp.CreatureData.GetCreatureDataId()], ["PbDataId", a.CharActorComp.CreatureData.GetPbDataId()]);
      }
      this.FinishExecute(true);
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 29, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskChangeInteractionState;
//# sourceMappingURL=TsTaskChangeInteractionState.js.map