"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
class TsTaskEnterPatrolState extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.EntityId = 0;
  }
  Constructor() {
    super.Constructor();
  }
  ReceiveExecuteAI(e, r) {
    var t = e.AiController;
    if (t) {
      t = t.CharActorComp;
      this.EntityId = t.Entity.Id;
      if (t = ModelManager_1.ModelManager.MonsterGroupPatrolModel.GetMonsterInfoByEntityId(this.EntityId)) {
        t.GroupPatrolState = 1;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", e.GetClass().GetName()]);
      }
      this.FinishExecute(true);
    }
  }
  OnAbort() {
    var e = ModelManager_1.ModelManager.MonsterGroupPatrolModel.GetMonsterInfoByEntityId(this.EntityId);
    if (e) {
      e.Group?.PausePatrol();
      e.GroupPatrolState = 0;
    }
  }
}
exports.default = TsTaskEnterPatrolState;
//# sourceMappingURL=TsTaskEnterPatrolState.js.map