"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotFavorTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDot/RedDotBase");
class RedDotFavorTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.UnLockRoleFavorItem, EventDefine_1.EEventName.UpdateRoleFavorData];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e).GetFavorData().IsExistCanUnlockFavorItem();
  }
}
exports.RedDotFavorTab = RedDotFavorTab;
//# sourceMappingURL=RedDotFavorTab.js.map