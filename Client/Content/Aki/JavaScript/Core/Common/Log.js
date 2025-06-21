"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.asyncWithLogDecorator = exports.Log = exports.levelName = void 0;
const cpp_1 = require("cpp"),
  puerts_1 = require("puerts"),
  UE = require("ue"),
  LogDefine_1 = require("../Define/LogDefine"),
  Info_1 = require("./Info"),
  LogCaptureController_1 = require("./LogCaptureController"),
  Time_1 = require("./Time"),
  levelTrace = (cpp_1.KuroApplication.IsBuildShipping() && (cpp_1.KuroLoggingLibrary.RegisterTerminateDelegate(), cpp_1.KuroLoggingLibrary.PromoteGlobalLogVerbosity(4)), {
    [0]: !0,
    1: !1,
    2: !1,
    3: !1
  }),
  logProxy = (exports.levelName = {
    [0]: "E",
    1: "W",
    2: "I",
    3: "D"
  }, {
    [0]: puerts_1.logger.error,
    1: puerts_1.logger.warn,
    2: puerts_1.logger.info,
    3: puerts_1.logger.log
  }),
  DEFAULT_SKIP_INDEX = 2;
class Log {
  static SetJsDebugId(r) {
    r && 0 < r.length && (Log.U8 = `(${r})`, global.setDebugId(r))
  }
  static Initialize() {}
  static InitStat(r) {
    this.A8 = r.Create("Log.Print"), this.P8 = r.Create("Log.GetStack"), this.x8 = r.Create("Log.GetTSStack"), this.w8 = r.Create("Log.GetBpStack")
  }
  static SetLevel(r) {
    Log.B8 = r
  }
  static CheckError() {
    return 0 <= Log.B8
  }
  static CheckWarn() {
    return 1 <= Log.B8
  }
  static CheckInfo() {
    return 2 <= Log.B8
  }
  static CheckDebug() {
    return 3 <= Log.B8
  }
  static Error(r, t, o, ...e) {
    Log.b8(0, r, t, o, e, levelTrace[0])
  }
  static ErrorWithStack(r, t, o, e, ...i) {
    Log.b8(0, r, t, o, i, levelTrace[0], e)
  }
  static Warn(r, t, o, ...e) {
    Log.b8(1, r, t, o, e, levelTrace[1])
  }
  static Info(r, t, o, ...e) {
    Log.b8(2, r, t, o, e, levelTrace[2])
  }
  static Debug(r, t, o, ...e) {
    Log.b8(3, r, t, o, e, levelTrace[3])
  }
  static b8(o, e, i, g, n, a, L) {
    if (Log.o6 += 1, !(o > Log.B8)) {
      var [c, r] = LogDefine_1.logAuthorInfo[i];
      if (Log.q8 || r) {
        Log.A8?.Start();
        let r = `[${Log.o6}][${exports.levelName[o]}][${e}][${c}][${Time_1.Time.Frame}][${Log.ke()}] ` + g;
        var s = {};
        if (0 < n.length) {
          r += " ";
          for (const f of n) {
            var u = f[0],
              l = Log.G8(f[1]);
            s[u] = l, r += `[${u}: ${l}]`
          }
        }
        let t = void 0;
        (t = a ? Log.N8(L, L ? 0 : DEFAULT_SKIP_INDEX) : t) && (r = (r += "\n") + t), Log.Delegate?.(Log.o6, o, e, i, g, s, t), logProxy[o](r), Info_1.Info.IsBuildDevelopmentOrDebug && LogCaptureController_1.LogCaptureController.RegisterCapture[o] && LogCaptureController_1.LogCaptureController.LogCapture(o, e, i, r, t ?? ""), Log.A8?.Stop()
      }
    }
  }
  static ke() {
    var r = new Date;
    return `${r.getHours()}.${r.getMinutes()}.${r.getSeconds()}:` + r.getMilliseconds()
  }
  static O8(r) {
    let t = void 0;
    try {
      this.Cru(), t = Log.DHa(r)
    } catch (r) {
      r instanceof Error ? Log.CheckError() && Log.ErrorWithStack("Log", 1, "Log 序列化异常", r, ["error", r.message]) : Log.CheckError() && Log.Error("Log", 1, "Log 序列化异常", ["error", r])
    } finally {
      this.Cru()
    }
    return t
  }
  static DHa(r) {
    if ("object" == typeof r && null !== r) {
      if (Log.pru.has(r)) return "[Circular]";
      Log.pru.add(r)
    }
    return JSON.stringify(r, Log.RHa).replace(/"/g, "")
  }
  static Cru() {
    Log.pru.clear(), Log.vru.clear()
  }
  static G8(r) {
    return void 0 === r ? "undefined" : null === r ? "null" : "string" == typeof r ? r : Log.k8 && "object" == typeof r ? Log.O8(r) ?? "" : r.toString()
  }
  static N8(e, i) {
    Log.P8?.Start();
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = Log.F8;
    let g = void 0;
    if (e ? g = e.stack : (Error.captureStackTrace(Log.V8, Log.N8), g = Log.V8.stack, Log.V8.stack = void 0), Error.prepareStackTrace = r, g && Array.isArray(g)) {
      let t = "",
        o = "";
      for (let r = i; r < g.length; ++r) {
        var n, a, L, c, s = g[r];
        s && (n = ((n = s.getTypeName()) ? n + "." : "") + (s.getFunctionName() ?? ""), c = s.getFileName() ?? void 0, a = s.getLineNumber() ?? -1, s = s.getColumnNumber() ?? -1, L = Log.H8(c, "JavaScript", 1), t += `	${n} (${L}:${a}:${s})
`, puerts_1.convertSourceMap) && c && 0 !== c.length && (Log.x8?.Start(), L = (0, puerts_1.convertSourceMap)(c + ".map", a, s), Log.x8?.Stop(), L ? (c = Log.H8(L.source, "Src", 1), o += `	${n} (${c}:${L.line}:${L.column})
`) : o += "\tconvert source map fail\n")
      }
      let r = `JS 堆栈${Log.U8}:
`;
      return r += t, 0 < o.length && (r = (r += "TS 堆栈:a\n") + o), UE.KuroStaticLibrary.GetBlueprintCallstack && (Log.w8?.Start(), e = UE.KuroStaticLibrary.GetBlueprintCallstack(), Log.w8?.Stop(), e) && 0 < e.length && (r = r + "BP 堆栈:\n" + e), Log.P8?.Stop(), r
    }
    Log.P8?.Stop()
  }
  static H8(r, t, o) {
    var e;
    return r && 0 !== r.length ? 0 < (e = r.indexOf(t)) ? r.substring(e + t.length + o) : r : "unknown"
  }
  static GenLogId() {
    return ++Log.o6
  }
}

function asyncWithLogDecorator(g, n, a) {
  return (r, o, t) => {
    const e = t.value;
    async function i(...r) {
      Log.CheckInfo() && Log.Info(g, n, a + " 开始执行 " + o);
      try {
        var t = await e.call(this, ...r);
        return Log.CheckInfo() && Log.Info(g, n, a + " 执行完成 " + o), t
      } catch (r) {
        throw r instanceof Error ? (Log.CheckError() && Log.ErrorWithStack(g, n, a + " 执行异常", r, ["error", r.message]), r) : (Log.CheckError() && Log.Error(g, n, a + " 执行异常", ["error", r]), new Error(a))
      }
    }
    return Object.defineProperty(i, "name", {
      value: e.name,
      writable: !1,
      configurable: !0
    }), t.value = i, t
  }
}(exports.Log = Log).B8 = 3, Log.k8 = !0, Log.q8 = !1, Log.o6 = 0, Log.Delegate = void 0, Log.A8 = void 0, Log.P8 = void 0, Log.x8 = void 0, Log.w8 = void 0, Log.pru = new Set, Log.vru = new Set, Log.U8 = "", Log.RHa = (r, o) => {
  if (void 0 === o) return "undefined";
  switch (typeof o) {
    case "bigint":
      return o.toString() + "n";
    case "function":
      return o.toString();
    case "object":
      if (null === o) return "null";
      if (Log.vru.has(o)) return "[Circular]";
      Log.vru.add(o);
      var t = o;
      if ("function" == typeof t.ToString) return t.ToString();
      t = o.__proto__;
      if (!(o instanceof Array && t.toString === Array.prototype.toString)) {
        if (t.toString !== Object.prototype.toString) return o.toString();
        if (o instanceof Set) {
          let r = "Set(";
          for (const i of o) 0 < r.length && (r += ","), r += Log.DHa(i);
          return r += ")"
        }
        if (o instanceof Map) {
          let r = "Map(";
          for (const g of o) 0 < r.length && (r += ","), r += `[${Log.DHa(g[0])}, ${Log.DHa(g[1])}]`;
          return r += ")"
        }
        if (o instanceof UE.TMap) {
          let t = "";
          for (let r = 0; r < o.Num(); r++) {
            0 === t.length ? t += "TMap(" : t += ",";
            var e = o.GetKey(r);
            t += `[${Log.DHa(e)}, ${Log.DHa(o.Get(e))}]`
          }
          return t += ")"
        }
        if (o instanceof UE.TArray) {
          let t = "";
          for (let r = 0; r < o.Num(); r++) 0 === t.length ? t += "TArray(" : t += ",", t += `[${Log.DHa(o.Get(r))}]`;
          return t += ")"
        }
        if (o instanceof UE.TSet) {
          let t = "";
          for (let r = 0; r < o.Num(); r++) 0 === t.length ? t += "TSet(" : t += ",", t += `[${Log.DHa(o.Get(r))}]`;
          return t += ")"
        }
      }
      return o;
    default:
      return o
  }
}, Log.F8 = (r, t) => t, Log.V8 = {
  stack: void 0
}, exports.asyncWithLogDecorator = asyncWithLogDecorator;
//# sourceMappingURL=Log.js.map