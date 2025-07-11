"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueOpGridFocus = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const MapRogueOp_1 = require("./MapRogueOp");
class MapRogueOpGridFocus extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments);
    this.wk1 = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().FocusTime;
    this.StepSize = 1;
    this.ExecuteInMapView = true;
    this.ExecuteAfterMapViewShow = true;
  }
  ToString() {
    return `[GridFocus] IncId:${this.IncId} GridId:${this.Data.i41?.UEc}`;
  }
  OnStartExecute(e) {
    this.Execute(e);
  }
  OnExecute(e) {
    var s = this.Data.i41;
    if (s) {
      e.SetInteractAvailable(4, false);
      this.P41(e, s.UEc, s.$B1, s.jEc, s.WB1).then(() => {
        e.SetInteractAvailable(4, true);
        this.Execute(e);
      });
    }
  }
  async P41(e, s, t, i, r) {
    e.FocusOnGrid(s);
    const o = new CustomPromise_1.CustomPromise();
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      o.SetResult();
    }, this.wk1);
    await o.Promise;
    for (const u of i) {
      e.SetGridVisionProxy(u, true);
    }
    const n = new CustomPromise_1.CustomPromise();
    TimerSystem_1.GameplayTimerSystem.Delay(() => {
      n.SetResult();
    }, t);
    await n.Promise;
    if (r) {
      e.FocusOnGrid(e.PlayerGridIndex);
      const a = new CustomPromise_1.CustomPromise();
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        a.SetResult();
      }, this.wk1);
      await a.Promise;
    }
  }
  OnFinish(e) {}
}
exports.MapRogueOpGridFocus = MapRogueOpGridFocus;
//# sourceMappingURL=MapRogueOpGridFocus.js.map