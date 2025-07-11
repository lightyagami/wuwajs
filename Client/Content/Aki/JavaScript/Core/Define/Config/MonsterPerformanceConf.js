"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonsterPerformanceConf = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class MonsterPerformanceConf {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get MonsterPerformanceId() {
    return this.monsterperformanceid();
  }
  get SkillIds() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillidsLength(), this.skillids, this);
  }
  get Tag() {
    return this.tag();
  }
  __init(t, s) {
    this.z7 = t;
    this.J7 = s;
    return this;
  }
  static getRootAsMonsterPerformanceConf(t, s) {
    return (s || new MonsterPerformanceConf()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  monsterperformanceid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  GetSkillidsAt(t) {
    return this.skillids(t);
  }
  skillids(t) {
    var s = this.J7.__offset(this.z7, 8);
    if (s) {
      return this.J7.readInt32(this.J7.__vector(this.z7 + s) + t * 4);
    } else {
      return 0;
    }
  }
  skillidsLength() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillidsArray() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return new Int32Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  tag(t) {
    var s = this.J7.__offset(this.z7, 10);
    var s = s ? this.J7.__string(this.z7 + s, t) : null;
    if (typeof s == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(s);
    }
    return s;
  }
}
exports.MonsterPerformanceConf = MonsterPerformanceConf;
//# sourceMappingURL=MonsterPerformanceConf.js.map