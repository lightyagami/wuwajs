"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.PhantomBattleBuff = void 0;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleBuff {
  constructor() {
    this.J7 = null, this.z7 = 0
  }
  get Id() {
    return this.id()
  }
  get TargetSelectType() {
    return this.targetselecttype()
  }
  get TargetSelectParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.targetselectparamsLength(), this.targetselectparams, this)
  }
  get BuffShowType() {
    return this.buffshowtype()
  }
  get EffectType() {
    return this.effecttype()
  }
  get EffectParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.effectparamsLength(), this.effectparams, this)
  }
  __init(t, e) {
    return this.z7 = t, this.J7 = e, this
  }
  static getRootAsPhantomBattleBuff(t, e) {
    return (e || new PhantomBattleBuff).__init(t.readInt32(t.position()) + t.position(), t)
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  targetselecttype() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetTargetselectparamsAt(t) {
    return this.targetselectparams(t)
  }
  targetselectparams(t, e) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  targetselectparamsLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
  buffshowtype() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  effecttype() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0
  }
  GetEffectparamsAt(t) {
    return this.effectparams(t)
  }
  effectparams(t, e) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e) : null;
    return "string" == typeof s && GameUtils_1.GameUtils.IsOptimizeDbString && GameUtils_1.GameUtils.InternalizedString(s), s
  }
  effectparamsLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0
  }
}
exports.PhantomBattleBuff = PhantomBattleBuff;
//# sourceMappingURL=PhantomBattleBuff.js.map