"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotRoleLevelUp = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotRoleLevelUp extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RoleLevelUp, EventDefine_1.EEventName.RedDotRefreshItemData, EventDefine_1.EEventName.RoleBreakUp, EventDefine_1.EEventName.CurWorldLevelChange, EventDefine_1.EEventName.ActiveRole];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.RoleModel.RedDotAttributeTabLevelUpCondition(e);
  }
}
exports.RedDotRoleLevelUp = RedDotRoleLevelUp;
//# sourceMappingURL=RedDotRoleLevelUp.js.map