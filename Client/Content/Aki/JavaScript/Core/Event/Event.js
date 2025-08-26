"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = undefined;
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const Macro_1 = require("../Preprocessor/Macro");
const EventConditionListener_1 = require("./EventConditionListener");
const DEFAULT_SMALL_NAME_THRESHOLD = 4096;
class Event {
  constructor(t, e = DEFAULT_SMALL_NAME_THRESHOLD) {
    this.rK = t;
    this.RF_ = e;
    this.nK = new Map();
    this.IHl = new Map();
    this.sK = undefined;
    this.aK = undefined;
    this.AF_ = undefined;
    this.PF_ = new Set();
    this.unh = new Map();
    this.RCu = (t, e) => {
      t = this._K.get(t);
      return t !== undefined && t.has(e);
    };
    this.LCu = new Map();
    this.AF_ = new Int8Array(Math.ceil(this.RF_));
  }
  cnh(t, e, i, n) {
    let r = n.get(t);
    if (!r) {
      r = new Map();
      n.set(t, r);
    }
    r.set(i, e);
  }
  mnh(t, e, i) {
    var n = i.get(t);
    if (n && (n.delete(e), n.size === 0)) {
      i.delete(t);
    }
  }
  dnh(t, e, i) {
    i = i.get(t);
    if (i) {
      return i.get(e);
    }
  }
  AddHoldKeyHandle(t, e, i) {
    this.cnh(t, i, e, this.unh);
  }
  RemoveHoldKeyHandle(t, e) {
    this.mnh(t, e, this.unh);
  }
  GetHoldKeyByHandle(t, e) {
    return this.dnh(t, e, this.unh);
  }
  Has(t, e) {
    var i;
    var e = Event.lK.get(e);
    return !!e && ((i = this.nK.get(t)) && i.has(e) ? !this.RCu(t, e) : (i = this.uK.get(t)) !== undefined && i.has(e));
  }
  Add(t, e) {
    return this.YW(t, e, 0);
  }
  Once(t, e) {
    return this.YW(t, e, 1);
  }
  Remove(t, e) {
    e = Event.lK.get(e);
    return !!e && this.O7(t, e);
  }
  ClearObject(t) {
    var e = this.nK.get(t);
    if (e) {
      for (const i of e.keys()) {
        this.O7(t, i);
      }
    }
    return true;
  }
  Emit(t, ...e) {
    if (this.cK(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 1, "事件重复派发，请检查事件链是否产生循环调用", ["name", this.rK[t]], ["emittingEventInArray", [...this.AF_.entries()].filter(t => t[1] !== 0).map(t => t[0])], ["emittingEventInSet", this.PF_]);
      }
      return false;
    }
    this.mK(t, true);
    var i = this.LCu.get(t);
    if (i && (r = i.GetHandlesByParam(e[0])) && (this.wCu(t, r, i, ...e), r.size === 0)) {
      i.DeleteHandlesByParam(e[0]);
    }
    const n = this.nK.get(t);
    if (n && (this.wCu(t, n, undefined, ...e), n.size === 0)) {
      this.nK.delete(t);
    }
    this.mK(t, false);
    var r = this._K.get(t);
    if (r) {
      for (const s of r) {
        this.gK(t, s);
      }
      r.clear();
      this._K.delete(t);
    }
    e = this.uK.get(t);
    if (e) {
      for (const o of e) {
        this.fK(t, o[0], o[1]);
      }
      e.clear();
      this.uK.delete(t);
    }
    if (i) {
      if (i.PendingRemoveHandles) {
        for (const [h, n] of i.PendingRemoveHandles) {
          for (const a of n) {
            this.ACu(t, h, a);
          }
        }
        i.PendingRemoveHandles.clear();
      }
      if (i.PendingAddHandles) {
        for (const [v, n] of i.PendingAddHandles) {
          for (const _ of n) {
            this.PCu(t, i, _[0], _[1], v);
          }
        }
        i.PendingAddHandles.clear();
      }
      if (i.IsHandlesEmpty()) {
        this.LCu.delete(t);
      }
    }
    return true;
  }
  wCu(e, t, i, ...n) {
    let r = undefined;
    var s;
    if (!!Stats_1.Stat.Enable && !(s = this.rK[e], r = Event.dK.get(s))) {
      r = Stats_1.Stat.CreateNoFlameGraph("Event." + this.rK[e]);
      Event.dK.set(s, r);
    }
    r?.Start();
    for (const v of t) {
      var o = v[0];
      var h = o.deref();
      if (h) {
        if (i ? !i.IsInPendingRemove(o, n[0]) : !this.RCu(e, o)) {
          if (v[1] === 1) {
            if (i) {
              this.xCu(e, o, n[0]);
            } else {
              this.O7(e, o);
            }
          }
          var a = Event.CK.get(h);
          a?.Start();
          try {
            h(...n);
          } catch (t) {
            if (t instanceof Error) {
              if (Log_1.Log.CheckError()) {
                Log_1.Log.ErrorWithStack("Event", 1, "事件处理方法执行异常", t, ["name", this.rK[e]], ["error", t.message]);
              }
            } else if (Log_1.Log.CheckError()) {
              Log_1.Log.Error("Event", 1, "事件处理方法执行异常", ["name", this.rK[e]], ["error", t]);
            }
          }
          a?.Stop();
        }
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 1, "事件处理方法已被回收", ["eventName", this.rK[e]], ["stack", undefined]);
        }
        t.delete(o);
      }
    }
    r?.Stop();
  }
  YW(t, e, i) {
    if (this.rK[t] === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 1, "事件名不存在，请检查事件名是否正确", ["name", t]);
      }
      return false;
    }
    e = this.UCu(t, e);
    if (!this.cK(t)) {
      return this.fK(t, e, i);
    }
    var n = this.nK.get(t);
    var r = this._K.get(t);
    if (n && n.has(e)) {
      if (r && r.has(e)) {
        r.delete(e);
        return true;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 1, "事件已存在，请检查同一个事件名同一个处理函数的注册逻辑", ["name", this.rK[t]]);
        }
        return false;
      }
    }
    let s = this.uK.get(t);
    if (s && s.has(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 1, "事件重复注册在待修改列表，请检查同一个事件名同一个处理函数的注册逻辑", ["name", this.rK[t]]);
      }
      return false;
    } else {
      if (!s) {
        s = new Map();
        this.uK.set(t, s);
      }
      s.set(e, i);
      return true;
    }
  }
  UCu(t, e) {
    let i = Event.lK.get(e);
    var n;
    if (!i) {
      i = new WeakRef(e);
      Event.lK.set(e, i);
    }
    if (Stats_1.Stat.Enable && !Event.CK.has(e)) {
      n = e.name;
      Event.CK.set(e, n && n.length > 0 ? Stats_1.Stat.CreateNoFlameGraph("EventHandle." + n) : undefined);
    }
    return i;
  }
  fK(t, e, i) {
    let n = this.nK.get(t);
    if (n) {
      if (n.has(e)) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 1, "事件重复注册，请检查同一个事件名同一个处理函数的注册逻辑", ["name", this.rK[t]]);
        }
        return false;
      }
    } else {
      n = new Map();
      this.nK.set(t, n);
    }
    n.set(e, i);
    return true;
  }
  O7(t, e) {
    if (!this.cK(t)) {
      return this.gK(t, e);
    }
    var i = this.nK.get(t);
    var n = this.uK.get(t);
    if (!i || !i.has(e)) {
      if (n && n.has(e)) {
        n.delete(e);
        return true;
      } else {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 1, "事件不存在，请检查同一个事件名同一个处理函数的移除逻辑", ["name", this.rK[t]]);
        }
        return false;
      }
    }
    let r = this._K.get(t);
    if (r && r.has(e)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 1, "事件重复移除在待移除列表，请检查同一个事件名同一个处理函数的移除逻辑", ["name", this.rK[t]]);
      }
      return false;
    } else {
      if (!r) {
        r = new Set();
        this._K.set(t, r);
      }
      r.add(e);
      return true;
    }
  }
  gK(t, e) {
    var i = this.nK.get(t);
    if (i && i.delete(e)) {
      if (i.size === 0) {
        this.nK.delete(t);
      }
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 1, "事件不存在，请检查同一个事件名同一个处理函数的移除逻辑", ["name", this.rK[t]]);
      }
      return false;
    }
  }
  cK(t) {
    if (t >= this.RF_ || t < 0) {
      return this.xF_(t);
    } else {
      return this.AF_[t] !== 0;
    }
  }
  xF_(t) {
    return this.PF_.has(t);
  }
  mK(t, e) {
    if (t >= this.RF_ || t < 0) {
      this.UF_(t, e);
    } else {
      this.AF_[t] = e ? 1 : 0;
    }
  }
  UF_(t, e) {
    if (e) {
      this.PF_.add(t);
    } else {
      this.PF_.delete(t);
    }
  }
  get uK() {
    this.sK ||= new Map();
    return this.sK;
  }
  get _K() {
    this.aK ||= new Map();
    return this.aK;
  }
  HasWithCondition(t, e, i) {
    e = Event.lK.get(e);
    return !!e && !!(t = this.LCu.get(t)) && (t.Has(i, e) ? !t.IsInPendingRemove(i, e) : t.IsInPendingAdd(i, e));
  }
  AddWithCondition(t, e, i) {
    return this.DCu(t, e, 0, i);
  }
  OnceWithCondition(t, e, i) {
    return this.DCu(t, e, 1, i);
  }
  DCu(t, e, i, n) {
    if (this.rK[t] === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 18, "事件名不存在，请检查事件名是否正确", ["name", t]);
      }
      return false;
    }
    e = this.UCu(t, e);
    let r = this.LCu.get(t);
    if (!r) {
      r = new EventConditionListener_1.ConditionListener();
      this.LCu.set(t, r);
    }
    if (!this.cK(t)) {
      return this.PCu(t, r, e, i, n);
    }
    if (r.Has(n, e)) {
      const s = r.RemoveFromPendingMoveHandles(n, e);
      if (!s) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 18, "条件事件已存在，请检查同一个事件名同一个处理函数的注册逻辑", ["name", this.rK[t]]);
        }
      }
      return s;
    }
    const s = r.AddToPendingAddHandles(n, e, i);
    if (!s) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 18, "条件事件重复注册在待修改列表，请检查同一个事件名同一个处理函数的注册逻辑", ["name", this.rK[t]]);
      }
    }
    return s;
  }
  PCu(t, e, i, n, r) {
    if (e.Has(r, i)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 18, "事件重复注册，请检查同一个事件名同一个处理函数的注册逻辑", ["name", this.rK[t]]);
      }
      return false;
    } else {
      e.Add(r, i, n);
      return true;
    }
  }
  RemoveWithCondition(t, e, i) {
    e = Event.lK.get(e);
    return !!e && this.xCu(t, e, i);
  }
  xCu(t, e, i) {
    if (!this.cK(t)) {
      return this.ACu(t, i, e);
    }
    var n = this.LCu.get(t);
    if (!n) {
      return true;
    }
    if (!n.Has(i, e)) {
      const r = n.RemoveFromPendingAddHandles(i, e);
      if (!r) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 18, "事件不存在，请检查同一个事件名同一个处理函数的移除逻辑", ["name", this.rK[t]]);
        }
      }
      return r;
    }
    const r = n.AddToPendingRemoveHandles(i, e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 1, "事件重复移除在待移除列表，请检查同一个事件名同一个处理函数的移除逻辑", ["name", this.rK[t]]);
      }
    }
    return r;
  }
  ACu(t, e, i) {
    var n = this.LCu.get(t);
    if (n) {
      if (!(e = n.Remove(e, i))) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 18, "事件条件不存在，请检查同一个事件名同一个处理函数的移除逻辑", ["name", this.rK[t]]);
        }
      }
      n.GetHandleListenCount(i);
      return e;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 18, "事件不存在，请检查同一个事件名同一个处理函数的移除逻辑", ["name", this.rK[t]]);
      }
      return false;
    }
  }
}
(exports.Event = Event).lK = new WeakMap();
Event.dK = new Map();
Event.CK = new WeakMap(); //# sourceMappingURL=Event.js.map