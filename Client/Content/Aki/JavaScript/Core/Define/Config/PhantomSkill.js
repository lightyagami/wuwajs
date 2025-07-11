"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomSkill = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const StringArray_1 = require("./SubType/StringArray");
class PhantomSkill {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get PhantomSkillId() {
    return this.phantomskillid();
  }
  get BuffIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffidsLength(), this.buffids, this);
  }
  get SettleIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.settleidsLength(), this.settleids, this);
  }
  get BuffEffects() {
    return GameUtils_1.GameUtils.ConvertToArray(this.buffeffectsLength(), this.buffeffects, this);
  }
  get ChargeEfficiency() {
    return this.chargeefficiency();
  }
  get SkillGroupId() {
    return this.skillgroupid();
  }
  get SkillCD() {
    return this.skillcd();
  }
  get DescriptionEx() {
    return this.descriptionex();
  }
  get SimplyDescription() {
    return this.simplydescription();
  }
  get IfCounterSkill() {
    return this.ifcounterskill();
  }
  get CurLevelDescriptionEx() {
    return GameUtils_1.GameUtils.ConvertToArray(this.curleveldescriptionexLength(), this.curleveldescriptionex, this);
  }
  get LevelDescStrArray() {
    return GameUtils_1.GameUtils.ConvertToArray(this.leveldescstrarrayLength(), this.leveldescstrarray, this);
  }
  get BattleViewIcon() {
    return this.battleviewicon();
  }
  get SpecialBattleViewIcon() {
    return this.specialbattleviewicon();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsPhantomSkill(t, i) {
    return (i || new PhantomSkill()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  phantomskillid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBuffidsAt(t) {
    return this.buffids(t);
  }
  buffids(t) {
    var i = this.J7.__offset(this.z7, 8);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  buffidsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffidsArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetSettleidsAt(t) {
    return this.settleids(t);
  }
  settleids(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  settleidsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  settleidsArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  GetBuffeffectsAt(t) {
    return this.buffeffects(t);
  }
  buffeffects(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  buffeffectsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffeffectsArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  chargeefficiency() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillgroupid() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillcd() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  descriptionex(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  simplydescription(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  ifcounterskill() {
    var t = this.J7.__offset(this.z7, 24);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  GetCurleveldescriptionexAt(t) {
    return this.curleveldescriptionex(t);
  }
  curleveldescriptionex(t, i) {
    var s = this.J7.__offset(this.z7, 26);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  curleveldescriptionexLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLeveldescstrarrayAt(t, i) {
    return this.leveldescstrarray(t);
  }
  leveldescstrarray(t, i) {
    var s = this.J7.__offset(this.z7, 28);
    if (s) {
      return (i || new StringArray_1.StringArray()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  leveldescstrarrayLength() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  battleviewicon(t) {
    var i = this.J7.__offset(this.z7, 30);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  specialbattleviewicon(t) {
    var i = this.J7.__offset(this.z7, 32);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.PhantomSkill = PhantomSkill;
//# sourceMappingURL=PhantomSkill.js.map