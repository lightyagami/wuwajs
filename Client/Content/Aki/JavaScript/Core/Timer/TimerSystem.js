"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GameplayTimerSystem = exports.FlowTimeTimerSystem = exports.RealTimeTimerSystem = exports.TimerSystem = exports.TimerSystemInstance = exports.TimerHandle = exports.MAX_TIME = exports.MIN_TIME = undefined;
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const PriorityQueue_1 = require("../Container/PriorityQueue");
exports.MIN_TIME = 20;
exports.MAX_TIME = 180000;
const MAX_LOOP = 10;
const FOREVER = 0;
class TimerHandle {
  constructor(t) {
    this.Me = t;
    this.Id = 0;
    this.Id = ++TimerHandle.o6;
  }
  Valid() {
    return this.Me?.Has(this) ?? false;
  }
  Remove() {
    return this.Me?.Remove(this) ?? false;
  }
  IsPause() {
    return this.Me?.IsPause(this) ?? false;
  }
  Pause() {
    return this.Me?.Pause(this) ?? false;
  }
  Resume() {
    return this.Me?.Resume(this) ?? false;
  }
  ChangeDilation(t) {
    return this.Me?.ChangeDilation(this, t) ?? false;
  }
}
(exports.TimerHandle = TimerHandle).o6 = 0;
class Timer {
  constructor(t, i, e, s, r, o, h, n) {
    this.Id = t;
    this.IO = i;
    this.Interval = e;
    this.kC = s;
    this.Dilation = r;
    this.Handle = o;
    this.MJ = h;
    this.Reason = n;
    this.Now = -0;
    this.Next = -0;
    this.t6 = 0;
    this.State = 0;
    this.Next = this.Now + e / r;
  }
  Do() {
    var t = this.Next;
    var i = t - this.Now;
    var e = this.MJ;
    this.Now = t;
    this.Next = t + this.Interval / this.Dilation;
    this.t6 += 1;
    e?.Start();
    try {
      this.Handle = undefined;
      this.IO(i);
    } catch (t) {
      if (t instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Timer", 1, "定时器执行异常", t, ["id", this.Id], ["reason", this.Reason], ["error", t.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Timer", 1, "定时器执行异常", ["id", this.Id], ["reason", this.Reason], ["error", t]);
      }
    }
    e?.Stop();
    return this.kC === FOREVER || this.t6 < this.kC;
  }
  Copy() {
    this.Handle = undefined;
    var t = new Timer(this.Id, this.IO, this.Interval, this.kC, this.Dilation, undefined, this.MJ, this.Reason);
    t.Now = this.Now;
    t.Next = this.Next;
    t.t6 = this.t6;
    t.State = this.State;
    return t;
  }
  Clear() {
    this.IO = undefined;
    this.Handle = undefined;
    this.MJ = undefined;
  }
}
Timer.Compare = (t, i) => t.Next - i.Next;
class TimerSystemInstance {
  constructor() {
    this.Now = 0;
    this.Timers = new Map();
    this.Queue = new PriorityQueue_1.PriorityQueue(Timer.Compare);
    this.Stat = Stats_1.Stat.Create("TimerSystem.Tick");
    this.StatWeakMap = new WeakMap();
    this.Registry = new FinalizationRegistry(t => {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Timer", 1, "移除TimerHandle已经被GC的定时器", ["timer", t]);
      }
      this.gK(t);
    });
  }
  Tick(t) {
    this.Stat?.Start();
    var i = this.Now + t;
    for (var e = (this.Now = i, this.Queue); !e.Empty;) {
      var s = e.Top;
      if (!s || s.Next > i) {
        break;
      }
      e.Pop();
      if (s.State === 0) {
        if (s.Do()) {
          e.Push(s);
        } else {
          this.gK(s);
        }
      }
    }
    this.Stat?.Stop();
  }
  Has(t) {
    return t !== undefined && this.Timers.has(t.Id);
  }
  Loop(t, i, e, s = 1, r = undefined, o = undefined, h = true) {
    if (TimerSystemInstance.j6(i, o, h) && TimerSystemInstance.yJ(e) && TimerSystemInstance.IJ(s)) {
      return this.fK(t, i, e, s, r, o);
    }
  }
  Forever(t, i, e = 1, s = undefined, r = undefined, o = true) {
    if (TimerSystemInstance.j6(i, r, o) && TimerSystemInstance.IJ(e)) {
      return this.fK(t, i, FOREVER, e, s, r);
    }
  }
  Delay(t, i, e = undefined, s = undefined, r = true, o = 1) {
    if (TimerSystemInstance.j6(i, s, r)) {
      return this.fK(t, i, 1, o, e, s);
    }
  }
  EmitOnTime(t, i, e = undefined, s = undefined, r = true, o = 1) {
    i -= this.Now;
    if (TimerSystemInstance.j6(i, s, r)) {
      return this.fK(t, i, 1, o, e, s);
    }
  }
  Next(t, i = undefined, e = undefined) {
    return this.fK(t, 1, 1, 1, i, e);
  }
  Remove(t) {
    t = this.TJ(t);
    return t && this.gK(t);
  }
  IsPause(t) {
    t = this.TJ(t);
    return t && t.State === 1;
  }
  Pause(t) {
    var i;
    var e = this.TJ(t);
    return !!e && (e.State !== 0 ? (Log_1.Log.CheckError() && Log_1.Log.Error("Timer", 1, "计时器已废弃或暂停", ["id", t.Id], ["state", e.State]), false) : (i = e.Copy(), e.State = 2, i.Next = i.Next - this.Now, i.State = 1, this.Registry.unregister(e), this.Timers.set(t.Id, i), this.Registry.register(t, i, i), true));
  }
  Resume(t) {
    var i = this.TJ(t);
    return !!i && (i.State !== 1 ? (Log_1.Log.CheckError() && Log_1.Log.Error("Timer", 1, "计时器已废弃或非暂停", ["id", t.Id], ["state", i.State]), false) : (i.Next = i.Next + this.Now, i.State = 0, this.Queue.Push(i), true));
  }
  ChangeInterval(t, i, e, s = true) {
    if (!TimerSystemInstance.j6(i, e, s)) {
      return false;
    }
    e = this.TJ(t);
    if (!e) {
      return false;
    }
    if (e.State === 2 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Timer", 1, "计时器已废弃", ["id", t.Id], ["interval", i]);
    }
    if (e.Interval !== i) {
      s = this.Now;
      if (e.State === 1) {
        const o = e.Next + i - e.Interval;
        e.Next = o < 0 ? 0 : o;
        e.Interval = i;
      } else {
        var r = e.Copy();
        e.State = 2;
        const o = r.Next + i - r.Interval;
        r.Next = o < s ? s : o;
        r.Interval = i;
        this.Registry.unregister(e);
        this.Timers.set(t.Id, r);
        this.Queue.Push(r);
        this.Registry.register(t, r, r);
      }
    }
    return true;
  }
  ChangeDilation(t, i) {
    var e;
    var s;
    var r;
    return !!TimerSystemInstance.IJ(i) && !!(e = this.TJ(t)) && (e.State === 2 && Log_1.Log.CheckError() && Log_1.Log.Error("Timer", 1, "计时器已废弃", ["id", t.Id], ["dilation", i]), e.Dilation !== i && (s = this.Now, e.State === 1 ? (e.Next = e.Next * e.Dilation / i, e.Dilation = i) : (r = e.Copy(), e.State = 2, r.Next = s + (r.Next - s) * r.Dilation / i, r.Dilation = i, this.Registry.unregister(e), this.Timers.set(t.Id, r), this.Queue.Push(r), this.Registry.register(t, r, r))), true);
  }
  async Wait(i, e = undefined) {
    return new Promise(t => {
      this.Delay(() => {
        t();
      }, i, e);
    });
  }
  TJ(t) {
    if (t) {
      return this.LJ(t.Id);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Timer", 1, "计时器句柄为空");
    }
  }
  LJ(t) {
    if (t <= 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Timer", 1, "计时器句柄非法", ["id", t]);
      }
    } else {
      var i = this.Timers.get(t);
      if (i) {
        return i;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Timer", 1, "计时器句柄不存在", ["id", t]);
      }
    }
  }
  fK(i, e, s, r, o, h) {
    if (i) {
      let t = undefined;
      if (!o && !(t = this.StatWeakMap.get(i))) {
        t = undefined;
        this.StatWeakMap.set(i, t);
      }
      var n = this.Now;
      var a = new TimerHandle(this);
      var s = new Timer(a.Id, i, e, s, r, a, o ?? t, h);
      s.Now = n;
      s.Next = n + e / r;
      this.Timers.set(a.Id, s);
      this.Queue.Push(s);
      this.Registry.register(a, s, s);
      return a;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Timer", 1, "定时器处理方法不存在", ["handle", i]);
    }
  }
  gK(t) {
    this.Registry.unregister(t);
    t.State = 2;
    t.Clear();
    this.Timers.delete(t.Id);
    return true;
  }
  static j6(t, i = undefined, e = true) {
    if (t < exports.MIN_TIME) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Timer", 1, "计时器间隔必须在合理范围内，请检查定时器间隔参数", ["MIN_TIME", exports.MIN_TIME], ["MAX_TIME", exports.MAX_TIME], ["interval", t]);
      }
      return false;
    } else {
      if (e && t > exports.MAX_TIME) {
        if (i) {
          if (Log_1.Log.CheckInfo()) {
            Log_1.Log.Info("Timer", 1, "计时器间隔较长，此处显式打印辅助定位问题", ["MIN_TIME", exports.MIN_TIME], ["MAX_TIME", exports.MAX_TIME], ["interval", t], ["reason", i]);
          }
        } else if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Timer", 1, "计时器间隔必须在合理范围内，请联系 CC 确认时间是否合理", ["MIN_TIME", exports.MIN_TIME], ["MAX_TIME", exports.MAX_TIME], ["interval", t]);
        }
      }
      return true;
    }
  }
  static yJ(t) {
    return !(t <= 1) && !(t > MAX_LOOP) || (Log_1.Log.CheckError() && Log_1.Log.Error("Timer", 1, "计时器次数必须在合理范围内，请检查定时器循环次数参数", ["MAX_LOOP", MAX_LOOP], ["loop", t]), false);
  }
  static IJ(t) {
    return !(t <= 0) || !(Log_1.Log.CheckError() && Log_1.Log.Error("Timer", 1, "计时器时间缩放不能小于等于 0 ，请检查定时器时间缩放参数", ["dilation", t]), 1);
  }
}
exports.TimerSystemInstance = TimerSystemInstance;
exports.TimerSystem = new TimerSystemInstance();
exports.RealTimeTimerSystem = new TimerSystemInstance();
exports.FlowTimeTimerSystem = new TimerSystemInstance();
exports.GameplayTimerSystem = new TimerSystemInstance(); //# sourceMappingURL=TimerSystem.js.map