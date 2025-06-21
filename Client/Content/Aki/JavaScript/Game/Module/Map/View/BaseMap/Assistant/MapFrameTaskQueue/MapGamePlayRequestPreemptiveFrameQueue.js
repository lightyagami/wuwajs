"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapGamePlayRequestPreemptiveFrameQueue = void 0;
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  SimplePreemptiveFrameQueue_1 = require("../../../../Misc/PreemptiveFrameQueue/SimplePreemptiveFrameQueue");
class MapGamePlayRequestPreemptiveFrameQueue extends SimplePreemptiveFrameQueue_1.SimplePreemptiveFrameQueue {
  constructor() {
    super(...arguments), this.PF = new Map
  }
  OnTaskComplete(e) {
    super.OnTaskComplete(e);
    let r = this.PF.get(e.InstId);
    void 0 === r && ((r = new Protocol_1.Aki.Protocol.xR_).r6n = e.InstId, r.Uxs = [], this.PF.set(e.InstId, r));
    e = e.GamePlayId;
    r.Uxs.includes(e) || r.Uxs.push(e)
  }
  OnLateExecuteTasksFrame() {
    var e;
    0 < this.PF.size && (e = Array.from(this.PF.values()), ControllerHolder_1.ControllerHolder.LevelPlayReportController.RequestLevelPlayStateListAsync(e), this.PF.clear())
  }
}
exports.MapGamePlayRequestPreemptiveFrameQueue = MapGamePlayRequestPreemptiveFrameQueue;
//# sourceMappingURL=MapGamePlayRequestPreemptiveFrameQueue.js.map