"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiStateMachineTaskMoveToTarget = undefined;
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const AiStateMachineTask_1 = require("./AiStateMachineTask");
const TRIGGER_PERIOD = 500;
class AiStateMachineTaskMoveToTarget extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments);
    this.TargetType = 0;
    this.MoveState = 0;
    this.EndDistance = 0;
    this.TurnSpeed = 0;
    this.WalkOff = false;
    this.Due = Vector_1.Vector.Create();
    this.Xne = false;
    this._se = 0;
    this.pRa = 0;
  }
  OnInit(t) {
    this.TargetType = t.TaskMoveToTarget.TargetType;
    this.MoveState = t.TaskMoveToTarget.MoveState;
    this.EndDistance = t.TaskMoveToTarget.EndDistance;
    this.TurnSpeed = t.TaskMoveToTarget.TurnSpeed;
    this.WalkOff = t.TaskMoveToTarget.WalkOff;
    return true;
  }
  OnEnter(t) {
    this.Xne = true;
    if (!this.WalkOff) {
      this.Node.MoveComponent?.SetWalkOffLedgeRecord(false);
    }
    switch (this.TargetType) {
      case 0:
        this.vRa();
        break;
      case 1:
        this.MRa();
    }
    this.SRa();
  }
  OnTick() {
    if (this.Xne && this.TargetType === 1 && this.Node.ElapseTime >= this.pRa + TRIGGER_PERIOD) {
      this.MRa();
      this.SRa();
    }
  }
  vRa() {
    var t;
    this._se = this.Node.Owner.GetBlackboard(2) ?? 0;
    if (this._se && (t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(this._se))) {
      this.Due.X = t.Transform.Pos.X;
      this.Due.Y = t.Transform.Pos.Y;
      this.Due.Z = t.Transform.Pos.Z;
    }
  }
  MRa() {
    var t = this.Node.AiController.AiHateList.GetCurrentTarget();
    if (!t?.Valid) {
      this.$ne(false);
    }
    var t = t.Entity.GetComponent(1);
    this.Due.X = t.ActorLocation.X;
    this.Due.Y = t.ActorLocation.Y;
    this.Due.Z = t.ActorLocation.Z;
  }
  SRa() {
    if (this.Node.MoveComponent.MoveController.NavigateMoveToLocation({
      Position: this.Due,
      TurnSpeed: this.TurnSpeed,
      Distance: this.EndDistance,
      ResetCondition: () => false,
      CallbackList: [t => {
        this.$ne(t === 1);
      }]
    }, false, false)) {
      var t = this.Node.Entity.GetComponent(179);
      if (t.Valid) {
        switch (this.MoveState) {
          case 1:
            t.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
            break;
          case 2:
            t.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
        }
      }
      this.pRa = this.Node.ElapseTime;
    } else {
      this.$ne(false);
    }
  }
  $ne(t = 0) {
    if (this.Xne) {
      this.Node.TaskFinished = true;
      this.Xne = false;
    }
  }
  OnExit() {
    var t = this.Node.AiComponent.TsAiController;
    if (t) {
      AiContollerLibrary_1.AiControllerLibrary.ClearInput(t);
      if (!this.WalkOff) {
        this.Node.MoveComponent?.SetWalkOffLedgeRecord(true);
      }
    }
  }
}
exports.AiStateMachineTaskMoveToTarget = AiStateMachineTaskMoveToTarget;
//# sourceMappingURL=AiStateMachineTaskMoveToTarget.js.map