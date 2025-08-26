"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaCardTaskData = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
class PhantomArenaCardTaskData {
  constructor(t) {
    this.IsOwn = t;
    this.aG1 = [];
    this.iEu = false;
    this.FinishTaskNum = 0;
    this.IsExecuteFourCostLogic = false;
    this.TaskCardConfigId = 0;
  }
  get IsAllFinish() {
    return this.iEu;
  }
  get AllTaskNum() {
    return this.aG1.length;
  }
  SetTaskData(t) {
    this.aG1 = t.nG1;
    this.iEu = t.CM_;
    this.TaskCardConfigId = t.Wg1;
    this.FinishTaskNum = 0;
    for (const e of this.aG1) {
      if (e.CM_) {
        this.FinishTaskNum++;
      }
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyCardTaskData, this.IsOwn);
  }
  GetConditionDescCurrentProgress(t) {
    let e = 0;
    for (const s of this.aG1) {
      if (s.dLs === t) {
        e = s.tvs;
      }
    }
    return e;
  }
}
exports.PhantomArenaCardTaskData = PhantomArenaCardTaskData;
//# sourceMappingURL=PhantomArenaCardTaskData.js.map