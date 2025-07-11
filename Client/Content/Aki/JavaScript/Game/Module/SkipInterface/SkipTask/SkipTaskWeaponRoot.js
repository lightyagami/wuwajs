"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SkipTaskWeaponRoot = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const SkipTask_1 = require("./SkipTask");
class SkipTaskWeaponRoot extends SkipTask_1.SkipTask {
  OnRun(e) {
    var a = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(e);
    if (a !== undefined) {
      e = {
        WeaponIncId: e,
        WeaponSkinId: ModelManager_1.ModelManager.WeaponSkinModel.GetSkinIdByRoleId(a.GetRoleId()),
        IsFromRoleRootView: false
      };
      UiManager_1.UiManager.OpenView("WeaponRootView", e);
    }
    this.Finish();
  }
}
exports.SkipTaskWeaponRoot = SkipTaskWeaponRoot;
//# sourceMappingURL=SkipTaskWeaponRoot.js.map