"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotDangoRole = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoRole extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotDangoDevelop";
  }
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnAbyssAddRole, EventDefine_1.EEventName.OnAbyssDangoLevelUp, EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, EventDefine_1.EEventName.OnCommonItemCountAnyChange, EventDefine_1.EEventName.RefreshAbyssDevelopRedDot];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.DangoAbyssModel.GetDangoRoleRedDot(e);
  }
}
exports.RedDotDangoRole = RedDotDangoRole;
//# sourceMappingURL=RedDotDangoRole.js.map