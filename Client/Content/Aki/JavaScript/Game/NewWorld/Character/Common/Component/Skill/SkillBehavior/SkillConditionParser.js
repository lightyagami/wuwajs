"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionArray = exports.Parser = undefined;
class Parser {
  constructor(t) {
    this.NOn = t;
    this.Ugr = [];
    this.Xy = 0;
    this.Tokenize();
  }
  Tokenize() {
    let s = "";
    for (let t = 0; t < this.NOn.length; t++) {
      var r = this.NOn[t];
      if (r !== " ") {
        if ("|&!".includes(r)) {
          if (s) {
            this.Ugr.push({
              Type: "number",
              Value: s
            });
            s = "";
          }
          if (t + 1 < this.NOn.length && this.NOn[t + 1] === r) {
            this.Ugr.push({
              Type: "operator",
              Value: r + r
            });
            t++;
          } else {
            this.Ugr.push({
              Type: "operator",
              Value: r
            });
          }
        } else if ("()".includes(r)) {
          if (s) {
            this.Ugr.push({
              Type: "number",
              Value: s
            });
            s = "";
          }
          this.Ugr.push({
            Type: "parenthesis",
            Value: r
          });
        } else {
          s += r;
        }
      }
    }
    if (s) {
      this.Ugr.push({
        Type: "number",
        Value: s
      });
    }
  }
  Parse() {
    if (!this.Ugr.length) {
      throw new Error("No tokens to parse");
    }
    var t = this.Agr();
    if (this.Xy !== this.Ugr.length) {
      throw new Error("Unexpected tokens after parsing");
    }
    return t;
  }
  Agr() {
    return this.kOn();
  }
  kOn() {
    let t = this.FOn();
    while (this.Xy < this.Ugr.length && this.Ugr[this.Xy].Value === "||") {
      this.Xy++;
      t = {
        Or: [t, this.FOn()]
      };
    }
    return t;
  }
  FOn() {
    let t = this.VOn();
    while (this.Xy < this.Ugr.length && this.Ugr[this.Xy].Value === "&&") {
      this.Xy++;
      t = {
        And: [t, this.VOn()]
      };
    }
    return t;
  }
  VOn() {
    if (this.Xy < this.Ugr.length && this.Ugr[this.Xy].Value === "!") {
      this.Xy++;
      return {
        Not: this.VOn()
      };
    } else {
      return this.HOn();
    }
  }
  HOn() {
    if (this.Xy >= this.Ugr.length) {
      throw new Error("Unexpected end of input");
    }
    if (this.Ugr[this.Xy].Value === "(") {
      this.Xy++;
      var t = this.Agr();
      if (this.Xy >= this.Ugr.length || this.Ugr[this.Xy].Value !== ")") {
        throw new Error("Missing closing parenthesis");
      }
      this.Xy++;
      return t;
    }
    t = this.Ugr[this.Xy];
    if (t.Type === "number") {
      this.Xy++;
      return {
        Index: parseInt(t.Value)
      };
    }
    throw new Error("Unexpected token type");
  }
}
exports.Parser = Parser;
class ConditionArray {
  constructor(t, s) {
    this.Qte = t;
    this.jOn = s;
  }
  Evaluate() {
    return this.WOn(this.jOn);
  }
  WOn(t) {
    if ("Index" in t && t.Index !== undefined) {
      return this.Qte[t.Index];
    } else if (t.Or) {
      return t.Or.some(t => this.WOn(t));
    } else if (t.And) {
      return t.And.every(t => this.WOn(t));
    } else {
      return !!t.Not && !this.WOn(t.Not);
    }
  }
}
exports.ConditionArray = ConditionArray;
//# sourceMappingURL=SkillConditionParser.js.map