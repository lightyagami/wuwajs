"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TeleportMarkItem = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine");
const TeleportMarkItemView_1 = require("../MarkItemView/TeleportMarkItemView");
const ConfigMarkItem_1 = require("./ConfigMarkItem");
class TeleportMarkItem extends ConfigMarkItem_1.ConfigMarkItem {
  constructor(e, r, t, i, n, a = 1) {
    super(e, r, t, i, n, a);
    this.InnerView = undefined;
    this.IsDirty = false;
  }
  get IsFogUnlock() {
    return this.MarkConfig.ObjectType === 6 && !this.IsLocked || super.IsFogUnlock;
  }
  GetMarkItemViewType() {
    return 24;
  }
  CreateView() {
    return new TeleportMarkItemView_1.TeleportMarkItemView(this);
  }
  get IconPath() {
    if (this.IsLocked) {
      return this.MarkConfig.LockMarkPic;
    } else {
      return this.MarkConfig.UnlockMarkPic;
    }
  }
  set IconPath(e) {}
  get IsActivity() {
    return this.MarkConfig.ObjectType === 13;
  }
  get IsDungeonEntrance() {
    return this.MarkConfig.RelativeType === 2 || ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdLinkDungeonEntrance(this.MarkConfigId);
  }
  get IsTowerEntrance() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsTowerEntrance(this.MarkConfigId);
  }
  get IsRoguelike() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsRoguelike(this.MarkConfigId);
  }
  get IsWeeklyRogue() {
    var e = ConfigManager_1.ConfigManager.WorldMapConfig.GetDungeonConfig(this.MarkConfigId);
    return !!e && e.InstSubType === 29;
  }
  get IsRogueRes() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsRogueRes(this.MarkConfigId);
  }
  get IsShipTowerEntrance() {
    return ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckMarkIdIsShipTowerEntrance(this.MarkConfigId);
  }
  IsMultiMap() {
    return this.MarkConfig.MultiMapFloorId !== 0;
  }
  GetMultiMapId() {
    return this.MarkConfig.MultiMapFloorId;
  }
  GetSecondaryUiType() {
    if (this.IsActivity) {
      return super.GetSecondaryUiType();
    } else if (this.IsDungeonEntrance) {
      if (this.IsTowerEntrance) {
        return WorldMapDefine_1.ESecondaryPanel.TowerEntrancePanel;
      } else if (this.IsRoguelike) {
        return WorldMapDefine_1.ESecondaryPanel.RoguelikePanel;
      } else if (this.IsWeeklyRogue) {
        return WorldMapDefine_1.ESecondaryPanel.WeeklyRoguePanel;
      } else if (this.IsRogueRes) {
        return WorldMapDefine_1.ESecondaryPanel.RogueResPanel;
      } else if (this.IsShipTowerEntrance) {
        return WorldMapDefine_1.ESecondaryPanel.ShipTowerEntrancePanel;
      } else {
        return WorldMapDefine_1.ESecondaryPanel.InstanceDungeonEntrancePanel;
      }
    } else {
      return WorldMapDefine_1.ESecondaryPanel.TeleportPanel;
    }
  }
}
exports.TeleportMarkItem = TeleportMarkItem;
//# sourceMappingURL=TeleportMarkItem.js.map