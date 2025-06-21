"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaCardTaskData = void 0;
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem");
class PhantomArenaCardTaskData {
  constructor(t) {
    this.IsOwn = t, this.A21 = [], this.Buu = !1, this.FinishTaskNum = 0, this.IsExecuteFourCostLogic = !1, this.TaskCardConfigId = 0
  }
  get IsAllFinish() {
    return this.Buu
  }
  get AllTaskNum() {
    return this.A21.length
  }
  SetTaskData(t) {
    this.A21 = t.L21, this.Buu = t.CM_, this.TaskCardConfigId = t.Eg1, this.FinishTaskNum = 0;
    for (const e of this.A21) e.CM_ && this.FinishTaskNum++;
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.NotifyCardTaskData, this.IsOwn)
  }
  GetConditionDescCurrentProgress(t) {
    let e = 0;
    for (const s of this.A21) s.dLs === t && (e = s.tvs);
    return e
  }
}
exports.PhantomArenaCardTaskData = PhantomArenaCardTaskData;
//# sourceMappingURL=PhantomArenaCardTaskData.js.map