"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnSkillButtonDataRefresh = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnSkillButtonDataRefresh extends LevelGeneralBase_1.LevelConditionBase {
  constructor() {
    super(...arguments);
    this.MGl = -1;
    this.xk_ = -1;
    this.yGl = -1;
  }
  Check(e, t, ...s) {
    var i = ModelManager_1.ModelManager.SkillButtonUiModel;
    var e = e.LimitParams.get("skillId");
    return e !== undefined && s.length !== 0 && (s = s[0], this.yGl !== s && (this.yGl = s, this.MGl = -1, this.xk_ = -1), s = Number(e), e = i.GetSkillButtonIndexByButton(s), i = i.GetSkillButtonDataByButton(s)?.GetSkillId(), this.MGl === -1 && this.xk_ === -1 ? (this.MGl = e, this.xk_ = i ?? -1, true) : this.MGl === e && this.xk_ === i);
  }
}
exports.LevelConditionOnSkillButtonDataRefresh = LevelConditionOnSkillButtonDataRefresh;
//# sourceMappingURL=LevelConditionOnSkillButtonDataRefresh.js.map