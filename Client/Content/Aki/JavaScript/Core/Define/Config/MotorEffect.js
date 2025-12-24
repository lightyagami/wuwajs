"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorEffect = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MotorEffect {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get SkillLevel() {
    return this.skilllevel();
  }
  get DamageIdList() {
    return GameUtils_1.GameUtils.ConvertToArray(this.damageidlistLength(), this.damageidlist, this);
  }
  get Param1() {
    return this.param1();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsMotorEffect(t, i) {
    return (i || new MotorEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilllevel() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetDamageidlistAt(t) {
    return this.damageidlist(t);
  }
  damageidlist(t) {
    var i = this.J7.__offset(this.z7, 10);
    if (i) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + i) + t * 8);
    } else {
      return 0;
    }
  }
  damageidlistLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  damageidlistArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  param1(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.MotorEffect = MotorEffect;
//# sourceMappingURL=MotorEffect.js.map