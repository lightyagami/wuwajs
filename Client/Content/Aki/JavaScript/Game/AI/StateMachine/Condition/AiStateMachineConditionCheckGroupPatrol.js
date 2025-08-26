"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineConditionCheckGroupPatrol = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionCheckGroupPatrol extends AiStateMachineCondition_1.AiStateMachineCondition {
  constructor() {
    super(...arguments);
    this.Rwu = e => {
      if (this.Node && this.Node.Activated && e === this.Node.Entity.Id) {
        e = ModelManager_1.ModelManager.MonsterGroupPatrolModel.GetMonsterInfoByEntityId(this.Node.Entity.Id);
        this.ResultSelf = !!e;
        this.Node.Owner.TickStateMachine(this.Result, "AiStateMachineConditionCheckGroupPatrol", this.Node.Name);
      }
    };
  }
  RegisterEvents() {
    return !!super.RegisterEvents() && !!this.Node.Entity && !EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnGeneratedMonsterPatrolGroup, this.Rwu) && !(EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.OnGeneratedMonsterPatrolGroup, this.Rwu), 0);
  }
  UnregisterEvents() {
    return !!super.UnregisterEvents() && !!this.Node.Entity && !!EventSystem_1.EventSystem.Has(EventDefine_1.EEventName.OnGeneratedMonsterPatrolGroup, this.Rwu) && (EventSystem_1.EventSystem.Remove(EventDefine_1.EEventName.OnGeneratedMonsterPatrolGroup, this.Rwu), true);
  }
  OnInit(e) {
    this.RegisterEvents();
    return true;
  }
  OnClear() {
    this.UnregisterEvents();
  }
  OnTick() {
    var e = ModelManager_1.ModelManager.MonsterGroupPatrolModel.GetMonsterInfoByEntityId(this.Node.Entity.Id);
    this.ResultSelf = !!e;
  }
  ToString(e, t = 0) {
    super.ToString(e, t);
    e.Append(`可以集群巡逻
`);
  }
}
exports.AiStateMachineConditionCheckGroupPatrol = AiStateMachineConditionCheckGroupPatrol;
//# sourceMappingURL=AiStateMachineConditionCheckGroupPatrol.js.map