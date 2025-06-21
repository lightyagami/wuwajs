"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomArenaProcessManager = void 0;
const Log_1 = require("../../../../../Core/Common/Log");
class PhantomArenaProcessManager {
  constructor(t) {
    this.Proxy = t, this.kh = new Map, this.Sia = [], this.ED1 = !1, this.vK = !1, this.Mp1 = new Map([
      [2, [1]],
      [3, [2, 1]],
      [4, [3]],
      [5, [4]],
      [6, [5]],
      [7, [6]],
      [8, [6, 7]],
      [9, [8]],
      [10, [9]]
    ]), this.Cbo = 0
  }
  get State() {
    return this.Cbo
  }
  get IsInOwnPlaying() {
    return 8 === this.Cbo
  }
  InitStateMap() {
    this.kh.set(1, this.Proxy.ShowTimeStart), this.kh.set(2, this.Proxy.ShowOwnChangeCard), this.kh.set(3, this.Proxy.ShowBothDrawCard), this.kh.set(4, this.Proxy.ShowOpponentStartPanel), this.kh.set(5, this.Proxy.StartAiOperation), this.kh.set(6, this.Proxy.ShowOwnStartPanel), this.kh.set(7, this.Proxy.ShowOwnCoreCard), this.kh.set(8, this.Proxy.ShowOwnPlaying), this.kh.set(9, this.Proxy.RoundOver), this.kh.set(10, this.Proxy.JumpLoading)
  }
  async ID1(t) {
    this.vK || (this.Sia.push(t), this.ED1) || await this.TD1()
  }
  async TD1() {
    var t, s;
    0 !== this.Sia.length && (t = this.Sia.shift(), (s = this.Mp1.get(t)) && !s.includes(this.Cbo) ? Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "设置状态不允许", ["当前状态", this.Cbo], ["设置状态", t]) : (this.ED1 = !0, this.Cbo = t, Log_1.Log.CheckInfo() && Log_1.Log.Info("PhantomArena", 10, "状态流程", ["设置状态", t]), (s = this.kh.get(t)) && await s(), this.ED1 = !1), await this.TD1())
  }
  SetState(t) {
    this.ID1(t)
  }
  Clear() {
    this.Sia.length = 0, this.kh.clear(), this.vK = !0
  }
}
exports.PhantomArenaProcessManager = PhantomArenaProcessManager;
//# sourceMappingURL=PhantomArenaProcessManager.js.map