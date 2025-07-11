"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InventoryConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const Lru_1 = require("../../../Core/Container/Lru");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const AbyssItemById_1 = require("../../../Core/Define/ConfigQuery/AbyssItemById");
const AccessPathById_1 = require("../../../Core/Define/ConfigQuery/AccessPathById");
const BackgroundCardById_1 = require("../../../Core/Define/ConfigQuery/BackgroundCardById");
const FlySkinConfigById_1 = require("../../../Core/Define/ConfigQuery/FlySkinConfigById");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const ItemMainTypeAll_1 = require("../../../Core/Define/ConfigQuery/ItemMainTypeAll");
const ItemMainTypeById_1 = require("../../../Core/Define/ConfigQuery/ItemMainTypeById");
const ItemShowTypeById_1 = require("../../../Core/Define/ConfigQuery/ItemShowTypeById");
const PackageCapacityAll_1 = require("../../../Core/Define/ConfigQuery/PackageCapacityAll");
const PackageCapacityByPackageId_1 = require("../../../Core/Define/ConfigQuery/PackageCapacityByPackageId");
const PhantomBattleBadgeById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleBadgeById");
const PhantomBattleCardById_1 = require("../../../Core/Define/ConfigQuery/PhantomBattleCardById");
const PhantomCustomizeItemByItemId_1 = require("../../../Core/Define/ConfigQuery/PhantomCustomizeItemByItemId");
const PhantomItemByItemId_1 = require("../../../Core/Define/ConfigQuery/PhantomItemByItemId");
const PhantomItemByMonsterId_1 = require("../../../Core/Define/ConfigQuery/PhantomItemByMonsterId");
const PlayerHeadReById_1 = require("../../../Core/Define/ConfigQuery/PlayerHeadReById");
const PlayerTitleById_1 = require("../../../Core/Define/ConfigQuery/PlayerTitleById");
const PreviewItemById_1 = require("../../../Core/Define/ConfigQuery/PreviewItemById");
const QualityInfoById_1 = require("../../../Core/Define/ConfigQuery/QualityInfoById");
const RogueCurrencyById_1 = require("../../../Core/Define/ConfigQuery/RogueCurrencyById");
const RogueResCurrencyById_1 = require("../../../Core/Define/ConfigQuery/RogueResCurrencyById");
const RoleSkinById_1 = require("../../../Core/Define/ConfigQuery/RoleSkinById");
const TypeInfoById_1 = require("../../../Core/Define/ConfigQuery/TypeInfoById");
const WeaponConfByItemId_1 = require("../../../Core/Define/ConfigQuery/WeaponConfByItemId");
const WeaponSkinById_1 = require("../../../Core/Define/ConfigQuery/WeaponSkinById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const InventoryDefine_1 = require("./InventoryDefine");
const ItemConfig_1 = require("./ItemConfig");
const ITEM_LRU_SIZE = 20;
class InventoryConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.Eci = new Map();
    this.Sci = new Map();
    this.yci = new Map();
    this.G9 = new Lru_1.Lru(ITEM_LRU_SIZE, e => this.jBa(e));
  }
  GetAllMainTypeConfig() {
    return ItemMainTypeAll_1.configItemMainTypeAll.GetConfigList();
  }
  GetItemMainTypeConfig(e) {
    return ItemMainTypeById_1.configItemMainTypeById.GetConfig(e);
  }
  GetItemMainTypeFilterSortUseWayId(e) {
    e = this.GetItemMainTypeConfig(e);
    if (e) {
      return e.UseWayId;
    }
  }
  GetAccessPathConfig(e) {
    return AccessPathById_1.configAccessPathById.GetConfig(e);
  }
  GetItemQualityConfig(e) {
    return QualityInfoById_1.configQualityInfoById.GetConfig(e);
  }
  GetItemConfigData(e) {
    InventoryConfig.Ici.Start();
    var n = this.G9.Get(e);
    if (n) {
      this.G9.Put(n);
      InventoryConfig.Ici.Stop();
    } else {
      n = this.G9.Create(e);
      this.G9.Put(n);
      InventoryConfig.Ici.Stop();
    }
    return n;
  }
  jBa(e) {
    let n = undefined;
    var r;
    var t = this.GetItemDataTypeByConfigId(e);
    switch (t) {
      case 2:
        n = this.GetWeaponItemConfig(e);
        break;
      case 3:
        n = this.GetPhantomItemConfig(e);
        break;
      case 4:
        var i = this.GetPhantomCustomizeItemConfig(e);
        if (i) {
          n = i.SkinItemId > 0 ? this.GetPhantomItemConfig(i.SkinItemId) : this.GetPhantomItemConfig(i.PhantomId);
        }
        break;
      case 0:
      case 5:
        n = this.GetItemConfig(e);
        break;
      case 1:
        n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
        break;
      case 6:
        n = BackgroundCardById_1.configBackgroundCardById.GetConfig(e);
        break;
      case 7:
        n = this.GetPreviewItemConfig(e);
        break;
      case 8:
        n = RogueCurrencyById_1.configRogueCurrencyById.GetConfig(e);
        break;
      case 9:
        n = RogueResCurrencyById_1.configRogueResCurrencyById.GetConfig(e);
        break;
      case 10:
        n = WeaponSkinById_1.configWeaponSkinById.GetConfig(e);
        break;
      case 11:
        n = RoleSkinById_1.configRoleSkinById.GetConfig(e);
        break;
      case 14:
        n = FlySkinConfigById_1.configFlySkinConfigById.GetConfig(e);
        break;
      case 12:
        n = PlayerHeadReById_1.configPlayerHeadReById.GetConfig(e);
        break;
      case 13:
        n = AbyssItemById_1.configAbyssItemById.GetConfig(e);
        break;
      case 15:
        n = PhantomBattleCardById_1.configPhantomBattleCardById.GetConfig(e);
        break;
      case 16:
        n = PhantomBattleBadgeById_1.configPhantomBattleBadgeById.GetConfig(e);
    }
    if (n) {
      (r = new ItemConfig_1.ItemConfig()).Refresh(n, t);
      return r;
    }
  }
  GetItemDataTypeByConfigId(e) {
    if (InventoryConfig._bc === undefined) {
      InventoryConfig._bc = ConfigManager_1.ConfigManager.InventoryConfig.GetErrorPhantomSpecialIdList();
    }
    if (InventoryConfig._bc !== undefined && InventoryConfig._bc.includes(e)) {
      return 4;
    } else if (e >= InventoryDefine_1.weaponIdRange[0] && e <= InventoryDefine_1.weaponIdRange[1]) {
      return 2;
    } else if (e >= InventoryDefine_1.phantomIdRange[0] && e <= InventoryDefine_1.phantomIdRange[1]) {
      return 3;
    } else if (e >= InventoryDefine_1.phantomSpecificIdRange[0] && e <= InventoryDefine_1.phantomSpecificIdRange[1]) {
      return 4;
    } else if (e >= InventoryDefine_1.roleIdRange[0] && e <= InventoryDefine_1.roleIdRange[1]) {
      return 1;
    } else if (e >= InventoryDefine_1.virtualIdRange[0] && e <= InventoryDefine_1.virtualIdRange[1]) {
      return 5;
    } else if (e >= InventoryDefine_1.cardIdRange[0] && e <= InventoryDefine_1.cardIdRange[1]) {
      return 6;
    } else if (e >= InventoryDefine_1.previewItemIdRange[0] && e <= InventoryDefine_1.previewItemIdRange[1]) {
      return 7;
    } else if (e >= InventoryDefine_1.rogueCurrencyIdRange[0] && e <= InventoryDefine_1.rogueCurrencyIdRange[1]) {
      return 8;
    } else if (e >= InventoryDefine_1.rogueResCurrencyIdRange[0] && e <= InventoryDefine_1.rogueResCurrencyIdRange[1]) {
      return 9;
    } else if (e >= InventoryDefine_1.weaponSkinIdRange[0] && e < InventoryDefine_1.weaponSkinIdRange[1]) {
      return 10;
    } else if (e >= InventoryDefine_1.roleSkinIdRange[0] && e < InventoryDefine_1.roleSkinIdRange[1]) {
      return 11;
    } else if (e >= InventoryDefine_1.playerHeadRange[0] && e < InventoryDefine_1.playerHeadRange[1]) {
      return 12;
    } else if (e >= InventoryDefine_1.DangoAbyssItemRange[0] && e < InventoryDefine_1.DangoAbyssItemRange[1]) {
      return 13;
    } else if (e >= InventoryDefine_1.flySkinIdRange[0] && e < InventoryDefine_1.flySkinIdRange[1]) {
      return 14;
    } else if (e >= InventoryDefine_1.PhantomArenaCardItemRange[0] && e < InventoryDefine_1.PhantomArenaCardItemRange[1]) {
      return 15;
    } else if (e >= InventoryDefine_1.PhantomArenaBadgeItemRange[0] && e < InventoryDefine_1.PhantomArenaBadgeItemRange[1]) {
      return 16;
    } else {
      return 0;
    }
  }
  GetItemConfig(e) {
    return ItemInfoById_1.configItemInfoById.GetConfig(e);
  }
  GetPreviewItemConfig(e) {
    return PreviewItemById_1.configPreviewItemById.GetConfig(e);
  }
  GetWeaponItemConfig(e) {
    return WeaponConfByItemId_1.configWeaponConfByItemId.GetConfig(e);
  }
  GetPhantomItemConfig(e) {
    return PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(e);
  }
  GetPhantomCustomizeItemConfig(e) {
    return PhantomCustomizeItemByItemId_1.configPhantomCustomizeItemByItemId.GetConfig(e);
  }
  GetPhantomItemConfigListByMonsterId(e) {
    var n = PhantomItemByMonsterId_1.configPhantomItemByMonsterId.GetConfigList(e);
    if (!n) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 8, "表格查询不到配置ID", ["MonsterId", e]);
      }
    }
    return n;
  }
  GetCardItemConfig(e) {
    return BackgroundCardById_1.configBackgroundCardById.GetConfig(e);
  }
  GetErrorPhantomSpecialIdList() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("SpecialPhantomCustomizeItem");
  }
  GetAllPackageConfig() {
    return PackageCapacityAll_1.configPackageCapacityAll.GetConfigList();
  }
  GetPackageConfig(e) {
    return PackageCapacityByPackageId_1.configPackageCapacityByPackageId.GetConfig(e);
  }
  GetItemTypeConfig(e) {
    return TypeInfoById_1.configTypeInfoById.GetConfig(e);
  }
  GetItemShowTypeConfig(e) {
    return ItemShowTypeById_1.configItemShowTypeById.GetConfig(e);
  }
  GetPlayerTitleItemConfig(e) {
    return PlayerTitleById_1.configPlayerTitleById.GetConfig(e);
  }
  GetItemQualityByItemIdAndQuality(e, n) {
    if (e !== undefined && this.GetItemDataTypeByConfigId(e) === 13) {
      return ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityById(n);
    } else {
      return ConfigManager_1.ConfigManager.InventoryConfig.GetItemQualityConfig(n);
    }
  }
  OnClear() {
    this.Eci.clear();
    this.Sci.clear();
    this.yci.clear();
    this.G9.Clear();
    return true;
  }
}
(exports.InventoryConfig = InventoryConfig).Ici = Stats_1.Stat.Create("GetItemConfigData");
//# sourceMappingURL=InventoryConfig.js.map