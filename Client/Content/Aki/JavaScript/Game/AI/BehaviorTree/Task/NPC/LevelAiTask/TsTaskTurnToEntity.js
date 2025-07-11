"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../../../../../Core/Common/Log");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../../../Global");
const GlobalData_1 = require("../../../../../GlobalData");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const GravityUtils_1 = require("../../../../../Utils/GravityUtils");
const AiContollerLibrary_1 = require("../../../../Controller/AiContollerLibrary");
const TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase");
const TOLERANCE = 3;
class TsTaskTurnToEntity extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.TurnMode = 0;
    this.TargetEntityId = 0;
    this.TargetPos = new UE.Vector();
    this.TurnSpeed = 180;
    this.TsTurnMode = 0;
    this.TsTargetEntityId = 0;
    this.TsTargetPos = undefined;
    this.TsTurnSpeed = 180;
    this.Character = undefined;
    this.MovementMode = 0;
    this.IsInitTsVariables = false;
  }
  Constructor() {
    super.Constructor();
    this.TsTurnMode = 0;
    this.TsTargetEntityId = 0;
    this.TsTargetPos = undefined;
    this.TsTurnSpeed = 180;
    this.Character = undefined;
    this.MovementMode = 0;
    this.IsInitTsVariables = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsTurnMode = this.TurnMode;
      this.TsTargetEntityId = this.TargetEntityId;
      this.TsTargetPos = Vector_1.Vector.Create(this.TargetPos.X, this.TargetPos.Y, this.TargetPos.Z);
      this.TsTurnSpeed = this.TurnSpeed;
    }
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s;
    var e = t.AiController;
    if (e) {
      s = (e = e.CharAiDesignComp.Entity).GetComponent(0);
      if (e?.Valid) {
        this.Character = e.GetComponent(3);
        if ((e = e.GetComponent(45)?.CharacterMovement)?.IsValid()) {
          this.MovementMode = e.MovementMode;
          e.MovementMode = 1;
          MathUtils_1.MathUtils.CommonTempVector.Reset();
          if (this.GetTurnToPosition(MathUtils_1.MathUtils.CommonTempVector)) {
            AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(this.Character, MathUtils_1.MathUtils.CommonTempVector, this.TsTurnSpeed);
          } else {
            this.FinishExecute(true);
          }
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("LevelAi", 50, "[TsTaskTurnToEntity]无效的CharacterMovement", ["PbDataId", s.GetPbDataId()]);
          }
          this.FinishExecute(true);
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("LevelAi", 29, "执行转向动作时实体不存在:", ["PbDataId", s.GetPbDataId()]);
        }
        this.FinishExecute(true);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(true);
    }
  }
  ReceiveTickAI(t, i, s) {
    if (GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(this.Character) < TOLERANCE) {
      this.Character.Entity.GetComponent(45).CharacterMovement.MovementMode = this.MovementMode;
      this.Finish(true);
    }
  }
  OnAbort() {
    this.Character?.ClearInput();
  }
  OnClear() {
    this.Character = undefined;
    this.MovementMode = 0;
  }
  GetTurnToPosition(t) {
    switch (this.TsTurnMode) {
      case 2:
        var i = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(this.TsTargetEntityId);
        if (!i?.Valid) {
          return false;
        }
        i = i.Entity.GetComponent(1);
        t.DeepCopy(i.ActorLocationProxy);
        break;
      case 4:
        i = Global_1.Global.BaseCharacter;
        if (!i?.IsValid()) {
          return false;
        }
        t.DeepCopy(i.CharacterActorComponent.ActorLocationProxy);
        break;
      case 3:
        t.DeepCopy(this.TsTargetPos);
        break;
      default:
        return false;
    }
    return true;
  }
}
exports.default = TsTaskTurnToEntity;
//# sourceMappingURL=TsTaskTurnToEntity.js.map