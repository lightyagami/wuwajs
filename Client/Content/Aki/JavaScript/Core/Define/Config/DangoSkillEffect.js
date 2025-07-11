"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DangoSkillEffect = undefined;
class DangoSkillEffect {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get TrigggerPerformance() {
    return this.trigggerperformance();
  }
  get TrigggerTiming() {
    return this.trigggertiming();
  }
  get ShowTime() {
    return this.showtime();
  }
  get ParamNum() {
    return this.paramnum();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsDangoSkillEffect(t, i) {
    return (i || new DangoSkillEffect()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  trigggerperformance() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 1;
    }
  }
  trigggertiming() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  showtime() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  paramnum() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.DangoSkillEffect = DangoSkillEffect;
//# sourceMappingURL=DangoSkillEffect.js.map