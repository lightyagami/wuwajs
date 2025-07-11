"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EntityFsmSkill = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
class EntityFsmSkill {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ConfigId() {
    return this.configid();
  }
  get SkillName() {
    return this.skillname();
  }
  get SkillId() {
    return this.skillid();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsEntityFsmSkill(t, i) {
    return (i || new EntityFsmSkill()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  configid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillname(t) {
    var i = this.J7.__offset(this.z7, 8);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  skillid() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.EntityFsmSkill = EntityFsmSkill;
//# sourceMappingURL=EntityFsmSkill.js.map