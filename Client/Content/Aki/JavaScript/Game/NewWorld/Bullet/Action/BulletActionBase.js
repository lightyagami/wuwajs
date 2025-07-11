"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BulletActionTest = exports.BulletActionBase = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const BulletConstant_1 = require("../BulletConstant");
class BulletActionBase {
  constructor(t) {
    this.IsInPool = false;
    this.Index = 0;
    this.IsFinish = false;
    this.BulletInfo = undefined;
    this.ActionInfo = undefined;
    this.gW = undefined;
    this.Type = t;
    if (BulletConstant_1.BulletConstant.OpenAllActionStat) {
      this.gW = Stats_1.Stat.CreateNoFlameGraph("BulletActionTick" + t);
    }
  }
  Execute(t, e) {
    this.BulletInfo = t;
    this.ActionInfo = e;
    this.OnExecute();
  }
  OnExecute() {}
  Tick(t) {
    this.gW?.Start();
    this.OnTick(t);
    this.gW?.Stop();
  }
  OnTick(t) {}
  AfterTick(t) {}
  GetActionInfo() {
    return this.ActionInfo;
  }
  Clear() {
    this.IsFinish = false;
    this.BulletInfo = undefined;
    this.ActionInfo = undefined;
  }
}
class BulletActionTest extends (exports.BulletActionBase = BulletActionBase) {
  OnExecute() {
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("Bullet", 17, "BulletActionTest", ["BulletId", this.BulletInfo.BulletRowName]);
    }
  }
}
exports.BulletActionTest = BulletActionTest;
//# sourceMappingURL=BulletActionBase.js.map