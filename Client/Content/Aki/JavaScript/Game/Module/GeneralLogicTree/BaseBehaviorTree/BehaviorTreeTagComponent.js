"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BehaviorTreeTagContainer = undefined;
const DEFAULET_REASON = "";
class BehaviorTreeTagContainer {
  constructor() {
    this.mQt = new Map();
  }
  AddTag(e, t = DEFAULET_REASON) {
    let s = this.mQt.get(e);
    (s = s || new Set()).add(t);
    this.mQt.set(e, s);
  }
  RemoveTag(e, t = DEFAULET_REASON) {
    var s = this.mQt.get(e);
    if (s && (s.delete(t), s.size === 0)) {
      this.mQt.delete(e);
    }
  }
  ContainTag(e) {
    return this.mQt.get(e) !== undefined;
  }
}
exports.BehaviorTreeTagContainer = BehaviorTreeTagContainer;
//# sourceMappingURL=BehaviorTreeTagComponent.js.map