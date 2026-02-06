"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerActionRunner = undefined;
class GuessJokerActionRunner {
  constructor() {
    this.Queue = [];
    this.CurrentAction = undefined;
  }
  PushAction(t) {
    this.Queue.push(t);
  }
  PushActions(t) {
    this.Queue.push(...t);
  }
  Tick(t) {
    if (!this.CurrentAction) {
      this.CurrentAction = this.GetNextAction();
      if (this.CurrentAction) {
        this.CurrentAction.Start();
      }
    }
    if (this.CurrentAction && (this.CurrentAction.Tick(t), this.CurrentAction.IsDone())) {
      this.OnActionDone(this.CurrentAction);
      this.CurrentAction.Finish();
      this.CurrentAction = undefined;
    }
    this.OnTick(t);
  }
  Destroy() {
    this.OnDestroy();
    if (this.CurrentAction) {
      this.CurrentAction.Finish();
    }
    this.Queue.length = 0;
    this.CurrentAction = undefined;
  }
  GetNextAction() {
    return this.Queue.shift();
  }
  OnTick(t) {}
  OnActionDone(t) {}
  OnDestroy() {}
}
exports.GuessJokerActionRunner = GuessJokerActionRunner;
//# sourceMappingURL=GuessJokerActionRunner.js.map