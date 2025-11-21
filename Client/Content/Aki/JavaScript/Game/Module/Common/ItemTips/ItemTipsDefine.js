"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TipsHonamiStoryData = exports.TipsAbyssDangoData = exports.TipsCardData = exports.TipsOverPowerData = exports.TipsCharacterData = exports.TipsVisionData = exports.TipsWeaponData = exports.TipsMaterialData = exports.ItemTipsData = undefined;
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const PhantomRarityByRare_1 = require("../../../../Core/Define/ConfigQuery/PhantomRarityByRare");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const ModelManager_1 = require("../../../Manager/ModelManager");
const PayShopGoods_1 = require("../../PayShop/PayShopData/PayShopGoods");
const PayShopGoodsData_1 = require("../../PayShop/PayShopData/PayShopGoodsData");
const VisionDetailDescComponent_1 = require("../../Phantom/Vision/View/VisionDetailDescComponent");
const VisionDetailInfoComponent_1 = require("../../Phantom/Vision/View/VisionDetailInfoComponent");
const SkipTaskManager_1 = require("../../SkipInterface/SkipTaskManager");
class ItemTipsData {
  constructor(t) {
    this.IsIconByType = false;
    this.IsQualityByType = false;
    this.ItemType = 0;
    this.GetWayData = undefined;
    this.LimitTimeTxt = undefined;
    this.CanClickLockButton = t => true;
    this.UpdateShowNumCallback = undefined;
    this.IsShowNumTextCallback = undefined;
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t.ItemId);
    this.ConfigId = t.ItemId;
    this.IncId = t.ItemUid;
    this.CanSkip = t.CanSkip;
    this.Title = i.Name;
    this.QualityId = i.QualityId;
    var e = [];
    if (i.ItemAccess && i.ItemAccess?.length > 0) {
      for (const a of i.ItemAccess) {
        var s = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(a);
        if (s && ModelManager_1.ModelManager.SkipInterfaceModel.CheckAccessPathCondition(a)) {
          s = {
            Id: a,
            Type: s?.Type,
            Text: s?.Description,
            SortIndex: s?.SortIndex,
            Function: () => {
              if (this.CanSkip) {
                SkipTaskManager_1.SkipTaskManager.RunByConfigId(a, this.ConfigId);
              } else {
                ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId("SkipTask_Prevent");
              }
            }
          };
          e.push(s);
        }
      }
    }
    this.GetWayData = e;
  }
  CanDeprecate() {
    var t;
    return !(this.IncId <= 0) && (t = ModelManager_1.ModelManager.InventoryModel?.GetAttributeItemData(this.IncId)) !== undefined && t.CanDeprecate();
  }
}
class TipsMaterialData extends (exports.ItemTipsData = ItemTipsData) {
  constructor(t) {
    super(t);
    this.FunctionSpritePath = undefined;
    this.ItemType = 0;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ConfigId);
    this.MaterialType = t.TypeDescription;
    this.FunctionSpritePath = this.cxt(t?.ItemBuffType);
    var i = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(this.ConfigId, this.IncId);
    this.Num = i;
    this.TxtEffect = t.AttributesDescription;
    this.TxtEffectArgs = t.AttributesDescriptionArgs;
    this.TxtDescription = t.BgDescription;
    var i = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(this.ConfigId, this.IncId);
    if (i?.IsLimitTimeItem()) {
      t = i.GetEndTime();
      i = TimeUtil_1.TimeUtil.GetDataFromTimeStamp(t * TimeUtil_1.TimeUtil.Millisecond);
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_ItemExpired_text");
      this.LimitTimeTxt = StringUtils_1.StringUtils.Format(t, i.Month, i.Day, i.Hour + ":" + i.Minute);
    }
  }
  cxt(t) {
    var i = ModelManager_1.ModelManager.MediumItemGridModel;
    switch (t) {
      case 0:
        break;
      case 1:
        return i.AttackBuffSpritePath;
      case 2:
        return i.DefenseBuffSpritePath;
      case 3:
        return i.RestoreHealthBuffSpritePath;
      case 4:
        return i.RechargeBuffSpritePath;
      case 5:
        return i.ResurrectionBuffSpritePath;
      case 6:
        return i.ExploreBuffSpritePath;
    }
  }
}
exports.TipsMaterialData = TipsMaterialData;
class TipsWeaponData extends ItemTipsData {
  constructor(t) {
    super(t);
    this.WeaponType = "";
    this.WeaponLevel = 0;
    this.WeaponLimitLevel = 0;
    this.BreachLevel = 0;
    this.BreachMaxLevel = 0;
    this.WeaponStage = 0;
    this.WeaponSkillName = "";
    this.WeaponEffect = "";
    this.WeaponEffectParam = undefined;
    this.WeaponDescription = "";
    this.AttributeData = undefined;
    this.IsEquip = false;
    this.EquippedId = undefined;
    var i;
    var e;
    var s;
    var a;
    var o;
    var r;
    var n;
    var t = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this.IncId);
    var t = this.IncId !== 0 ? t.GetConfig() : ConfigManager_1.ConfigManager.InventoryConfig.GetWeaponItemConfig(this.ConfigId);
    if (t !== undefined && (t = (i = this.IncId !== 0 ? ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(this.IncId) : undefined) ? i.GetWeaponConfig() : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(t.ItemId), n = i ? i.GetBreachLevel() : 0, o = i ? i.GetResonanceLevel() : 1, e = i ? i.GetBreachConfig() : ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponBreach(t.BreachId, n), a = t.BreachId, s = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponResonanceConfig(t.ResonId, o), this.ItemType = 1, this.WeaponType = ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponTypeName(t.WeaponType), r = i ? i.GetLevel() : 1, e = e.LevelLimit, this.WeaponLevel = r, this.WeaponLimitLevel = e, this.BreachLevel = n, e = ModelManager_1.ModelManager.WeaponModel.GetWeaponBreachMaxLevel(a), this.BreachMaxLevel = e, this.WeaponStage = o, this.WeaponSkillName = s.Name, this.WeaponEffect = t.Desc, a = ModelManager_1.ModelManager.WeaponModel.GetWeaponConfigDescParams(t, o), this.WeaponEffectParam = a, this.WeaponDescription = t.AttributesDescription, e = [], s = t.FirstPropId.Id, o = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(s), a = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(t.FirstCurve, t.FirstPropId.Value, r, n), s = {
      Id: s,
      IsMainAttribute: true,
      Name: o.Name,
      IconPath: o.Icon,
      Value: a,
      IsRatio: t.FirstPropId.IsRatio
    }, a = t.SecondPropId.Id, o = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(a), r = ModelManager_1.ModelManager.WeaponModel.GetCurveValue(t.SecondCurve, t.SecondPropId.Value, r, n), n = {
      Id: a,
      IsMainAttribute: true,
      Name: o.Name,
      IconPath: o.Icon,
      Value: r,
      IsRatio: t.SecondPropId.IsRatio
    }, e.push(s), e.push(n), this.AttributeData = e, i)) {
      this.EquippedId = i.GetRoleId();
      this.IsEquip = this.EquippedId !== 0;
    }
  }
}
exports.TipsWeaponData = TipsWeaponData;
class TipsVisionData extends ItemTipsData {
  constructor(i) {
    super(i);
    this.VisionId = 0;
    this.VisionType = "";
    this.Cost = 0;
    this.UpgradeLevel = "";
    this.MainSkillText = "";
    this.MainSkillParams = undefined;
    this.SkillUniqueText = undefined;
    this.SkillUniqueTextParam = undefined;
    this.SkillUniqueRoleId = undefined;
    this.AttributeData = undefined;
    this.IsEquip = false;
    this.EquippedId = undefined;
    this.VisionDetailInfoComponentData = undefined;
    i = i.ExtraParam;
    let t = undefined;
    t = i instanceof Protocol_1.Aki.Protocol.t5s ? ModelManager_1.ModelManager.InventoryModel.GetPhantomItemDataByPhantomItem(i) : ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(this.IncId);
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetPhantomItemConfig(this.ConfigId);
    var s = this.IncId ? t.GetConfig() : e;
    if (s !== undefined) {
      var a = ModelManager_1.ModelManager.PhantomBattleModel;
      let t = undefined;
      i = (t = i instanceof Protocol_1.Aki.Protocol.t5s ? ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleDataByPhantomItem(i) : this.IncId ? a.GetPhantomBattleData(this.IncId) : undefined) ? t.GetPhantomLevel() : 0;
      a = t ? t.GetQuality() : 1;
      this.ItemType = 2;
      this.VisionId = s.MonsterId;
      s = s.Rarity;
      this.VisionType = PhantomRarityByRare_1.configPhantomRarityByRare.GetConfig(s).Desc;
      this.Cost = ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomRareConfig(s).Cost;
      this.ConfigId = t ? t.GetConfigId(true) : this.ConfigId;
      this.Title = t ? t.GetMonsterName() : this.Title;
      s = ConfigManager_1.ConfigManager.TextConfig.GetTextById("VisionLevel");
      this.UpgradeLevel = StringUtils_1.StringUtils.Format(s, i.toString());
      const p = new VisionDetailInfoComponent_1.VisionDetailInfoComponentData();
      var s = ConfigManager_1.ConfigManager.PhantomBattleConfig;
      if (e && !t) {
        e = e.SkillId;
        h = s.GetPhantomSkillBySkillId(e);
        this.MainSkillText = h.DescriptionEx;
        this.MainSkillParams = s.GetPhantomSkillDescExByPhantomSkillIdAndQuality(e, a);
        VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(h, i, true, true, a).forEach(t => {
          p.AddDescData(t);
        });
      }
      var o = [];
      var s = t?.GetMainPropShowAttributeList(1);
      if (s !== undefined) {
        for (const l of s) {
          var r = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(l.Id);
          var r = {
            Id: l.Id,
            IsMainAttribute: true,
            Name: r.Name,
            IconPath: r.Icon,
            Value: l.BaseValue,
            IsRatio: l.IsRatio
          };
          o.push(r);
        }
      }
      e = t?.GetSubPropShowAttributeList(1);
      if (e !== undefined) {
        for (const g of e) {
          var n = ConfigManager_1.ConfigManager.PropertyIndexConfig.GetPropertyIndexInfo(g.Id);
          var n = {
            Id: g.Id,
            IsMainAttribute: false,
            Name: n.Name,
            IconPath: n.Icon,
            Value: g.BaseValue,
            IsRatio: g.IsRatio
          };
          o.push(n);
        }
      }
      this.AttributeData = o;
      var h = ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipRole(this.IncId);
      if (h) {
        this.EquippedId = h;
        this.IsEquip = this.EquippedId !== 0;
      }
      var i = (p.DataBase = t)?.GetPreviewShowFetterList(-1, 0);
      if (t) {
        VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionSkillDescToDescData(t?.GetNormalSkillConfig(), t.GetPhantomLevel(), true, true, a).forEach(t => {
          p.AddDescData(t);
        });
      }
      if (i) {
        VisionDetailDescComponent_1.VisionDetailDesc.ConvertVisionFetterDataToDetailDescData(i, false).forEach(t => {
          p.AddDescData(t);
        });
      }
      this.VisionDetailInfoComponentData = p;
    }
  }
}
exports.TipsVisionData = TipsVisionData;
class TipsCharacterData extends ItemTipsData {
  constructor(t) {
    super(t);
    this.mxt = "";
    this.Qst = undefined;
    this.dxt = "";
    this.Cxt = "";
    this.ItemType = 3;
    t = ConfigManager_1.ConfigManager.RoleConfig;
    let i = t.GetRoleConfig(this.ConfigId);
    var e = i.ParentId;
    var t = (i = e > 0 ? t.GetRoleConfig(e) : i).ElementId;
    this.mxt = i.Name;
    this.Qst = ConfigManager_1.ConfigManager.ElementInfoConfig.GetElementInfo(t);
    this.dxt = i.RoleHeadIconBig;
    this.Cxt = i.Introduction;
  }
  GetRoleName() {
    return this.mxt;
  }
  GetElementConfig() {
    return this.Qst;
  }
  GetHeadTexutePath() {
    return this.dxt;
  }
  GetRoleIntroduction() {
    return this.Cxt;
  }
}
exports.TipsCharacterData = TipsCharacterData;
class TipsOverPowerData extends ItemTipsData {
  constructor(t) {
    super(t);
    this.ItemType = 4;
  }
  ConvertToPayShopGoods() {
    var t = new PayShopGoodsData_1.PayShopGoodsData();
    t.PhraseFromTempData(this.ConfigId, 0);
    var i = new PayShopGoods_1.PayShopGoods(-1);
    i.SetGoodsData(t);
    return i;
  }
}
exports.TipsOverPowerData = TipsOverPowerData;
class TipsCardData extends ItemTipsData {
  constructor(t) {
    super(t);
    this.ItemType = 5;
  }
}
exports.TipsCardData = TipsCardData;
class TipsAbyssDangoData extends ItemTipsData {
  constructor(t) {
    super(t);
    this.DangoId = -1;
    this.SlotIndex = -1;
    this.ItemType = 6;
    this.IsIconByType = true;
    this.IsQualityByType = true;
    if (t.ExtraParam) {
      t = t.ExtraParam;
      this.DangoId = t.DangoId;
      this.SlotIndex = t.SlotIndex;
    }
  }
}
exports.TipsAbyssDangoData = TipsAbyssDangoData;
class TipsHonamiStoryData extends ItemTipsData {
  constructor(t) {
    super(t);
    this.ItemType = 7;
  }
}
exports.TipsHonamiStoryData = TipsHonamiStoryData;
//# sourceMappingURL=ItemTipsDefine.js.map