"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GuessJokerPlotActionRunner = undefined;
const Log_1 = require("../../../../../Core/Common/Log");
class GuessJokerPlotActionRunner {
  constructor() {
    this.Queue = [];
    this.CurrentAction = undefined;
    this.EMg = new Map();
    this.IMg = new Set();
    this.TMg = false;
    this.u7g = new Map();
  }
  PushPlotActions(t) {
    for (const i of t) {
      this.bMg(i);
    }
  }
  bMg(t) {
    var i;
    var s;
    var o;
    var e = t.Timing;
    if (e) {
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GuessJokerCard", 78, "猜鬼牌剧情 - PlotActionRunner.PushPlotAction.PushPlotAction：push plot action " + t.PlotId);
      }
      if (this.CurrentAction && this.CurrentAction.CanHardCut && t.CanHardCut) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("GuessJokerCard", 78, `猜鬼牌剧情 - PlotActionRunner.PushPlotAction.硬切：打断当前plot ${this.CurrentAction.PlotId}，执行新plot ${t.PlotId}`);
        }
        this.c7g();
        this.CurrentAction = t;
        this.CurrentAction.Start();
      } else {
        i = this.RMg(e, t.PlayerType);
        s = this.LMg(e, t.PlayerType);
        o = this.wMg(e, t.PlayerType);
        if (i || s || o) {
          if (Log_1.Log.CheckDebug()) {
            Log_1.Log.Debug("GuessJokerCard", 78, `猜鬼牌剧情 - PlotActionRunner.PushPlotAction.${e}失败，因为：队列中：${i}，执行中：${s}，CD中：${o}`);
          }
        } else {
          this.u7g.set(t, Date.now());
          this.Queue.push(t);
        }
      }
    }
  }
  c7g() {
    var t;
    var i;
    var s;
    if (Log_1.Log.CheckDebug()) {
      Log_1.Log.Debug("GuessJokerCard", 78, "猜鬼牌剧情 - PlotActionRunner.InterruptCurrentAction：interrupt current action");
    }
    if (this.CurrentAction) {
      s = (t = this.CurrentAction).Timing;
      i = t.PlayerType;
      s = this.Sjg(s, i);
      this.IMg.delete(s);
      this.TMg = false;
      this.u7g.delete(t);
      this.OnActionDone(t);
      t.Finish();
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GuessJokerCard", 78, "猜鬼牌剧情 - PlotActionRunner.InterruptCurrentAction：finish current action");
      }
      this.CurrentAction = undefined;
    }
  }
  RMg(t, i) {
    for (const s of this.Queue) {
      if (s && !s.IsDone() && s.PlayerType !== undefined && s.Timing !== undefined && s.Timing === t && s.PlayerType === i) {
        return true;
      }
    }
    return false;
  }
  Sjg(t, i) {
    return t + "_" + i;
  }
  LMg(t, i) {
    t = this.Sjg(t, i);
    return this.IMg.has(t);
  }
  wMg(t, i) {
    t = this.Sjg(t, i);
    i = this.EMg.get(t);
    return !!i && Date.now() < i;
  }
  PMg(t, i) {
    var s = t.Cd;
    if (s > 0) {
      i = this.Sjg(i, t.PlayerType);
      this.EMg.set(i, Date.now() + s);
    }
  }
  Tick(t) {
    var i;
    var s;
    if (this.CurrentAction === undefined && this.Queue.length > 0 && (this.CurrentAction = this.GetNextAction(), this.CurrentAction)) {
      this.CurrentAction.Start();
    }
    if (this.CurrentAction && (this.CurrentAction.Tick(t), i = (t = this.CurrentAction).Timing, s = t.PlayerType, s = this.Sjg(i, s), this.IMg.has(s) || this.IMg.add(s), this.TMg || t.IsInDelay || (this.PMg(t, i), this.TMg = true), this.CurrentAction.IsDone())) {
      this.OnActionDone(this.CurrentAction);
      this.CurrentAction.Finish();
      this.CurrentAction = undefined;
    }
  }
  GetNextAction() {
    let t = undefined;
    while (this.Queue.length > 0) {
      var i = this.Queue.shift();
      if (!i) {
        break;
      }
      var s = this.u7g.get(i);
      if (!s) {
        t = i;
        break;
      }
      this.u7g.delete(i);
      var o = i.WaitDeleteTime;
      if (o <= 0) {
        t = i;
        break;
      }
      s = Date.now() - s;
      if (s < o) {
        if (Log_1.Log.CheckDebug()) {
          Log_1.Log.Debug("GuessJokerCard", 78, `猜鬼牌剧情 - PlotActionRunner.Tick.执行plot ${i.PlotId}，等待时间：${s}ms，配置WaitDeleteTime：${o}ms`);
        }
        t = i;
        break;
      }
      if (Log_1.Log.CheckDebug()) {
        Log_1.Log.Debug("GuessJokerCard", 78, `猜鬼牌剧情 - PlotActionRunner.Tick.丢弃plot ${i.PlotId}，等待时间：${s}ms，已超过配置WaitDeleteTime：${o}ms`);
      }
    }
    return t;
  }
  OnActionDone(t) {
    var i = t.Timing;
    var t = t.PlayerType;
    var i = this.Sjg(i, t);
    this.IMg.delete(i);
    this.TMg = false;
  }
  Destroy() {
    if (this.CurrentAction) {
      this.CurrentAction.Finish();
      this.CurrentAction = undefined;
    }
    this.EMg.clear();
    this.IMg.clear();
    this.TMg = false;
    this.Queue.length = 0;
  }
}
exports.GuessJokerPlotActionRunner = GuessJokerPlotActionRunner;
//# sourceMappingURL=GuessJokerPlotActionRunner.js.map