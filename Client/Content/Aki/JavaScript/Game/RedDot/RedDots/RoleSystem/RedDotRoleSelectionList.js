"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotRoleSelectionList = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotRoleSelectionList extends RedDotBase_1.RedDotBase {
  OnGetEvents() {
    return [EventDefine_1.EEventName.RoleSelectionListUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.RoleModel.RedDotRoleSelectionListCondition();
  }
}
exports.RedDotRoleSelectionList = RedDotRoleSelectionList;
//# sourceMappingURL=RedDotRoleSelectionList.js.map