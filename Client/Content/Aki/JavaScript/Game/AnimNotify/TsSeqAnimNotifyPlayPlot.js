"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const Log_1 = require("../../Core/Common/Log");
const FlowController_1 = require("../Module/Plot/Flow/FlowController");
class TsSeqAnimNotifyPlayPlot extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.PlotName = undefined;
  }
  Constructor() {}
  GetNotifyName() {
    return "播客户端剧情";
  }
  K2_Notify(o, t) {
    var e;
    var l;
    var r;
    if (this.PlotName) {
      if ((r = this.PlotName.split(",")) && r.length === 3) {
        e = r[0];
        l = r[1];
        r = r[2];
        if (e && l && r) {
          FlowController_1.FlowController.StartFlowForView(e, Number(l), Number(r), {
            AudioAttachActor: o.GetOwner()
          }, false);
          return true;
        } else {
          if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Plot", 45, "TsSeqAnimNotifyPlayPlot 不存在的播放信息", ["this.PlotName", e], ["this.PlotId", l], ["this.StateId", r]);
          }
          return false;
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Plot", 45, "TsSeqAnimNotifyPlayPlot PlotArray数量不对");
        }
        return false;
      }
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Plot", 45, "TsSeqAnimNotifyPlayPlot 不存在的PlotName播放信息");
      }
      return false;
    }
  }
}
exports.default = TsSeqAnimNotifyPlayPlot;
//# sourceMappingURL=TsSeqAnimNotifyPlayPlot.js.map