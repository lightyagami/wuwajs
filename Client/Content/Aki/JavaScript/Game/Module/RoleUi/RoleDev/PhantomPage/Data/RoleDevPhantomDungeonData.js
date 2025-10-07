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
      this.InitByBaseData(e, 1, a.Name || "", 0, "RoleProject_Button02", a.BigIcon);
      this.SetRewardDataList(o);
      this.SetDungeonId(e);
    }
  }
  GetDungeonDropRewards(e) {
    var a = [];
    if (e.ShowRewardMap) {
      e = e.Secondary === 63 ? ConfigManager_1.ConfigManager.AdventureModuleConfig.GetNightMareShowReward(e.ShowRewardMapCalabash) : ConfigManager_1.ConfigManager.AdventureModuleConfig.GetShowReward(e.ShowRewardMap);
      if (e) {
        for (var [o, n] of e) {
          a.push({
            ItemId: o,
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