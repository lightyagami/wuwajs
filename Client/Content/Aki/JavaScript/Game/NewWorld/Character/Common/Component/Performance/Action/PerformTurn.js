"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformTurn = undefined;
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const AiContollerLibrary_1 = require("../../../../../../AI/Controller/AiContollerLibrary");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const PerformActionBase_1 = require("./PerformActionBase");
const TURN_MAX_TIME = 3000;
class PerformTurn extends PerformActionBase_1.PerformActionBase {
  constructor() {
    super(...arguments);
    this.IsAtomic = true;
    this.Jh = undefined;
    this.Sj_ = undefined;
    this.Mj_ = undefined;
    this.Ej_ = () => {
      this.Mj_ = undefined;
      var t = this.PerformComp.Entity.GetComponent(3);
      if (this.Param.TargetLocation) {
        AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(t, this.Param.TargetLocation, this.Param.TurnSpeed ?? 0, this.Param.ContainZ, this.Param.MinTurnTimeSeconds);
      } else if (this.Param.Direction) {
        AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(t, this.Param.Direction, this.Param.TurnSpeed ?? 0, this.Param.ContainZ, this.Param.MinTurnTimeSeconds);
      }
    };
    this.Ij_ = () => {
      if (this.Jh?.Valid) {
        if (EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnEnd, this.Ij_)) {
          EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnEnd, this.Ij_);
        }
        this.Sj_?.Remove();
        this.Sj_ = undefined;
        this.Jh = undefined;
        this.FinishExecute();
      }
    };
  }
  OnExecute() {
    var t;
    if (this.PerformComp.Entity.GetComponent(3)) {
      if ((t = this.PerformComp.Entity.GetComponent(45)).MontageManager.IsMontagePlaying()) {
        t.MontageManager.StopMontage({
          Method: 0,
          BlendOutTime: 0.5
        });
        this.Mj_ = TimerSystem_1.TimerSystem.Delay(this.Ej_, 250);
      } else {
        this.Ej_();
      }
      this.Jh = this.PerformComp.Entity;
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnEnd, this.Ij_);
      this.Sj_ = TimerSystem_1.TimerSystem.Delay(this.Ij_, TURN_MAX_TIME);
    } else {
      this.FinishExecute();
    }
  }
  OnReset() {
    if (this.Jh && EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnEnd, this.Ij_)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnEnd, this.Ij_);
    }
    this.Sj_?.Remove();
    this.Sj_ = undefined;
    this.Jh = undefined;
    this.Mj_?.Remove();
    this.Mj_ = undefined;
  }
}
exports.PerformTurn = PerformTurn;
//# sourceMappingURL=PerformTurn.js.map