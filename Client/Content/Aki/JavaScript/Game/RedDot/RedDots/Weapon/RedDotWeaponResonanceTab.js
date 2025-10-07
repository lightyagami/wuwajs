"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RedDotWeaponResonanceTab = undefined;
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const ModelManager_1 = require("../../../Manager/ModelManager");
const RedDotBase_1 = require("../../RedDotBase");
class RedDotWeaponResonanceTab extends RedDotBase_1.RedDotBase {
  IsMultiple() {
    return true;
  }
  OnGetEvents() {
    return [EventDefine_1.EEventName.RedDotRefreshItemData, EventDefine_1.EEventName.WeaponResonanceSuccess];
  }
  OnCheck(e) {
    return ModelManager_1.ModelManager.WeaponModel.RedDotWeaponResonanceCondition(e);
  }
}
exports.RedDotWeaponResonanceTab = RedDotWeaponResonanceTab;
//# sourceMappingURL=RedDotWeaponResonanceTab.js.map