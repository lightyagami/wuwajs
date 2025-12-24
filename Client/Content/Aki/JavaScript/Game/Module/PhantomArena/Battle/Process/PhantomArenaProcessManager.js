"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomArenaProcessManager = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
class PhantomArenaProcessManager {
  constructor(t) {
    this.Proxy = t;
    this.kh = new Map();
    this.Sia = [];
    this.JD1 = false;
    this.vK = false;
    this.$p1 = new Map([[2, [1]], [3, [2, 1]], [4, [3]], [5, [4]], [6, [5]], [7, [5, 6]], [8, [7]], [9, [7, 8]], [10, [9]], [11, [10]]]);
    this.Cbo = 0;
  }
  get State() {
    return this.Cbo;
  }
  get IsInOwnPlaying() {
    return this.Cbo === 9;
  }
  get IsNotInOwnPlaying() {
    return this.Cbo < 9;
  }
  InitStateMap() {
    this.kh.set(1, this.Proxy.ShowTimeStart);
    this.kh.set(2, this.Proxy.ShowOwnChangeCard);
    this.kh.set(3, this.Proxy.ShowBothDrawCard);
    this.kh.set(4, this.Proxy.ShowOpponentStartPanel);
    this.kh.set(5, this.Proxy.StartAiOperation);
    this.kh.set(6, this.Proxy.ShowGameOver);
    this.kh.set(7, this.Proxy.ShowOwnStartPanel);
    this.kh.set(8, this.Proxy.ShowOwnCoreCard);
    this.kh.set(9, this.Proxy.ShowOwnPlaying);
    this.kh.set(10, this.Proxy.RoundOver);
    this.kh.set(11, this.Proxy.JumpLoading);
  }
  async ZD1(t) {
    if (!this.vK && !(this.Sia.push(t), this.JD1)) {
      await this.eU1();
    }
  }
  async eU1() {
    var t;
    var s;
    if (this.Sia.length !== 0) {
      t = this.Sia.shift();
      if ((s = this.$p1.get(t)) && !s.includes(this.Cbo)) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "设置状态不允许", ["当前状态", this.Cbo], ["设置状态", t]);
        }
      } else {
        this.JD1 = true;
        this.Cbo = t;
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("PhantomArena", 10, "状态流程", ["设置状态", t]);
        }
        if (s = this.kh.get(t)) {
          await s();
        }
        this.JD1 = false;
      }
      await this.eU1();
    }
  }
  SetState(t) {
    this.ZD1(t);
  }
  Clear() {
    this.Sia.length = 0;
    this.kh.clear();
    this.vK = true;
  }
}
exports.PhantomArenaProcessManager = PhantomArenaProcessManager;
//# sourceMappingURL=PhantomArenaProcessManager.js.map