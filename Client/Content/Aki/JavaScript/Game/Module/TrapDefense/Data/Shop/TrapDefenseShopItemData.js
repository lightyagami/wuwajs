"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrapDefenseShopBuffData = exports.TrapDefenseShopItemData = undefined;
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
class TrapDefenseShopItemData {
  constructor() {
    this.Id = 0;
    this.Config = undefined;
    this.OriginalPrice = undefined;
    this.CurrentPrice = 0;
    this.Type = 0;
    this.QualityId = 1;
    this.Name = "";
    this.Desc = "";
    this.Icon = "";
    this.PurchaseLimit = 0;
    this.Stock = 0;
    this.BattleItemData = undefined;
  }
  get CanPurchaseNum() {
    var t = Math.floor(ModelManager_1.ModelManager.TrapDefenseModel.BattleData.GetGoldNum() / (this.CurrentPrice || 1));
    var i = this.BattleItemData.LimitCount - this.BattleItemData.InventoryCount;
    return Math.min(t, i, this.Stock);
  }
  get InventoryCountReachLimit() {
    return this.BattleItemData.InventoryCount >= this.BattleItemData.LimitCount;
  }
  get Disable() {
    return this.InventoryCountReachLimit || this.Stock <= 0;
  }
  get DisableReason() {
    if (this.InventoryCountReachLimit) {
      return 2;
    } else if (this.Stock <= 0) {
      return 1;
    } else {
      return 0;
    }
  }
  static Create(t) {
    var i = new TrapDefenseShopItemData();
    i.AU(t);
    return i;
  }
  Update(t) {
    this.BattleItemData = ModelManager_1.ModelManager.TrapDefenseModel.BattleInventoryData.ItemMap.get(t.iju?.oju ?? 0);
    if (this.BattleItemData) {
      this.Config = this.BattleItemData.Config;
      this.Id = this.Config.Id;
      this.Name = this.Config.Name;
      this.Desc = this.Config.Desc;
      this.Icon = this.Config.Icon;
      this.QualityId = this.Config.Quality;
      this.OriginalPrice = t.eju;
      this.CurrentPrice = t.tju;
      this.Stock = t.iju?.nju ?? 0;
    }
  }
  GetItemGridParam() {
    return {
      Type: 4,
      ItemPrice: {
        CurPrice: this.CurrentPrice,
        OriginalPrice: this.OriginalPrice
      },
      IconPath: this.Icon,
      QualityId: this.QualityId,
      IsDisable: this.Disable
    };
  }
  AU(t) {
    this.Update(t);
  }
}
exports.TrapDefenseShopItemData = TrapDefenseShopItemData;
class TrapDefenseShopBuffData {
  constructor() {
    this.Id = 0;
    this.Config = undefined;
    this.OriginalPrice = undefined;
    this.CurrentPrice = 0;
    this.Type = 1;
    this.QualityId = 1;
    this.Name = "";
    this.Desc = "";
    this.DescArgs = [];
    this.Icon = "";
    this.PurchaseLimit = 0;
    this.CanPurchaseNum = 0;
    this.BdBuffData = undefined;
    this.IsSold = false;
  }
  get Disable() {
    return this.IsSold;
  }
  get DisableReason() {
    if (this.IsSold) {
      return 1;
    } else {
      return 0;
    }
  }
  static Create(t) {
    var i = new TrapDefenseShopBuffData();
    i.AU(t);
    return i;
  }
  Update(t) {
    this.Id = t.rju?.sju ?? 0;
    this.BdBuffData = ModelManager_1.ModelManager.TrapDefenseModel.RougeModeData?.BdBuffDataMap.get(this.Id);
    if (this.BdBuffData) {
      if (this.BdBuffData.IsActive && this.BdBuffData.Level < this.BdBuffData.MaxLevel) {
        this.Config = ConfigManager_1.ConfigManager.TrapDefenseConfig.GetBdBuffByLevelAndGroup(this.BdBuffData.Level + 1, this.BdBuffData.Config.Id) ?? this.BdBuffData.BdBuffConfig;
      } else {
        this.Config = this.BdBuffData.BdBuffConfig;
      }
      this.Name = this.Config.Name;
      this.Desc = this.Config.Desc;
      this.DescArgs = this.Config.DescArgs;
      this.Icon = this.Config.Icon;
      this.QualityId = this.BdBuffData.Config.Quality;
      this.OriginalPrice = t.eju;
      this.CurrentPrice = t.tju;
      this.IsSold = t.rju?.aju ?? false;
    }
  }
  GetItemGridParam() {
    return {
      Type: 4,
      ItemPrice: {
        CurPrice: this.CurrentPrice,
        OriginalPrice: this.OriginalPrice
      },
      IconPath: this.Icon,
      QualityId: this.QualityId,
      IsDisable: this.Disable,
      SubIconPath: this.Config.SubIcon
    };
  }
  AU(t) {
    this.Update(t);
  }
}
exports.TrapDefenseShopBuffData = TrapDefenseShopBuffData;
//# sourceMappingURL=TrapDefenseShopItemData.js.map