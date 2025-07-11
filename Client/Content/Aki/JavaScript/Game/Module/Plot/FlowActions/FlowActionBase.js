"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
class FlowActionBase {
  constructor() {
    this.Type = "";
    this.ActionInfo = undefined;
    this.Callback = undefined;
    this.Runner = undefined;
    this.Owner = undefined;
    this.Context = undefined;
  }
  Execute(t, i, o) {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Plot", 26, "===>剧情行为开始", ["", t.Name], ["actionId", t.ActionId], ["background", i.IsBackground]);
    }
    this.Context = i;
    this.ActionInfo = t;
    if (i.IsBackground) {
      this.OnBackgroundExecute();
    } else {
      this.OnExecute();
    }
    if (o) {
      this.FinishExecute(true);
    }
  }
  OnExecute() {}
  OnBackgroundExecute() {
    this.FinishExecute(true);
  }
  InterruptExecute() {
    this.OnInterruptExecute();
  }
  OnInterruptExecute() {}
  RecordAction(t) {
    if (this.Context) {
      if (t) {
        this.Context.RollbackRecord.push(t);
      } else {
        this.Context.RollbackRecord.push({
          ActionInfo: this.ActionInfo
        });
      }
    }
  }
  Rollback(t, i) {
    var o = t.ActionInfo;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 26, "剧情行为回退", ["name", o.Name], ["actionId", o.ActionId]);
    }
    this.OnRollback(t, i);
  }
  OnRollback(t, i) {}
  FinishExecute(t, i = true) {
    var o;
    if (this.ActionInfo && this.Runner && (Log_1.Log.CheckDebug() && Log_1.Log.Debug("Plot", 26, "<===剧情行为结束", ["", this.ActionInfo?.Name], ["actionId", this.ActionInfo?.ActionId], ["isSuccess", t], ["isContinue", i]), this.ActionInfo = undefined, this.Runner = undefined, this.Context = undefined, this.Callback)) {
      o = this.Callback;
      this.Callback = undefined;
      o(t, i);
    }
  }
  Recycle() {
    this.Owner?.RecycleAction(this);
  }
}
exports.FlowActionBase = FlowActionBase;
//# sourceMappingURL=FlowActionBase.js.map