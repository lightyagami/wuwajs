"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskTurnTo = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiTask_1 = require("../LevelAiTask");
const TURN_SPEED = 200;
const TOLERANCE = 10;
class LevelAiTaskTurnTo extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments);
    this.Tae = undefined;
    this.WTe = 0;
  }
  ExecuteTask() {
    var e = this.Params;
    if (!e) {
      return 1;
    }
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("LevelAi", 29, "执行转向动作时实体不存在:", ["PbDataId", e.EntityId]);
      }
      return 1;
    }
    this.Tae = r.Entity.GetComponent(3);
    r = r.Entity.GetComponent(48)?.CharacterMovement;
    if (!r?.IsValid()) {
      return 1;
    }
    this.WTe = r.MovementMode;
    r.MovementMode = 1;
    r = Vector_1.Vector.Create(e.Pos.X ?? 0, e.Pos.Y ?? 0, e.Pos.Z ?? 0);
    AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(this.Tae, r, TURN_SPEED);
    this.NotifyTick = true;
    return 3;
  }
  TickTask(e) {
    if (this.Tae.InputRotatorProxy.Equals(this.Tae.ActorRotationProxy, TOLERANCE)) {
      this.Tae.Entity.GetComponent(48).CharacterMovement.MovementMode = this.WTe;
      this.FinishLatentTask(0);
    }
  }
  AbortTask() {
    this.Tae?.ClearInput();
    return 2;
  }
  OnTaskFinished(e) {
    this.Tae = undefined;
    this.WTe = 0;
  }
}
exports.LevelAiTaskTurnTo = LevelAiTaskTurnTo;
//# sourceMappingURL=LevelAiTaskTurnTo.js.map