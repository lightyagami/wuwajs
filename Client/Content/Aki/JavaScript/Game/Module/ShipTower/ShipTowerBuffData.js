"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerBuffData = undefined;
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class ShipTowerBuffData {
  constructor() {
    this.Id = 0;
    this.BuffIds = [];
    this.ItemId = 0;
    this.Quality = 0;
    this.ItemNameKey = "";
    this.ObtainedShowDescKey = "";
    this.BgDescKey = "";
    this.IsSelected = false;
    this.AG_ = false;
    this.Season = 0;
  }
  get CanUseCount() {
    return this.TotalUseCount - this.UsedCount;
  }
  get CanUseCountNoEdit() {
    return this.TotalUseCount - this.UsedCountNoEdit;
  }
  get IsUnlock() {
    return this.TotalUseCount > 0;
  }
  get TotalUseCount() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ItemId);
  }
  get UsedCount() {
    var t = ModelManager_1.ModelManager.ShipTowerModel.TowerStageDataList;
    if (t[0]?.IsHaveProtoData) {
      return t.filter(t => !t.IsEndLess && t.IsUnLocked()).reduce((t, e) => {
        return t + e.TeamDataList.filter(t => t.BuffDataEdit?.Id === this.Id).length;
      }, 0);
    } else {
      return 0;
    }
  }
  get UsedCountNoEdit() {
    var t = ModelManager_1.ModelManager.ShipTowerModel.TowerStageDataList;
    if (t[0]?.IsHaveProtoData) {
      return t.filter(t => !t.IsEndLess && t.IsUnLocked()).reduce((t, e) => {
        return t + e.TeamDataList.filter(t => t.BuffData?.Id === this.Id).length;
      }, 0);
    } else {
      return 0;
    }
  }
  Init(t) {
    this.Id = t.Id;
    this.ItemId = t.ItemId;
    this.AG_ = !!t.Unlimited;
    this.BuffIds = t.BuffIds;
    this.Season = t.Season;
    this.zn_();
  }
  zn_() {
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.ItemId);
    if (t) {
      this.Quality = t.QualityId;
      this.ItemNameKey = t.Name;
      this.ObtainedShowDescKey = t.ObtainedShowDescription;
      this.BgDescKey = t.BgDescription;
    }
  }
  SetSelected(t) {
    if (t) {
      ModelManager_1.ModelManager.ShipTowerModel.CurSelectBuffData?.SetSelected(false);
      ModelManager_1.ModelManager.ShipTowerModel.CurSelectBuffData = this;
    }
    this.IsSelected = t;
  }
  ClearSelected() {
    this.IsSelected = false;
  }
  CanUseCountStr(t) {
    if (this.IsUnlimited(t)) {
      return "∞";
    } else {
      return this.CanUseCount.toString();
    }
  }
  IsUnlimited(t) {
    return !!this.AG_ || !!t && !!ModelManager_1.ModelManager.ShipTowerModel.GetStageDataById(t)?.IsEndLess;
  }
  IsShowNumTextCallback(t) {
    return !this.IsUnlimited(t);
  }
  GetQualityColor() {
    var t = ConfigManager_1.ConfigManager.ItemConfig.GetQualityConfig(this.Quality);
    return UE.Color.FromHex(t.DropColor);
  }
  IsCanUse(t) {
    return !ModelManager_1.ModelManager.ShipTowerModel?.IsOldSeason(this.Season) && !!this.IsUnlock && (!!this.IsUnlimited(t) || this.CanUseCount > 0);
  }
  GetQualityTitle() {
    return "GhostShipItemQuality_Text" + this.Quality;
  }
  IsFirstGet() {
    return !!this.IsUnlock && !ModelManager_1.ModelManager.ShipTowerModel.PlayerGetBuffSet.has(this.Id);
  }
  AddToGetState() {
    return !!this.IsFirstGet() && (ModelManager_1.ModelManager.ShipTowerModel.AddPlayerGetBuff(this.Id), true);
  }
}
exports.ShipTowerBuffData = ShipTowerBuffData;
//# sourceMappingURL=ShipTowerBuffData.js.map