"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformSwitchState = undefined;
const TimerSystem_1 = require("../../../../../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const PerformActionBase_1 = require("./PerformActionBase");
const SWITCH_STATE_MAX_TIME = 3000;
class PerformSwitchState extends PerformActionBase_1.PerformActionBase {
  constructor() {
    super(...arguments);
    this.IsAtomic = true;
    this.Jh = undefined;
    this.Sj_ = undefined;
    this.Mj_ = undefined;
    this.Lmu = () => {
      this.Mj_ = undefined;
      this.PerformComp.Entity.GetComponent(190)?.SwitchAnimState(this.Param);
    };
    this.wmu = () => {
      if (this.Jh?.Valid) {
        if (EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.NpcAnimStateSwitchEnd, this.wmu)) {
          EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.NpcAnimStateSwitchEnd, this.wmu);
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
    if (this.PerformComp.Entity.GetComponent(2) && this.PerformComp.Entity.GetComponent(190)?.CanSwitchAnimState(this.Param.TargetStateName)) {
      if ((t = this.PerformComp.Entity.GetComponent(44)).MontageManager.IsMontagePlaying()) {
        t.MontageManager.StopMontage({
          Method: 0,
          BlendOutTime: 0.5
        });
        this.Mj_ = TimerSystem_1.TimerSystem.Delay(this.Lmu, 250);
      } else {
        this.Lmu();
      }
      this.Jh = this.PerformComp.Entity;
      EventSystem_1.EventSystem.AddWithTarget(this.Jh, EventDefine_1.EEventName.NpcAnimStateSwitchEnd, this.wmu);
      this.Sj_ = TimerSystem_1.TimerSystem.Delay(this.wmu, SWITCH_STATE_MAX_TIME);
    } else {
      this.FinishExecute();
    }
  }
  OnReset() {
    if (this.Jh && EventSystem_1.EventSystem.HasWithTarget(this.Jh, EventDefine_1.EEventName.NpcAnimStateSwitchEnd, this.wmu)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.Jh, EventDefine_1.EEventName.NpcAnimStateSwitchEnd, this.wmu);
    }
    this.Sj_?.Remove();
    this.Sj_ = undefined;
    this.Jh = undefined;
    this.Mj_?.Remove();
    this.Mj_ = undefined;
  }
}
exports.PerformSwitchState = PerformSwitchState;
//# sourceMappingURL=PerformSwitchState.js.map