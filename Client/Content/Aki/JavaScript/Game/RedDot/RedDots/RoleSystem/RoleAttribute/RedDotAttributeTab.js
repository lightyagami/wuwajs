"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotAttributeTab = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotAttributeTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RoleLevelUp, EventDefine_1.EEventName.RedDotRefreshItemData, EventDefine_1.EEventName.RoleBreakUp, EventDefine_1.EEventName.CurWorldLevelChange, EventDefine_1.EEventName.ActiveRole, EventDefine_1.EEventName.RoleSkinRedDotRefresh];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.RoleModel.RedDotAttributeTabBreakUpCondition(e) || ModelManager_1.ModelManager.RoleSkinModel.HasRoleSkinRedDotByRoleId(e);
  }
}
exports.RedDotAttributeTab = RedDotAttributeTab;
//# sourceMappingURL=RedDotAttributeTab.js.map