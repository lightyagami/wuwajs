"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillButtonMapping = undefined;
class SkillButtonMapping {
  constructor() {
    this.Ryo = new Map();
  }
  Add(t, e) {
    for (const s of t) {
      let t = this.Ryo.get(s);
      if (t) {
        t.add(e);
      } else {
        (t = new Set()).add(e);
        this.Ryo.set(s, t);
      }
    }
  }
  AddSingle(t, e) {
    let s = this.Ryo.get(t);
    if (s) {
      s.add(e);
    } else {
      (s = new Set()).add(e);
      this.Ryo.set(t, s);
    }
  }
  RemoveSingle(t, e) {
    t = this.Ryo.get(t);
    if (t) {
      t.delete(e);
    }
  }
  Get(t) {
    return this.Ryo.get(t);
  }
  Clear() {
    this.Ryo.clear();
  }
}
exports.SkillButtonMapping = SkillButtonMapping;
//# sourceMappingURL=SkillButtonMapping.js.map