"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckTeamWeaponCouldLevelUp = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const WeaponInstance_1 = require("../../Module/Weapon/WeaponInstance");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckTeamWeaponCouldLevelUp extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    for (const n of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true)) {
      var o = n.GetConfigId;
      var o = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(o);
      if (o && typeof o == typeof WeaponInstance_1.WeaponInstance) {
        let e = false;
        for (const r of ModelManager_1.ModelManager.WeaponModel.GetWeaponExpItemList(o.GetIncId())) {
          if (ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r.GetConfigId()) > 0) {
            e = true;
            break;
          }
        }
        if (e && o.GetLevel() < o.GetCurrentMaxLevel()) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.LevelConditionCheckTeamWeaponCouldLevelUp = LevelConditionCheckTeamWeaponCouldLevelUp;
//# sourceMappingURL=LevelConditionCheckTeamWeaponCouldLevelUp.js.map