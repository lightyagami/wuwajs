"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NewTowerRole = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
const DicIntStringArray_1 = require("./SubType/DicIntStringArray");
const LongArray_1 = require("./SubType/LongArray");
class NewTowerRole {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get AddBuffs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.addbuffsLength(), this.addbuffs, this);
  }
  get TemplateRoleId() {
    return this.templateroleid();
  }
  get EnhanceSkillDesc() {
    return GameUtils_1.GameUtils.ConvertToMap(this.enhanceskilldescLength(), this.enhanceskilldescKey, this.enhanceskilldescValue, this);
  }
  enhanceskilldescKey(t) {
    return this.enhanceskilldesc(t)?.key();
  }
  enhanceskilldescValue(t) {
    return this.enhanceskilldesc(t)?.value();
  }
  get EnhanceSkillDescParam() {
    return GameUtils_1.GameUtils.ConvertToMap(this.enhanceskilldescparamLength(), this.enhanceskilldescparamKey, this.enhanceskilldescparamValue, this);
  }
  enhanceskilldescparamKey(t) {
    return this.enhanceskilldescparam(t)?.key();
  }
  enhanceskilldescparamValue(t) {
    return this.enhanceskilldescparam(t)?.value();
  }
  get TemplateDesc() {
    return this.templatedesc();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsNewTowerRole(t, e) {
    return (e || new NewTowerRole()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAddbuffsAt(t, e) {
    return this.addbuffs(t);
  }
  addbuffs(t, e) {
    var s = this.J7.__offset(this.z7, 6);
    if (s) {
      return (e || new LongArray_1.LongArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  addbuffsLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  templateroleid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetEnhanceskilldescAt(t, e) {
    return this.enhanceskilldesc(t);
  }
  enhanceskilldesc(t, e) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return (e || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  enhanceskilldescLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetEnhanceskilldescparamAt(t, e) {
    return this.enhanceskilldescparam(t);
  }
  enhanceskilldescparam(t, e) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (e || new DicIntStringArray_1.DicIntStringArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  enhanceskilldescparamLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  templatedesc(t) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.NewTowerRole = NewTowerRole;
//# sourceMappingURL=NewTowerRole.js.map