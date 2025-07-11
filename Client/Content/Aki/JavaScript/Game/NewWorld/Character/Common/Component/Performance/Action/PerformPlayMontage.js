"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PerformPlayMontage = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const PerformActionBase_1 = require("./PerformActionBase");
class PerformPlayMontage extends PerformActionBase_1.PerformActionBase {
  constructor() {
    super(...arguments);
    this.yj_ = 0;
    this.sDe = undefined;
    this._j_ = e => {
      if (this.sDe && EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_)) {
        EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_);
      }
      if (this.yj_ === e) {
        this.FinishExecute();
      }
    };
  }
  OnExecute() {
    var e = this.PerformComp.Entity.GetComponent(44);
    if (e && (this.yj_ = e.MontageManager.PlayMontage(this.Param), this.yj_ > 0)) {
      this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.PerformComp.Entity.Id);
      if (this.sDe) {
        EventSystem_1.EventSystem.AddWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_);
      }
    } else {
      this.FinishExecute();
    }
  }
  OnInterrupt() {
    var e = this.PerformComp.Entity.GetComponent(44).MontageManager.GetRemainDuration(this.yj_);
    this.Param.Duration = e;
    this.yj_ = 0;
    if (EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_);
    }
  }
  OnReset() {
    if (this.sDe && EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_)) {
      EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_);
    }
    this.yj_ = 0;
    this.sDe = undefined;
  }
}
exports.PerformPlayMontage = PerformPlayMontage;
//# sourceMappingURL=PerformPlayMontage.js.map