"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiSkillInfos = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const FloatRange_1 = require("./SubType/FloatRange");
class AiSkillInfos {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get SkillWeight() {
    return this.skillweight();
  }
  get SkillPreconditionId() {
    return this.skillpreconditionid();
  }
  get SkillId() {
    return this.skillid();
  }
  get SkillCdRange() {
    return this.skillcdrange();
  }
  get SkillType() {
    return this.skilltype();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsAiSkillInfos(t, i) {
    return (i || new AiSkillInfos()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillweight() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  skillpreconditionid() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skillid(t) {
    var i = this.J7.__offset(this.z7, 10);
    var i = i ? this.J7.__string(this.z7 + i, t) : null;
    if (typeof i == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(i);
    }
    return i;
  }
  skillcdrange(t) {
    var i = this.J7.__offset(this.z7, 12);
    if (i) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + i), this.J7);
    } else {
      return null;
    }
  }
  skilltype() {
    var t = this.J7.__offset(this.z7, 14);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return -1;
    }
  }
}
exports.AiSkillInfos = AiSkillInfos;
//# sourceMappingURL=AiSkillInfos.js.map