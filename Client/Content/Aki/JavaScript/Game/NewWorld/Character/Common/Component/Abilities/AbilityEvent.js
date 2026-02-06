"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AbilityEvent = exports.DEFAULT_KEY = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
const Event_1 = require("../../../../../../Core/Event/Event");
exports.DEFAULT_KEY = 0;
class AbilityEventInstance {
  constructor() {
    this.Nx_ = new Map();
  }
  Add(t, e, s, i) {
    let n = this.Nx_.get(e);
    if (!n) {
      this.Nx_.set(e, n = new TargetEmitter("Event" + e));
    }
    n.Add(t, s, i);
  }
  Emit(t, e, s, ...i) {
    e = this.Nx_.get(e);
    if (e) {
      e.Emit(t, s, ...i);
    }
  }
  Remove(t, e, s, i) {
    e = this.Nx_.get(e);
    if (e) {
      e.Remove(t, s, i);
    }
  }
}
class TargetEmitter {
  constructor(t) {
    this.Name = t;
    this.Emitters = new WeakMap();
    this.Vx_ = {};
  }
  iqc(t) {
    this.Vx_[t] ||= this.Name + "_" + t;
  }
  Add(t, e, s) {
    this.iqc(e);
    let i = this.Emitters.get(t);
    if (!i) {
      this.Emitters.set(t, i = new Event_1.Event(this.Vx_, 0));
    }
    i.Add(e, s);
  }
  Emit(t, e, ...s) {
    this.iqc(e);
    t = this.Emitters.get(t);
    if (t) {
      if (t.IsEmitting(e)) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Event", 85, "技能事件重复发送", ["name", this.Vx_[e]]);
        }
      } else {
        t.Emit(e, ...s);
      }
    }
  }
  Remove(t, e, s) {
    this.iqc(e);
    t = this.Emitters.get(t);
    if (t) {
      t.Remove(e, s);
    }
  }
}
exports.AbilityEvent = new AbilityEventInstance();
//# sourceMappingURL=AbilityEvent.js.map