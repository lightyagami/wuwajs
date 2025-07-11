"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineTaskGroupPatrol = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskGroupPatrol extends AiStateMachineTask_1.AiStateMachineTask {
  OnEnter(e) {
    var a = ModelManager_1.ModelManager.MonsterGroupPatrolModel.GetMonsterInfoByEntityId(this.Node.Entity.Id);
    if (a) {
      a.GroupPatrolState = 1;
    }
  }
  OnExit(e) {
    var a = ModelManager_1.ModelManager.MonsterGroupPatrolModel.GetMonsterInfoByEntityId(this.Node.Entity.Id);
    if (a) {
      a.Group?.PausePatrol();
      a.GroupPatrolState = 0;
    }
  }
  OnTick(e, a) {
    if (!ModelManager_1.ModelManager.MonsterGroupPatrolModel.GetMonsterInfoByEntityId(this.Node.Entity.Id)) {
      this.Node.TaskFinished = true;
    }
  }
}
exports.AiStateMachineTaskGroupPatrol = AiStateMachineTaskGroupPatrol;
//# sourceMappingURL=AiStateMachineTaskGroupPatrol.js.map