"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookingSkill = undefined;
class CookingSkill {
  constructor() {
    this.J7 = null;
    this.z7 = 0;
  }
  get Id() {
    return this.id();
  }
  get ExtraItemId() {
    return this.extraitemid();
  }
  get EffectiveProbability() {
    return this.effectiveprobability();
  }
  get Typeld() {
    return this.typeld();
  }
  get SkillDescription() {
    return this.skilldescription();
  }
  __init(t, i) {
    this.z7 = t;
    this.J7 = i;
    return this;
  }
  static getRootAsCookingSkill(t, i) {
    return (i || new CookingSkill()).__init(t.readInt32(t.position()) + t.position(), t);
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  extraitemid() {
    var t = this.J7.__offset(this.z7, 6);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  effectiveprobability() {
    var t = this.J7.__offset(this.z7, 8);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  typeld() {
    var t = this.J7.__offset(this.z7, 10);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
  skilldescription() {
    var t = this.J7.__offset(this.z7, 12);
    if (t) {
      return this.J7.readInt32(this.z7 + t);
    } else {
      return 0;
    }
  }
}
exports.CookingSkill = CookingSkill;
//# sourceMappingURL=CookingSkill.js.map