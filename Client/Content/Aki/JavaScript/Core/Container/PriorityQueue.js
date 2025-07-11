"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PriorityQueue = undefined;
const Log_1 = require("../Common/Log");
class PriorityQueue {
  constructor(t) {
    this.E7 = t;
    this.S7 = new Array();
    this.y7 = new Map();
  }
  Clone(t) {
    this.Clear();
    for (const h of t.S7) {
      this.S7.push(h);
    }
    for (var [i, s] of t.y7) {
      this.y7.set(i, s);
    }
  }
  get Size() {
    return this.S7.length;
  }
  get Empty() {
    return this.S7.length === 0;
  }
  get Top() {
    if (!(this.S7.length <= 0)) {
      return this.S7[0];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Container", 1, "优先队列为空");
    }
  }
  Clear() {
    this.S7.length = 0;
    this.y7.clear();
  }
  Push(t) {
    var i = this.S7.push(t) - 1;
    this.y7.set(t, i);
    this.I7(i);
  }
  Pop() {
    var t;
    var i;
    if (!(this.S7.length <= 0)) {
      t = this.S7[0];
      this.y7.delete(t);
      i = this.S7.pop();
      if (this.S7.length > 0) {
        this.S7[0] = i;
        this.y7.set(i, 0);
        this.T7(0);
      }
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Container", 1, "优先队列为空");
    }
  }
  Remove(t) {
    var i = this.y7.get(t);
    if (i === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Container", 1, "元素不在优先队列中");
      }
      return false;
    } else {
      if (i === this.S7.length - 1) {
        this.S7.pop();
        this.y7.delete(t);
      } else {
        this.y7.delete(t);
        t = this.S7.pop();
        this.S7[i] = t;
        this.y7.set(t, i);
        this.T7(i);
      }
      return true;
    }
  }
  Update(t) {
    t = this.y7.get(t);
    if (t === undefined) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Container", 1, "元素不在优先队列中");
      }
      return false;
    } else {
      if (!this.I7(t)) {
        this.T7(t);
      }
      return true;
    }
  }
  Heapify() {
    for (let t = Math.floor((this.S7.length - 2) / 2); t >= 0; t--) {
      this.T7(t);
    }
  }
  I7(t) {
    let i = false;
    let s = t;
    while (s > 0) {
      var h = Math.floor((s - 1) / 2);
      if (this.E7(this.S7[s], this.S7[h]) >= 0) {
        break;
      }
      this.fa(s, h);
      s = h;
      i = true;
    }
    return i;
  }
  T7(t) {
    let i = false;
    let s = t;
    while (true) {
      var h = s * 2 + 1;
      var r = s * 2 + 2;
      let t = h;
      if ((t = r < this.S7.length && this.E7(this.S7[r], this.S7[h]) < 0 ? r : t) >= this.S7.length || this.E7(this.S7[s], this.S7[t]) <= 0) {
        break;
      }
      this.fa(s, t);
      s = t;
      i = true;
    }
    return i;
  }
  fa(t, i) {
    var s = this.S7[t];
    this.S7[t] = this.S7[i];
    this.S7[i] = s;
    this.y7.set(this.S7[t], t);
    this.y7.set(this.S7[i], i);
  }
}
exports.PriorityQueue = PriorityQueue;
//# sourceMappingURL=PriorityQueue.js.map