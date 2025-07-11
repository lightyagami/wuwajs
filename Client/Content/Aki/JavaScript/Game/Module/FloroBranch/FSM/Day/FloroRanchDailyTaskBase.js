"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchDailyTaskBase = undefined;
class FloroRanchDailyTaskBase {
  constructor() {
    this.TaskId = 0;
    this.wlu = false;
    this.Alu = undefined;
    this.TaskId = FloroRanchDailyTaskBase.f_r++;
  }
  BindCompleteCallBack(s) {
    this.Alu = s;
  }
  Execute() {
    this.wlu = true;
    this.OnAddEventListener();
    this.OnExecute();
  }
  Tick(s) {
    if (this.wlu) {
      this.OnTick(s);
    }
  }
  Complete() {
    this.wlu = false;
    this.OnRemoveEventListener();
    this.OnComplete();
    this.Alu(this.TaskId);
  }
  ForceFinish() {}
  OnExecute() {}
  OnAddEventListener() {}
  OnTick(s) {}
  OnRemoveEventListener() {}
  OnComplete() {}
}
(exports.FloroRanchDailyTaskBase = FloroRanchDailyTaskBase).f_r = 0;
//# sourceMappingURL=FloroRanchDailyTaskBase.js.map