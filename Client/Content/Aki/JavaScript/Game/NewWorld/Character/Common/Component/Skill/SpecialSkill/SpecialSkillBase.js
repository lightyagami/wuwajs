"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecialSkillBase = undefined;
class SpecialSkillBase {
  constructor(e) {
    this.SpecialSkillComponent = e;
  }
  static Spawn(e) {
    return new this(e);
  }
  OnStart() {}
  OnActivate() {}
  OnEnd() {}
  OnTick(e) {}
  OnEnable() {}
  OnDisable() {}
}
exports.SpecialSkillBase = SpecialSkillBase;
//# sourceMappingURL=SpecialSkillBase.js.map