"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlowActionServerAction = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const FlowNetworks_1 = require("../Flow/FlowNetworks");
const FlowActionBase_1 = require("./FlowActionBase");
class FlowActionServerAction extends FlowActionBase_1.FlowActionBase {
  constructor() {
    super(...arguments);
    this.X$i = false;
  }
  Execute(t, o, e) {
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Plot", 17, "===>服务器剧情行为开始", ["", t.Name], ["actionId", t.ActionId], ["background", o.IsBackground]);
    }
    this.Context = o;
    this.ActionInfo = t;
    this.X$i = e;
    if (this.Context.IsServerNotify) {
      if (o.IsBackground) {
        this.OnBackgroundExecute();
      } else {
        this.OnExecute();
      }
      if (this.X$i) {
        this.FinishExecute(true);
      }
    } else {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Plot", 26, "非服务器触发的剧情无法使用服务器行为！");
      }
      this.FinishExecute(true);
    }
  }
  OnExecute() {
    this.RequestServerAction(!this.X$i);
  }
  OnBackgroundExecute() {
    this.OnExecute();
  }
  RequestServerAction(t = false) {
    FlowNetworks_1.FlowNetworks.RequestAction(this.Context.FlowIncId, this.ActionInfo.ActionId, () => {
      if (t) {
        this.FinishExecute(true);
      }
    });
  }
}
exports.FlowActionServerAction = FlowActionServerAction;
//# sourceMappingURL=FlowActionServerAction.js.map