"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RacingBetsCommandBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
class RacingBetsCommandBase {
  constructor() {
    this.CommandIndex = 0;
    this.ActionIndex = 0;
    this.IsAborted = false;
    this.CommandType = 0;
    this.BulletScreenTimes = [];
    this.CommandIndex = ++RacingBetsCommandBase.f_r;
  }
  async Execute() {
    this.za1();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RacingBetsDungeon", 58, "Command Start", ["CommandInfo", this.LogInfo()], ["CommandIndex", this.CommandIndex], ["CommandType", this.CommandType]);
    }
    this.OnActive();
    await this.OnExecute();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("RacingBetsDungeon", 58, "Command Finish", ["CommandInfo", this.LogInfo()], ["CommandIndex", this.CommandIndex], ["CommandType", this.CommandType]);
    }
    this.OnDeActive();
  }
  OnActive() {}
  OnDeActive() {}
  async OnExecute() {}
  LogInfo() {
    return "RacingBetsCommandBase";
  }
  PushBulletScreenTimes(e) {
    this.BulletScreenTimes = e;
  }
  GetRandomBulletScreen(t) {
    var n = t.reduce((e, t) => e + t.D8n, 0);
    if (n !== 0) {
      let e = Math.floor(Math.random() * n);
      for (const s of t) {
        if (e < s.D8n) {
          s.D8n--;
          return s.kJ_;
        }
        e -= s.D8n;
      }
    }
    return 0;
  }
  za1() {
    for (var e, t = []; (e = this.GetRandomBulletScreen(this.BulletScreenTimes)) !== 0;) {
      t.push(e);
    }
    if (!(t.length <= 0)) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRacingBetsPushBulletScreen, t, false);
    }
  }
}
(exports.RacingBetsCommandBase = RacingBetsCommandBase).f_r = 0;
//# sourceMappingURL=RacingBetsCommandBase.js.map