"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotTrialRoleGroup = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RoleUtils_1 = require("../../../Module/RoleUi/RoleUtils");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotTrialRoleGroup extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnGroupTrialRoleRedDotUpdate, EventDefine_1.EEventName.CurWorldLevelChange, EventDefine_1.EEventName.OnGroupTrialRoleChanged];
  }
  IsAllEventParamAsUId() {
    return false;
  }
  IsMultiple() {
    return true;
  }
  OnCheck(e) {
    var r;
    return !!e && !!RoleUtils_1.RoleUtils.IsTrialRole(e) && (r = ModelManager_1.ModelManager.TrialRoleModel.GetTrialRoleUnlockRedDotById(e), e = ModelManager_1.ModelManager.TrialRoleModel.GetUpgradeRedDotById(e), r || e);
  }
}
exports.RedDotTrialRoleGroup = RedDotTrialRoleGroup;
//# sourceMappingURL=RedDotTrialRoleGroup.js.map