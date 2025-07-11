"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorButtonMapping = undefined;
class BehaviorButtonMapping {
  constructor() {
    this.Tet = new Map();
  }
  Add(t, e) {
    for (const s of t) {
      let t = this.Tet.get(s);
      if (t) {
        t.add(e);
      } else {
        (t = new Set()).add(e);
        this.Tet.set(s, t);
      }
    }
  }
  AddSingle(t, e) {
    let s = this.Tet.get(t);
    if (s) {
      s.add(e);
    } else {
      (s = new Set()).add(e);
      this.Tet.set(t, s);
    }
  }
  Get(t) {
    return this.Tet.get(t);
  }
  GetAllKey() {
    return this.Tet.keys();
  }
  Clear() {
    this.Tet.clear();
  }
}
exports.BehaviorButtonMapping = BehaviorButtonMapping;
//# sourceMappingURL=BehaviorButtonMapping.js.map