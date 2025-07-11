"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FrequencyMonitor = undefined;
const Info_1 = require("../../Core/Common/Info");
const Log_1 = require("../../Core/Common/Log");
const Time_1 = require("../../Core/Common/Time");
const Queue_1 = require("../../Core/Container/Queue");
const ModelManager_1 = require("../Manager/ModelManager");
const CombatDebugController_1 = require("./CombatDebugController");
class FrequencyMonitor {
  constructor(e, o, r, ...t) {
    this.Ql = e;
    this.t6 = o;
    this.vgr = r;
    this.OPt = undefined;
    this.Mgr = new Queue_1.Queue();
    this.OPt = t;
  }
  Execute() {
    if (Info_1.Info.IsBuildDevelopmentOrDebug) {
      for (this.Mgr.Push(Time_1.Time.NowSeconds); !this.Mgr.Empty && Time_1.Time.NowSeconds - this.Mgr.Front > this.Ql;) {
        this.Mgr.Pop();
      }
      if (this.Mgr.Size > this.t6) {
        let e = [["msg", this.vgr], ["检查时间", this.Ql], ["检查次数", this.t6], ["当前次数", this.Mgr.Size], ["联机", ModelManager_1.ModelManager.GameModeModel.IsMulti]];
        if (this.OPt) {
          e = e.concat(this.OPt);
        }
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("FrequencyMonitor", 14, "业务逻辑执行频率过高", ...e);
        }
        var o;
        var r;
        var t = {};
        for ([o, r] of e) {
          t[o] = r;
        }
        var i = JSON.stringify(t);
        CombatDebugController_1.CombatDebugController.DataReport("FREQUENCY_MONITOR", i);
      }
    }
  }
}
exports.FrequencyMonitor = FrequencyMonitor;
//# sourceMappingURL=FrequencyMonitor.js.map