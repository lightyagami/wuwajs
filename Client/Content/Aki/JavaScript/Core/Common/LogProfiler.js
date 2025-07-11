"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogProfiler = undefined;
const Stack_1 = require("../Container/Stack");
const StringUtils_1 = require("../Utils/StringUtils");
const Log_1 = require("./Log");
const ONE_SECOND = 1000;
class LogProfiler {
  constructor(r, o = false) {
    this.u9 = undefined;
    this.he = r;
    this.B8 = 0;
    this.c9 = -1;
    this.Time = 0;
    this.t6 = 0;
    this.m9 = o;
    this.d9 = "";
  }
  static Create(r) {
    return new LogProfiler(r);
  }
  SetDescribe(r) {
    this.d9 = r;
  }
  CreateChild(r, o = false) {
    this.u9 ||= new Array();
    r = new LogProfiler(r, o);
    r.B8 = this.B8 + 1;
    this.u9.push(r);
    return r;
  }
  Reset() {
    this.c9 = -1;
    this.Time = 0;
    this.t6 = 0;
    if (this.u9) {
      for (let r = this.u9.length - 1; r >= 0; --r) {
        if (this.u9[r].m9) {
          this.u9[r].Reset();
          this.u9.splice(r, 1);
        }
      }
      for (const r of this.u9) {
        r.Reset();
      }
    }
  }
  Start() {
    if (this.c9 !== -1 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Log", 3, "[LogProfiler.Start] error, repeat start, name: ", ["this.Name", this.he]);
    }
    this.c9 = Date.now();
  }
  Restart() {
    this.Reset();
    this.Start();
  }
  Stop() {
    if (this.c9 === -1 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("Log", 3, "[LogProfiler.Stop] error, repeat stop, name: ", ["this.Name", this.he]);
    }
    this.Time += Date.now() - this.c9;
    this.t6 += 1;
    this.c9 = -1;
  }
  C9() {
    LogProfiler.g9.push("\n");
    for (let r = 0; r < this.B8; ++r) {
      LogProfiler.g9.push("    ");
    }
    var r;
    LogProfiler.g9.push(this.he);
    if (!(this.t6 <= 0)) {
      LogProfiler.g9.push(", ");
      LogProfiler.g9.push("Describe");
      LogProfiler.g9.push(": ");
      LogProfiler.g9.push(this.d9);
      LogProfiler.g9.push(" [");
      LogProfiler.g9.push("Count");
      LogProfiler.g9.push(": ");
      LogProfiler.g9.push(this.t6);
      LogProfiler.g9.push(", ");
      LogProfiler.g9.push("Time");
      LogProfiler.g9.push(": ");
      if (this.Time < ONE_SECOND) {
        LogProfiler.g9.push(this.Time);
        LogProfiler.g9.push(" ms");
      } else {
        LogProfiler.g9.push(this.Time / ONE_SECOND);
        LogProfiler.g9.push(" s");
      }
      if (this.t6 > 1) {
        LogProfiler.g9.push(", Average: ");
        r = this.Time / this.t6;
        if (this.Time < ONE_SECOND) {
          LogProfiler.g9.push(r);
          LogProfiler.g9.push(" ms");
        } else {
          LogProfiler.g9.push(r / ONE_SECOND);
          LogProfiler.g9.push(" s");
        }
      }
      LogProfiler.g9.push("]");
    }
  }
  ToString() {
    if (LogProfiler.f9) {
      return this.p9();
    }
    LogProfiler.g9.length = 0;
    LogProfiler.v9.Clear();
    LogProfiler.v9.Push(this);
    while (LogProfiler.v9.Size > 0) {
      var r = LogProfiler.v9.Pop();
      r.C9();
      var o = r.u9;
      if (o && o.length !== 0) {
        for (let r = o.length - 1; r >= 0; --r) {
          LogProfiler.v9.Push(o[r]);
        }
      }
    }
    var i = LogProfiler.g9.join(StringUtils_1.EMPTY_STRING);
    LogProfiler.g9.length = 0;
    return i;
  }
  p9() {
    LogProfiler.g9.length = 0;
    LogProfiler.v9.Clear();
    var r = new Stack_1.Stack();
    LogProfiler.v9.Push(this);
    r.Push(this.B8);
    while (LogProfiler.v9.Size > 0) {
      var i = LogProfiler.v9.Pop();
      i.M9();
      var o = i.u9;
      if (o?.length) {
        for (let r = o.length - 1; r >= 0; --r) {
          LogProfiler.v9.Push(o[r]);
        }
      }
      var e = LogProfiler.v9.Peek();
      if (e && e.B8 < i.B8) {
        var t = i.B8 - e.B8;
        LogProfiler.g9.push("\n");
        for (let o = 0; o < t; ++o) {
          for (let r = 0; r < i.B8 - 1 - o; ++r) {
            LogProfiler.g9.push("    ");
          }
          LogProfiler.g9.push("</Element>\n");
        }
      }
    }
    LogProfiler.g9.push(this.u9?.length ? "\n</Element>\n" : "");
    r = LogProfiler.g9.join(StringUtils_1.EMPTY_STRING);
    LogProfiler.g9.length = 0;
    return r;
  }
  M9() {
    LogProfiler.g9.push("\n");
    for (let r = 0; r < this.B8; ++r) {
      LogProfiler.g9.push("    ");
    }
    var r;
    LogProfiler.g9.push("<Element ");
    LogProfiler.g9.push(`Name="${this.he}"`);
    if (!(this.t6 <= 0)) {
      LogProfiler.g9.push(` Count="${this.t6}"`);
      LogProfiler.g9.push(" Time=\"");
      if (this.Time < ONE_SECOND) {
        LogProfiler.g9.push(this.Time);
        LogProfiler.g9.push("ms");
      } else {
        LogProfiler.g9.push(this.Time / ONE_SECOND);
        LogProfiler.g9.push("s");
      }
      LogProfiler.g9.push("\" ");
      if (this.t6 > 1) {
        LogProfiler.g9.push("Average=\"");
        r = this.Time / this.t6;
        if (this.Time < ONE_SECOND) {
          LogProfiler.g9.push(r);
          LogProfiler.g9.push("ms");
        } else {
          LogProfiler.g9.push(r / ONE_SECOND);
          LogProfiler.g9.push("s");
        }
        LogProfiler.g9.push("\" ");
      }
      LogProfiler.g9.push(` Des="${this.d9}"`);
    }
    LogProfiler.g9.push(this.u9?.length ? ">" : "/>");
  }
}
(exports.LogProfiler = LogProfiler).f9 = false;
LogProfiler.g9 = new Array();
LogProfiler.v9 = new Stack_1.Stack(); //# sourceMappingURL=LogProfiler.js.map