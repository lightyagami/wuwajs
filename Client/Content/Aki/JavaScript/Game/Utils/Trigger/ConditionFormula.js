"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Formula = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
class Lexer {
  constructor(r) {
    this.ygr = r;
    this.cC = 0;
  }
  Tokenize() {
    var r = [];
    for (; this.cC < this.ygr.length;) {
      var t = this.ygr[this.cC];
      if (/\d/.test(t)) {
        r.push(this.Igr());
      } else if (/[a-zA-Z]/.test(t)) {
        r.push(this.Tgr());
      } else if (/['"`]/.test(t)) {
        r.push(this.Lgr());
      } else if (/\+|-|\*|\/|%|>|<|=|!|&|\|/.test(t)) {
        r.push(this.Dgr());
      } else {
        if (t === ",") {
          r.push({
            TokenType: 5,
            TokenString: ","
          });
        } else if (t === "(") {
          r.push({
            TokenType: 6,
            TokenString: "("
          });
        } else if (t === ")") {
          r.push({
            TokenType: 7,
            TokenString: ")"
          });
        } else if (t === "[") {
          r.push({
            TokenType: 8,
            TokenString: "["
          });
        } else if (t === "]") {
          r.push({
            TokenType: 9,
            TokenString: "]"
          });
        } else if (!/\s/.test(t)) {
          throw new Error("Invalid character: " + t);
        }
        this.cC++;
      }
    }
    r.push({
      TokenType: 10,
      TokenString: ""
    });
    return r;
  }
  Igr() {
    let r = "";
    while (this.cC < this.ygr.length && /\d/.test(this.ygr[this.cC])) {
      r += this.ygr[this.cC];
      this.cC++;
    }
    if (this.ygr[this.cC] === ".") {
      r += ".";
      this.cC++;
      while (this.cC < this.ygr.length && /\d/.test(this.ygr[this.cC])) {
        r += this.ygr[this.cC];
        this.cC++;
      }
    }
    return {
      TokenType: 0,
      TokenString: r
    };
  }
  Tgr() {
    let r = "";
    while (this.cC < this.ygr.length && /[a-zA-Z0-9]/.test(this.ygr[this.cC])) {
      r += this.ygr[this.cC++];
    }
    if (r === "TRUE" || r === "FALSE") {
      return {
        TokenType: 1,
        TokenString: r.toLowerCase()
      };
    } else if (r === "AND") {
      return {
        TokenType: 4,
        TokenString: "&&"
      };
    } else if (r === "OR") {
      return {
        TokenType: 4,
        TokenString: "||"
      };
    } else if (r === "XOR") {
      return {
        TokenType: 4,
        TokenString: "!="
      };
    } else if (r === "NOT") {
      return {
        TokenType: 4,
        TokenString: "!"
      };
    } else {
      return {
        TokenType: 3,
        TokenString: r
      };
    }
  }
  Lgr() {
    var r = this.ygr[this.cC++];
    let t = "";
    while (this.cC < this.ygr.length) {
      var e = this.ygr[this.cC++];
      if (e === r) {
        return {
          TokenType: 2,
          TokenString: t
        };
      }
      t += e;
    }
    throw new Error("Invalid string: " + t);
  }
  Dgr() {
    let r = "";
    while (this.cC < this.ygr.length && /\+|-|\*|\/|%|>|<|=|!|&|\|/.test(this.ygr[this.cC])) {
      r += this.ygr[this.cC];
      this.cC++;
    }
    return {
      TokenType: 4,
      TokenString: r
    };
  }
}
class Parser {
  constructor(r) {
    this.Ugr = r;
    this.Rgr = "";
    this.cC = 0;
  }
  Parse(r) {
    this.Rgr = r;
    var t = this.Agr();
    if (this.cC !== this.Ugr.length - 1) {
      throw new Error("Unexpected token when parsing expression " + r);
    }
    return t;
  }
  Agr() {
    return this.Pgr();
  }
  Pgr() {
    let r = this.xgr();
    while (this.wgr("||")) {
      var t = this.Bgr().TokenString;
      var e = this.xgr();
      r = {
        NodeType: 5,
        Operator: t,
        Args: [r, e]
      };
    }
    return r;
  }
  xgr() {
    let r = this.bgr();
    while (this.wgr("&&")) {
      var t = this.Bgr().TokenString;
      var e = this.bgr();
      r = {
        NodeType: 5,
        Operator: t,
        Args: [r, e]
      };
    }
    return r;
  }
  bgr() {
    let r = this.qgr();
    while (this.wgr("==", "!=")) {
      var t = this.Bgr().TokenString;
      var e = this.qgr();
      r = {
        NodeType: 5,
        Operator: t,
        Args: [r, e]
      };
    }
    return r;
  }
  qgr() {
    let r = this.Ggr();
    while (this.wgr(">", ">=", "<", "<=")) {
      var t = this.Bgr().TokenString;
      var e = this.Ggr();
      r = {
        NodeType: 5,
        Operator: t,
        Args: [r, e]
      };
    }
    return r;
  }
  Ggr() {
    let r = this.Ngr();
    while (this.wgr("+", "-")) {
      var t = this.Bgr().TokenString;
      var e = this.Ngr();
      r = {
        NodeType: 5,
        Operator: t,
        Args: [r, e]
      };
    }
    return r;
  }
  Ngr() {
    let r = this.Ogr();
    while (this.wgr("*", "/", "%")) {
      var t = this.Bgr().TokenString;
      var e = this.Ogr();
      r = {
        NodeType: 5,
        Operator: t,
        Args: [r, e]
      };
    }
    return r;
  }
  Ogr() {
    if (this.wgr("+", "-", "!")) {
      return {
        NodeType: 6,
        Operator: this.Bgr().TokenString,
        Args: [this.Ogr()]
      };
    } else {
      return this.kgr();
    }
  }
  kgr() {
    var t = this.Fgr();
    if (t.TokenType === 0) {
      this.Vgr();
      if (t.TokenString.includes(".")) {
        return {
          NodeType: 0,
          Value: parseFloat(t.TokenString)
        };
      } else if (t.TokenString.length > 10) {
        return {
          NodeType: 0,
          Value: BigInt(t.TokenString)
        };
      } else {
        return {
          NodeType: 0,
          Value: parseInt(t.TokenString)
        };
      }
    }
    if (t.TokenType === 1) {
      this.Vgr();
      return {
        NodeType: 1,
        Value: t.TokenString === "true"
      };
    }
    if (t.TokenType === 2) {
      this.Vgr();
      return {
        NodeType: 2,
        Value: t.TokenString
      };
    }
    if (t.TokenType === 3) {
      var e = t.TokenString;
      this.Vgr();
      if (this.Hgr(6)) {
        return this.jgr(e);
      }
      let r = {
        NodeType: 4,
        Value: e
      };
      while (this.Hgr(8)) {
        var i = this.Agr();
        this.Wgr(9, "Expected ']' after array when parsing expression " + this.Rgr);
        r = {
          NodeType: 9,
          Value: r,
          Index: i
        };
      }
      return r;
    }
    if (this.Hgr(6)) {
      e = this.Agr();
      this.Wgr(7, "Expected ')' after expression when parsing " + this.Rgr);
      return {
        NodeType: 8,
        Value: e
      };
    }
    if (this.Hgr(8)) {
      return this.Kgr();
    }
    throw new Error(t.TokenString + " when parsing expression " + this.Rgr);
  }
  jgr(r) {
    var t = [];
    if (!this.Ii(7)) {
      while (t.push(this.Agr()), this.Hgr(5));
    }
    this.Wgr(7, "Expected ')' after arguments when parsing expression " + this.Rgr);
    return {
      NodeType: 7,
      Value: r,
      Args: t
    };
  }
  Kgr() {
    var r = [];
    if (!this.Ii(9)) {
      while (r.push(this.Agr()), this.Hgr(5));
    }
    this.Wgr(9, "Expected ']' after array when parsing expression " + this.Rgr);
    let t = {
      NodeType: 3,
      Value: r
    };
    while (this.Hgr(8)) {
      var e = this.Agr();
      this.Wgr(9, "Expected ']' after array when parsing expression " + this.Rgr);
      t = {
        NodeType: 9,
        Value: t,
        Index: e
      };
    }
    return t;
  }
  Hgr(...r) {
    for (const t of r) {
      if (this.Ii(t)) {
        this.Vgr();
        return true;
      }
    }
    return false;
  }
  wgr(...r) {
    for (const t of r) {
      if (this.Ii(4) && this.Fgr().TokenString === t) {
        this.Vgr();
        return true;
      }
    }
    return false;
  }
  Wgr(r, t) {
    if (!this.Ii(r)) {
      throw new Error(t);
    }
    this.Vgr();
  }
  Ii(r) {
    return !this.Qgr() && this.Fgr().TokenType === r;
  }
  Vgr() {
    if (!this.Qgr()) {
      this.cC++;
    }
    return this.Bgr();
  }
  Qgr() {
    return this.Fgr().TokenType === 10;
  }
  Fgr() {
    return this.Ugr[this.cC];
  }
  Bgr() {
    return this.Ugr[this.cC - 1];
  }
}
class Formula {
  constructor(r) {
    this.Xgr = undefined;
    this.Rgr = "";
    this.Params = undefined;
    this.lDt = undefined;
    this.$gr = new Map();
    this.X71 = new Set();
    this.context = undefined;
    this.olh = new Map();
    this.zQn = new Set();
    this.Rgr = r;
    var t = new Lexer(r).Tokenize();
    var t = new Parser(t);
    this.Xgr = t.Parse(r);
    this.Params = undefined;
  }
  get FormulaStr() {
    return this.Rgr;
  }
  SetBuiltinFunctions(r) {
    this.$gr.clear();
    for (var [t, e] of r) {
      this.$gr.set(t, e);
    }
    return this;
  }
  SetContextBuiltinFunctions(r) {
    for (var [t, e] of r) {
      this.$gr.set(t, e);
      this.X71.add(t);
    }
    return this;
  }
  AddBuiltinFunction(r, t) {
    this.$gr.set(r, t);
    return this;
  }
  SetDefaultParams(r) {
    this.Params = {
      ...r
    };
    return this;
  }
  Ygr(t) {
    switch (t.NodeType) {
      case 0:
      case 1:
      case 2:
        return t.Value;
      case 3:
        return t.Value.map(r => this.Ygr(r));
      case 4:
        var r = this.Params?.[t.Value] ?? this.lDt?.[t.Value];
        if (r === undefined) {
          throw new Error("Undefined variable: " + t.Value);
        }
        return r;
      case 9:
        r = this.Ygr(t.Value);
        if (r === undefined || !Array.isArray(r)) {
          throw new Error("Variable is not a valid array");
        }
        var e = this.Ygr(t.Index);
        if (e === undefined || typeof e != "number" || e < 0 || e >= r.length) {
          throw new Error("Invalid array index: " + String(e));
        }
        return r[e];
      case 6:
        var i = this.Ygr(t.Args[0]);
        switch (t.Operator) {
          case "+":
            return +i;
          case "-":
            return -i;
          case "!":
            return !i;
          default:
            throw new Error("Invalid unary operator: " + t.Operator);
        }
      case 5:
        var s = this.Ygr(t.Args[0]);
        var n = this.Ygr(t.Args[1]);
        try {
          switch (t.Operator) {
            case "+":
              return s + n;
            case "-":
              return s - n;
            case "*":
              return s * n;
            case "/":
              return s / n;
            case ">":
              return n < s;
            case ">=":
              return n <= s;
            case "<":
              return s < n;
            case "<=":
              return s <= n;
            case "==":
              return s == n;
            case "!=":
              return s != n;
            case "&&":
              return s && n;
            case "||":
              return s || n;
            default:
              throw new Error("Invalid binary operator: " + t.Operator);
          }
        } catch (r) {
          throw new Error(`Invalid operation: ${s} ${t.Operator} ${n}`);
        }
      case 7:
        r = t.Args.map(r => this.Ygr(r));
        e = this.$gr.get(t.Value);
        if (this.X71.has(t.Value)) {
          return e?.(this.context, ...r);
        } else {
          return e?.(...r);
        }
      case 8:
        return this.Ygr(t.Value);
      default:
        throw new Error("Invalid node type: " + t.NodeType);
    }
  }
  Evaluate(r, t) {
    this.lDt = r;
    this.context = t;
    let e = undefined;
    try {
      e = this.Ygr(this.Xgr);
    } catch (r) {
      e = undefined;
      if (r instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Event", 19, "Trigger条件解析异常", r, ["formula", this.Rgr], ["error", r.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 19, "Trigger条件解析异常", ["formula", this.Rgr], ["error", r]);
      }
    } finally {
      this.lDt = undefined;
      this.context = undefined;
    }
    return e;
  }
}
exports.Formula = Formula;
//# sourceMappingURL=ConditionFormula.js.map