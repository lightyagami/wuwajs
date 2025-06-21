"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PerformTurn = void 0;
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  AiContollerLibrary_1 = require("../../../../../../AI/Controller/AiContollerLibrary"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  PerformActionBase_1 = require("./PerformActionBase"),
  TURN_MAX_TIME = 3e3;
class PerformTurn extends PerformActionBase_1.PerformActionBase {
  constructor() {
    super(...arguments), this.IsAtomic = !0, this.Jh = void 0, this.Sj_ = void 0, this.Mj_ = void 0, this.Ej_ = () => {
      this.Mj_ = void 0;
      var t = this.PerformComp.Entity.GetComponent(3);
      this.Param.TargetLocation ? AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(t, this.Param.TargetLocation, this.Param.TurnSpeed ?? 0, this.Param.ContainZ, this.Param.MinTurnTimeSeconds) : this.Param.Direction && AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(t, this.Param.Direction, this.Param.TurnSpeed ?? 0, this.Param.ContainZ, this.Param.MinTurnTimeSeconds)
    }, this.Ij_ = () => {
      this.Jh?.Valid && (EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnEnd, this.Ij_) && EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnEnd, this.Ij_), this.Sj_?.Remove(), this.Sj_ = void 0, this.Jh = void 0, this.FinishExecute())
    }
  }
  OnExecute() {
    var t;
    this.PerformComp.Entity.GetComponent(3) ? ((t = this.PerformComp.Entity.GetComponent(44)).MontageManager.IsMontagePlaying() ? (t.MontageManager.StopMontage({
      Method: 0,
      BlendOutTime: .5
    }), this.Mj_ = TimerSystem_1.TimerSystem.Delay(this.Ej_, 250)) : this.Ej_(), this.Jh = this.PerformComp.Entity, EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnEnd, this.Ij_), this.Sj_ = TimerSystem_1.TimerSystem.Delay(this.Ij_, TURN_MAX_TIME)) : this.FinishExecute()
  }
  OnReset() {
    this.Jh && EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnEnd, this.Ij_) && EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.CharTurnEnd, this.Ij_), this.Sj_?.Remove(), this.Sj_ = void 0, this.Jh = void 0, this.Mj_?.Remove(), this.Mj_ = void 0
  }
}
exports.PerformTurn = PerformTurn;
//# sourceMappingURL=PerformTurn.js.map