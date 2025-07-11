"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateMachine = undefined;
const Log_1 = require("../../Common/Log");
const Stats_1 = require("../../Common/Stats");
class StateMachine {
  constructor(t, e = undefined) {
    this.kh = new Map();
    this.Owner = t;
    this.Pz = e;
  }
  get CurrentState() {
    return this.xz?.State;
  }
  Start(t) {
    if (this.xz !== undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("StateMachine", 11, "状态机重复启动", ["state", t]);
      }
      return false;
    } else {
      this.xz = this.GetState(t);
      return !!this.xz && (this.xz.Start(), this.Pz && this.Pz(t, t), true);
    }
  }
  Destroy() {
    for (const t of this.kh.values()) {
      t.Destroy();
    }
  }
  Switch(t) {
    if (this.xz === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("StateMachine", 11, "状态机没有开始", ["state", t]);
      }
      return false;
    }
    StateMachine.wz.Start();
    var e;
    var a = this.GetState(t);
    StateMachine.wz.Stop();
    return !!a && !(t === this.xz.State ? !this.xz.CanReEnter() || (this.xz.ReEnter(), 0) : (e = this.xz.State, !a.CanChangeFrom(e) || (StateMachine.Bz.Start(), this.xz.Exit(t), this.xz = a, this.xz.Enter(e), StateMachine.Bz.Stop(), this.Pz && (StateMachine.bz.Start(), this.Pz(e, t), StateMachine.bz.Stop()), 0)));
  }
  Update(t) {
    if (this.xz) {
      this.xz.Update(t);
    }
  }
  AddState(t, e, a) {
    if (this.kh.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("StateMachine", 11, "状态重复添加", ["state", t]);
      }
    } else {
      e = new e(this.Owner, t, this);
      this.kh.set(t, e);
      StateMachine.qz.Start();
      e.Create(a);
      StateMachine.qz.Stop();
    }
  }
  GetState(t) {
    var e = this.kh.get(t);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("StateMachine", 11, "状态不存在", ["state", t]);
      }
    }
    return e;
  }
}
(exports.StateMachine = StateMachine).qz = Stats_1.Stat.Create("StateMachine.Stat0");
StateMachine.wz = Stats_1.Stat.Create("StateMachine.Stat1");
StateMachine.Bz = Stats_1.Stat.Create("StateMachine.Stat2");
StateMachine.bz = Stats_1.Stat.Create("StateMachine.Stat3"); //# sourceMappingURL=StateMachine.js.map