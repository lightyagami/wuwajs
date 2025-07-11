"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattlePassUnlockPop = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class BattlePassUnlockPop {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get TpyeID() {
    return this.tpyeid();
  }
  get UnlockTitle() {
    return this.unlocktitle();
  }
  get UnlockText() {
    return this.unlocktext();
  }
  get UnlockReward() {
    return GameUtils_1.GameUtils.ConvertToMap(this.unlockrewardLength(), this.unlockrewardKey, this.unlockrewardValue, this);
  }
  unlockrewardKey(t) {
    return this.unlockreward(t)?.key();
  }
  unlockrewardValue(t) {
    return this.unlockreward(t)?.value();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsBattlePassUnlockPop(t, s) {
    return (s || new BattlePassUnlockPop()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  tpyeid() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  unlocktitle(t) {
    var s = this.J7.__offset(this.z7, 6);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  unlocktext(t) {
    var s = this.J7.__offset(this.z7, 8);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
  GetUnlockrewardAt(t, s) {
    return this.unlockreward(t);
  }
  unlockreward(t, s) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return (s || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  unlockrewardLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.BattlePassUnlockPop = BattlePassUnlockPop;
//# sourceMappingURL=BattlePassUnlockPop.js.map