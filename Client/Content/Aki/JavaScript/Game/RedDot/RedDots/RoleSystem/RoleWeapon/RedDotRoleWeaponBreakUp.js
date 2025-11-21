"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotRoleWeaponBreakUp = undefined;
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RedDotBase_1 = require("../../../RedDotBase");
class RedDotRoleWeaponBreakUp extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.WeaponLevelUp, EventDefine_1.EEventName.WeaponBreakUp, EventDefine_1.EEventName.WeaponResonanceSuccess];
  }
  OnCheck(e) {
    return !!ModelManager_1.ModelManager.WeaponModel.RedDotWeaponBreachCondition(e) || !!ModelManager_1.ModelManager.WeaponModel.RedDotWeaponResonanceConditionByRole(e) || ModelManager_1.ModelManager.WeaponSkinModel.RedDotWeaponSkinCondition(e);
  }
}
exports.RedDotRoleWeaponBreakUp = RedDotRoleWeaponBreakUp;
//# sourceMappingURL=RedDotRoleWeaponBreakUp.js.map