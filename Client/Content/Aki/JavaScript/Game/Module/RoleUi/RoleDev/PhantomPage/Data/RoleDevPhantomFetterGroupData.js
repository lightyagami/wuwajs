"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomFetterGroupData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevPhantomVisionSuitItemData_1 = require("./RoleDevPhantomVisionSuitItemData");
class RoleDevPhantomFetterGroupData extends RoleDevPhantomVisionSuitItemData_1.RoleDevPhantomVisionSuitItemData {
  InitByFetterGroup(e, t) {
    var a = ModelManager_1.ModelManager.PhantomBattleModel?.GetFetterGroupMonsterIdArray(e);
    if (a && a.length > 0 && (a = a.filter(e => this.U7d(e, 4)).map(e => this.x7d(e))).length > 0) {
      this.InitByBaseData(1, 0, "Cost4", 4, "RoleProject_Button02", "");
      this.SetMonsterDataList(a);
      this.SetFetterGroupInfo(e, t);
    }
  }
  U7d(e, t) {
    var e = ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomItemByMonsterId(e);
    return !!e && e.length !== 0 && (e = e[0].Rarity, ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetPhantomRareConfig(e)?.Cost === t);
  }
  x7d(e) {
    return {
      MonsterId: e,
      QualityId: 0,
      RoleId: 0
    };
  }
}
exports.RoleDevPhantomFetterGroupData = RoleDevPhantomFetterGroupData;
//# sourceMappingURL=RoleDevPhantomFetterGroupData.js.map