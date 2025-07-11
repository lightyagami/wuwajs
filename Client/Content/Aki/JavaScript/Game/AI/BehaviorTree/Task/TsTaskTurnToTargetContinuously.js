"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const Log_1 = require("../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const GlobalData_1 = require("../../../GlobalData");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GravityUtils_1 = require("../../../Utils/GravityUtils");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
const TOLERANCE_ANGLE = 5;
class TsTaskTurnToTargetContinuously extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments);
    this.BlackboardKeyActor = "";
    this.TurnSpeed = 0;
    this.EndAfterTurnToTarget = false;
    this.IsInitTsVariables = false;
    this.TsBlackboardKeyActor = "";
    this.TsTurnSpeed = 0;
    this.TsEndAfterTurnToTarget = false;
  }
  Constructor() {
    super.Constructor();
    this.IsInitTsVariables = false;
    this.TsBlackboardKeyActor = "";
    this.TsTurnSpeed = 0;
    this.TsEndAfterTurnToTarget = false;
  }
  InitTsVariables() {
    if (!this.IsInitTsVariables || !!GlobalData_1.GlobalData.IsPlayInEditor) {
      this.IsInitTsVariables = true;
      this.TsBlackboardKeyActor = this.BlackboardKeyActor;
      this.TsTurnSpeed = this.TurnSpeed;
      this.TsEndAfterTurnToTarget = this.EndAfterTurnToTarget;
    }
  }
  ReceiveTickAI(t, s, e) {
    this.InitTsVariables();
    var i = t.AiController;
    if (i) {
      var r = i.CharActorComp;
      let t = i.AiHateList.GetCurrentTarget()?.Entity?.GetComponent(3);
      if (t = this.TsBlackboardKeyActor && (i = ControllerHolder_1.ControllerHolder.BlackboardController.GetEntityIdByEntity(i.CharAiDesignComp.Entity.Id, this.TsBlackboardKeyActor)) ? EntitySystem_1.EntitySystem.GetComponent(i, 3) : t) {
        AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(r, t.ActorLocationProxy, this.TsTurnSpeed);
        if (this.TsEndAfterTurnToTarget && GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(r) < TOLERANCE_ANGLE) {
          this.FinishExecute(true);
        }
      } else {
        this.FinishExecute(false);
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", ["Type", t.GetClass().GetName()]);
      }
      this.FinishExecute(false);
    }
  }
}
exports.default = TsTaskTurnToTargetContinuously;
//# sourceMappingURL=TsTaskTurnToTargetContinuously.js.map