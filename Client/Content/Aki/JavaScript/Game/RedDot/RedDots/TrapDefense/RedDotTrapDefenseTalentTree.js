"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotTrapDefenseTalentTree = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotTrapDefenseTalentTree extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "TrapDefense";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotUpdateTrapDefenseTalentTree];
  }
  OnCheck() {
    return !!ModelManager_1.ModelManager.TrapDefenseModel?.TalentTreeData.HasAnyNodeCanUnlockAndAfford();
  }
}
exports.RedDotTrapDefenseTalentTree = RedDotTrapDefenseTalentTree;
//# sourceMappingURL=RedDotTrapDefenseTalentTree.js.map