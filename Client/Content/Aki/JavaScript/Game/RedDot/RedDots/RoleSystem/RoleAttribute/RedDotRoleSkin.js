"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotRoleSkin = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotRoleSkin extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RoleSkinRedDotRefresh];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.RoleSkinModel.HasRoleSkinRedDotByRoleId(e) || ModelManager_1.ModelManager.FlySkinModel.CheckFlySkinHasRedDot() || ModelManager_1.ModelManager.CalabashSkinModel.CheckCalabashSkinHasRedDotByRoleId(e);
  }
}
exports.RedDotRoleSkin = RedDotRoleSkin;
//# sourceMappingURL=RedDotRoleSkin.js.map