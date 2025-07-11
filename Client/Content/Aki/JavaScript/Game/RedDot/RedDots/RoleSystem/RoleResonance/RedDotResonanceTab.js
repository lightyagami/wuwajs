"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotResonanceTab = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotResonanceTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotRefreshItemData, EventDefine_1.EEventName.UpdateRoleResonanceDetailView, EventDefine_1.EEventName.RoleSystemChangeRole];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.RoleModel.RedDotResonanceTabCondition(e);
  }
}
exports.RedDotResonanceTab = RedDotResonanceTab;
//# sourceMappingURL=RedDotResonanceTab.js.map