"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const GlobalData_1 = require("../../../GlobalData");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskAddGe extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.GeId = undefined;
    this.Level = 0;
    this.IsInitTsVariables = false;
    this.TsGeId = undefined;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsGeId = undefined;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsGeId = this.GeId;
    }
  }
  ReceiveTickAI(s, e, t) {
    this.InitTsVariables();
    var a;
    var i = s.AiController;
    if (i) {
      (a = i.CharActorComp.Entity.CheckGetComponent(175)).AddBuffFromAi(i.AiCombatMessageId, Number(this.TsGeId), {
        InstigatorId: a.CreatureDataId,
        Reason: "行为树TsTaskAddGe节点"
      });
      this.FinishExecute(true);
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", s.GetClass().GetName()]);
    }
  }
}
exports.default = TsTaskAddGe;
//# sourceMappingURL=TsTaskAddGe.js.map