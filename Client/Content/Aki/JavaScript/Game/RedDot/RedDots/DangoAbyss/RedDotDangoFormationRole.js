"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotDangoFormationRole = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotDangoFormationRole extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotDangoFormation";
  }
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RefreshAbyssDangoRedDot];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.DangoAbyssModel.GetDangoFormationNewRoleRedDot(e);
  }
}
exports.RedDotDangoFormationRole = RedDotDangoFormationRole;
//# sourceMappingURL=RedDotDangoFormationRole.js.map