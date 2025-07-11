"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkillTriggerBaseHandle = undefined;
const UE = require("ue");
class SkillTriggerBase extends UE.KuroBpDataAsset {
  constructor() {
    super(...arguments);
    this.TriggerConditionGroup = undefined;
    this.TriggerConditionFormula = "";
  }
  Constructor() {}
}
exports.default = SkillTriggerBase;
class SkillTriggerBaseHandle {
  constructor(e) {
    this.Entity = e;
  }
  static Spawn(e) {
    e = new this(e);
    e.Create();
    return e;
  }
  Create() {}
  Destroy() {}
  AddSkillTrigger(e, r, s) {}
}
exports.SkillTriggerBaseHandle = SkillTriggerBaseHandle;
//# sourceMappingURL=SkillTriggerBase.js.map