"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShipTowerMediumItem = undefined;
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const ShipTowerDefine_1 = require("../ShipTowerDefine");
class ShipTowerMediumItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments);
    this.RefreshCallBack = undefined;
    this.GetStageIdCallback = undefined;
  }
  OnStart() {
    this.SetToggleInteractive(false);
  }
  OnRefresh(e, t, o) {
    this.RefreshCallBack?.(e);
  }
  Z8_(e) {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e.Id) === 1;
  }
  RefreshRecommend(e) {
    if (this.Z8_(e)) {
      this.RefreshRecommendRole(e);
    } else {
      this.RefreshRecommendBuff(e);
    }
  }
  RefreshRecommendRole(e) {
    var t = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e.Id);
    var o = t?.GetRoleConfig() ?? ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.Id);
    var e = {
      Type: 2,
      ItemConfigId: e.Id,
      SkinId: o.SkinId,
      BottomTextId: o.Name,
      IsDisable: t === undefined,
      ElementId: o.ElementId
    };
    this.Apply(e);
  }
  RefreshRecommendBuff(e) {
    var t = ModelManager_1.ModelManager.ShipTowerModel?.GetBuffDataByBuffId(e.Id);
    var o = ConfigManager_1.ConfigManager.ShipTowerConfig?.GetBuffCfgById(e.Id);
    var o = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(o?.ItemId ?? 1);
    var e = {
      Data: e,
      Type: 4,
      ItemConfigId: o.Id,
      BottomTextId: o.Name,
      IsDisable: !t?.IsCanUse(this.GetStageIdCallback?.())
    };
    this.Apply(e);
  }
  RefreshRecord(e) {
    if (this.Z8_(e)) {
      this.RefreshRecordRole(e);
    } else {
      this.RefreshRecordBuff(e);
    }
  }
  RefreshRecordRole(e) {
    var t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.Id);
    var e = {
      Type: 2,
      ItemConfigId: e.Id,
      SkinId: t.SkinId,
      BottomTextId: ShipTowerDefine_1.shipTowerTextKey.LevelShow,
      BottomTextParameter: [e.Count],
      ElementId: t.ElementId
    };
    this.Apply(e);
  }
  RefreshRecordBuff(e) {
    var t = ConfigManager_1.ConfigManager.ShipTowerConfig?.GetBuffCfgById(e.Id);
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t?.ItemId ?? 1);
    var e = {
      Data: e,
      Type: 4,
      ItemConfigId: t.Id,
      BottomTextId: t.Name
    };
    this.Apply(e);
  }
  OnForceSelected() {
    this.SetSelected(true, true);
  }
  OnSelected(e) {
    this.SetSelected(true);
  }
  OnDeselected(e) {
    this.SetSelected(false);
  }
}
exports.ShipTowerMediumItem = ShipTowerMediumItem;
//# sourceMappingURL=ShipTowerMediumItem.js.map