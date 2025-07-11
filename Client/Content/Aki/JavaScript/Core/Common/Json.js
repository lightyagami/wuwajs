"use strict";

var _a;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Json = exports.JsonObjBase = undefined;
const Log_1 = require("./Log");
const uniqueSymbol = Symbol("");
class JsonObjBase {
  constructor() {
    this[_a] = 0;
  }
}
exports.JsonObjBase = JsonObjBase;
_a = uniqueSymbol;
class Json {
  static Encode(r, o) {
    const t = new Set();
    try {
      return JSON.stringify(r, (r, o) => {
        if (o && typeof o == "object") {
          if (t.has(o)) {
            return "循环引用";
          }
          t.add(o);
        }
        return o;
      }, o);
    } catch (r) {
      if (r instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Json", 1, "序列化异常", r, ["error", r.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Json", 1, "序列化异常", ["error", r]);
      }
    }
  }
  static Stringify(r, o) {
    const t = new Set();
    try {
      return JSON.stringify(r, (r, o) => {
        if (o && typeof o == "object") {
          if (t.has(o)) {
            return "循环引用";
          }
          t.add(o);
        }
        return o;
      }, o);
    } catch (r) {
      if (r instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Json", 1, "序列化异常", r, ["error", r.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Json", 1, "序列化异常", ["error", r]);
      }
    }
  }
  static Parse(r) {
    try {
      return JSON.parse(r);
    } catch (r) {
      if (r instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Json", 1, "反序列化异常", r, ["error", r.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Json", 1, "反序列化异常", ["error", r]);
      }
    }
  }
  static Decode(r) {
    try {
      return JSON.parse(r);
    } catch (r) {
      if (r instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Json", 1, "反序列化异常", r, ["error", r.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Json", 1, "反序列化异常", ["error", r]);
      }
    }
  }
}
exports.Json = Json;
//# sourceMappingURL=Json.js.map