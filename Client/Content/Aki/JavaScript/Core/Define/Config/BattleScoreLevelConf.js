"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BattleScoreLevelConf = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class BattleScoreLevelConf {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get GroupId() {
    return this.groupid();
  }
  get Level() {
    return this.level();
  }
  get LowerUpperLimits() {
    return GameUtils_1.GameUtils.ConvertToArray(this.lowerupperlimitsLength(), this.lowerupperlimits, this);
  }
  get BuffTime() {
    return this.bufftime();
  }
  get Bgm() {
    return this.bgm();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsBattleScoreLevelConf(t, e) {
    return (e || new BattleScoreLevelConf()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  groupid() {
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
  GetLowerupperlimitsAt(t) {
    return this.lowerupperlimits(t);
  }
  lowerupperlimits(t) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  lowerupperlimitsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  lowerupperlimitsArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  bufftime() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  bgm(t) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
}
exports.BattleScoreLevelConf = BattleScoreLevelConf;
//# sourceMappingURL=BattleScoreLevelConf.js.map