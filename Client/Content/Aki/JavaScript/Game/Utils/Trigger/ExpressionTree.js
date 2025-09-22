"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpressionTree = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Macro_1 = require("../../../Core/Preprocessor/Macro");
const GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils");
const CharacterTagContainer_1 = require("../../NewWorld/Character/Common/Component/Abilities/CharacterTagContainer");
const ExpressionTreeModel_1 = require("./ExpressionTreeModel");
class CustomVariable {
  constructor(t) {
    this.CXc = new Map();
    this.VariableMap = new Map();
    this.pXc = [];
    this.CXc = t;
    this.pXc.length = 0;
    this.VariableMap.clear();
  }
  static Create(t, i) {
    var s;
    var e;
    var r = new CustomVariable(t);
    for ([s, e] of t) {
      r.vXc(s, e);
    }
    if (r.pXc.length > 0) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 85, "解析表达式自定义变量异常", ["reason", i], ["ErrorInfo", r.pXc], ["CustomVariableStr", r.CXc]);
      }
      r.pXc.length = 0;
    }
    return r;
  }
  vXc(t, i) {
    var s = i.replace(/\s+/g, "").split("#");
    if (s.length < 2) {
      this.yXc(i + "解析自定义变量格式错误:字符串数量小于2");
    } else {
      switch (s[0]) {
        case "Long":
          var e = Number(s[1]);
          if (isNaN(e)) {
            this.yXc(i + "解析自定义变量格式错误: 数字不合法");
          } else {
            this.VariableMap.set(t, {
              Type: 0,
              Value: e
            });
          }
          break;
        case "LongArray":
          var r = [];
          for (let t = 1; t < s.length; t++) {
            var a = Number(s[t]);
            if (isNaN(a)) {
              this.yXc(i + "解析自定义变量格式错误: 数组不合法");
              return;
            }
            r.push(a);
          }
          this.VariableMap.set(t, {
            Type: 1,
            Value: r
          });
          break;
        case "Tag":
          e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s[1]);
          if (!e) {
            this.yXc(i + "解析自定义变量格式错误: Tag不合法");
            return;
          }
          this.VariableMap.set(t, {
            Type: 2,
            Value: e
          });
          break;
        case "TagContainer":
          var h = new CharacterTagContainer_1.TagContainer();
          for (let t = 1; t < s.length; t++) {
            var o = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s[t]);
            if (!o) {
              this.yXc(i + "解析自定义变量格式错误: Tag不合法, 异常tagName" + s[t]);
              return;
            }
            h.AddExactTag(1, o);
          }
          this.VariableMap.set(t, {
            Type: 3,
            Value: h
          });
          break;
        case "String":
          this.VariableMap.set(t, {
            Type: 4,
            Value: s[1]
          });
      }
    }
  }
  HasVariable(t) {
    return this.VariableMap.has(t);
  }
  GetVariable(t) {
    return this.VariableMap.get(t)?.Value;
  }
  yXc(t) {
    this.pXc.push(t);
  }
}
const operatorMap = new Map([["OR", 0], ["AND", 1], ["NOT", 2], ["SequenceTrue", 3]]);
class ExpressionTree {
  constructor() {
    this.Rgr = "";
    this.SXc = undefined;
    this.pXc = [];
    this.cC = 0;
    this.MXc = undefined;
    this.nx = undefined;
    this.lDt = undefined;
    this.cp = false;
    this.pLe = "";
  }
  ResetData() {
    this.Rgr = "";
    this.SXc = undefined;
    this.cC = 0;
    this.pLe = "";
    this.pXc.length = 0;
    this.nx = undefined;
    this.MXc = undefined;
    this.cp = false;
  }
  Parse(t, i, s) {
    this.ResetData();
    this.Rgr = i;
    this.pLe = t;
    if (s) {
      this.SXc = CustomVariable.Create(s, t);
    }
    let e = true;
    try {
      this.MXc = this.EXc();
      this.IXc();
      if (!this.YMa) {
        throw new Error("有未解析的字符,position" + this.cC);
      }
    } catch (t) {
      e = false;
      if (t instanceof Error) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.ErrorWithStack("Event", 85, "解析表达式异常", t, ["formula", this.Rgr], ["error", t.message]);
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Event", 85, "解析表达式异常", ["formula", this.Rgr], ["error", t]);
      }
    }
    return e;
  }
  EXc() {
    this.IXc();
    if (!this.YMa) {
      if (this.Rgr[this.cC] !== "(") {
        this.TXc(`解析表达式格式错误:位置${this.cC}期望一个(`);
      } else {
        this.cC++;
        var t = this.bXc();
        this.IXc();
        if (this.Rgr[this.cC] === ")") {
          this.cC++;
          return t;
        }
        this.TXc(`解析表达式格式错误:位置${this.cC}期望一个)`);
      }
    }
  }
  bXc() {
    var i = [];
    let s = undefined;
    let e = false;
    while (!this.YMa) {
      this.IXc();
      var r = this.Rgr[this.cC];
      let t = undefined;
      e = false;
      if (/\d/.test(r)) {
        t = this.RXc();
      } else if (/[a-zA-Z]/.test(r)) {
        t = this.wXc();
      } else {
        if (r !== "(") {
          break;
        }
        t = this.EXc();
        e = true;
      }
      if (!t) {
        break;
      }
      if (!e && t.NodeType <= 4) {
        if (s) {
          this.TXc(`解析表达式格式错误:括号内有多个操作符 ${s.Value} 和 ${t.Value}`);
        }
        s = t;
      } else {
        i.push(t);
      }
    }
    if (s !== undefined) {
      s.Children = i;
      return s;
    }
    this.TXc("解析表达式格式错误:括号内没有操作符");
  }
  RXc() {
    var t = this.cC;
    for (; this.cC < this.Rgr.length && /\d/.test(this.Rgr[this.cC]);) {
      this.cC++;
    }
    if (this.Rgr[this.cC] === ".") {
      for (this.cC++; this.cC < this.Rgr.length && /\d/.test(this.Rgr[this.cC]);) {
        this.cC++;
      }
    }
    return {
      NodeType: 9,
      Value: Number(this.Rgr.substring(t, this.cC))
    };
  }
  wXc() {
    var t = this.cC;
    for (; this.cC < this.Rgr.length && /[a-zA-Z0-9]/.test(this.Rgr[this.cC]);) {
      this.cC++;
    }
    var t = this.Rgr.substring(t, this.cC);
    let i = undefined;
    i = operatorMap.has(t) ? {
      NodeType: operatorMap.get(t),
      Value: t
    } : ExpressionTreeModel_1.builtinFuncMap.has(t) ? {
      NodeType: 4,
      Value: t
    } : (this.SXc?.HasVariable(t), {
      NodeType: 6,
      Value: t
    });
    if (this.Rgr[this.cC] === ".") {
      this.cC++;
      t = [i];
      if ((i = this.wXc()) === undefined || i.NodeType !== 4) {
        this.TXc(`解析表达式格式错误:.号操作符后接符号不合法${i?.Value}节点类型${i?.NodeType}`);
      }
      i.NodeType = 5;
      i.Children = t;
    }
    return i;
  }
  get YMa() {
    return this.cC >= this.Rgr.length;
  }
  IXc() {
    while (this.cC < this.Rgr.length) {
      var t = this.Rgr[this.cC];
      if (!/[\s,]/.test(t)) {
        break;
      }
      this.cC++;
    }
  }
  TXc(t) {
    throw new Error(t);
  }
  Ygr(t) {
    switch (t.NodeType) {
      case 9:
      case 7:
      case 8:
        return t.Value;
      case 6:
        var i = t.Value;
        return this.SXc?.GetVariable(i) ?? this.lDt?.[i];
      case 1:
        for (const s of t.Children) {
          if (!this.Ygr(s)) {
            return false;
          }
        }
        return true;
      case 0:
        for (const e of t.Children) {
          if (this.Ygr(e)) {
            return true;
          }
        }
        return false;
      case 2:
        return !!t.Children && t.Children.length !== 0 && !this.Ygr(t.Children[0]);
      case 3:
        for (const r of t.Children) {
          this.Ygr(r);
        }
        return true;
      case 5:
      case 4:
        i = t.Children.map(t => this.Ygr(t));
        return ExpressionTreeModel_1.builtinFuncMap.get(t.Value)?.(this.nx, ...i);
    }
    return false;
  }
  Evaluate(t, i) {
    let s = undefined;
    if (this.MXc) {
      if (this.cp) {
        if (Log_1.Log.CheckError()) {
          Log_1.Log.Error("Event", 85, "解析表达式重复进入", ["formula", this.Rgr], ["reason", this.pLe]);
        }
      } else {
        this.nx = t;
        this.lDt = i;
        this.cp = true;
        try {
          s = this.Ygr(this.MXc);
        } catch (t) {
          s = undefined;
          if (t instanceof Error) {
            if (Log_1.Log.CheckError()) {
              Log_1.Log.ErrorWithStack("Event", 85, "解析表达式异常", t, ["formula", this.Rgr], ["reason", this.pLe], ["error", t.message]);
            }
          } else if (Log_1.Log.CheckError()) {
            Log_1.Log.Error("Event", 85, "解析表达式异常", ["formula", this.Rgr], ["reason", this.pLe], ["error", t]);
          }
        } finally {
          this.nx = undefined;
          this.lDt = undefined;
          this.cp = false;
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Event", 85, "解析表达式节点为空", ["formula", this.Rgr], ["reason", this.pLe]);
    }
    return s;
  }
}
(exports.ExpressionTree = ExpressionTree).Ype = false;
//# sourceMappingURL=ExpressionTree.js.map