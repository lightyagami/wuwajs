"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const SkillUtils_1 = require("../NewWorld/Character/Common/Component/Skill/SkillUtils");
class TsAnimNotifyStateAbsoluteTimeStop extends UE.KuroAnimNotifyState {
  constructor() {
    super(...arguments);
    this.副本计时停止 = false;
    this.角色战斗机制停止 = true;
    this.怪物战斗机制停止 = true;
    this.是否冻结移动效果 = true;
  }
  Constructor() {}
  K2_NotifyBegin(t, e, s) {
    t = t.GetOwner();
    this.bRestartWithReplay = true;
    return t instanceof TsBaseCharacter_1.default && (SkillUtils_1.SkillUtils.BeginAbsoluteTimeStop(t.EntityId, s, this.是否冻结移动效果), true);
  }
  K2_NotifyEnd(t, e) {
    t = t?.GetOwner();
    return t instanceof TsBaseCharacter_1.default && (SkillUtils_1.SkillUtils.EndAbsoluteTimeStop(t.EntityId), true);
  }
  GetNotifyName() {
    return "动画和子弹冻结";
  }
}
exports.default = TsAnimNotifyStateAbsoluteTimeStop;
//# sourceMappingURL=TsAnimNotifyStateAbsoluteTimeStop.js.map