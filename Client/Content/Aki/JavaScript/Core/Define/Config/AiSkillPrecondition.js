"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AiSkillPrecondition = undefined;
const GameUtils_1 = require("../../../Game/GameUtils");
const FloatRange_1 = require("./SubType/FloatRange");
class AiSkillPrecondition {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get DistanceRange() {
    return this.distancerange();
  }
  get AngleRange() {
    return this.anglerange();
  }
  get TargetAngleRange() {
    return this.targetanglerange();
  }
  get HeightRange() {
    return this.heightrange();
  }
  get NeedTag() {
    return this.needtag();
  }
  get NeedTarget() {
    return this.needtarget();
  }
  __init(t, e) {
    this.z7 = t;
    this.J7 = e;
    return this;
  }
  static getRootAsAiSkillPrecondition(t, e) {
    return (e || new AiSkillPrecondition()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  distancerange(t) {
    var e = this.J7.__offset(this.z7, 6);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  anglerange(t) {
    var e = this.J7.__offset(this.z7, 8);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  targetanglerange(t) {
    var e = this.J7.__offset(this.z7, 10);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  heightrange(t) {
    var e = this.J7.__offset(this.z7, 12);
    if (e) {
      return (t || new FloatRange_1.FloatRange()).__init(this.J7.__indirect(this.z7 + e), this.J7);
    } else {
      return null;
    }
  }
  needtag(t) {
    var e = this.J7.__offset(this.z7, 14);
    var e = e ? this.J7.__string(this.z7 + e, t) : null;
    if (typeof e == "string" && GameUtils_1.GameUtils.IsOptimizeDbString) {
      GameUtils_1.GameUtils.InternalizedString(e);
    }
    return e;
  }
  needtarget() {
    var t = this.J7.__offset(this.z7, 16);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
}
exports.AiSkillPrecondition = AiSkillPrecondition;
//# sourceMappingURL=AiSkillPrecondition.js.map