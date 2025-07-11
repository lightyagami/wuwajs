"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Lru = undefined;
const Log_1 = require("../Common/Log");
const USED_THRESHOLD = 3;
class Node {
  constructor(t, i) {
    this.Key = t;
    this.Value = i;
    this.Prev = undefined;
    this.Next = undefined;
    this.Count = 0;
  }
}
class Lru {
  constructor(t, i = undefined, s = undefined) {
    this.a7 = i;
    this.h7 = s;
    this.l7 = true;
    this.s6 = 0;
    this.a6 = -0;
    this._7 = new Map();
    this.ve = new WeakMap();
    this.t7 = undefined;
    this.i7 = undefined;
    this.n6 = 0;
    this.h6 = 0;
    this.l6 = 0;
    this.u7 = 0;
    this.c7 = 0;
    this.m7 = new FinalizationRegistry(t => {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 1, "对象被意外回收", ["key", t]);
      }
    });
    if (this.a7) {
      if (t < 2) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Core", 1, "容量必须大于 1", ["capacity", t]);
        }
      } else {
        this.s6 = t;
        this.a6 = 1 - 1 / t;
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Core", 1, "创建器不存在");
    }
  }
  get Enable() {
    return this.l7;
  }
  set Enable(t) {
    if (this.l7 !== t) {
      this.Clear();
    }
    this.l7 = t;
  }
  get Size() {
    return this.n6;
  }
  get Capacity() {
    return this.s6;
  }
  set Capacity(t) {
    if (t < 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 1, "容量必须大于 1", ["capacity", t]);
      }
    } else {
      this.h6 = this.h6 / this.s6 * t;
      this.l6 = this.l6 / this.s6 * t;
      this.s6 = t;
      this.a6 = 1 - 1 / t;
      while (this.n6 > t) {
        this.d7();
      }
    }
  }
  get HitRate() {
    if (this.h6 > 0) {
      return this.h6 / (this.h6 + this.l6);
    } else {
      return 0;
    }
  }
  get UsedAvg() {
    if (this.n6 > 0) {
      return this.u7 / this.n6;
    } else {
      return 0;
    }
  }
  get ThresholdUsedRate() {
    if (this.n6 > 0) {
      return this.c7 / this.n6;
    } else {
      return 0;
    }
  }
  Create(t) {
    if (this.a7) {
      var i;
      var s = this.a7(t);
      if (s) {
        this.m7.register(s, t, s);
        i = new Node(t, s);
        this.ve.set(s, i);
        return s;
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 1, "创建器创建对象为空", ["key", t]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Core", 1, "创建器不存在", ["key", t]);
    }
  }
  Get(t) {
    if (this.l7 && Lru.IsLruEnabledGlobal) {
      var i = this._7.get(t);
      if (i) {
        var s = i.values().next().value;
        if (s) {
          if (i.delete(s) && i.size === 0) {
            this._7.delete(t);
          }
          this.C7(s);
          s.Count += 1;
          this.h6 = this.h6 * this.a6 + 1;
          this.l6 = this.l6 * this.a6;
          return s.Value;
        }
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Core", 1, "存在键对应的节点集合，但集合为空", ["key", t]);
        }
        this.h6 = this.h6 * this.a6;
        this.l6 = this.l6 * this.a6 + 1;
      }
    }
  }
  GetCount(t) {
    if (this.l7 && Lru.IsLruEnabledGlobal && (t = this._7.get(t))) {
      return t.size;
    } else {
      return 0;
    }
  }
  Put(t) {
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 1, "无效对象", ["value", t]);
      }
      return false;
    }
    if (!this.l7 || !Lru.IsLruEnabledGlobal) {
      this.m7.unregister(t);
      this.ve.delete(t);
      return false;
    }
    var i = this.ve.get(t);
    if (!i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 1, "对象不在容器中", ["value", t]);
      }
      return false;
    }
    this.g7(i);
    let s = this._7.get(i.Key);
    if (!s) {
      s = new Set();
      this._7.set(i.Key, s);
    }
    s.add(i);
    if (this.n6 > this.s6) {
      this.d7();
    }
    return true;
  }
  RemoveExternal(t) {
    if (t) {
      this.m7.unregister(t);
      this.ve.delete(t);
      return true;
    } else {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 1, "无效对象", ["value", t]);
      }
      return false;
    }
  }
  Clear() {
    while (this.n6) {
      this.d7();
    }
    this._7.clear();
    this.t7 = undefined;
    this.i7 = undefined;
    this.h6 = 0;
    this.l6 = 0;
  }
  g7(t) {
    t.Prev = undefined;
    t.Next = this.t7;
    if (this.t7) {
      this.t7.Prev = t;
    } else {
      this.i7 = t;
    }
    this.t7 = t;
    this.n6 += 1;
    this.u7 += t.Count;
    if (t.Count >= USED_THRESHOLD) {
      this.c7 += 1;
    }
  }
  C7(t) {
    if (t.Prev) {
      t.Prev.Next = t.Next;
    } else {
      this.t7 = t.Next;
    }
    if (t.Next) {
      t.Next.Prev = t.Prev;
    } else {
      this.i7 = t.Prev;
    }
    t.Prev = undefined;
    t.Next = undefined;
    --this.n6;
    this.u7 -= t.Count;
    if (t.Count >= USED_THRESHOLD) {
      --this.c7;
    }
  }
  d7() {
    var t;
    var i;
    var s;
    if (this.i7) {
      t = this.i7;
      this.C7(t);
      t.Count = 0;
      i = t.Value;
      this.m7.unregister(i);
      if ((s = this._7.get(t.Key)) && s.delete(t) && s.size === 0) {
        this._7.delete(t.Key);
      }
      this.ve.delete(i);
      this.h7?.(i);
    }
  }
}
(exports.Lru = Lru).IsLruEnabledGlobal = true;
//# sourceMappingURL=Lru.js.map