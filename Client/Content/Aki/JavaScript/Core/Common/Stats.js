"use strict";

var __decorate = this && this.__decorate || function (t, e, a, r) {
  var S;
  var c = arguments.length;
  var o = c < 3 ? e : r === null ? r = Object.getOwnPropertyDescriptor(e, a) : r;
  if (typeof Reflect == "object" && typeof Reflect.decorate == "function") {
    o = Reflect.decorate(t, e, a, r);
  } else {
    for (var _ = t.length - 1; _ >= 0; _--) {
      if (S = t[_]) {
        o = (c < 3 ? S(o) : c > 3 ? S(e, a, o) : S(e, a)) || o;
      }
    }
  }
  if (c > 3 && o) {
    Object.defineProperty(e, a, o);
  }
  return o;
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Stat = undefined;
const cpp_1 = require("cpp");
const CycleCounter_1 = require("../Performance/CycleCounter");
const Macro_1 = require("../Preprocessor/Macro");
const Log_1 = require("./Log");
const MAX_CALL_DEPTH = 8;
class Stat {
  constructor(t, e = -1, a = false) {
    this.ac = 0;
    this.JWa = "";
    this.S9 = -1;
    this.lth = false;
    this.JWa = t;
    this.S9 = e;
    this.lth = a;
  }
  static get Enable() {
    return CycleCounter_1.CycleCounter.IsEnabled;
  }
  static Create(t, e = "", a = "") {
    return Stat._th(t, true, e, a);
  }
  static CreateNoFlameGraph(t, e = "", a = "") {
    if (Stat.Enable) {
      return Stat._th(t, false, e, a);
    } else {
      return Stat.uth;
    }
  }
  static CreateInstantStat(t, e = "", a = "") {
    t = Stat.CreateNoFlameGraph(t, e, a);
    t.Start();
    t.Stop();
  }
  static _th(t, e, a = 0, r) {
    if (!t || t.length === 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Stat", 1, "统计创建失败，名字为空");
      }
      return Stat.uth;
    }
    Stat.m6?.Start();
    let S = t;
    if (S.length > CycleCounter_1.STAT_MAX_NAME_LENGTH) {
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Stat", 30, "Stat名字过长", ["name", t]);
      }
      S = t.substring(0, CycleCounter_1.STAT_MAX_NAME_LENGTH);
    }
    t = Stat.Enable ? cpp_1.FKuroCycleCounter.CreateCycleCounter(S) : -1;
    t = new Stat(S, t, e);
    if (Stat.Enable) {
      t.ac = 2;
    }
    Stat.m6?.Stop();
    return t;
  }
  Start() {
    if (Stat.Aoh && this.lth && Stat.eQa < MAX_CALL_DEPTH) {
      cpp_1.FKuroPerfSightHelper.SafePushCall(this.JWa);
    }
    Stat.eQa++;
    if (this.ac !== 0) {
      this.ac = 1;
      cpp_1.FKuroCycleCounter.StartCycleCounter(this.S9);
      CycleCounter_1.CycleCounter.CheckStart(this.JWa);
    }
  }
  Stop() {
    Stat.eQa--;
    if (Stat.Aoh && this.lth && Stat.eQa < MAX_CALL_DEPTH) {
      cpp_1.FKuroPerfSightHelper.SafePopCall(this.JWa);
    }
    if (this.ac !== 0 && (this.ac = 2, CycleCounter_1.CycleCounter.IsPassedStackCheck(this.JWa))) {
      cpp_1.FKuroCycleCounter.StopCycleCounter();
    }
  }
}
Stat.EnableCreateWithStack = true;
Stat.T9 = 5;
Stat.eQa = 0;
Stat.uth = new Stat("");
Stat.m6 = Stat.CreateNoFlameGraph("Stat.Create");
Stat.L9 = Stat.Create("Stat.CreateWithStack");
Stat.P8 = Stat.Create("Stat.GetStack");
Stat.Aoh = true;
Stat.F8 = (t, e) => e;
Stat.V8 = {
  stack: undefined
};
__decorate([(0, Macro_1.MethodPruner)(0)], Stat.prototype, "Start", null);
__decorate([(0, Macro_1.MethodPruner)(0)], Stat.prototype, "Stop", null);
__decorate([(0, Macro_1.MethodPruner)(0)], Stat, "Create", null);
__decorate([(0, Macro_1.MethodPruner)(0)], Stat, "CreateNoFlameGraph", null);
__decorate([(0, Macro_1.MethodPruner)(0)], Stat, "CreateInstantStat", null);
exports.Stat = Stat;
Log_1.Log.InitStat(Stat); //# sourceMappingURL=Stats.js.map