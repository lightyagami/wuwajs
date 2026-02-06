"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelAiTaskTurnAndPlayMontage = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const LevelAiTask_1 = require("../LevelAiTask");
const TURN_SPEED = 200;
const TOLERANCE = 10;
class LevelAiTaskTurnAndPlayMontage extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments);
    this.Tae = undefined;
    this.WTe = 0;
    this.bTe = 0;
    this.NTe = 0;
    this.OTe = 0;
    this.KTe = 0;
  }
  ExecuteTask() {
    this.KTe = 1;
    this.NotifyTick = true;
    return 3;
  }
  TickTask(t) {
    switch (this.KTe) {
      case 1:
        this.QTe();
        this.KTe = 2;
        break;
      case 2:
        if (GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(this.Tae) < TOLERANCE) {
          this.Tae.Entity.GetComponent(48).CharacterMovement.MovementMode = this.WTe;
          this.KTe = 3;
        }
        break;
      case 3:
        this.XTe();
        this.KTe = 4;
        break;
      case 4:
        break;
      default:
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelAi", 50, "[TurnToAndPlayMontage] 阶段切换出错", ["CurPhase", this.KTe]);
        }
    }
  }
  AbortTask() {
    if (this.KTe < 3) {
      this.Tae?.ClearInput();
    } else {
      this.CreatureDataComponent.Entity.GetComponent(49).VolatileMontageStopByLoad(3, this.bTe, 0);
    }
    return 2;
  }
  OnTaskFinished(t) {
    this.Tae = undefined;
    this.WTe = 0;
  }
  QTe() {
    var t;
    var e = this.Params;
    if (e) {
      if (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId)) {
        this.Tae = t.Entity.GetComponent(3);
        if ((t = t.Entity.GetComponent(48)?.CharacterMovement)?.IsValid()) {
          this.WTe = t.MovementMode;
          t.MovementMode = 1;
          t = Vector_1.Vector.Create(e.Pos.X ?? 0, e.Pos.Y ?? 0, e.Pos.Z ?? 0);
          AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(this.Tae, t, TURN_SPEED);
        } else {
          this.FinishLatentTask(1);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelAi", 29, "执行转向动作时实体不存在:", ["PbDataId", e.EntityId]);
        }
        this.FinishLatentTask(1);
      }
    } else {
      this.FinishLatentTask(1);
    }
  }
  XTe() {
    var t;
    var e;
    var i = this.Params;
    if (i) {
      this.NTe = i.LoopDuration ?? 0;
      this.OTe = i.RepeatTimes ?? 0;
      t = this.CreatureDataComponent.Entity.GetComponent(49);
      i = {
        IsAbp: i.IsAbpMontage,
        MontageId: i.MontageId
      };
      e = t.GetMontageStateParam(i);
      if (i = t.GetMontagePath(i)) {
        this.bTe = t.VolatileMontagePlayByLoad(3, i, e, undefined, t => {
          this.FinishLatentTask(0);
        }, this.NTe, this.OTe);
      } else {
        this.FinishLatentTask(0);
      }
    } else {
      this.FinishLatentTask(1);
    }
  }
}
exports.LevelAiTaskTurnAndPlayMontage = LevelAiTaskTurnAndPlayMontage;
//# sourceMappingURL=LevelAiTaskTurnAndPlayMontage.js.map