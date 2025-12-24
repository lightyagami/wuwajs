"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MotorLvl = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class MotorLvl {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Level() {
    return this.level();
  }
  get Exp() {
    return this.exp();
  }
  get RewardId() {
    return this.rewardid();
  }
  get WorldLv2Attack() {
    return GameUtils_1.GameUtils.ConvertToMap(this.worldlv2attackLength(), this.worldlv2attackKey, this.worldlv2attackValue, this);
  }
  worldlv2attackKey(t) {
    return this.worldlv2attack(t)?.key();
  }
  worldlv2attackValue(t) {
    return this.worldlv2attack(t)?.value();
  }
  get Speed() {
    return this.speed();
  }
  get NitrogenSpeedValue() {
    return this.nitrogenspeedvalue();
  }
  get NitrogenValue() {
    return this.nitrogenvalue();
  }
  get NitrogenRecoverRate() {
    return this.nitrogenrecoverrate();
  }
  get NitrogenRecoverCoolDown() {
    return this.nitrogenrecovercooldown();
  }
  get NitrogenConsumeRate() {
    return this.nitrogenconsumerate();
  }
  get MotorInitialShieldRate() {
    return this.motorinitialshieldrate();
  }
  get WorldLv2MotorShield() {
    return GameUtils_1.GameUtils.ConvertToMap(this.worldlv2motorshieldLength(), this.worldlv2motorshieldKey, this.worldlv2motorshieldValue, this);
  }
  worldlv2motorshieldKey(t) {
    return this.worldlv2motorshield(t)?.key();
  }
  worldlv2motorshieldValue(t) {
    return this.worldlv2motorshield(t)?.value();
  }
  get MotorShieldRecoverRate() {
    return this.motorshieldrecoverrate();
  }
  get MotorShieldCoolDown() {
    return this.motorshieldcooldown();
  }
  __init(t, r) {
    this.z7 = t;
    this.J7 = r;
    return this;
  }
  static getRootAsMotorLvl(t, r) {
    return (r || new MotorLvl()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  level() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  exp() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  rewardid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWorldlv2attackAt(t, r) {
    return this.worldlv2attack(t);
  }
  worldlv2attack(t, r) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return (r || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  worldlv2attackLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  speed() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nitrogenspeedvalue() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nitrogenvalue() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nitrogenrecoverrate() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nitrogenrecovercooldown() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  nitrogenconsumerate() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  motorinitialshieldrate() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetWorldlv2motorshieldAt(t, r) {
    return this.worldlv2motorshield(t);
  }
  worldlv2motorshield(t, r) {
    var e = this.J7.__offset(this.z7, 26);
    if (e) {
      return (r || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  worldlv2motorshieldLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  motorshieldrecoverrate() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  motorshieldcooldown() {
    var t = this.J7.__offset(this.z7, 30);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.MotorLvl = MotorLvl;
//# sourceMappingURL=MotorLvl.js.map