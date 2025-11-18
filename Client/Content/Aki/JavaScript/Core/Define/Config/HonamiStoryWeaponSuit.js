"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HonamiStoryWeaponSuit = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class HonamiStoryWeaponSuit {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get WeaponPluginType() {
    return this.weaponplugintype();
  }
  get NeedNum() {
    return this.neednum();
  }
  get BuffTempId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.bufftempidLength(), this.bufftempid, this);
  }
  get EnhanceLevel() {
    return this.enhancelevel();
  }
  get Name() {
    return this.name();
  }
  get Desc() {
    return this.desc();
  }
  get DescArgs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descargsLength(), this.descargs, this);
  }
  get DescSimple() {
    return this.descsimple();
  }
  get DescSimpleArgs() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descsimpleargsLength(), this.descsimpleargs, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsHonamiStoryWeaponSuit(t, s) {
    return (s || new HonamiStoryWeaponSuit()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  weaponplugintype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  neednum() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetBufftempidAt(t) {
    return this.bufftempid(t);
  }
  bufftempid(t) {
    var s = this.J7.__offset(this.z7, 10);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  bufftempidLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  bufftempidArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  enhancelevel() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 16);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetDescargsAt(t) {
    return this.descargs(t);
  }
  descargs(t, s) {
    var i = this.J7.__offset(this.z7, 18);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  descargsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  descsimple(t) {
    var s = this.J7.__offset(this.z7, 20);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetDescsimpleargsAt(t) {
    return this.descsimpleargs(t);
  }
  descsimpleargs(t, s) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.J7.__vector(this.z7 + i) + t * 4, s) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  descsimpleargsLength() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.HonamiStoryWeaponSuit = HonamiStoryWeaponSuit;
//# sourceMappingURL=HonamiStoryWeaponSuit.js.map