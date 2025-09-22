"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WeaponReson = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class WeaponReson {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ResonId() {
    return this.resonid();
  }
  get Level() {
    return this.level();
  }
  get Name() {
    return this.name();
  }
  get Effect() {
    return GameUtils_1.GameUtils.ConvertToArray(this.effectLength(), this.effect, this);
  }
  get Consume() {
    return this.consume();
  }
  get GoldConsume() {
    return this.goldconsume();
  }
  get MaterialPlaceType() {
    return this.materialplacetype();
  }
  get AlternativeConsume() {
    return GameUtils_1.GameUtils.ConvertToArray(this.alternativeconsumeLength(), this.alternativeconsume, this);
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsWeaponReson(t, s) {
    return (s || new WeaponReson()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  resonid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  level() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetEffectAt(t) {
    return this.effect(t);
  }
  effect(t) {
    var s = this.J7.__offset(this.z7, 12);
    if (s) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + s) + t * 8);
    } else {
      return 0;
    }
  }
  effectLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  effectArray() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  consume() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  goldconsume() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  materialplacetype() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetAlternativeconsumeAt(t) {
    return this.alternativeconsume(t);
  }
  alternativeconsume(t) {
    var s = this.J7.__offset(this.z7, 20);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  alternativeconsumeLength() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  alternativeconsumeArray() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.WeaponReson = WeaponReson;
//# sourceMappingURL=WeaponReson.js.map