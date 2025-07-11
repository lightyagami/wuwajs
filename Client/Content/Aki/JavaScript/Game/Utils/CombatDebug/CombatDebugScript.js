"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CombatScriptHelperBase = exports.CombatScriptSet = exports.CombatScriptUnit = undefined;
const UE = require("ue");
class CombatScriptUnit {
  constructor(t, s, r, i) {
    this.Cmd = t;
    this.Body = s;
    this.ViewName = r;
    this.Introduction = i;
  }
  ToString() {
    return `-------------------------------------------------------------------------
        -指令名称： ${this.ViewName}
        -指令介绍： ${this.Introduction}
        -指令详情： ${this.Cmd} 
        -指令具体内容： ${this.Body}
`;
  }
}
exports.CombatScriptUnit = CombatScriptUnit;
class CombatScriptSet {
  constructor() {
    this.Introduction = "";
    this.CombatScriptUnits = new Array();
  }
  OnFilterCmd() {
    return "CombatScriptHelper.GetCombatScriptBaseByName('" + this.constructor.name + "').Introduction;";
  }
}
exports.CombatScriptSet = CombatScriptSet;
class CombatScriptHelperBase {
  constructor() {
    this.CombatScripts = new Array();
    this.CombatScriptNames = new Array();
    this.UeCombatScriptNames = UE.NewArray(UE.BuiltinString);
    this.IsInit = false;
  }
  Init() {
    if (!this.IsInit) {
      this.ht();
      this.OnInit();
      for (const t of this.CombatScripts) {
        for (const s of t.CombatScriptUnits) {
          this.CombatScriptNames.push(s.Cmd);
          this.UeCombatScriptNames.Add(s.Cmd);
        }
      }
      this.IsInit = true;
    }
  }
  ht() {
    this.CombatScripts.length = 0;
    this.CombatScriptNames.length = 0;
    this.UeCombatScriptNames.Empty();
  }
  OnInit() {}
  FilterCmd(t) {
    let s = t;
    for (const r of this.CombatScripts) {
      if (t === r.constructor.name) {
        return r.OnFilterCmd();
      }
      for (const i of r.CombatScriptUnits) {
        s = s.replace(i.Cmd, i.Body);
      }
    }
    return s;
  }
  get CombatScriptIndexes() {
    this.Init();
    return this.UeCombatScriptNames;
  }
  GetCombatScriptBaseByName(t) {
    for (const s of this.CombatScripts) {
      if (s.constructor.name === t) {
        return s;
      }
    }
  }
}
exports.CombatScriptHelperBase = CombatScriptHelperBase;
//# sourceMappingURL=CombatDebugScript.js.map