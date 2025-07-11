"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Queue = undefined;
const Log_1 = require("../Common/Log");
const MINIMUM_GROW = 4;
const THREE_QUARTER = 0.75;
class Queue {
  constructor(t = MINIMUM_GROW) {
    this.t7 = 0;
    this.i7 = 0;
    this.n6 = 0;
    this.o7 = t;
    this.r7 = new Array(t);
  }
  get Size() {
    return this.n6;
  }
  Push(t) {
    if (this.n6 === this.r7.length) {
      let t = this.r7.length * 2;
      if (t < this.r7.length + MINIMUM_GROW) {
        t = this.r7.length + MINIMUM_GROW;
      }
      this.n7(t);
    }
    this.r7[this.i7] = t;
    this.i7 = (this.i7 + 1) % this.r7.length;
    this.n6++;
  }
  Pop() {
    var t;
    var i;
    var s;
    if (this.n6) {
      t = this.r7[this.t7];
      this.r7[this.t7] = undefined;
      this.t7 = (this.t7 + 1) % this.r7.length;
      this.n6--;
      if ((i = this.r7.length) > MINIMUM_GROW && i > this.o7 && (s = Math.floor(i / 2), this.n6 === s) && (s = Math.floor(i * THREE_QUARTER)) > this.o7) {
        this.n7(s);
      }
      return t;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Container", 3, "队列为空");
    }
  }
  get Front() {
    if (this.n6) {
      return this.r7[this.t7];
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Container", 3, "队列为空");
    }
  }
  Get(t) {
    if (this.n6) {
      if (!(t < 0) && !(t >= this.n6)) {
        return this.r7[(this.t7 + t) % this.r7.length];
      }
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Container", 14, "下标越界", ["index", t], ["size", this.n6]);
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Container", 14, "队列为空");
    }
  }
  n7(t) {
    if (this.n6 === 0) {
      this.r7.length = t;
      this.t7 = 0;
      this.i7 = 0;
    } else {
      var i = this.r7.length;
      if (t < i) {
        if (this.t7 === 0) {
          this.r7.length = t;
          this.i7 = this.i7 % t;
        } else {
          var s = i - t;
          var h = i - s;
          if (this.t7 < this.i7) {
            let i = 0;
            for (let t = h; t < this.i7; ++t) {
              this.r7[i++] = this.r7[t];
              this.r7[t] = undefined;
            }
            if (h <= this.t7) {
              this.t7 = (this.t7 + s) % t;
            }
            s = this.i7 - h;
            this.i7 = s > 0 ? s % t : this.i7 % t;
            this.r7.length = t;
          } else if (this.t7 >= this.i7) {
            var e = i - this.t7;
            var r = t - e;
            for (let t = 0; t < e; ++t) {
              this.r7[r + t] = this.r7[this.t7 + t];
              this.r7[this.t7 + t] = undefined;
            }
            this.r7.length = t;
            this.t7 = r;
          }
        }
      } else {
        this.r7.length = t;
        if (this.i7 === 0) {
          this.i7 = this.n6;
        } else if (this.t7 >= this.i7) {
          var o = i - this.t7;
          var _ = this.r7.length - o;
          for (let t = 0; t < o; ++t) {
            this.r7[_ + t] = this.r7[this.t7 + t];
            this.r7[this.t7 + t] = undefined;
          }
          this.t7 = _;
        }
      }
    }
  }
  get Empty() {
    return this.n6 === 0;
  }
  Clear() {
    this.r7.length = 0;
    this.t7 = 0;
    this.i7 = 0;
    this.n6 = 0;
  }
}
exports.Queue = Queue;
//# sourceMappingURL=Queue.js.map