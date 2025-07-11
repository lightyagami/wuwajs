"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CharacterAudioConfig = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntString_1 = require("./SubType/DicIntString");
class CharacterAudioConfig {
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
  get HpLost() {
    return GameUtils_1.GameUtils.ConvertToMap(this.hplostLength(), this.hplostKey, this.hplostValue, this);
  }
  hplostKey(t) {
    return this.hplost(t)?.key();
  }
  hplostValue(t) {
    return this.hplost(t)?.value();
  }
  get Chest() {
    return this.chest();
  }
  get Effort() {
    return this.effort();
  }
  get EffortLow() {
    return this.effortlow();
  }
  get EffortCd() {
    return this.effortcd();
  }
  get Rankup() {
    return GameUtils_1.GameUtils.ConvertToMap(this.rankupLength(), this.rankupKey, this.rankupValue, this);
  }
  rankupKey(t) {
    return this.rankup(t)?.key();
  }
  rankupValue(t) {
    return this.rankup(t)?.value();
  }
  get JoinTeam() {
    return this.jointeam();
  }
  get FirstGet() {
    return this.firstget();
  }
  get MutantTransform() {
    return this.mutanttransform();
  }
  get MutantSummon() {
    return this.mutantsummon();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsCharacterAudioConfig(t, i) {
    return (i || new CharacterAudioConfig()).__init(t.readInt32(t.position()) + t.position(), t);
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
    var i = this.J7.__offset(this.z7, 6);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetHplostAt(t, i) {
    return this.hplost(t);
  }
  hplost(t, i) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  hplostLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  chest(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  effort(t) {
    var i = this.J7.__offset(this.z7, 12);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  effortlow(t) {
    var i = this.J7.__offset(this.z7, 14);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  effortcd() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readFloat32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRankupAt(t, i) {
    return this.rankup(t);
  }
  rankup(t, i) {
    var s = this.J7.__offset(this.z7, 18);
    if (s) {
      return (i || new DicIntString_1.DicIntString()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + s) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  rankupLength() {
    var t = this.J7.__offset(this.z7, 18);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  jointeam(t) {
    var i = this.J7.__offset(this.z7, 20);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  firstget(t) {
    var i = this.J7.__offset(this.z7, 22);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mutanttransform(t) {
    var i = this.J7.__offset(this.z7, 24);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  mutantsummon(t) {
    var i = this.J7.__offset(this.z7, 26);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
}
exports.CharacterAudioConfig = CharacterAudioConfig;
//# sourceMappingURL=CharacterAudioConfig.js.map