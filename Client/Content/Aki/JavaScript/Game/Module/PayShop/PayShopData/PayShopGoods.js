"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopGoods = undefined;
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const CouponById_1 = require("../../../../Core/Define/ConfigQuery/CouponById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ActivityControllerHolder_1 = require("../../Activity/ActivityControllerHolder");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const PayShopItemBase_1 = require("../PayShopTab/TabItem/PayShopItemBase");
class PayShopGoods {
  constructor(t) {
    this.Pe = undefined;
    this.EFi = false;
    this.PayShopId = 1;
    this.XOi = undefined;
    this.SFi = 0;
    this.PayShopId = t;
  }
  SetGoodsData(t) {
    this.Pe = t;
    this.EFi = this.InSellTime();
    this.XOi = new PayShopItemBase_1.PayShopItemBaseSt();
    this.XOi.PhraseFromPayItemData(this);
  }
  SetPayGiftId(t) {
    this.SFi = t;
  }
  GetGetPayGiftData() {
    return ModelManager_1.ModelManager.PayGiftModel.GetPayGiftDataById(this.SFi);
  }
  GetGoodsData() {
    return this.Pe;
  }
  IsLocked() {
    return this.Pe.Locked;
  }
  GetConditionTextId() {
    var t = this.Pe.GetBuyConditionId();
    if (t !== 0) {
      return LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t) ?? "";
    } else {
      return "";
    }
  }
  GetDiscountLabel() {
    return this.Pe.LabelId;
  }
  GetItemData() {
    var t = ConfigManager_1.ConfigManager.InventoryConfig;
    var e = this.Pe.ItemId;
    var t = t.GetItemConfigData(e);
    return {
      Quality: t.QualityId,
      ItemId: e,
      Name: t.Name
    };
  }
  IfPayGift() {
    return this.Pe.IfPayGift();
  }
  GetPriceData() {
    var t = this.GetAvailableCouponDiscount();
    var e = Math.max(this.Pe.GetNowPrice() - t, 0);
    let i = this.Pe.GetOriginalPrice();
    if (!i && t > 0) {
      i = e + t;
    }
    const r = this.Pe.Price.Id;
    t = ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r);
    return {
      OwnNumber: () => ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(r),
      NowPrice: e,
      OriginalPrice: i,
      CurrencyId: r,
      Enough: t - e >= 0,
      InDiscountTime: this.Pe.HasDiscount()
    };
  }
  GetDirectPriceText() {
    var t = ModelManager_1.ModelManager.KuroSdkModel?.GetQueryProductShowPrice(this.Pe.Price.Id.toString());
    return t || (t = this.Pe.Price.Id, ConfigManager_1.ConfigManager.PayItemConfig.GetPayShow(t));
  }
  GetRemainingData() {
    var t;
    if (this.Pe.HasBuyLimit()) {
      t = this.Pe.GetRemainingCount();
      return {
        TextId: this.Pe.GetRemainingTextId(),
        Count: t
      };
    }
  }
  SetUnLock() {
    this.Pe.SetUnLock();
  }
  GetDiscount() {
    return this.Pe.GetDiscount();
  }
  GetDiscountNew() {
    var t = this.GetGetPayGiftData();
    if (t) {
      return t.GetDiscount() / 100;
    } else {
      return this.Pe.GetDiscountNew();
    }
  }
  HasDiscount() {
    var t = this.GetGetPayGiftData();
    return (t || this.Pe).HasDiscount();
  }
  IsPermanentDiscount() {
    return this.Pe.EndPromotionTime === 0 && this.Pe.BeginPromotionTime === 0 || this.Pe.EndPromotionTime === 0 && TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime);
  }
  IsPermanentSell() {
    return this.Pe.BeginTime === 0 && this.Pe.EndTime === 0 || TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime) && this.Pe.EndTime === 0;
  }
  InSellTime() {
    return !!this.IsPermanentSell() || Number(this.Pe.EndTime) > TimeUtil_1.TimeUtil.GetServerTime() && TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime);
  }
  InLabelShowTime() {
    return this.Pe.InLabelShowTime();
  }
  InUnPermanentSellTime() {
    return !this.IsPermanentSell() && Number(this.Pe.EndTime) > TimeUtil_1.TimeUtil.GetServerTime() && TimeUtil_1.TimeUtil.GetServerTime() >= Number(this.Pe.BeginTime);
  }
  WillSell() {
    return !this.EFi && TimeUtil_1.TimeUtil.GetServerTime() < Number(this.Pe.BeginTime);
  }
  GetDiscountTimeData() {
    var t = Number(this.Pe.EndPromotionTime);
    return PayShopGoods.GetEndTimeShowText(t);
  }
  GetDiscountRemainTime() {
    var t = Number(this.Pe.EndPromotionTime) - TimeUtil_1.TimeUtil.GetServerTime();
    let e = TimeUtil_1.TimeUtil.CalculateRemainingTime(t);
    return e = e || {
      TimeValue: 0,
      RemainingTime: 0 + TimeUtil_1.TimeUtil.TimeDeviation,
      TextId: CommonDefine_1.remainTimeTextId[1]
    };
  }
  GetDiscountCountDown() {
    var t = Number(this.Pe.EndPromotionTime) - TimeUtil_1.TimeUtil.GetServerTime();
    return TimeUtil_1.TimeUtil.GetCountDownData(t);
  }
  GetUpdateTimeRemainData() {
    var t = Number(this.Pe.UpdateTime);
    return PayShopGoods.GetEndTimeShowText(t);
  }
  GetUpdateRemainTime() {
    return Number(this.Pe.UpdateTime) - TimeUtil_1.TimeUtil.GetServerTime() + TimeUtil_1.TimeUtil.TimeDeviation;
  }
  InUpdateTime() {
    return !!this.Pe.HasBuyLimit() && this.Pe.UpdateTime !== 0 && Number(this.Pe.UpdateTime) > TimeUtil_1.TimeUtil.GetServerTime();
  }
  NeedDown() {
    return !!this.EFi && !this.IsPermanentSell() && !this.InUnPermanentSellTime() && !(this.EFi = false);
  }
  NeedUpdate() {
    if (this.InSellTime() && !this.EFi) {
      return this.EFi = true;
    } else {
      return !!this.Pe.HasBuyLimit() && this.Pe.UpdateTime !== 0 && Number(this.Pe.UpdateTime) <= TimeUtil_1.TimeUtil.GetServerTime() && this.InSellTime();
    }
  }
  static GetEndTimeShowText(t) {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    var t = Math.max(t - e, 0);
    var e = PayShopGoods.GetTimeTypeData(t);
    if (e[0] === 0) {
      return ConfigManager_1.ConfigManager.TextConfig.GetTextById("NotEnoughOneHour");
    } else {
      return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, e[0], e[1]).CountDownText;
    }
  }
  static GetTimeTypeData(t) {
    if (t > CommonDefine_1.SECOND_PER_DAY) {
      return [3, 2];
    } else if (t > CommonDefine_1.SECOND_PER_HOUR) {
      return [2, 2];
    } else {
      return [0, 0];
    }
  }
  GetTimeRemainData(t) {
    t -= TimeUtil_1.TimeUtil.GetServerTime();
    let e = TimeUtil_1.TimeUtil.CalculateRemainingTime(t);
    return e = e || {
      TimeValue: 0,
      RemainingTime: 0,
      TextId: CommonDefine_1.remainTimeTextId[1]
    };
  }
  GetEndTimeRemainData() {
    var t = Number(this.Pe.EndTime);
    return PayShopGoods.GetEndTimeShowText(t);
  }
  GetDownTipsText() {
    if (this.CheckIfMonthCardItem()) {
      return ConfigManager_1.ConfigManager.TextConfig.GetTextById("MonthlyCardMax");
    }
    if (this.IsLimitGoods() && this.IsSoldOut()) {
      return ConfigManager_1.ConfigManager.TextConfig.GetTextById("SoldOut");
    }
    if (!this.IfCanBuy()) {
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(this.GetGoodsData().ItemId);
      if (this.GetGoodsData().GetItemConfig().ShowTypes.includes(30) || t === 1) {
        return ConfigManager_1.ConfigManager.TextConfig.GetTextById("Text_Shop_Role_Text");
      }
      t = this.GetConditionTextId();
      if (!StringUtils_1.StringUtils.IsEmpty(t)) {
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
      }
    }
    return "";
  }
  GetConditionLimitText() {
    if (this.Pe.GetIfCanBuy()) {
      return "";
    } else {
      return this.Pe.GetUnFinishConditionText();
    }
  }
  GetExtraLimitText() {
    if (this.CheckIfMonthCardItem()) {
      return "Text_MonthlyCardMax_Text";
    }
    if (!this.IfCanBuy()) {
      var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(this.GetGoodsData().ItemId);
      if (this.GetGoodsData().GetItemConfig().ShowTypes.includes(30) || t === 1) {
        let t = 0;
        t = this.GetGoodsData().GetItemConfig().ShowTypes.includes(30) ? ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(this.GetGoodsData().ItemId)[0] : this.GetGoodsData().ItemId;
        if (ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t) === undefined) {
          return "DontHaveRole";
        } else {
          return "RoleBrenchItemMax";
        }
      }
      return this.GetConditionTextId();
    }
  }
  GetIfNeedExtraLimitText() {
    if (this.CheckIfMonthCardItem()) {
      return !ModelManager_1.ModelManager.MonthCardModel.IsRemainDayInMaxLimit();
    } else {
      return !this.IfCanBuy();
    }
  }
  GetIfNeedShowDownTipsText() {
    if (this.CheckIfMonthCardItem()) {
      var t = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
      if (CommonParamById_1.configCommonParamById.GetIntConfig("MonthCardMaxDays") < t) {
        return true;
      }
    }
    return !!this.IsLimitGoods() && !!this.IsSoldOut() || !this.IfCanBuy();
  }
  GetSpriteTextBgColor() {
    if (this.CheckIfMonthCardItem()) {
      var t = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
      if (CommonParamById_1.configCommonParamById.GetIntConfig("MonthCardMaxDays") < t) {
        return "3E3E3BFF";
      }
    }
    if (this.IsLimitGoods() && this.IsSoldOut()) {
      return "6C6C6CFF";
    } else {
      return "F9F9F9FF";
    }
  }
  GetTextTipsColor() {
    if (this.CheckIfMonthCardItem()) {
      var t = ModelManager_1.ModelManager.MonthCardModel.GetRemainDays();
      if (CommonParamById_1.configCommonParamById.GetIntConfig("MonthCardMaxDays") < t) {
        return "F9F9F9FF";
      }
    }
    if (this.IsLimitGoods() && this.IsSoldOut()) {
      return "F9F9F9FF";
    } else {
      return "181818FF";
    }
  }
  GetCountDownData() {
    let t = undefined;
    let e = 0;
    let i = 0;
    if (!t) {
      if (this.IsLimitGoods() && this.GetGoodsData().IsWeeklyRefresh() && this.GetRemainingData().Count === 0 && this.GetGoodsData().IfMayReSell()) {
        t = this.GetUpdateTimeRemainData();
        e = 2;
        i = this.GetTimeRemainData(this.Pe.UpdateTime)?.RemainingTime;
      }
    }
    if (!t && !(this.HasDiscount() && (i = this.GetTimeRemainData(this.Pe.EndPromotionTime).RemainingTime) > 0 && (t = this.GetDiscountTimeData(), e = 1), t)) {
      t = this.GetEndTimeRemainData();
      e = 3;
      i = this.GetTimeRemainData(this.Pe.EndTime)?.RemainingTime;
    }
    return [e, t, i];
  }
  GetResellText() {
    let t = "";
    if (this.IsLimitGoods() && this.GetGoodsData().IsWeeklyRefresh()) {
      if (this.GetRemainingData().Count !== 0 || this.GetGoodsData().IfMayReSell()) {
        if (this.GetRemainingData().Count === 0 && this.GetGoodsData().IfMayReSell()) {
          t = "ReSell";
        }
      } else {
        t = "DistanceToDown";
      }
    }
    return t;
  }
  GetExchangePopViewResellText() {
    let t = "";
    return t = this.IsLimitGoods() && this.GetGoodsData().IsWeeklyRefresh() && this.GetRemainingData().Count === 0 && this.GetGoodsData().IfMayReSell() ? "SoldOut" : t;
  }
  GetBuyLimitText() {
    if (this.IsLimitGoods()) {
      let t = "";
      var e;
      if ((t = this.Pe.UpdateType === 0 ? "LimitBuy" : this.Pe.UpdateType === 1 ? "DailyLeftTime" : this.Pe.UpdateType === 2 ? "WeekLeftTime" : this.Pe.UpdateType === 3 ? "MonthLeftTime" : "LimitBuy") === "LimitBuy") {
        e = this.Pe.BuyLimit - this.Pe.BoughtCount;
        return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById(t), e.toString(), this.Pe.BuyLimit.toString());
      } else {
        return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById(t), (this.Pe.BuyLimit - this.Pe.BoughtCount).toString());
      }
    }
    return "";
  }
  GetExchangeViewShopTipsText() {
    if (this.CheckIfMonthCardItem()) {
      return ModelManager_1.ModelManager.MonthCardModel.GetRemainDayText();
    }
    if (this.IsLimitGoods()) {
      let t = "";
      t = this.Pe.UpdateType === 0 ? "LimitBuy_B" : this.Pe.UpdateType === 1 ? "DayLimitBuy_B" : this.Pe.UpdateType === 2 ? "WeekLimitBuy_B" : this.Pe.UpdateType === 3 ? "MonthLimitBuy_B" : "LimitBuy_B";
      let e = "";
      var i = this.Pe.BuyLimit - this.Pe.BoughtCount;
      e = this.GetGoodsData().GetRemainingCount() > 0 ? StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("BuyTextEnough"), i.toString(), this.Pe.BuyLimit.toString()) : StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("BuyTextNotEnough"), i.toString(), this.Pe.BuyLimit.toString());
      return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById(t), e);
    }
    return "";
  }
  GetShopTipsText() {
    if (this.CheckIfMonthCardItem()) {
      return ModelManager_1.ModelManager.MonthCardModel.GetRemainDayText();
    }
    if (this.IsLimitGoods()) {
      let t = "";
      t = this.Pe.UpdateType === 0 ? "LimitBuy" : this.Pe.UpdateType === 1 ? "DayLimitBuy" : this.Pe.UpdateType === 2 ? "WeekLimitBuy" : this.Pe.UpdateType === 3 ? "MonthLimitBuy" : "LimitBuy";
      var e = this.Pe.BuyLimit - this.Pe.BoughtCount;
      return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById(t), e.toString(), this.Pe.BuyLimit.toString());
    }
    return "";
  }
  GetTabId() {
    return this.Pe.TabId;
  }
  IsLimitGoods() {
    return this.Pe.HasBuyLimit();
  }
  IfCanBuy() {
    if (this.CheckIfMonthCardItem()) {
      var e = ConfigManager_1.ConfigManager.ItemConfig.GetConfig(this.GetGoodsData().ItemId);
      let t = e.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenMonthCard);
      if (!(t = t || e.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenMonthCard))) {
        return true;
      }
      if (!ModelManager_1.ModelManager.MonthCardModel.CheckMonthCardIfCanBuy()) {
        return false;
      }
    }
    e = this.GetGoodsData().GetItemConfig();
    if (e && e.ShowTypes?.includes(30)) {
      var e = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(this.GetGoodsData().ItemId);
      if (e && e.length > 0) {
        e = e[0];
        return !!ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e) && ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(e) > 0;
      }
    }
    return this.Pe.GetIfCanBuy();
  }
  IsSoldOut() {
    if (this.Pe.HasBuyLimit()) {
      return this.Pe.BoughtCount === this.Pe.BuyLimit;
    }
    var t = this.GetRewardRoleSkinId();
    if (t > 0 && !ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(t).IsLocked()) {
      return true;
    }
    return false;
  }
  GetGoodsId() {
    return this.Pe.Id;
  }
  IsDirect() {
    return this.Pe.IsDirect();
  }
  AddBoughtCount(t) {
    this.Pe.BoughtCount += t;
  }
  IsShowInShop() {
    return this.Pe.IsShowInShop();
  }
  ConvertToPayShopBaseSt() {
    this.XOi.Refresh(this);
    return this.XOi;
  }
  CheckIfMonthCardItem() {
    return this.GetGoodsData().CheckIfMonthCardItem();
  }
  GetIfNeedRemind() {
    return !!this.HZa() || !!this.jZa();
  }
  HZa() {
    return !this.IsLocked() && !!this.IfCanBuy() && !this.IsSoldOut() && !!this.CheckGoodIfShow() && !this.IsDirect() && this.GetPriceData().NowPrice === 0;
  }
  jZa() {
    return !!this.IfCanBuy() && !this.IsSoldOut() && !!this.CheckGoodIfShow() && this.Pe.GetIfNeedRemind();
  }
  CheckGoodIfShow() {
    return !!this.IsShowInShop() && !!this.InSellTime() && !!this.GetGoodsData().Show && (!this.GetGoodsData().HasBuyLimit() || this.GetGoodsData().GetRemainingCount() !== 0 || !!this.GetGoodsData().IsWeeklyRefresh() || !!this.GetGoodsData().IfShowAfterSoldOut()) && (!this.GetGoodsData().HasBuyLimit() || this.GetGoodsData().GetRemainingCount() !== 0 || !this.GetGoodsData().IsWeeklyRefresh() || !(this.GetGoodsData().UpdateTime >= this.GetGoodsData().EndTime) || !!this.IsPermanentSell());
  }
  SaveRemindState(t) {
    if (this.Pe.SaveRemindState(t) === 0) {
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayShopEntranceRedDot);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayShopInstanceRedDot, this.PayShopId);
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.RefreshPayShopTabRedDot, this.GetTabId());
    }
  }
  CheckIfGiftPackage() {
    var e = this.GetGoodsData().ItemId;
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
    if (e && e.Parameters) {
      let t = e.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift);
      if (t = t || e.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift)) {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }
  GetPackageRewardId() {
    var e = this.GetGoodsData().ItemId;
    var e = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(e);
    if (e && e.Parameters) {
      let t = e.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift);
      if (t = t || e.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift)) {
        return t;
      } else {
        return 0;
      }
    }
    return 0;
  }
  GetRewardRoleSkinId() {
    var t = this.GetGoodsData().ItemId;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t);
    if (t && t.Parameters) {
      if (!this.CheckIfGiftPackage()) {
        return 0;
      }
      t = ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(this.GetPackageRewardId());
      if (!t) {
        return 0;
      }
      for (const i of t.Content) {
        var e = i[0];
        if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e) === 11) {
          return e;
        }
      }
    }
    return 0;
  }
  GetRewardFlySkinId() {
    var t = this.GetGoodsData().ItemId;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t);
    if (t && t.Parameters) {
      if (!this.CheckIfGiftPackage()) {
        return 0;
      }
      t = ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(this.GetPackageRewardId());
      if (!t) {
        return 0;
      }
      for (const i of t.Content) {
        var e = i[0];
        if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e) === 14) {
          return e;
        }
      }
    }
    return 0;
  }
  CheckIfRoleSkinGoods() {
    return this.GetRewardRoleSkinId() !== 0;
  }
  CheckIfFlySkinGoods() {
    var t = this.GetGoodsData().ItemId;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t);
    if (t && t.Parameters) {
      if (!this.CheckIfGiftPackage()) {
        return false;
      }
      t = ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(this.GetPackageRewardId());
      if (!t) {
        return false;
      }
      for (const i of t.Content) {
        var e = i[0];
        if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e) === 14) {
          return true;
        }
      }
    }
    return false;
  }
  GetAvailableCouponItem() {
    for (const e of this.Pe.GetCouponList()) {
      var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemData(e);
      if (t) {
        return t;
      }
    }
  }
  GetAvailableCouponDiscount() {
    var t = this.GetAvailableCouponItem();
    if (t && (t = t.GetConfigId(), t = CouponById_1.configCouponById.GetConfig(t))) {
      return t.Param;
    } else {
      return 0;
    }
  }
  GetRewardMotorSkinId() {
    var t = this.GetGoodsData().ItemId;
    var t = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(t);
    if (t && t.Parameters) {
      if (!this.CheckIfGiftPackage()) {
        return 0;
      }
      t = ConfigManager_1.ConfigManager.GiftPackageConfig.GetGiftPackageConfig(this.GetPackageRewardId());
      if (!t) {
        return 0;
      }
      for (const i of t.Content) {
        var e = i[0];
        if (ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(e) === 21) {
          return e;
        }
      }
    }
    return 0;
  }
  CheckIfMotorSkinGoods() {
    return this.GetRewardMotorSkinId() !== 0;
  }
  HasCloudGameInfo() {
    return this.Pe.CloudGameTime > 0;
  }
  GetCloudGameDesc() {
    if (this.HasCloudGameInfo()) {
      return StringUtils_1.StringUtils.Format(MultiTextLang_1.configMultiTextLang.GetLocalTextNew(this.Pe.CloudGameDesc), this.Pe.CloudGameTime.toString());
    } else {
      return StringUtils_1.EMPTY_STRING;
    }
  }
  GetCloudGameIcon() {
    return this.Pe.CloudGameIcon;
  }
  GetIfShowTotalTopUpScore() {
    return (ActivityControllerHolder_1.ActivityControllerHolder.TotalTopUpController?.GetGoodsScore(this.GetGoodsId()) ?? 0) > 0;
  }
}
exports.PayShopGoods = PayShopGoods;
//# sourceMappingURL=PayShopGoods.js.map