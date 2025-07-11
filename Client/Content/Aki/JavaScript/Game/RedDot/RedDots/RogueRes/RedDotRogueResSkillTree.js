"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotRogueResSkillTree = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotRogueResSkillTree extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.PermanentRogueSeasonRedDotUpdate, EventDefine_1.EEventName.PermanentRogueSkillCurrencyRedDotUpdate];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.ActivityPermanentRogueModel.CheckSkillTreeRedDot(e);
  }
}
exports.RedDotRogueResSkillTree = RedDotRogueResSkillTree;
//# sourceMappingURL=RedDotRogueResSkillTree.js.map