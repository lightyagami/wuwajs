"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapGamePlayRequestPreemptiveFrameQueue = undefined;
const Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder");
const SimplePreemptiveFrameQueue_1 = require("../../../../Misc/PreemptiveFrameQueue/SimplePreemptiveFrameQueue");
class MapGamePlayRequestPreemptiveFrameQueue extends SimplePreemptiveFrameQueue_1.SimplePreemptiveFrameQueue {
  constructor() {
    super(...arguments);
    this.PF = new Map();
  }
  OnTaskComplete(e) {
    super.OnTaskComplete(e);
    let r = this.PF.get(e.InstId);
    if (r === undefined) {
      (r = new Protocol_1.Aki.Protocol.xR_()).r6n = e.InstId;
      r.Uxs = [];
      this.PF.set(e.InstId, r);
    }
    e = e.GamePlayId;
    if (!r.Uxs.includes(e)) {
      r.Uxs.push(e);
    }
  }
  OnLateExecuteTasksFrame() {
    var e;
    if (this.PF.size > 0) {
      e = Array.from(this.PF.values());
      ControllerHolder_1.ControllerHolder.LevelPlayReportController.RequestLevelPlayStateListAsync(e);
      this.PF.clear();
    }
  }
}
exports.MapGamePlayRequestPreemptiveFrameQueue = MapGamePlayRequestPreemptiveFrameQueue;
//# sourceMappingURL=MapGamePlayRequestPreemptiveFrameQueue.js.map