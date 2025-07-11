"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ItemViewData = undefined;
const UiPlayItemById_1 = require("../../../Core/Define/ConfigQuery/UiPlayItemById");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class ItemViewData {
  constructor(e) {
    this.Lmi = e;
  }
  SetItemViewInfo(e) {
    this.Lmi = e;
  }
  GetItemViewInfo() {
    return this.Lmi;
  }
  Dmi(e) {
    this.Lmi.IsNewItem = e;
  }
  SetIsLock(e) {
    this.Lmi.IsLock = e;
  }
  SetIsDeprecate(e) {
    this.Lmi.IsDeprecate = e;
  }
  SetHasRedDot(e) {
    this.Lmi.HasRedDot = e;
  }
  GetRedDotDisableRule() {
    var e = this.GetConfigId();
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(e);
    if (e) {
      return e.RedDotDisableRule;
    } else {
      return 0;
    }
  }
  GetConfigId() {
    return this.Lmi.ConfigId;
  }
  GetUniqueId() {
    return this.GetItemDataBase()?.GetUniqueId();
  }
  GetQuality() {
    return this.GetItemDataBase()?.GetQuality();
  }
  SetCount(e) {
    this.Lmi.Count = e;
  }
  GetCount() {
    return this.Lmi.Count;
  }
  SetStackId(e) {
    this.Lmi.StackId = e;
  }
  GetStackId() {
    return this.Lmi.StackId;
  }
  SetSelectOn(e) {
    this.Lmi.IsSelectOn = e;
  }
  GetSelectOn() {
    return this.Lmi.IsSelectOn;
  }
  SetSelectNum(e) {
    this.Lmi.SelectOnNum = e;
  }
  GetSelectNum() {
    return this.Lmi.SelectOnNum;
  }
  GetItemDataBase() {
    return this.Lmi.ItemDataBase;
  }
  GetItemDataType() {
    return this.Lmi.ItemDataType;
  }
  GetSortIndex() {
    return this.GetItemDataBase().GetSortIndex();
  }
  RemoveNewItem() {
    var e = ModelManager_1.ModelManager.InventoryModel;
    var t = this.GetItemDataType();
    var r = this.GetConfigId();
    var i = this.GetUniqueId();
    if (t === 0) {
      e.RemoveNewCommonItem(r, i);
    } else {
      e.RemoveNewAttributeItem(i);
    }
    this.Dmi(false);
  }
  RemoveRedDotItem() {
    var e = ModelManager_1.ModelManager.InventoryModel;
    var t = this.GetItemDataType();
    var r = this.GetConfigId();
    var i = this.GetUniqueId();
    if (t === 0) {
      e.RemoveRedDotCommonItem(r, i);
    } else {
      e.RemoveRedDotAttributeItem(i);
    }
    this.SetHasRedDot(false);
  }
  IsBuffItem() {
    return ConfigManager_1.ConfigManager.BuffItemConfig.IsBuffItem(this.GetConfigId());
  }
  IsTeamBuffItem() {
    return ConfigManager_1.ConfigManager.BuffItemConfig.IsTeamBuffItem(this.GetConfigId());
  }
  GetUiPlayItem() {
    var e = this.GetConfigId();
    return UiPlayItemById_1.configUiPlayItemById.GetConfig(e);
  }
  GetItemType() {
    return this.GetItemDataBase()?.GetType();
  }
  GetAttributeLevel() {
    var e;
    var t = this.GetItemDataType();
    var r = this.GetUniqueId();
    if (t === 3) {
      if (e = ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(r)) {
        return e.GetPhantomLevel();
      } else {
        return 0;
      }
    } else if (t === 2) {
      return ModelManager_1.ModelManager.WeaponModel.GetWeaponLevelById(r);
    } else {
      return 0;
    }
  }
  GetItemOperationType() {
    return this.Lmi.ItemOperationMode;
  }
  IsItemCanDestroy() {
    switch (this.GetItemDataType()) {
      case 0:
        return this.GetItemDataBase().GetConfig().Destructible;
      case 2:
        var e = this.GetItemDataBase();
        var t = e.GetUniqueId();
        var t = t ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(t) : undefined;
        var r = e.GetIsLock();
        var i = !!t && t.GetRoleId() !== 0;
        var e = e.GetConfig().Destructible;
        var t = !!t && t.HasWeaponCultivated();
        return e && !r && !i && !t;
      case 3:
        e = this.GetItemDataBase();
        r = e.GetUniqueId();
        i = e.GetIsLock();
        t = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(r);
        r = !!t && t !== 0;
        return e.GetConfig().Destructible && !i && !r;
    }
    return false;
  }
  IsEqual(e, t) {
    var r = this.GetConfigId() === e.GetConfigId();
    var i = this.GetUniqueId() === e.GetUniqueId();
    var e = this.GetStackId() === e.GetStackId();
    if (t) {
      return r && i && e;
    } else {
      return r && i;
    }
  }
}
exports.ItemViewData = ItemViewData;
//# sourceMappingURL=ItemViewData.js.map