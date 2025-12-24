"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhantomBattleSkill = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class PhantomBattleSkill {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get Desc() {
    return this.desc();
  }
  get ExecuteTimes() {
    return this.executetimes();
  }
  get CostDurability() {
    return this.costdurability();
  }
  get DescParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.descparamsLength(), this.descparams, this);
  }
  get TargetSelectType() {
    return this.targetselecttype();
  }
  get TargetSelectParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.targetselectparamsLength(), this.targetselectparams, this);
  }
  get BattlePower() {
    return this.battlepower();
  }
  get CostConsume() {
    return this.costconsume();
  }
  get EffectType() {
    return this.effecttype();
  }
  get EffectParams() {
    return GameUtils_1.GameUtils.ConvertToArray(this.effectparamsLength(), this.effectparams, this);
  }
  get ActivateCondition() {
    return this.activatecondition();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsPhantomBattleSkill(t, s) {
    return (s || new PhantomBattleSkill()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  name(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  desc(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  executetimes() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  costdurability() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  GetDescparamsAt(t) {
    return this.descparams(t);
  }
  descparams(t, s) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  descparamsLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  targetselecttype() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTargetselectparamsAt(t) {
    return this.targetselectparams(t);
  }
  targetselectparams(t, s) {
    var e = this.J7.__offset(this.z7, 18);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  targetselectparamsLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  battlepower() {
    var t = this.J7.__offset(this.z7, 20);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  costconsume() {
    var t = this.J7.__offset(this.z7, 22);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  effecttype() {
    var t = this.J7.__offset(this.z7, 24);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetEffectparamsAt(t) {
    return this.effectparams(t);
  }
  effectparams(t, s) {
    var e = this.J7.__offset(this.z7, 26);
    var e = e ? this.J7.__string(this.J7.__vector(this.z7 + e) + t * 4, s) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  effectparamsLength() {
    var t = this.J7.__offset(this.z7, 26);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  activatecondition() {
    var t = this.J7.__offset(this.z7, 28);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.PhantomBattleSkill = PhantomBattleSkill;
//# sourceMappingURL=PhantomBattleSkill.js.map