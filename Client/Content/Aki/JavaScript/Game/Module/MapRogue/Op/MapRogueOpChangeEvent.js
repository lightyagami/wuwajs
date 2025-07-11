"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MapRogueOpChangeEvent = undefined;
const CustomPromise_1 = require("../../../../Core/Common/CustomPromise");
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const AsyncTask_1 = require("../../../World/Task/AsyncTask");
const TaskSystem_1 = require("../../../World/Task/TaskSystem");
const MapRogueOp_1 = require("./MapRogueOp");
const EVENT_CHANGE_ANIM_TIME = 500;
class MapRogueOpChangeEvent extends MapRogueOp_1.MapRogueOp {
  constructor() {
    super(...arguments);
    this.wk1 = ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().FocusTime;
    this.StepSize = 1;
    this.ExecuteInMapView = true;
    this.ExecuteAfterMapViewShow = true;
  }
  ToString() {
    return "[ChangeEvent] IncId:" + this.IncId;
  }
  OnStartExecute(e) {
    this.Execute(e);
  }
  OnExecute(s) {
    var t = this.Data.pxu;
    if (t) {
      s.SetInteractAvailable(4, false);
      for (let e = 0; e < t.yxu.length; e++) {
        var r = t.yxu[e];
        var i = e === t.yxu.length - 1;
        this.Lxu(s, r.c5n, r.SIc, i);
      }
    }
  }
  Lxu(r, i, a, n) {
    var e = new AsyncTask_1.AsyncTask("MapRogueOpChangeEvent.SingleGridChangeFlow", async () => {
      r.FocusOnGrid(i);
      const e = new CustomPromise_1.CustomPromise();
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        e.SetResult();
      }, this.wk1);
      await e.Promise;
      r.SetGridData(i, a);
      const s = new CustomPromise_1.CustomPromise();
      TimerSystem_1.GameplayTimerSystem.Delay(() => {
        s.SetResult();
      }, EVENT_CHANGE_ANIM_TIME);
      await s.Promise;
      if (n) {
        r.FocusOnGrid(r.PlayerGridIndex);
        const t = new CustomPromise_1.CustomPromise();
        TimerSystem_1.GameplayTimerSystem.Delay(() => {
          t.SetResult();
        }, this.wk1);
        await t.Promise;
        this.Axu(r);
      }
      return true;
    });
    TaskSystem_1.TaskSystem.AddTask(e);
    TaskSystem_1.TaskSystem.Run();
  }
  Axu(e) {
    e.SetInteractAvailable(4, true);
    this.Execute(e);
  }
  OnFinish(e) {}
}
exports.MapRogueOpChangeEvent = MapRogueOpChangeEvent;
//# sourceMappingURL=MapRogueOpChangeEvent.js.map