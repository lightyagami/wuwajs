"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineTransition = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
class AiStateMachineTransition {
  constructor(t, i) {
    this.Conditions = undefined;
    this.HasTaskFinishCondition = false;
    this.Node = t;
    this.From = t.Owner.GetNodeData(i.From)?.Uuid;
    this.To = t.Owner.GetNodeData(i.To)?.Uuid;
    this.TransitionPredictionType = i.TransitionPredictionType;
    this.Weight = i.Weight;
    this.ConditionDatas = i.Conditions;
    this.Condition = ModelManager_1.ModelManager.AiStateMachineModel.AiStateMachineFactory.CreateCondition(this, i.Conditions[0], 0);
    this.HasTaskFinishCondition = this.Condition.HasTaskFinishCondition;
  }
  Enter() {
    this.Condition.Enter();
  }
  Exit() {
    this.Condition.Exit();
  }
  Tick() {
    this.Condition.Tick();
  }
  CheckPredictionCondition() {
    return (this.TransitionPredictionType === 1 && !!this.Node.ActorComponent.IsAutonomousProxy || this.TransitionPredictionType === 2) && this.Condition.Result;
  }
  CanPrediction() {
    return this.TransitionPredictionType === 1 && this.Node.ActorComponent.IsAutonomousProxy || this.TransitionPredictionType === 2;
  }
  GetResult() {
    return this.Condition.Result;
  }
  HandleServerDebugInfo(t) {
    this.Condition.HandleServerDebugInfo(t);
  }
  Clear() {
    this.Condition.Clear();
    this.Node = undefined;
    this.ConditionDatas = undefined;
    this.Condition = undefined;
    this.Conditions = undefined;
  }
}
exports.AiStateMachineTransition = AiStateMachineTransition;
//# sourceMappingURL=AiStateMachineTransition.js.map