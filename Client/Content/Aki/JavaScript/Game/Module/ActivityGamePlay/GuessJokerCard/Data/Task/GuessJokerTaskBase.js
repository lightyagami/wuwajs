"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerTaskBase = undefined;
const Log_1 = require("../../../../../../Core/Common/Log");
class GuessJokerTaskBase {
  constructor() {
    this.TaskId = 0;
    this.c_u = false;
    this.jqc = false;
    this.FinishTime = 0;
    this.zZt = 0;
    this.TaskType = 0;
    this.IsRequestFinished = false;
    this.TaskId = GuessJokerTaskBase.f_r++;
  }
  get IsExecuting() {
    return this.c_u;
  }
  get IsWaitingForPlayerInput() {
    return this.TaskType === 1 && this.IsExecuting;
  }
  Execute() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("GuessJokerCard", 78, "GuessJokerTaskBase：Execute", ["TaskType", this.constructor.name], ["TaskId", this.TaskId]);
    }
    this.c_u = true;
    this.OnAddEventListener();
    this.OnExecute();
  }
  Tick(s) {
    if (!!this.c_u && (!this.IsWaitingForPlayerInput || this.FinishTime !== 0)) {
      if (this.FinishTime > 0 && (this.zZt += s, this.zZt >= this.FinishTime)) {
        this._Lf();
      } else {
        this.OnTick(s);
      }
    }
  }
  _Lf() {
    if (this.c_u) {
      this.OnRemoveEventListener();
      this.OnComplete();
      this.jqc = true;
    }
  }
  FinishTask() {
    this._Lf();
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("GuessJokerCard", 78, "GuessJokerTaskBase：FinishTask", ["TaskType", this.constructor.name], ["TaskId", this.TaskId]);
    }
  }
  IsFinished() {
    return this.jqc;
  }
  CanSendRequest() {
    return this.TaskType === 1 && !this.IsRequestFinished;
  }
  SetRequestFinished(s) {
    if (this.TaskType === 1) {
      this.IsRequestFinished = s;
    }
  }
  OnExecute() {}
  OnAddEventListener() {}
  OnTick(s) {}
  OnRemoveEventListener() {}
  OnComplete() {}
}
(exports.GuessJokerTaskBase = GuessJokerTaskBase).f_r = 0;
//# sourceMappingURL=GuessJokerTaskBase.js.map