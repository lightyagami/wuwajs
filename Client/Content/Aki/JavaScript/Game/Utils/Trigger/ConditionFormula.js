"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.Formula = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  Macro_1 = require("../../../Core/Preprocessor/Macro");
class Lexer {
  constructor(r) {
    this.ygr = r, this.cC = 0
  }
  Tokenize() {
    for (var r = []; this.cC < this.ygr.length;) {
      var t = this.ygr[this.cC];
      if (/\d/.test(t)) r.push(this.Igr());
      else if (/[a-zA-Z]/.test(t)) r.push(this.Tgr());
      else if (/['"`]/.test(t)) r.push(this.Lgr());
      else if (/\+|-|\*|\/|%|>|<|=|!|&|\|/.test(t)) r.push(this.Dgr());
      else {
        if ("," === t) r.push({
          TokenType: 5,
          TokenString: ","
        });
        else if ("(" === t) r.push({
          TokenType: 6,
          TokenString: "("
        });
        else if (")" === t) r.push({
          TokenType: 7,
          TokenString: ")"
        });
        else if ("[" === t) r.push({
          TokenType: 8,
          TokenString: "["
        });
        else if ("]" === t) r.push({
          TokenType: 9,
          TokenString: "]"
        });
        else if (!/\s/.test(t)) throw new Error("Invalid character: " + t);
        this.cC++
      }
    }
    return r.push({
      TokenType: 10,
      TokenString: ""
    }), r
  }
  Igr() {
    let r = "";
    for (; this.cC < this.ygr.length && /\d/.test(this.ygr[this.cC]);) r += this.ygr[this.cC], this.cC++;
    if ("." === this.ygr[this.cC])
      for (r += ".", this.cC++; this.cC < this.ygr.length && /\d/.test(this.ygr[this.cC]);) r += this.ygr[this.cC], this.cC++;
    return {
      TokenType: 0,
      TokenString: r
    }
  }
  Tgr() {
    let r = "";
    for (; this.cC < this.ygr.length && /[a-zA-Z0-9]/.test(this.ygr[this.cC]);) r += this.ygr[this.cC++];
    return "TRUE" === r || "FALSE" === r ? {
      TokenType: 1,
      TokenString: r.toLowerCase()
    } : "AND" === r ? {
      TokenType: 4,
      TokenString: "&&"
    } : "OR" === r ? {
      TokenType: 4,
      TokenString: "||"
    } : "XOR" === r ? {
      TokenType: 4,
      TokenString: "!="
    } : "NOT" === r ? {
      TokenType: 4,
      TokenString: "!"
    } : {
      TokenType: 3,
      TokenString: r
    }
  }
  Lgr() {
    var r = this.ygr[this.cC++];
    let t = "";
    for (; this.cC < this.ygr.length;) {
      var e = this.ygr[this.cC++];
      if (e === r) return {
        TokenType: 2,
        TokenString: t
      };
      t += e
    }
    throw new Error("Invalid string: " + t)
  }
  Dgr() {
    let r = "";
    for (; this.cC < this.ygr.length && /\+|-|\*|\/|%|>|<|=|!|&|\|/.test(this.ygr[this.cC]);) r += this.ygr[this.cC], this.cC++;
    return {
      TokenType: 4,
      TokenString: r
    }
  }
}
class Parser {
  constructor(r) {
    this.Ugr = r, this.Rgr = "", this.cC = 0
  }
  Parse(r) {
    this.Rgr = r;
    var t = this.Agr();
    if (this.cC !== this.Ugr.length - 1) throw new Error("Unexpected token when parsing expression " + r);
    return t
  }
  Agr() {
    return this.Pgr()
  }
  Pgr() {
    let r = this.xgr();
    for (; this.wgr("||");) {
      var t = this.Bgr().TokenString,
        e = this.xgr();
      r = {
        NodeType: 5,
        Operator: t,
        Args: [r, e]
      }
    }
    return r
  }
  xgr() {
    let r = this.bgr();
    for (; this.wgr("&&");) {
      var t = this.Bgr().TokenString,
        e = this.bgr();
      r = {
        NodeType: 5,
        Operator: t,
        Args: [r, e]
      }
    }
    return r
  }
  bgr() {
    let r = this.qgr();
    for (; this.wgr("==", "!=");) {
      var t = this.Bgr().TokenString,
        e = this.qgr();
      r = {
        NodeType: 5,
        Operator: t,
        Args: [r, e]
      }
    }
    return r
  }
  qgr() {
    let r = this.Ggr();
    for (; this.wgr(">", ">=", "<", "<=");) {
      var t = this.Bgr().TokenString,
        e = this.Ggr();
      r = {
        NodeType: 5,
        Operator: t,
        Args: [r, e]
      }
    }
    return r
  }
  Ggr() {
    let r = this.Ngr();
    for (; this.wgr("+", "-");) {
      var t = this.Bgr().TokenString,
        e = this.Ngr();
      r = {
        NodeType: 5,
        Operator: t,
        Args: [r, e]
      }
    }
    return r
  }
  Ngr() {
    let r = this.Ogr();
    for (; this.wgr("*", "/", "%");) {
      var t = this.Bgr().TokenString,
        e = this.Ogr();
      r = {
        NodeType: 5,
        Operator: t,
        Args: [r, e]
      }
    }
    return r
  }
  Ogr() {
    return this.wgr("+", "-", "!") ? {
      NodeType: 6,
      Operator: this.Bgr().TokenString,
      Args: [this.Ogr()]
    } : this.kgr()
  }
  kgr() {
    var t = this.Fgr();
    if (0 === t.TokenType) return this.Vgr(), t.TokenString.includes(".") ? {
      NodeType: 0,
      Value: parseFloat(t.TokenString)
    } : 10 < t.TokenString.length ? {
      NodeType: 0,
      Value: BigInt(t.TokenString)
    } : {
      NodeType: 0,
      Value: parseInt(t.TokenString)
    };
    if (1 === t.TokenType) return this.Vgr(), {
      NodeType: 1,
      Value: "true" === t.TokenString
    };
    if (2 === t.TokenType) return this.Vgr(), {
      NodeType: 2,
      Value: t.TokenString
    };
    if (3 === t.TokenType) {
      var e = t.TokenString;
      if (this.Vgr(), this.Hgr(6)) return this.jgr(e);
      let r = {
        NodeType: 4,
        Value: e
      };
      for (; this.Hgr(8);) {
        var i = this.Agr();
        this.Wgr(9, "Expected ']' after array when parsing expression " + this.Rgr), r = {
          NodeType: 9,
          Value: r,
          Index: i
        }
      }
      return r
    }
    if (this.Hgr(6)) return e = this.Agr(), this.Wgr(7, "Expected ')' after expression when parsing " + this.Rgr), {
      NodeType: 8,
      Value: e
    };
    if (this.Hgr(8)) return this.Kgr();
    throw new Error(t.TokenString + " when parsing expression " + this.Rgr)
  }
  jgr(r) {
    var t = [];
    if (!this.Ii(7))
      for (; t.push(this.Agr()), this.Hgr(5););
    return this.Wgr(7, "Expected ')' after arguments when parsing expression " + this.Rgr), {
      NodeType: 7,
      Value: r,
      Args: t
    }
  }
  Kgr() {
    var r = [];
    if (!this.Ii(9))
      for (; r.push(this.Agr()), this.Hgr(5););
    this.Wgr(9, "Expected ']' after array when parsing expression " + this.Rgr);
    let t = {
      NodeType: 3,
      Value: r
    };
    for (; this.Hgr(8);) {
      var e = this.Agr();
      this.Wgr(9, "Expected ']' after array when parsing expression " + this.Rgr), t = {
        NodeType: 9,
        Value: t,
        Index: e
      }
    }
    return t
  }
  Hgr(...r) {
    for (const t of r)
      if (this.Ii(t)) return this.Vgr(), !0;
    return !1
  }
  wgr(...r) {
    for (const t of r)
      if (this.Ii(4) && this.Fgr().TokenString === t) return this.Vgr(), !0;
    return !1
  }
  Wgr(r, t) {
    if (!this.Ii(r)) throw new Error(t);
    this.Vgr()
  }
  Ii(r) {
    return !this.Qgr() && this.Fgr().TokenType === r
  }
  Vgr() {
    return this.Qgr() || this.cC++, this.Bgr()
  }
  Qgr() {
    return 10 === this.Fgr().TokenType
  }
  Fgr() {
    return this.Ugr[this.cC]
  }
  Bgr() {
    return this.Ugr[this.cC - 1]
  }
}
class Formula {
  constructor(r) {
    this.Xgr = void 0, this.Rgr = "", this.Params = void 0, this.lDt = void 0, this.$gr = new Map, this.m71 = new Set, this.context = void 0, this.olh = new Map, this.zQn = new Set, this.Rgr = r;
    var t = new Lexer(r).Tokenize(),
      t = new Parser(t);
    this.Xgr = t.Parse(r), this.Params = void 0
  }
  get FormulaStr() {
    return this.Rgr
  }
  SetBuiltinFunctions(r) {
    this.$gr.clear();
    for (var [t, e] of r) this.$gr.set(t, e);
    return this
  }
  SetContextBuiltinFunctions(r) {
    for (var [t, e] of r) this.$gr.set(t, e), this.m71.add(t);
    return this
  }
  AddBuiltinFunction(r, t) {
    return this.$gr.set(r, t), this
  }
  SetDefaultParams(r) {
    return this.Params = {
      ...r
    }, this
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
        if (void 0 === r) throw new Error("Undefined variable: " + t.Value);
        return r;
      case 9:
        r = this.Ygr(t.Value);
        if (void 0 === r || !Array.isArray(r)) throw new Error("Variable is not a valid array");
        var e = this.Ygr(t.Index);
        if (void 0 === e || "number" != typeof e || e < 0 || e >= r.length) throw new Error("Invalid array index: " + String(e));
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
            throw new Error("Invalid unary operator: " + t.Operator)
        }
      case 5:
        var s = this.Ygr(t.Args[0]),
          n = this.Ygr(t.Args[1]);
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
              throw new Error("Invalid binary operator: " + t.Operator)
          }
        } catch (r) {
          throw new Error(`Invalid operation: ${s} ${t.Operator} ` + n)
        }
      case 7:
        r = t.Args.map(r => this.Ygr(r)), e = this.$gr.get(t.Value);
        return this.m71.has(t.Value) ? e?.(this.context, ...r) : e?.(...r);
      case 8:
        return this.Ygr(t.Value);
      default:
        throw new Error("Invalid node type: " + t.NodeType)
    }
  }
  Evaluate(r, t) {
    this.lDt = r, this.context = t;
    let e = void 0;
    try {
      e = this.Ygr(this.Xgr)
    } catch (r) {
      e = void 0, r instanceof Error ? Log_1.Log.CheckError() && Log_1.Log.ErrorWithStack("Event", 19, "Trigger条件解析异常", r, ["formula", this.Rgr], ["error", r.message]) : Log_1.Log.CheckError() && Log_1.Log.Error("Event", 19, "Trigger条件解析异常", ["formula", this.Rgr], ["error", r])
    } finally {
      this.lDt = void 0, this.context = void 0
    }
    return e
  }
}
exports.Formula = Formula;
//# sourceMappingURL=ConditionFormula.js.map