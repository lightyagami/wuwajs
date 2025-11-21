"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillBase = undefined;
class SpecialSkillBase {
  constructor(t) {
    this.SpecialSkillComponent = t;
  }
  static Spawn(t) {
    return new this(t);
  }
  OnStart() {}
  OnActivate() {}
  OnEnd() {}
  OnTick(t) {}
  OnEnable() {}
  OnDisable() {}
  static SetOptimizeEnable(t) {}
}
exports.SpecialSkillBase = SpecialSkillBase;
//# sourceMappingURL=SpecialSkillBase.js.map