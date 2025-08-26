"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopGoodsData = undefined;
const LanguageSystem_1 = require("../../../../Core/Common/LanguageSystem");
const Log_1 = require("../../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const LocalStorage_1 = require("../../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const LevelGeneralCommons_1 = require("../../../LevelGamePlay/LevelGeneralCommons");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const PayShopDefine_1 = require("../PayShopDefine");
const PayShopGoodsPrice_1 = require("./PayShopGoodsPrice");
class PayShopGoodsData {
  constructor() {
    this.Id = 0;
    this.TabId = 0;
    this.ShopId = 0;
    this.ItemId = 0;
    this.ItemCount = 0;
    this.Locked = false;
    this.yFi = true;
    this.BuyLimit = 0;
    this.BoughtCount = 0;
    this.Price = new PayShopGoodsPrice_1.PayShopGoodsPrice();
    this.UpdateType = 0;
    this.ShopItemType = 0;
    this.BeginTime = 0;
    this.EndTime = 0;
    this.BeginPromotionTime = 0;
    this.EndPromotionTime = 0;
    this.UpdateTime = 0;
    this.LabelId = 0;
    this.LabelBeginTime = 0;
    this.LabelEndTime = 0;
    this.Sort = 0;
    this.Show = true;
    this.PromotionShow = 0;
    this.he = "";
    this.StageImage = "";
    this.IFi = 0;
    this.OBn = "";
    this.Kjs = false;
    this.UnFinishedCondition = undefined;
    this.LimitBuyConditionId = 0;
    this.WZa = false;
    this.yhh = "";
    this.gK1 = [];
    this.CloudGameTime = 0;
    this.CloudGameIcon = "";
    this.CloudGameDesc = "";
    this.pk = 0;
    this.ShowStageImage = "";
  }
  Phrase(t) {
    this.Id = t.s5n;
    this.TabId = t.mBs;
    this.ShopId = t.tjn;
    this.ItemId = t.L8n;
    this.ItemCount = t.n9n;
    this.Locked = t.pBs;
    this.yFi = t.LBs;
    this.BuyLimit = t.dBs;
    this.LimitBuyConditionId = t.GH1;
    this.BoughtCount = t.X7n;
    this.Price.Phrase(t.MBs);
    this.gK1 = t._51;
    this.BeginTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.cps));
    this.EndTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.dps));
    var i = t.w6n;
    if (i > 0) {
      var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(i);
      if (!e) {
        if (Log_1.Log.CheckWarn()) {
          Log_1.Log.Warn("Shop", 71, "活动商品对应的活动数据为空", ["goodsId", this.Id], ["activityId", i]);
        }
        return;
      }
      this.EndTime = e.EndShowTime;
    }
    this.BeginPromotionTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.SBs));
    this.EndPromotionTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.EBs));
    this.UpdateTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.Lxs));
    this.UpdateType = Number(t.OAs);
    this.ShopItemType = Number(t.yBs);
    this.pk = Number(MathUtils_1.MathUtils.LongToBigInt(t.JT_));
    this.LabelId = t.uLu;
    this.LabelBeginTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.IBs));
    this.LabelEndTime = Number(MathUtils_1.MathUtils.LongToBigInt(t.TBs));
    this.Sort = t.cBs;
    this.PromotionShow = t.cLu;
    this.Kjs = t.Oju;
    this.WZa = t.zb_;
    this.StageImage = t._Bs;
    this.ShowStageImage = t.oku;
    this.Show = t.dYc;
    this.MFi();
  }
  GetIfCanBuy() {
    if (this.IfRoleCallBackItem()) {
      return !!this.IfHaveRoleCallBackItemNeedRole() && !!this.IfCanResonant();
    }
    if (this.IfRoleItem()) {
      return this.IfCanBuyRoleItem();
    }
    if (this.CheckIfMonthCardItem() && !ModelManager_1.ModelManager.MonthCardModel.CheckMonthCardIfCanBuy()) {
      return false;
    }
    return !!this.yFi;
  }
  IfRoleItem() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(this.ItemId) === 1;
  }
  IfRoleCallBackItem() {
    var t = this.GetItemConfig();
    return !!t && !!t.ShowTypes && t.ShowTypes.includes(30);
  }
  IfCanBuyRoleItem() {
    return !ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(this.ItemId) || ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(this.ItemId) > 0;
  }
  IfHaveRoleCallBackItemNeedRole() {
    if (this.IfRoleCallBackItem()) {
      var t = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(this.ItemId)[0];
      if (ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t) === undefined) {
        return false;
      }
    }
    return true;
  }
  IfCanResonant() {
    if (this.IfRoleCallBackItem()) {
      var t = ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(this.ItemId)[0];
      if (ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(t) <= 0) {
        return false;
      }
    }
    return true;
  }
  GetBuyConditionId() {
    if (this.IFi === 1) {
      if (this.UnFinishedCondition && this.UnFinishedCondition.length > 0) {
        return this.UnFinishedCondition[0];
      } else {
        return 0;
      }
    } else {
      return this.LimitBuyConditionId;
    }
  }
  GetUnFinishConditionText() {
    if (this.IfRoleCallBackItem()) {
      if (!this.IfHaveRoleCallBackItemNeedRole()) {
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DontHaveRole");
      }
      if (!this.IfCanResonant()) {
        return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RoleBrenchItemMax");
      }
    }
    var t;
    if (this.IfRoleItem()) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RoleBrenchItemMax");
    } else if (this.CheckIfMonthCardItem()) {
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("Text_MonthlyCardMax_Text");
    } else if ((t = this.GetBuyConditionId()) !== 0) {
      t = LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t) ?? "";
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t);
    } else {
      return "";
    }
  }
  CheckIfMonthCardItem() {
    return this.Id === ConfigManager_1.ConfigManager.PayShopConfig.GetMonthCardShopId();
  }
  MFi() {
    let t = "";
    var i;
    if (t === "") {
      t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ItemId).Name);
    }
    if (this.ItemCount > 1) {
      i = ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("GoodsName");
      i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i);
      t = StringUtils_1.StringUtils.Format(i, t, this.ItemCount.toString());
    }
    this.OBn = LanguageSystem_1.LanguageSystem.PackageLanguage;
    this.he = t;
  }
  PhraseFromPayPackageData(t) {
    this.Id = t.Id;
    this.ItemId = t.ItemId;
    this.ItemCount = t.ItemCount;
    this.Locked = t.IsLock;
    this.yFi = t.IsCanBuy;
    this.BuyLimit = t.BuyLimit;
    this.BoughtCount = t.BoughtCount;
    this.Price.Id = t.PayId;
    this.BeginTime = t.BeginTime;
    this.EndTime = t.EndTime;
    this.UpdateTime = t.UpdateTime;
    this.pk = t.LastUpdateTime;
    this.UpdateType = t.UpdateType;
    this.ShopItemType = 1;
    this.LabelId = t.LabelId;
    this.LabelBeginTime = 0;
    this.LabelEndTime = 0;
    this.Sort = t.Sort;
    this.PromotionShow = 0;
    this.TabId = t.TabId;
    this.StageImage = t.StageImage;
    this.ShowStageImage = t.ShowStageImage;
    this.IFi = 1;
    this.WZa = t.IsRemind;
    this.CloudGameTime = t.CloudGameTime;
    this.CloudGameIcon = t.CloudGameIcon;
    this.CloudGameDesc = t.CloudGameDesc;
    if (t.BuyCondition > 0) {
      this.UnFinishedCondition = [];
      this.UnFinishedCondition.push(t.BuyCondition);
    }
    this.yhh = t.ProductId;
    ModelManager_1.ModelManager.RechargeModel.SetRechargeInfo(t.PayId, t.Amount, t.ProductId);
    this.he = t.GetName();
  }
  PhraseFromTempData(t, i) {
    this.ItemId = t;
    this.ItemCount = i;
    this.IFi = -1;
    i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(t);
    this.he = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name);
  }
  GetItemConfig() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ItemId);
  }
  GetGoodsName(t) {
    if (this.OBn !== LanguageSystem_1.LanguageSystem.PackageLanguage) {
      this.MFi();
    }
    return this.he;
  }
  IfMayReSell() {
    if (this.UpdateType !== 0 && this.UpdateType !== 4) {
      if (Number(this.EndTime) === 0) {
        return true;
      }
      if (Number(this.UpdateTime) < Number(this.EndTime)) {
        return true;
      }
    }
    return false;
  }
  InLabelShowTime() {
    var t = TimeUtil_1.TimeUtil.GetServerTime();
    return this.LabelId !== 0 && (this.LabelBeginTime > 0 && t >= Number(this.LabelBeginTime) && this.LabelEndTime === 0 || this.LabelBeginTime === 0 && this.LabelEndTime === 0 || Number(this.LabelEndTime) > t && t >= Number(this.LabelBeginTime));
  }
  GetSortValue() {
    return this.Sort;
  }
  IsWeeklyRefresh() {
    return this.UpdateType !== 0 && this.UpdateType !== 4;
  }
  SetShowAfterSoldOut(t) {
    this.Kjs = t;
  }
  IfShowAfterSoldOut() {
    return this.Kjs;
  }
  HasDiscount() {
    var t;
    var i;
    return !(this.Price.PromotionCount <= 0) && (i = TimeUtil_1.TimeUtil.GetServerTime(), this.EndPromotionTime === 0 && this.BeginPromotionTime === 0 || this.EndPromotionTime === 0 && this.BeginPromotionTime > 0 && i >= Number(this.BeginPromotionTime) || (t = TimeUtil_1.TimeUtil.IsExceededServerTime(this.EndPromotionTime), i = Number(this.EndPromotionTime) > i && i >= Number(this.BeginPromotionTime), t && i));
  }
  GetOriginalPrice() {
    if (this.HasDiscount()) {
      return this.Price.Count;
    }
  }
  GetDiscount() {
    if (this.PromotionShow > 0) {
      return this.PromotionShow / 100;
    } else {
      return this.Price.GetDiscount();
    }
  }
  GetDiscountNew() {
    if (this.PromotionShow > 0) {
      return this.PromotionShow / 100;
    } else {
      return this.Price.GetDiscountNew();
    }
  }
  GetRemainingCount() {
    return this.BuyLimit - this.BoughtCount;
  }
  GetRemainingTextId() {
    return PayShopDefine_1.payShopUpdateTypeTextId[this.UpdateType];
  }
  HasBuyLimit() {
    return this.BuyLimit > 0;
  }
  SetUnLock() {
    this.Locked = false;
  }
  IsDirect() {
    return this.ShopItemType === 1;
  }
  GetNowPrice() {
    if (this.HasDiscount()) {
      return this.Price.PromotionCount;
    } else {
      return this.Price.Count;
    }
  }
  IsShowInShop() {
    if (this.IFi === 0) {
      return this.Show && !this.Locked;
    } else {
      return this.IFi !== 1 || !this.Locked;
    }
  }
  IfPayGift() {
    return this.IFi === 1;
  }
  GetGiftId() {
    let t = undefined;
    var i = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ItemId);
    return t = i.ItemType === 11 ? (t = i.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift)) || i.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift) : t;
  }
  GetRewardItemType() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ItemId).ItemType;
  }
  GetProductId() {
    return this.yhh;
  }
  GetIfNeedRemind() {
    var t = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GoodsRemindMap, undefined);
    if (t) {
      t = t.get(this.IFi);
      if (t) {
        t = t.get(this.Id);
        if (this.pk > 0 && t !== undefined) {
          if (t > 0 && t > this.pk && t < this.UpdateTime) {
            return false;
          }
        } else if (t !== undefined && t > 0) {
          return false;
        }
      }
    }
    return this.WZa;
  }
  SaveRemindState(t) {
    let i = LocalStorage_1.LocalStorage.GetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GoodsRemindMap, undefined);
    let e = (i = i || new Map()).get(this.IFi);
    if (!e) {
      e = new Map();
      i.set(this.IFi, e);
    }
    var s = e.get(this.Id);
    if (this.pk === 0) {
      if (s !== undefined && s > 0) {
        return -1;
      }
    } else if (s !== undefined && s > this.pk && s < this.UpdateTime) {
      return -1;
    }
    e.set(this.Id, t);
    LocalStorage_1.LocalStorage.SetPlayer(LocalStorageDefine_1.ELocalStoragePlayerKey.GoodsRemindMap, i);
    return 0;
  }
  GetCouponList() {
    var t = [];
    for (const i of this.gK1) {
      if (i > 0) {
        t.push(i);
      }
    }
    return t;
  }
}
exports.PayShopGoodsData = PayShopGoodsData;
//# sourceMappingURL=PayShopGoodsData.js.map