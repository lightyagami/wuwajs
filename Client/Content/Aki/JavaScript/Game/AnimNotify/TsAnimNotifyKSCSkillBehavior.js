"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const KscSkillData_1 = require("../KuroSimpleCombat/KSCDataClass/KscSkillData");
const ControllerHolder_1 = require("../Manager/ControllerHolder");
class TsAnimNotifyKSCSkillBehavior extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.Action = undefined;
  }
  Constructor() {}
  K2_Notify(r, e) {
    if (!this.Action) {
      return false;
    }
    if (this.Action instanceof KscSkillData_1.default) {
      r = r.GetOwner();
      if (r instanceof TsBaseCharacter_1.default) {
        r = r?.CharacterActorComponent?.Entity;
        if (!r) {
          return false;
        }
        ControllerHolder_1.ControllerHolder.TowerDefensePlayerController.DoSkill(r, this.Action.SkillIndex);
      }
    }
    return true;
  }
  GetNotifyName() {
    return "KSC技能行为";
  }
}
exports.default = TsAnimNotifyKSCSkillBehavior;
//# sourceMappingURL=TsAnimNotifyKSCSkillBehavior.js.map