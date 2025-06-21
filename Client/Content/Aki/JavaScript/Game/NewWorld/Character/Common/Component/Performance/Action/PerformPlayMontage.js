"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PerformPlayMontage = void 0;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  PerformActionBase_1 = require("./PerformActionBase");
class PerformPlayMontage extends PerformActionBase_1.PerformActionBase {
  constructor() {
    super(...arguments), this.yj_ = 0, this.sDe = void 0, this._j_ = e => {
      this.sDe && EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_) && EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_), this.yj_ === e && this.FinishExecute()
    }
  }
  OnExecute() {
    var e = this.PerformComp.Entity.GetComponent(44);
    e && (this.yj_ = e.MontageManager.PlayMontage(this.Param), 0 < this.yj_) ? (this.sDe = ModelManager_1.ModelManager.CreatureModel.GetEntityById(this.PerformComp.Entity.Id), this.sDe && EventSystem_1.EventSystem.AddWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_)) : this.FinishExecute()
  }
  OnInterrupt() {
    var e = this.PerformComp.Entity.GetComponent(44).MontageManager.GetRemainDuration(this.yj_);
    this.Param.Duration = e, this.yj_ = 0, EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_) && EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_)
  }
  OnReset() {
    this.sDe && EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_) && EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.PerformMontageStop, this._j_), this.yj_ = 0, this.sDe = void 0
  }
}
exports.PerformPlayMontage = PerformPlayMontage;
//# sourceMappingURL=PerformPlayMontage.js.map