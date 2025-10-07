"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SurvivorsWeaponEvolve = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class SurvivorsWeaponEvolve {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get WeaponId() {
    return this.weaponid();
  }
  get Quality() {
    return this.quality();
  }
  get ConditionType() {
    return this.conditiontype();
  }
  get ConditionArgs() {
    return GameUtils_1.GameUtils.ConvertToMap(this.conditionargsLength(), this.conditionargsKey, this.conditionargsValue, this);
  }
  conditionargsKey(t) {
    return this.conditionargs(t)?.key();
  }
  conditionargsValue(t) {
    return this.conditionargs(t)?.value();
  }
  get EvolveName() {
    return this.evolvename();
  }
  get UnlockDesc() {
    return GameUtils_1.GameUtils.ConvertToArray(this.unlockdescLength(), this.unlockdesc, this);
  }
  get Describe() {
    return this.describe();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSurvivorsWeaponEvolve(t, i) {
    return (i || new SurvivorsWeaponEvolve()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weaponid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  quality() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  conditiontype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetConditionargsAt(t, i) {
    return this.conditionargs(t);
  }
  conditionargs(t, i) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  conditionargsLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  evolvename(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetUnlockdescAt(t) {
    return this.unlockdesc(t);
  }
  unlockdesc(t, i) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, i) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  unlockdescLength() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  describe(t) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.SurvivorsWeaponEvolve = SurvivorsWeaponEvolve;
//# sourceMappingURL=SurvivorsWeaponEvolve.js.map