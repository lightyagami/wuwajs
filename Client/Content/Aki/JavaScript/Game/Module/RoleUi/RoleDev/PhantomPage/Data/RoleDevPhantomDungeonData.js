"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RoleDevPhantomDungeonData = undefined;
const ConfigManager_1 = require("../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../Manager/ModelManager");
const RoleDevPhantomVisionSuitItemData_1 = require("./RoleDevPhantomVisionSuitItemData");
class RoleDevPhantomDungeonData extends RoleDevPhantomVisionSuitItemData_1.RoleDevPhantomVisionSuitItemData {
  InitByDungeon(e) {
    var a;
    var o;
    if (e && (a = ModelManager_1.ModelManager.AdventureGuideModel?.GetSilentAreaDetectData(e)) && !a.IsLock && (a = a.Conf)) {
      o = this.GetDungeonDropRewards(a);
      this.InitByBaseData(e, a.Name || "", 0, "RoleProject_Button02");
      this.SetRewardDataList(o);
      this.SetDungeonId(e);
    }
  }
  GetDungeonDropRewards(e) {
    var a = [];
    if (e.ShowRewardMap) {
      var o = ModelManager_1.ModelManager.AdventureGuideModel?.CurrentShowLevel ?? 1;
      var e = ConfigManager_1.ConfigManager.AdventureModuleConfig?.GetShowReward(e.ShowRewardMap, o);
      if (e) {
        for (var [t, n] of e) {
          a.push({
            ItemId: t,
            Count: n,
            HaveFinish: false
          });
        }
      }
    }
    return a;
  }
}
exports.RoleDevPhantomDungeonData = RoleDevPhantomDungeonData;
//# sourceMappingURL=RoleDevPhantomDungeonData.js.map