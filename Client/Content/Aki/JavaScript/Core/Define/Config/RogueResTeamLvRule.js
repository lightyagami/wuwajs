"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RogueResTeamLvRule = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResTeamLvRule {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get LevelRange() {
    return GameUtils_1.GameUtils.ConvertToArray(this.levelrangeLength(), this.levelrange, this);
  }
  get RoleLevel() {
    return this.rolelevel();
  }
  get RangeEffects() {
    return GameUtils_1.GameUtils.ConvertToArray(this.rangeeffectsLength(), this.rangeeffects, this);
  }
  get TargetLevel() {
    return this.targetlevel();
  }
  get TargetEffects() {
    return GameUtils_1.GameUtils.ConvertToArray(this.targeteffectsLength(), this.targeteffects, this);
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsRogueResTeamLvRule(t, e) {
    return (e || new RogueResTeamLvRule()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetLevelrangeAt(t) {
    return this.levelrange(t);
  }
  levelrange(t) {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  levelrangeLength() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelrangeArray() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  rolelevel() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetRangeeffectsAt(t) {
    return this.rangeeffects(t);
  }
  rangeeffects(t) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  rangeeffectsLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  rangeeffectsArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  targetlevel() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetTargeteffectsAt(t) {
    return this.targeteffects(t);
  }
  targeteffects(t) {
    var e = this.J7.__offset(this.z7, 14);
    if (e) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + e) + t * 4);
    } else {
      return 0;
    }
  }
  targeteffectsLength() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  targeteffectsArray() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
}
exports.RogueResTeamLvRule = RogueResTeamLvRule;
//# sourceMappingURL=RogueResTeamLvRule.js.map