"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotPhantomArenaRole = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotPhantomArenaRole extends RedDotBase_1.RedDotBase {
  OnGetParentName() {
    return "RedDotPhantomArenaActivity";
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.OnPhantomArenaRoleRewardUpdate];
  }
  OnCheck() {
    return ModelManager_1.ModelManager.PhantomArenaModel.GetRoleRewardRedDot();
  }
}
exports.RedDotPhantomArenaRole = RedDotPhantomArenaRole;
//# sourceMappingURL=RedDotPhantomArenaRole.js.map