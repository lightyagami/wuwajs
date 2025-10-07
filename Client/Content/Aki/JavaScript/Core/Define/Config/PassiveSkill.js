"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PassiveSkill = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PassiveSkill {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SkillDesc() {
    return this.skilldesc();
  }
  get CDTime() {
    return this.cdtime();
  }
  get CdThreshold() {
    return this.cdthreshold();
  }
  get ShareGroupId() {
    return this.sharegroupid();
  }
  get MaxCount() {
    return this.maxcount();
  }
  get IsShareAllCdSkill() {
    return this.isshareallcdskill();
  }
  get IsDefaultActivated() {
    return this.isdefaultactivated();
  }
  get TriggerType() {
    return this.triggertype();
  }
  get TriggerPreset() {
    return GameUtils_1.GameUtils.ConvertToArray(this.triggerpresetLength(), this.triggerpreset, this);
  }
  get TriggerParams() {
    return this.triggerparams();
  }
  get TriggerFormula() {
    return this.triggerformula();
  }
  get SubSkillAction() {
    return GameUtils_1.GameUtils.ConvertToArray(this.subskillactionLength(), this.subskillaction, this);
  }
  get InstigatorType() {
    return this.instigatortype();
  }
  get SkillAction() {
    return this.skillaction();
  }
  get SkillActionParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillactionparamsLength(), this.skillactionparams, this);
  }
  get ActionScriptParams() {
    return this.actionscriptparams();
  }
  get SkillActionScript() {
    return this.skillactionscript();
  }
  get ActionExecuteFlag() {
    return this.actionexecuteflag();
  }
  get CDType() {
    return this.cdtype();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPassiveSkill(t, i) {
    return (i || new PassiveSkill()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readFloat64(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilldesc(t) {
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  cdtime() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cdthreshold() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return -1;
    }
  }
  sharegroupid() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  maxcount() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  isshareallcdskill() {
    var t = this.J7.__offset(this.z7, 16);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  isdefaultactivated() {
    var t = this.J7.__offset(this.z7, 18);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  triggertype(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetTriggerpresetAt(t) {
    return this.triggerpreset(t);
  }
  triggerpreset(t, i) {
    var s = this.J7.__offset(this.z7, 22);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  triggerpresetLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  triggerparams(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  triggerformula(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetSubskillactionAt(t) {
    return this.subskillaction(t);
  }
  subskillaction(t) {
    var i = this.J7.__offset(this.z7, 28);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  subskillactionLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  subskillactionArray() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  instigatortype(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  skillaction(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetSkillactionparamsAt(t) {
    return this.skillactionparams(t);
  }
  skillactionparams(t, i) {
    var s = this.J7.__offset(this.z7, 34);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  skillactionparamsLength() {
    var t = this.J7.__offset(this.z7, 34);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  actionscriptparams(t) {
    var i = this.J7.__offset(this.z7, 36);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  skillactionscript(t) {
    var i = this.J7.__offset(this.z7, 38);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  actionexecuteflag() {
    var t = this.J7.__offset(this.z7, 40);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  cdtype(t) {
    var i = this.J7.__offset(this.z7, 42);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.PassiveSkill = PassiveSkill;
//# sourceMappingURL=PassiveSkill.js.map