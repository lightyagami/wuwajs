"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotDangoDevelop = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoDevelop extends RedDotBase_1.RedDotBase {
  IsAllEventParamAsUId() {
    return false;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnAbyssAddRole, EventDefine_1.EEventName.OnAbyssDangoLevelUp, EventDefine_1.EEventName.OnAbyssRoleInfoUpdate, EventDefine_1.EEventName.OnCommonItemCountAnyChange, EventDefine_1.EEventName.RefreshAbyssDevelopRedDot];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.DangoAbyssModel.GetDangoDevelopRedDot();
  }
}
exports.RedDotDangoDevelop = RedDotDangoDevelop;
//# sourceMappingURL=RedDotDangoDevelop.js.map