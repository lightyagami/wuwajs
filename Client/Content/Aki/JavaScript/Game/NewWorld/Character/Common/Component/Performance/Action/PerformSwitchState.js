"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PerformSwitchState = void 0;
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  PerformActionBase_1 = require("./PerformActionBase"),
  SWITCH_STATE_MAX_TIME = 3e3;
class PerformSwitchState extends PerformActionBase_1.PerformActionBase {
  constructor() {
    super(...arguments), this.IsAtomic = !0, this.Jh = void 0, this.Sj_ = void 0, this.Mj_ = void 0, this.Fau = () => {
      this.Mj_ = void 0, this.PerformComp.Entity.GetComponent(186)?.SwitchAnimState(this.Param)
    }, this.Nau = () => {
      this.Jh?.Valid && (EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.NpcAnimStateSwitchEnd, this.Nau) && EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.NpcAnimStateSwitchEnd, this.Nau), this.Sj_?.Remove(), this.Sj_ = void 0, this.Jh = void 0, this.FinishExecute())
    }
  }
  OnExecute() {
    var t;
    this.PerformComp.Entity.GetComponent(2) && this.PerformComp.Entity.GetComponent(186)?.CanSwitchAnimState(this.Param.TargetStateName) ? ((t = this.PerformComp.Entity.GetComponent(44)).MontageManager.IsMontagePlaying() ? (t.MontageManager.StopMontage({
      Method: 0,
      BlendOutTime: .5
    }), this.Mj_ = TimerSystem_1.TimerSystem.Delay(this.Fau, 250)) : this.Fau(), this.Jh = this.PerformComp.Entity, EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.NpcAnimStateSwitchEnd, this.Nau), this.Sj_ = TimerSystem_1.TimerSystem.Delay(this.Nau, SWITCH_STATE_MAX_TIME)) : this.FinishExecute()
  }
  OnReset() {
    this.Jh && EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.NpcAnimStateSwitchEnd, this.Nau) && EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.NpcAnimStateSwitchEnd, this.Nau), this.Sj_?.Remove(), this.Sj_ = void 0, this.Jh = void 0, this.Mj_?.Remove(), this.Mj_ = void 0
  }
}
exports.PerformSwitchState = PerformSwitchState;
//# sourceMappingURL=PerformSwitchState.js.map