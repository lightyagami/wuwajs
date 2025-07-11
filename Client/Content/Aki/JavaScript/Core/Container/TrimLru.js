"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrimLru = undefined;
const Log_1 = require("../Common/Log");
const USED_THRESHOLD = 3;
class Node {
  constructor(t, i, s) {
    this.Key = t;
    this.Value = i;
    this.Size = s;
    this.Prev = undefined;
    this.Next = undefined;
    this.Count = 0;
  }
}
class TrimLru {
  constructor(t, i = false) {
    this.X7 = i;
    this.l7 = true;
    this.s6 = 0;
    this.a6 = -0;
    this._7 = new Map();
    this.t7 = undefined;
    this.i7 = undefined;
    this.n6 = 0;
    this.h6 = 0;
    this.l6 = 0;
    this.u7 = 0;
    this.c7 = 0;
    if (t < 2) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 1, "容量必须大于 1", ["capacity", t]);
      }
    } else {
      this.s6 = t;
      this.a6 = 1 - 1 / t;
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
      this.a6 = 1 - 1 / t;
      this.h6 = this.h6 / this.s6 * t;
      this.l6 = this.l6 / this.s6 * t;
      this.s6 = t;
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
  Get(t) {
    if (this.l7) {
      t = this._7.get(t);
      if (t) {
        this.C7(t);
        t.Count += 1;
        this.g7(t);
        this.h6 = this.h6 * this.a6 + t.Size;
        this.l6 = this.l6 * this.a6;
        return t.Value;
      }
      this.h6 = this.h6 * this.a6;
      this.l6 = this.l6 * this.a6 + 1;
    }
  }
  Put(t, i, s = 1) {
    if (!t) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 1, "无效键", ["key", t]);
      }
      return false;
    }
    if (this._7.has(t)) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 1, "键已存在", ["key", t]);
      }
      return false;
    }
    if (!this.X7 && !i) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Core", 1, "无效对象", ["value", i]);
      }
      return false;
    }
    if (!this.l7) {
      return false;
    }
    i = new Node(t, i, s);
    this._7.set(t, i);
    this.g7(i);
    while (this.n6 > this.s6) {
      this.d7();
    }
    return true;
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
    this.n6 += t.Size;
    this.u7 += t.Count * t.Size;
    if (t.Count >= USED_THRESHOLD) {
      this.c7 += t.Count * t.Size;
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
    this.n6 -= t.Size;
    this.u7 -= t.Count * t.Size;
    if (t.Count >= USED_THRESHOLD) {
      this.c7 -= t.Count * t.Size;
    }
  }
  d7() {
    var t;
    if (this.i7) {
      t = this.i7;
      this.C7(t);
      t.Count = 0;
      this._7.delete(t.Key);
    }
  }
}
exports.TrimLru = TrimLru;
//# sourceMappingURL=TrimLru.js.map