"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillLevel = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const DicIntInt_1 = require("./SubType/DicIntInt");
class SkillLevel {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SkillLevelGroupId() {
    return this.skilllevelgroupid();
  }
  get SkillId() {
    return this.skillid();
  }
  get LevelNewDescribe() {
    return this.levelnewdescribe();
  }
  get Consume() {
    return GameUtils_1.GameUtils.ConvertToMap(this.consumeLength(), this.consumeKey, this.consumeValue, this);
  }
  consumeKey(t) {
    return this.consume(t)?.key();
  }
  consumeValue(t) {
    return this.consume(t)?.value();
  }
  get Condition() {
    return this.condition();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsSkillLevel(t, i) {
    return (i || new SkillLevel()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilllevelgroupid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  levelnewdescribe(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  GetConsumeAt(t, i) {
    return this.consume(t);
  }
  consume(t, i) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return (i || new DicIntInt_1.DicIntInt()).__init(this.J7.__indirect(this.J7.__vector(this.z7 + e) + t * 4), this.J7);
    } else {
      return null;
    }
  }
  consumeLength() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.__vector_len(this.z7 + t);
    } else {
      return 0;
    }
  }
  condition() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.SkillLevel = SkillLevel;
//# sourceMappingURL=SkillLevel.js.map