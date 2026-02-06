"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayAction = undefined;
class GameplayAction {
  constructor() {
    this.IsLoopInner = false;
    this.NeedTickInner = false;
    this.B4f = false;
    this.wj_ = undefined;
  }
  ExecuteAction(t) {
    this.wj_ = t;
    this.OnExecuteAction();
  }
  IsFinish() {
    return this.B4f;
  }
  IsLoop() {
    return this.IsLoopInner;
  }
  NeedTick() {
    return this.NeedTickInner;
  }
  TickAction(t) {}
  InterruptAction() {
    this.OnInterruptAction();
    this.B4f = true;
  }
  FinishExecute() {
    this.B4f = true;
    this.wj_?.();
  }
}
exports.GameplayAction = GameplayAction;
//# sourceMappingURL=GameplayAction.js.map