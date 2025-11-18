"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const UE = require("ue");
const TsBaseCharacter_1 = require("../Character/TsBaseCharacter");
const SkillUtils_1 = require("../NewWorld/Character/Common/Component/Skill/SkillUtils");
class TsAnimNotifyStateTimeStopRequest extends UE.KuroAnimNotifyState {
  Constructor() {}
  K2_NotifyBegin(e, t, r) {
    e = e?.GetOwner();
    this.bRestartWithReplay = true;
    return e instanceof TsBaseCharacter_1.default && (SkillUtils_1.SkillUtils.BeginTimeStopRequest(e.EntityId, r), true);
  }
  K2_NotifyEnd(e, t) {
    e = e?.GetOwner();
    return e instanceof TsBaseCharacter_1.default && (SkillUtils_1.SkillUtils.EndTimeStopRequest(e.EntityId), true);
  }
  GetNotifyName() {
    return "副本计时和所有战斗单位buff、技能冷却冻结";
  }
}
exports.default = TsAnimNotifyStateTimeStopRequest;
//# sourceMappingURL=TsAnimNotifyStateTimeStopRequest.js.map