"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayActionManager = undefined;
const Queue_1 = require("../../../../Core/Container/Queue");
class ActionGroupQueue {
  constructor() {
    this.Queue = new Queue_1.Queue();
    this.OnFinish = undefined;
  }
}
class GameplayActionManager {
  constructor() {
    this.q4f = 0;
    this.O4f = new Map();
    this.G4f = undefined;
    this.k4f = t => {
      var s = this.O4f.get(t);
      if (s) {
        (s = s.Queue).Pop();
        if (s.Size > 0) {
          s.Front.ExecuteActionGroup(this.G4f, this.k4f);
        } else {
          this.O4f.get(t)?.OnFinish?.();
          this.O4f.delete(t);
        }
      }
    };
  }
  Init(t) {
    this.G4f = t;
  }
  Clear() {
    this.Interrupt();
    this.G4f = undefined;
  }
  Interrupt() {
    this.G4f?.Clear();
    for (const s of this.O4f.values()) {
      for (var t = s.Queue; t.Size > 0;) {
        t.Pop().InterruptActionGroup();
      }
    }
    this.O4f.clear();
  }
  ExecuteActionGroups(t, s) {
    if (t.length <= 0) {
      s?.();
    } else {
      var e = ++this.q4f;
      var i = new ActionGroupQueue();
      i.OnFinish = s;
      this.O4f.set(e, i);
      for (const o of t) {
        o.OwnerId = e;
        i.Queue.Push(o);
      }
      i.Queue.Front.ExecuteActionGroup(this.G4f, this.k4f);
    }
  }
}
exports.GameplayActionManager = GameplayActionManager;
//# sourceMappingURL=GameplayActionManager.js.map