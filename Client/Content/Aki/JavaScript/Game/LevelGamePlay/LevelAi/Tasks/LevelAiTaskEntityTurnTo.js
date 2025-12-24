"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskEntityTurnTo = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary");
const Global_1 = require("../../../Global");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LevelAiTask_1 = require("../LevelAiTask");
const TURN_SPEED = 200;
const TOLERANCE = 10;
class LevelAiTaskEntityTurnTo extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments);
    this.Tae = undefined;
    this.WTe = 0;
    this.zLe = Vector_1.Vector.Create();
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
    r = r.Entity.GetComponent(46)?.CharacterMovement;
    if (r?.IsValid() && this.qJa(this.zLe, e)) {
      this.WTe = r.MovementMode;
      r.MovementMode = 1;
      AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(this.Tae, this.zLe, TURN_SPEED);
      this.NotifyTick = true;
      return 3;
    } else {
      return 1;
    }
  }
  TickTask(e) {
    if (this.Tae.InputRotatorProxy.Equals(this.Tae.ActorRotationProxy, TOLERANCE)) {
      this.Tae.Entity.GetComponent(46).CharacterMovement.MovementMode = this.WTe;
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
  qJa(e, r) {
    switch (r.Target.Type) {
      case 2:
        var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(r.EntityId);
        if (!t?.Valid) {
          return false;
        }
        t = t.Entity.GetComponent(1);
        e.DeepCopy(t.ActorLocationProxy);
        break;
      case 4:
        t = Global_1.Global.BaseCharacter;
        if (!t?.IsValid()) {
          return false;
        }
        e.DeepCopy(t.CharacterActorComponent.ActorLocationProxy);
        break;
      case 3:
        e.Set(r.Target.Pos.X ?? 0, r.Target.Pos.Y ?? 0, r.Target.Pos.Z ?? 0);
        break;
      default:
        return false;
    }
    return true;
  }
}
exports.LevelAiTaskEntityTurnTo = LevelAiTaskEntityTurnTo;
//# sourceMappingURL=LevelAiTaskEntityTurnTo.js.map