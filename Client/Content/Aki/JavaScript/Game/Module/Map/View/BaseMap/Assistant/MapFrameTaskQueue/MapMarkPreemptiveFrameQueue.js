"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapMarkPreemptiveFrameQueue = undefined;
const EventDefine_1 = require("../../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../../Common/Event/EventSystem");
const SimplePreemptiveFrameQueue_1 = require("../../../../Misc/PreemptiveFrameQueue/SimplePreemptiveFrameQueue");
class MapMarkPreemptiveFrameQueue extends SimplePreemptiveFrameQueue_1.SimplePreemptiveFrameQueue {
  constructor() {
    super(...arguments);
    this.glh = new Map();
  }
  AddTask(e) {
    super.AddTask(e);
    let t = this.glh.get(e.MarkType);
    if (!t) {
      t = new Map();
      this.glh.set(e.MarkType, t);
    }
    t.set(e.MarkId, e);
  }
  ForceExecuteTask(e, t) {
    var s = this.plh(e, t);
    if (s) {
      s.Execute();
      this.CancelMapTask(e, t);
    }
  }
  Flush() {
    this.EnableFlush = true;
    this.Process();
    this.EnableFlush = false;
  }
  CancelMapTask(e, t) {
    e = this.plh(e, t);
    if (e) {
      this.CancelTask(e);
      this.flh(e);
    }
  }
  flh(e) {
    var t = this.glh.get(e.MarkType);
    if (t) {
      t.delete(e.MarkId);
    }
  }
  HasTask(e, t) {
    return this.plh(e, t) !== undefined;
  }
  plh(e, t) {
    if (e === 0) {
      let e = undefined;
      for (const [, s] of this.glh) {
        if (e = s.get(t)) {
          break;
        }
      }
      return e;
    }
    const s = this.glh.get(e);
    if (s) {
      return s.get(t);
    }
  }
  CancelMapTaskByType(e) {
    e = this.glh.get(e);
    if (e) {
      for (var [, t] of e) {
        this.CancelTask(t);
        this.flh(t);
      }
    }
  }
  OnTaskComplete(e) {
    super.OnTaskComplete(e);
    this.flh(e);
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMapMarkTaskComplete, e.MarkType, e.MarkId);
  }
}
exports.MapMarkPreemptiveFrameQueue = MapMarkPreemptiveFrameQueue;
//# sourceMappingURL=MapMarkPreemptiveFrameQueue.js.map