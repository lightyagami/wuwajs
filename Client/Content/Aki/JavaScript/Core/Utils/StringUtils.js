"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StringUtils = exports.GRATHER_EQUAL_THAN = exports.GRATHER_THAN = exports.LESS_EQUAL_THAN = exports.LESS_THAN = exports.NOT_EQUAL = exports.EQUAL = exports.NONE_STRING = exports.SPEED_STRING = exports.SLASH_STRING = exports.TAB_STRING = exports.LINE_BREAK_STRING = exports.EMPTY_STRING = exports.ONE_STRING = exports.ZERO_STRING = undefined;
const StringBuilder_1 = require("./StringBuilder");
exports.ZERO_STRING = "0";
exports.ONE_STRING = "1";
exports.EMPTY_STRING = "";
exports.LINE_BREAK_STRING = "\n";
exports.TAB_STRING = "\t";
exports.SLASH_STRING = "/";
exports.SPEED_STRING = "/s";
exports.NONE_STRING = "None";
exports.EQUAL = "=";
exports.NOT_EQUAL = "!=";
exports.LESS_THAN = "<";
exports.LESS_EQUAL_THAN = "<=";
exports.GRATHER_THAN = ">";
exports.GRATHER_EQUAL_THAN = ">=";
const REG_PATTERN = "{[0-9]+}";
const REG_FLAGS = "g";
const UTF8_BOM_HEAD = "﻿";
class StringUtils {
  static Format(t, ...r) {
    var e;
    var s = new StringBuilder_1.StringBuilder();
    let n = 0;
    while ((e = StringUtils.Fz.exec(t)) !== null) {
      var o = parseInt(e[1]);
      s.Append(t.substring(n, e.index));
      s.Append(r[o] ?? `{${o}}`);
      n = e.index + e[0].length;
    }
    s.Append(t.substring(n));
    return s.ToString();
  }
  static FormatStaticBuilder(t, ...e) {
    var s = t.split(StringUtils.Vz);
    var n = this.jz;
    n.Clear();
    for (let t = 0, r = s.length; t < r; ++t) {
      n.Append(s[t]);
      if (t !== s.length - 1) {
        n.Append(e[t] ?? `{${t}}`);
      }
    }
    return n.ToString();
  }
  static Uint8ArrayToString(t) {
    var r;
    let e = undefined;
    var s;
    var n = new Array();
    var o = t.length;
    let i = 0;
    while (i < o) {
      switch ((r = t[i++]) >> 4) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
          n.push(String.fromCharCode(r));
          break;
        case 12:
        case 13:
          e = t[i++];
          n.push(String.fromCharCode((r & 31) << 6 | e & 63));
          break;
        case 14:
          e = t[i++];
          s = t[i++];
          n.push(String.fromCharCode((r & 15) << 12 | (e & 63) << 6 | (s & 63) << 0));
      }
    }
    return n.join(exports.EMPTY_STRING);
  }
  static GetStringRealCount(r) {
    let e = 0;
    var s;
    var n = r.length;
    for (let t = 0; t < n; t++) {
      s = r.charCodeAt(t);
      e += s >= 0 && s <= 128 ? 1 : 2;
    }
    return e;
  }
  static IsEmpty(t) {
    return !t;
  }
  static ParseTabAndLine(t) {
    let r = t.split("\\n").join(exports.LINE_BREAK_STRING);
    return r = (r = r.split("\\r").join(exports.EMPTY_STRING)).split("\\t").join(exports.TAB_STRING);
  }
  static IsIpAddress(t) {
    return t.match(/((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])/g) !== null;
  }
  static IsBlank(t) {
    return !!StringUtils.IsEmpty(t) || !!t.match(/^\s*$/g);
  }
  static IsNothing(t) {
    return !!StringUtils.IsEmpty(t) || t === exports.NONE_STRING;
  }
  static ParseCsvContent(t) {
    let r = "";
    let e = [""];
    var s;
    var n = [e];
    let o = 0;
    let i = 0;
    let a = true;
    for (s of t.startsWith(UTF8_BOM_HEAD) ? t.replace(/^\ufeff/, "") : t) {
      if (s === "\"") {
        if (a && s === r) {
          e[o] += s;
        }
        a = !a;
      } else if (s === "," && a) {
        e[++o] = "";
        s = "";
      } else if (s === "\n" && a) {
        if (r === "\r") {
          e[o] = e[o].slice(0, -1);
        }
        e = [s = ""];
        n[++i] = e;
        o = 0;
      } else {
        e[o] += s;
      }
      r = s;
    }
    t = n[n.length - 1];
    if (t.length === 1 && t[0] === "") {
      n.splice(n.length - 1, 1);
    }
    return n;
  }
  static CheckIsOnlyLettersAndNumbers(t) {
    return /^[A-Za-z0-9]*$/.test(t);
  }
  static CheckIsOnlyBlank(t) {
    return /^\s*$/.test(t);
  }
  static ParseCSVStringToMap(t) {
    var r = new Map();
    for (const n of t.split(",")) {
      var [e, s] = n.split(":");
      if (e && s) {
        r.set(e, s);
      }
    }
    return r;
  }
}
(exports.StringUtils = StringUtils).Vz = new RegExp(REG_PATTERN, REG_FLAGS);
StringUtils.jz = new StringBuilder_1.StringBuilder();
StringUtils.Fz = /\{(\d+)\}/g; //# sourceMappingURL=StringUtils.js.map