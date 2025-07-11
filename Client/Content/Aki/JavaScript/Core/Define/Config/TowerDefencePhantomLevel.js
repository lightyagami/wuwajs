"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TowerDefencePhantomLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class TowerDefencePhantomLevel {
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
  get SkillId() {
    return GameUtils_1.GameUtils.ConvertToArray(this.skillidLength(), this.skillid, this);
  }
  get Title() {
    return this.title();
  }
  get Description() {
    return this.description();
  }
  get ExpLevel() {
    return this.explevel();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsTowerDefencePhantomLevel(t, e) {
    return (e || new TowerDefencePhantomLevel()).__init(t.readInt32(t.position()) + t.position(), t);
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
  GetSkillidAt(t) {
    return this.skillid(t);
  }
  skillid(t) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return this.J7.readFloat64(this.J7.__vector(this.z7 + e) + t * 8);
    } else {
      return 0;
    }
  }
  skillidLength() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillidArray() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return new Float64Array(this.J7.bytes().buffer, this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t), this.J7.__vector_len(this.z7 + t));
    } else {
      return null;
    }
  }
  title(t) {
    var e = this.J7.__offset(this.z7, 12);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  description(t) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  explevel() {
    var t = this.J7.__offset(this.z7, 16);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.TowerDefencePhantomLevel = TowerDefencePhantomLevel;
//# sourceMappingURL=TowerDefencePhantomLevel.js.map