"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.MapRogueOpGridFocus = void 0;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpGridFocus extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments), this.JB1 = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().FocusTime, this.StepSize = 1, this.ExecuteInMapView = !0, this.ExecuteAfterMapViewShow = !0
  }
  ToString() {
    return `[GridFocus] IncId:${this.IncId} GridId:` + this.Data.T31?.UEc
  }
  OnStartExecute(e) {
    this.Execute(e)
  }
  OnExecute(e) {
    var s = this.Data.T31;
    s && (e.SetInteractAvailable(4, !1), this.Z31(e, s.UEc, s.mB1, s.jEc, s.fB1).then(() => {
      e.SetInteractAvailable(4, !0), this.Execute(e)
    }))
  }
  async Z31(e, s, t, i, r) {
    e.FocusOnGrid(s);
    const o = new CustomPromise_1.CustomPromise;
    TimerSystem_1.TimerSystem.Delay(() => {
      o.SetResult()
    }, this.JB1), await o.Promise;
    for (const u of i) e.SetGridVisionProxy(u, !0);
    const n = new CustomPromise_1.CustomPromise;
    if (TimerSystem_1.TimerSystem.Delay(() => {
        n.SetResult()
      }, t), await n.Promise, r) {
      e.FocusOnGrid(e.PlayerGridIndex);
      const a = new CustomPromise_1.CustomPromise;
      TimerSystem_1.TimerSystem.Delay(() => {
        a.SetResult()
      }, this.JB1), await a.Promise
    }
  }
  OnFinish(e) {}
}
exports.MapRogueOpGridFocus = MapRogueOpGridFocus;
//# sourceMappingURL=MapRogueOpGridFocus.js.map