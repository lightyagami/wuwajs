"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnionPrefabConfigHelper = undefined;
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action");
const FbPrefabConfig_1 = require("./FbPrefabConfig");
const FbRandomPrefabConfig_1 = require("./FbRandomPrefabConfig");
const FbRoguePrefabConfig_1 = require("./FbRoguePrefabConfig");
const FbSlashTowerPrefabConfig_1 = require("./FbSlashTowerPrefabConfig");
const FbTowerDungeonPrefabConfig_1 = require("./FbTowerDungeonPrefabConfig");
class UnionPrefabConfigHelper {
  static GetUnionPrefabConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionPrefabConfig.PrefabConfig:
        return new fb_action_1.PrefabConfig();
      case fb_action_1.UnionPrefabConfig.RandomPrefabConfig:
        return new fb_action_1.RandomPrefabConfig();
      case fb_action_1.UnionPrefabConfig.RoguePrefabConfig:
        return new fb_action_1.RoguePrefabConfig();
      case fb_action_1.UnionPrefabConfig.SlashTowerPrefabConfig:
        return new fb_action_1.SlashTowerPrefabConfig();
      case fb_action_1.UnionPrefabConfig.TowerDungeonPrefabConfig:
        return new fb_action_1.TowerDungeonPrefabConfig();
      default:
        return;
    }
  }
  static ReadUnionPrefabConfig(e, n) {
    if (n !== undefined) {
      switch (e) {
        case fb_action_1.UnionPrefabConfig.PrefabConfig:
          return FbPrefabConfig_1.FbPrefabConfig.Create(n);
        case fb_action_1.UnionPrefabConfig.RandomPrefabConfig:
          return FbRandomPrefabConfig_1.FbRandomPrefabConfig.Create(n);
        case fb_action_1.UnionPrefabConfig.RoguePrefabConfig:
          return FbRoguePrefabConfig_1.FbRoguePrefabConfig.Create(n);
        case fb_action_1.UnionPrefabConfig.SlashTowerPrefabConfig:
          return FbSlashTowerPrefabConfig_1.FbSlashTowerPrefabConfig.Create(n);
        case fb_action_1.UnionPrefabConfig.TowerDungeonPrefabConfig:
          return FbTowerDungeonPrefabConfig_1.FbTowerDungeonPrefabConfig.Create(n);
        default:
          return;
      }
    }
  }
}
exports.UnionPrefabConfigHelper = UnionPrefabConfigHelper;
//# sourceMappingURL=UnionPrefabConfigHelper.js.map