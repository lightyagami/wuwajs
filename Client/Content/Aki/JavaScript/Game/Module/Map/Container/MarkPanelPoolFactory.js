"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MarkItemViewPoolFactory = undefined;
const Time_1 = require("../../../../Core/Common/Time");
const MAX_PANEL_HANDLE_CACHE_TIME = 10000;
class MarkItemViewPoolFactory {
  static J2t(t) {
    let e = this.c8_.get(t);
    if (!e) {
      e = new MarkPanelPool();
      this.c8_.set(t, e);
    }
    return e;
  }
  static Get(t) {
    return this.J2t(t).Get();
  }
  static Push(t, e) {
    this.J2t(t).Push(e);
  }
  static Recycle(t, e) {
    this.J2t(t).Recycle(e);
  }
  static Tick() {
    for (const t of this.c8_.values()) {
      t.Tick();
    }
  }
  static Dispose() {
    for (const t of this.c8_.values()) {
      t.Dispose();
    }
    this.c8_.clear();
  }
}
(exports.MarkItemViewPoolFactory = MarkItemViewPoolFactory).c8_ = new Map();
class MarkItemViewPoolBase {
  constructor() {
    this.Handles = [];
  }
  Get() {
    if (this.Handles.length > 0) {
      return this.Handles.shift().Obj;
    }
  }
  Push(t) {
    t = {
      RecycleTimeStamp: Time_1.Time.ServerTimeStamp,
      Obj: t
    };
    this.Handles.push(t);
  }
  Recycle(t) {
    t = {
      RecycleTimeStamp: Time_1.Time.ServerTimeStamp,
      Obj: t
    };
    this.Handles.push(t);
  }
  Tick() {
    this.OnTick();
  }
  OnTick() {}
  Dispose() {
    this.OnDispose();
  }
  OnDispose() {}
}
class MarkPanelPool extends MarkItemViewPoolBase {
  OnTick() {
    for (let t = this.Handles.length - 1; t >= 0; --t) {
      var e = this.Handles[t];
      if (Time_1.Time.ServerTimeStamp - e.RecycleTimeStamp > MAX_PANEL_HANDLE_CACHE_TIME) {
        e.Obj.RecycleToPool();
        this.Handles.splice(t, 1);
      }
    }
  }
  OnDispose() {
    for (const t of this.Handles) {
      t.Obj.RecycleToPool();
    }
    this.Handles.length = 0;
  }
}
//# sourceMappingURL=MarkPanelPoolFactory.js.map