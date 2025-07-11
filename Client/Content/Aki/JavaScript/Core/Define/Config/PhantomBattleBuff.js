"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleBuff = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleBuff {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TargetSelectType() {
    return this.targetselecttype();
  }
  get TargetSelectParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.targetselectparamsLength(), this.targetselectparams, this);
  }
  get BuffShowType() {
    return this.buffshowtype();
  }
  get EffectType() {
    return this.effecttype();
  }
  get EffectParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.effectparamsLength(), this.effectparams, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsPhantomBattleBuff(t, e) {
    return (e || new PhantomBattleBuff()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  targetselecttype() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTargetselectparamsAt(t) {
    return this.targetselectparams(t);
  }
  targetselectparams(t, e) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, e) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  targetselectparamsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  buffshowtype() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  effecttype() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetEffectparamsAt(t) {
    return this.effectparams(t);
  }
  effectparams(t, e) {
    var s = this.J7.__offset(this.z7, 14);
    var s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + t * 4, e) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  effectparamsLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomBattleBuff = PhantomBattleBuff;
//# sourceMappingURL=PhantomBattleBuff.js.map