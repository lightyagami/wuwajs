"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LogAnalyzer = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const LogDefine_1 = require("../Define/LogDefine");
const TimerSystem_1 = require("../Timer/TimerSystem");
const Json_1 = require("./Json");
const Log_1 = require("./Log");
const Stats_1 = require("./Stats");
const SHIPPING = cpp_1.KuroApplication.IsBuildShipping() ? 1 : 0;
const IS_WITH_EDITOR = cpp_1.KuroApplication.IsWithEditor() ? 1 : undefined;
const STATISTICS_INTERVAL = 600000;
const STATISTICS_MESSAGE_ERRO_THRESHOLD = 0.01;
const STATISTICS_THRESHOLD = 10;
const STATISTICS_MODULE_TOP_NUM = 10;
const STATISTICS_ENGINE_CATEGORY_TOP_NUM = 10;
const STATISTICS_AUTHOR_TOP_NUM = 10;
const STATISTICS_MESSAGE_TOP_NUM = 10;
const REPORT_INTERVAL = 60000;
const REPORT_LEVEL = 0;
const REPORT_NUM = 10;
const SIMPLIFY_REPORT_NUM = 100;
const SIMPLIFY_REPORT_MESSAGE_MAX_LENGTH = 100;
const REPLACE_BRANCH_WORD = "branch_";
class LogRecord extends Json_1.JsonObjBase {
  constructor(e, o, r, a, L, n, g, A, l, t, _) {
    super();
    this.P4V = e;
    this.Br = o;
    this.PlayerId = r;
    this.Id = a;
    this.Level = L;
    this.Module = n;
    this.Category = g;
    this.Author = A;
    this.Msg = l;
    this.Stack = _;
    this.Sp = SHIPPING;
    this.Ed = IS_WITH_EDITOR;
    this.Context = {};
    if (t) {
      let e = 0;
      for (const y in t) {
        this.Context[e++] = {
          Key: y,
          Value: t[y]
        };
      }
    }
  }
}
class LogReportRecord extends Json_1.JsonObjBase {
  constructor(e, o, r, a, L) {
    super();
    this.PlayerId = e;
    this.Num = o;
    this.Detail = r;
    this.P4V = a;
    this.Br = L;
    this.Sp = SHIPPING;
    this.Ed = IS_WITH_EDITOR;
  }
}
class LogAnalyzer {
  static SetPlayerId(e) {
    LogAnalyzer.j8 = e;
  }
  static SetP4Version(e) {
    LogAnalyzer.W8 = e;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Log", 3, "P4Version信息", ["P4Version", LogAnalyzer.W8]);
    }
  }
  static GetP4Version(e) {
    return LogAnalyzer.W8;
  }
  static SetBranch(e) {
    let o = e;
    if (o?.startsWith(REPLACE_BRANCH_WORD)) {
      o = o.substring(REPLACE_BRANCH_WORD.length);
    }
    LogAnalyzer.$i = o;
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Log", 3, "Branch信息", ["Branch", LogAnalyzer.$i]);
    }
  }
  static GetBranch() {
    return LogAnalyzer.$i;
  }
  static Initialize(e, o) {
    LogAnalyzer.SetBranch(o);
    if (e && (LogAnalyzer.K8(), LogAnalyzer.Q8(), o = UE.KuroLogAnalyzerLibrary.Initialize(2 .valueOf(), (0, puerts_1.toManualReleaseDelegate)(LogAnalyzer.X8)), Log_1.Log.CheckInfo())) {
      Log_1.Log.Info("Log", 3, "LogAnalyzer.Initialize", ["结果", o], ["Branch", LogAnalyzer.$i]);
    }
  }
  static Clear() {
    var e = UE.KuroLogAnalyzerLibrary.Clear();
    if (Log_1.Log.CheckInfo()) {
      Log_1.Log.Info("Log", 3, "LogAnalyzer.Clear", ["结果", e]);
    }
  }
  static K8() {
    Log_1.Log.Delegate = LogAnalyzer.t6;
    var o = Object.keys(Log_1.levelName).length;
    for (let e = LogAnalyzer.Y8.length = 0; e < o; ++e) {
      LogAnalyzer.Y8.push(0);
    }
    var r = Object.keys(LogDefine_1.logAuthorInfo).length;
    for (let e = LogAnalyzer.J8.length = 0; e < r; ++e) {
      LogAnalyzer.J8.push(0);
    }
    if (LogAnalyzer.z8) {
      LogAnalyzer.z8.Remove();
      LogAnalyzer.z8 = undefined;
    }
    let O = 0;
    LogAnalyzer.z8 = TimerSystem_1.GameplayTimerSystem.Forever(e => {
      LogAnalyzer.Z8.Start();
      O += 1;
      if (Log_1.Log.CheckWarn()) {
        Log_1.Log.Warn("Log", 1, "日志级别统计", ["num", O], ["detail", LogAnalyzer.Y8]);
      }
      var o = {};
      for (let e = 0; e < LogAnalyzer.Y8.length; ++e) {
        o[e] = LogAnalyzer.Y8[e];
        LogAnalyzer.Y8[e] = 0;
      }
      LogAnalyzer.e9("log_level_report", new LogReportRecord(LogAnalyzer.j8, O, o));
      var r = new Array();
      for (const S of LogAnalyzer.t9) {
        if (S[1] > STATISTICS_THRESHOLD) {
          r.push(S);
        }
      }
      LogAnalyzer.t9.clear();
      if (r.length > 0) {
        r.sort((e, o) => o[1] - e[1]);
        r.length = Math.min(r.length, STATISTICS_MODULE_TOP_NUM);
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Log", 1, "模块输出统计", ["num", O], ["detail", r]);
        }
        var a = {};
        for (const s of r) {
          a[s[0]] = s[1];
        }
        LogAnalyzer.e9("log_module_report", new LogReportRecord(LogAnalyzer.j8, O, a));
      }
      var L = new Array();
      for (const R of LogAnalyzer.i9) {
        if (R[1] > STATISTICS_THRESHOLD) {
          L.push(R);
        }
      }
      LogAnalyzer.i9.clear();
      if (L.length > 0) {
        L.sort((e, o) => o[1] - e[1]);
        L.length = Math.min(L.length, STATISTICS_ENGINE_CATEGORY_TOP_NUM);
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Log", 1, "Category输出统计", ["num", O], ["detail", L]);
        }
        var n = {};
        for (const I of L) {
          n[I[0].toString()] = I[1];
        }
        LogAnalyzer.e9("log_engine_category_report", new LogReportRecord(LogAnalyzer.j8, O, n));
      }
      var g = new Array();
      for (let e = 0; e < LogAnalyzer.J8.length; ++e) {
        var A = LogAnalyzer.J8[e];
        if (A > STATISTICS_THRESHOLD) {
          g.push([LogDefine_1.logAuthorInfo[e][0], A]);
        }
      }
      for (let e = 0; e < LogAnalyzer.J8.length; ++e) {
        LogAnalyzer.J8[e] = 0;
      }
      if (g.length > 0) {
        g.sort((e, o) => o[1] - e[1]);
        g.length = Math.min(g.length, STATISTICS_AUTHOR_TOP_NUM);
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Log", 1, "作者输出统计", ["num", O], ["detail", g]);
        }
        var l = {};
        for (const E of g) {
          l[E[0]] = E[1];
        }
        LogAnalyzer.e9("log_author_report", new LogReportRecord(LogAnalyzer.j8, O, l));
      }
      var t = e * STATISTICS_MESSAGE_ERRO_THRESHOLD;
      var _ = new Array();
      var y = new Array();
      for (const c of LogAnalyzer.o9) {
        var z = c[1];
        if (t < z) {
          _.push(c);
        } else if (z > STATISTICS_THRESHOLD) {
          y.push(c);
        }
      }
      LogAnalyzer.o9.clear();
      if (_.length > 0 && Log_1.Log.CheckError()) {
        Log_1.Log.Error("Log", 1, "日志输出过多", ["num", O], ["detail", _]);
      }
      if (y.length > 0) {
        y.sort((e, o) => o[1] - e[1]);
        y.length = Math.min(y.length, STATISTICS_MESSAGE_TOP_NUM);
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Log", 1, "日志输出统计", ["num", O], ["detail", y]);
        }
        var i = {};
        for (let e = 0; e < y.length; ++e) {
          var T = y[e];
          i[e] = {
            Msg: T[0],
            Count: T[1]
          };
        }
        LogAnalyzer.e9("log_message_report", new LogReportRecord(LogAnalyzer.j8, O, i));
      }
      LogAnalyzer.Z8.Stop();
    }, STATISTICS_INTERVAL, 1, undefined, "LogAnalyzer.StatisticsTimer", false);
  }
  static Q8() {
    if (LogAnalyzer.r9) {
      LogAnalyzer.r9.Remove();
      LogAnalyzer.r9 = undefined;
    }
    let a = 0;
    LogAnalyzer.r9 = TimerSystem_1.GameplayTimerSystem.Forever(e => {
      LogAnalyzer.n9.Start();
      a += 1;
      if ((LogAnalyzer.Zm = 0) !== LogAnalyzer.s9.size) {
        var o = {};
        let e = 0;
        for (const r of LogAnalyzer.s9) {
          o[e++] = {
            Msg: r[0],
            Count: r[1]
          };
        }
        LogAnalyzer.s9.clear();
        LogAnalyzer.e9("log_report", new LogReportRecord(LogAnalyzer.j8, a, o, LogAnalyzer.W8, LogAnalyzer.$i));
      }
      LogAnalyzer.n9.Stop();
    }, REPORT_INTERVAL);
  }
  static A5(r, a, L, n, g, A, l, t, _, y) {
    LogAnalyzer.a9.Start();
    LogAnalyzer.Y8[L] += 1;
    var o = LogAnalyzer.t9.get(n) ?? 0;
    LogAnalyzer.t9.set(n, o + 1);
    LogAnalyzer.J8[g] += 1;
    if (r) {
      o = LogAnalyzer.o9.get(l) ?? 0;
      LogAnalyzer.o9.set(l, o + 1);
    } else {
      o = LogAnalyzer.o9.get(A) ?? 0;
      LogAnalyzer.o9.set(A, o + 1);
      o = LogAnalyzer.i9.get(y) ?? 0;
      LogAnalyzer.i9.set(y, o + 1);
    }
    LogAnalyzer.a9.Stop();
    if (!(L > REPORT_LEVEL)) {
      if (LogAnalyzer.Zm < REPORT_NUM) {
        LogAnalyzer.Zm += 1;
        let e = l;
        let o = t;
        if (!r && l !== A) {
          e = A;
          (o = {})[0] = l;
        }
        LogAnalyzer.e9("log", new LogRecord(LogAnalyzer.W8, LogAnalyzer.$i, LogAnalyzer.j8, a, L, n, y?.toString(), LogDefine_1.logAuthorInfo[g][0], e, o, _));
      } else if (LogAnalyzer.s9.size < SIMPLIFY_REPORT_NUM) {
        let e = undefined;
        e = r ? l.length > SIMPLIFY_REPORT_MESSAGE_MAX_LENGTH ? l.substring(0, SIMPLIFY_REPORT_MESSAGE_MAX_LENGTH) : l : A;
        o = LogAnalyzer.s9.get(e) ?? 0;
        LogAnalyzer.s9.set(e, o + 1);
      }
    }
  }
  static e9(e, o) {
    LogAnalyzer.h9.Start();
    o = Json_1.Json.Stringify(o);
    if (o) {
      cpp_1.FThinkingAnalyticsForPuerts.Track(e, o);
      LogAnalyzer.h9.Stop();
      return true;
    } else {
      LogAnalyzer.h9.Stop();
      return false;
    }
  }
}
exports.LogAnalyzer = LogAnalyzer;
(_a = LogAnalyzer).Y8 = new Array();
LogAnalyzer.t9 = new Map();
LogAnalyzer.i9 = new Map();
LogAnalyzer.J8 = new Array();
LogAnalyzer.o9 = new Map();
LogAnalyzer.z8 = undefined;
LogAnalyzer.r9 = undefined;
LogAnalyzer.Zm = 0;
LogAnalyzer.s9 = new Map();
LogAnalyzer.j8 = 0;
LogAnalyzer.W8 = undefined;
LogAnalyzer.$i = undefined;
LogAnalyzer.Z8 = Stats_1.Stat.Create("LogAnalyzer.Statistics");
LogAnalyzer.n9 = Stats_1.Stat.Create("LogAnalyzer.Report");
LogAnalyzer.a9 = Stats_1.Stat.Create("LogAnalyzer.Count");
LogAnalyzer.h9 = Stats_1.Stat.Create("LogAnalyzer.Track");
LogAnalyzer.t6 = (e, o, r, a, L, n, g) => {
  _a.A5(true, e, o, r, a, undefined, L, n, g);
};
LogAnalyzer.X8 = (e, o, r, a) => {
  let L = 2;
  switch (o) {
    case 1:
    case 2:
      L = 0;
      break;
    case 3:
      L = 1;
      break;
    default:
      return;
  }
  LogAnalyzer.A5(false, Log_1.Log.GenLogId(), L, "Engine", 0, r, a, undefined, undefined, e);
}; //# sourceMappingURL=LogAnalyzer.js.map