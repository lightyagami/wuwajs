"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
class TsAnimNotifyResetSkillTarget extends UE.KuroAnimNotify {
  constructor() {
    super(...arguments);
    this.技能目标配置 = undefined;
  }
  Constructor() {}
  K2_Notify(e, t) {
    var e = e.GetOwner();
    return e instanceof TsBaseCharacter_1.default && !!(e = e.CharacterActorComponent.Entity.GetComponent(41)) && (e.LockOnTargetAndSetShow(this.技能目标配置), true);
  }
  GetNotifyName() {
    return "重置技能目标";
  }
}
exports.default = TsAnimNotifyResetSkillTarget;
//# sourceMappingURL=TsAnimNotifyResetSkillTarget.js.map