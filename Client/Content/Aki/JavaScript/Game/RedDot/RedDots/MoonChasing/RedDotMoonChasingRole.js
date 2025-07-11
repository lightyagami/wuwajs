"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotMoonChasingRole = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotMoonChasingRole extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "MoonChasingDelegation";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.MoonChasingRefreshRoleRedDot];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.MoonChasingModel.CheckRoleRedDotState();
  }
}
exports.RedDotMoonChasingRole = RedDotMoonChasingRole;
//# sourceMappingURL=RedDotMoonChasingRole.js.map