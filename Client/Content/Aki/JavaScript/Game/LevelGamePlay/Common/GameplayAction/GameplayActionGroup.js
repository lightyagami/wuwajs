"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayActionGroup = undefined;
class GameplayActionGroup {
  constructor() {
    this.OwnerId = 0;
    this.y5o = new Array();
    this.ac = 0;
    this.k4f = undefined;
    this.uMg = () => {
      for (const t of this.y5o) {
        if (!t.IsLoop() && !t.IsFinish()) {
          return;
        }
      }
      for (const s of this.y5o) {
        if (!s.IsFinish()) {
          s.InterruptAction();
        }
      }
      this.ac = 2;
      this.k4f?.(this.OwnerId);
    };
  }
  PushAction(t) {
    this.y5o.push(t);
  }
  ExecuteActionGroup(t, s) {
    this.ac = 1;
    for (const o of this.y5o) {
      o.ExecuteAction(this.uMg);
      if (o.NeedTick()) {
        t?.PushAction(o);
      }
    }
    this.k4f = s;
    this.uMg();
  }
  InterruptActionGroup() {
    for (const t of this.y5o) {
      t.InterruptAction();
    }
    this.ac = 2;
  }
  GetState() {
    return this.ac;
  }
}
exports.GameplayActionGroup = GameplayActionGroup;
//# sourceMappingURL=GameplayActionGroup.js.map