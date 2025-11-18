"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logDecorator = exports.asyncWithLogDecorator = exports.Log = exports.levelName = undefined;
const cpp_1 = require("cpp");
const puerts_1 = require("puerts");
const UE = require("ue");
const LogDefine_1 = require("../Define/LogDefine");
const Info_1 = require("./Info");
const LogCaptureController_1 = require("./LogCaptureController");
const Time_1 = require("./Time");
if (cpp_1.KuroApplication.IsBuildShipping()) {
  cpp_1.KuroLoggingLibrary.RegisterTerminateDelegate();
  cpp_1.KuroLoggingLibrary.PromoteGlobalLogVerbosity(4);
}
const levelTrace = {
  [0]: true,
  1: false,
  2: false,
  3: false
};
exports.levelName = {
  [0]: "E",
  1: "W",
  2: "I",
  3: "D"
};
const logProxy = {
  [0]: puerts_1.logger.error,
  1: puerts_1.logger.warn,
  2: puerts_1.logger.info,
  3: puerts_1.logger.log
};
const DEFAULT_SKIP_INDEX = 2;
class Log {
  static SetJsDebugId(r) {
    if (r && r.length > 0) {
      Log.U8 = `(${r})`;
      global.setDebugId(r);
    }
  }
  static Initialize() {}
  static InitStat(r) {
    this.A8 = r.Create("Log.Print");
    this.P8 = r.Create("Log.GetStack");
    this.x8 = r.Create("Log.GetTSStack");
    this.w8 = r.Create("Log.GetBpStack");
  }
  static SetLevel(r) {
    Log.B8 = r;
  }
  static CheckError() {
    return Log.B8 >= 0;
  }
  static CheckWarn() {
    return Log.B8 >= 1;
  }
  static CheckInfo() {
    return Log.B8 >= 2;
  }
  static CheckDebug() {
    return Log.B8 >= 3;
  }
  static Error(r, o, t, ...e) {
    Log.b8(0, r, o, t, e, levelTrace[0]);
  }
  static ErrorWithStack(r, o, t, e, ...i) {
    Log.b8(0, r, o, t, i, levelTrace[0], e);
  }
  static Warn(r, o, t, ...e) {
    Log.b8(1, r, o, t, e, levelTrace[1]);
  }
  static Info(r, o, t, ...e) {
    Log.b8(2, r, o, t, e, levelTrace[2]);
  }
  static Debug(r, o, t, ...e) {
    Log.b8(3, r, o, t, e, levelTrace[3]);
  }
  static b8(t, e, i, g, n, a, L) {
    Log.o6 += 1;
    if (!(t > Log.B8)) {
      var [c, r] = LogDefine_1.logAuthorInfo[i];
      if (Log.q8 || r) {
        Log.A8?.Start();
        let r = `[${Log.o6}][${exports.levelName[t]}][${e}][${c}][${Time_1.Time.Frame}][${Log.ke()}] ${g}`;
        var u = {};
        if (n.length > 0) {
          r += " ";
          for (const f of n) {
            var s = f[0];
            var l = Log.G8(f[1]);
            u[s] = l;
            r += `[${s}: ${l}]`;
          }
        }
        let o = undefined;
        if (o = a ? Log.N8(L, L ? 0 : DEFAULT_SKIP_INDEX) : o) {
          r = (r += "\n") + o;
        }
        Log.Delegate?.(Log.o6, t, e, i, g, u, o);
        logProxy[t](r);
        if (Info_1.Info.IsBuildDevelopmentOrDebug && LogCaptureController_1.LogCaptureController.RegisterCapture[t]) {
          LogCaptureController_1.LogCaptureController.LogCapture(t, e, i, r, o ?? "");
        }
        Log.A8?.Stop();
      }
    }
  }
  static ke() {
    var r = new Date();
    return `${r.getHours()}.${r.getMinutes()}.${r.getSeconds()}:${r.getMilliseconds()}`;
  }
  static O8(r) {
    let o = undefined;
    try {
      this.xau();
      o = Log.DHa(r);
    } catch (r) {
      if (r instanceof Error) {
        if (Log.CheckError()) {
          Log.ErrorWithStack("Log", 1, "Log 序列化异常", r, ["error", r.message]);
        }
      } else if (Log.CheckError()) {
        Log.Error("Log", 1, "Log 序列化异常", ["error", r]);
      }
    } finally {
      this.xau();
    }
    return o;
  }
  static DHa(r) {
    if (typeof r == "object" && r !== null) {
      if (Log.Uau.has(r)) {
        return "[Circular]";
      }
      Log.Uau.add(r);
    }
    return JSON.stringify(r, Log.RHa).replace(/"/g, "");
  }
  static xau() {
    Log.Uau.clear();
    Log.Dau.clear();
  }
  static G8(r) {
    if (r === undefined) {
      return "undefined";
    } else if (r === null) {
      return "null";
    } else if (typeof r == "string") {
      return r;
    } else if (Log.k8 && typeof r == "object") {
      return Log.O8(r) ?? "";
    } else {
      return r.toString();
    }
  }
  static N8(e, i) {
    Log.P8?.Start();
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = Log.F8;
    let g = undefined;
    if (e) {
      g = e.stack;
    } else {
      Error.captureStackTrace(Log.V8, Log.N8);
      g = Log.V8.stack;
      Log.V8.stack = undefined;
    }
    Error.prepareStackTrace = r;
    if (g && Array.isArray(g)) {
      let o = "";
      let t = "";
      for (let r = i; r < g.length; ++r) {
        var n;
        var a;
        var L;
        var c;
        var u = g[r];
        if (u && (n = ((n = u.getTypeName()) ? n + "." : "") + (u.getFunctionName() ?? ""), c = u.getFileName() ?? undefined, a = u.getLineNumber() ?? -1, u = u.getColumnNumber() ?? -1, L = Log.H8(c, "JavaScript", 1), o += `	${n} (${L}:${a}:${u})
`, puerts_1.convertSourceMap) && c && c.length !== 0) {
          Log.x8?.Start();
          L = (0, puerts_1.convertSourceMap)(c + ".map", a, u);
          Log.x8?.Stop();
          if (L) {
            c = Log.H8(L.source, "Src", 1);
            t += `	${n} (${c}:${L.line}:${L.column})
`;
          } else {
            t += "\tconvert source map fail\n";
          }
        }
      }
      let r = `JS 堆栈${Log.U8}:
`;
      r += o;
      if (t.length > 0) {
        r = (r += "TS 堆栈:a\n") + t;
      }
      if (UE.KuroStaticLibrary.GetBlueprintCallstack && (Log.w8?.Start(), e = UE.KuroStaticLibrary.GetBlueprintCallstack(), Log.w8?.Stop(), e) && e.length > 0) {
        r = r + "BP 堆栈:\n" + e;
      }
      Log.P8?.Stop();
      return r;
    }
    Log.P8?.Stop();
  }
  static H8(r, o, t) {
    var e;
    if (r && r.length !== 0) {
      if ((e = r.indexOf(o)) > 0) {
        return r.substring(e + o.length + t);
      } else {
        return r;
      }
    } else {
      return "unknown";
    }
  }
  static GenLogId() {
    return ++Log.o6;
  }
}
function asyncWithLogDecorator(g, n, a) {
  return (r, t, o) => {
    const e = o.value;
    async function i(...r) {
      if (Log.CheckInfo()) {
        Log.Info(g, n, a + " 开始执行 " + t);
      }
      try {
        var o = await e.call(this, ...r);
        if (Log.CheckInfo()) {
          Log.Info(g, n, a + " 执行完成 " + t);
        }
        return o;
      } catch (r) {
        throw r instanceof Error ? (Log.CheckError() && Log.ErrorWithStack(g, n, a + " 执行异常", r, ["error", r.message]), r) : (Log.CheckError() && Log.Error(g, n, a + " 执行异常", ["error", r]), new Error(a));
      }
    }
    Object.defineProperty(i, "name", {
      value: e.name,
      writable: false,
      configurable: true
    });
    o.value = i;
    return o;
  };
}
function logDecorator(g, n, a) {
  return (r, e, o) => {
    const i = o.value;
    function t(...r) {
      var o = String(e);
      if (Log.CheckInfo()) {
        Log.Info(g, n, a + " 开始执行 " + o);
      }
      try {
        var t = i.apply(this, r);
        if (Log.CheckInfo()) {
          Log.Info(g, n, a + " 执行完成 " + o);
        }
        return t;
      } catch (r) {
        throw r instanceof Error ? (Log.CheckError() && Log.ErrorWithStack(g, n, a + " 执行异常", r, ["error", r.message]), r) : (Log.CheckError() && Log.Error(g, n, a + " 执行异常", ["error", r]), new Error(a));
      }
    }
    Object.defineProperty(t, "name", {
      value: i.name,
      writable: false,
      configurable: true
    });
    o.value = t;
    return o;
  };
}
(exports.Log = Log).B8 = 3;
Log.k8 = true;
Log.q8 = false;
Log.o6 = 0;
Log.Delegate = undefined;
Log.A8 = undefined;
Log.P8 = undefined;
Log.x8 = undefined;
Log.w8 = undefined;
Log.Uau = new Set();
Log.Dau = new Set();
Log.U8 = "";
Log.RHa = (r, t) => {
  if (t === undefined) {
    return "undefined";
  }
  switch (typeof t) {
    case "bigint":
      return t.toString() + "n";
    case "function":
      return t.toString();
    case "object":
      if (t === null) {
        return "null";
      }
      if (Log.Dau.has(t)) {
        return "[Circular]";
      }
      Log.Dau.add(t);
      var o = t;
      if (typeof o.ToString == "function") {
        return o.ToString();
      }
      o = t.__proto__;
      if (!(t instanceof Array) || o.toString !== Array.prototype.toString) {
        if (o.toString !== Object.prototype.toString) {
          return t.toString();
        }
        if (t instanceof Set) {
          let r = "Set(";
          for (const i of t) {
            if (r.length > 0) {
              r += ",";
            }
            r += Log.DHa(i);
          }
          return r += ")";
        }
        if (t instanceof Map) {
          let r = "Map(";
          for (const g of t) {
            if (r.length > 0) {
              r += ",";
            }
            r += `[${Log.DHa(g[0])}, ${Log.DHa(g[1])}]`;
          }
          return r += ")";
        }
        if (t instanceof UE.TMap) {
          let o = "";
          for (let r = 0; r < t.Num(); r++) {
            if (o.length === 0) {
              o += "TMap(";
            } else {
              o += ",";
            }
            var e = t.GetKey(r);
            o += `[${Log.DHa(e)}, ${Log.DHa(t.Get(e))}]`;
          }
          return o += ")";
        }
        if (t instanceof UE.TArray) {
          let o = "";
          for (let r = 0; r < t.Num(); r++) {
            if (o.length === 0) {
              o += "TArray(";
            } else {
              o += ",";
            }
            o += `[${Log.DHa(t.Get(r))}]`;
          }
          return o += ")";
        }
        if (t instanceof UE.TSet) {
          let o = "";
          for (let r = 0; r < t.Num(); r++) {
            if (o.length === 0) {
              o += "TSet(";
            } else {
              o += ",";
            }
            o += `[${Log.DHa(t.Get(r))}]`;
          }
          return o += ")";
        }
      }
      return t;
    default:
      return t;
  }
};
Log.F8 = (r, o) => o;
Log.V8 = {
  stack: undefined
};
exports.asyncWithLogDecorator = asyncWithLogDecorator;
exports.logDecorator = logDecorator; //# sourceMappingURL=Log.js.map