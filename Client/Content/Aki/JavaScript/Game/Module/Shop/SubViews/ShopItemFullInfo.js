"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShopItemFullInfo = undefined;
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ShopDefine_1 = require("../ShopDefine");
const ShopUtils_1 = require("../ShopUtils");
class ItemPrice {
  constructor(t, i, e) {
    this.CoinId = t;
    this.CoinPrice = i;
    this.OriginalPrice = e;
  }
}
class ShopItemFullInfo {
  constructor(t, s, i) {
    this.DefaultPrice = undefined;
    this.Price = new Map();
    this.ConditionText = "";
    this.SortIndex = 0;
    this.ItemInfo = t;
    this.BoughtCount = s.X7n ?? 0;
    this.IsLocked = s.Z6n;
    this.BuyLimit = s.Xqs;
    this.StackSize = s.UVn;
    s.Qqs.forEach((i, t) => {
      var e = s.Yqs.find(t => t.ijn === i.ijn);
      var e = new ItemPrice(i.ijn, i.Wqs, e?.Wqs ?? -1);
      this.Price.set(i.ijn, e);
      if (t === 0) {
        this.DefaultPrice = e;
      }
    });
    this.Id = s.s5n;
    this.Label = s.Jqs;
    this.BeginTime = s.cps ?? 0;
    this.EndTime = s.dps ?? 0;
    if (s.Wj1 !== 0) {
      this.ConditionText = ConfigManager_1.ConfigManager.ConditionConfig.GetConditionGroupConfig(s.Wj1)?.HintText ?? "";
    }
    this.SwitchText = s.zqs;
    this.PurchaseText = s.Zqs;
    this.ItemId = s.L8n;
    this.ShopId = i;
    this.SortIndex = s.nzc;
  }
  get LockInfo() {
    var t;
    var i;
    var e;
    var s;
    if (this.BeginTime > 0 && this.BeginTime > TimeUtil_1.TimeUtil.GetServerTime()) {
      s = Math.trunc(this.BeginTime - TimeUtil_1.TimeUtil.GetServerTime());
      t = Math.trunc(s / ShopDefine_1.SECONDS_PER_DAY);
      i = Math.trunc(s % ShopDefine_1.SECONDS_PER_DAY / ShopDefine_1.SECONDS_PRE_HOUR);
      e = Math.trunc(s % ShopDefine_1.SECONDS_PRE_HOUR / ShopDefine_1.SECONDS_PRE_MIN);
      s = Math.trunc(s) % ShopDefine_1.SECONDS_PRE_MIN;
      if (t > 0) {
        return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("ShopLockTime1"), t.toString());
      } else if (i > 0) {
        return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("ShopLockTime2"), i.toString());
      } else if (e > 0) {
        return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("ShopLockTime3"), e.toString());
      } else {
        return StringUtils_1.StringUtils.Format(ConfigManager_1.ConfigManager.TextConfig.GetTextById("ShopLockTime4"), s.toString());
      }
    }
    if (this.IsLocked) {
      return this.ConditionText;
    } else {
      return "";
    }
  }
  IsUnlocked() {
    return (!(this.BeginTime > 0) || !(this.BeginTime > TimeUtil_1.TimeUtil.GetServerTime())) && !this.IsLocked;
  }
  InSellTime() {
    return !(this.EndTime > 0) || TimeUtil_1.TimeUtil.GetServerTime() >= this.BeginTime && this.EndTime > TimeUtil_1.TimeUtil.GetServerTime();
  }
  IsAffordable(t = 1) {
    return !!this.DefaultPrice && ShopUtils_1.ShopUtils.GetResource(this.DefaultPrice.CoinId) >= this.DefaultPrice.CoinPrice * t;
  }
  GetMaxBuyCount() {
    var t;
    if (this.DefaultPrice) {
      t = ShopUtils_1.ShopUtils.GetResource(this.DefaultPrice.CoinId);
      t = Math.trunc(t / this.DefaultPrice.CoinPrice);
      if (this.BuyLimit > 0) {
        return Math.min(this.BuyLimit - this.BoughtCount, t);
      } else {
        return t;
      }
    } else {
      return -1;
    }
  }
  IsOutOfDate() {
    return this.EndTime > 0 && this.EndTime < TimeUtil_1.TimeUtil.GetServerTime();
  }
  IsSoldOut() {
    return this.BuyLimit > 0 && this.BoughtCount === this.BuyLimit;
  }
  InSaleTime() {
    var t;
    return this.BeginTime > 0 && this.EndTime > 0 && (t = TimeUtil_1.TimeUtil.GetServerTime(), this.BeginTime < t) && t < this.EndTime;
  }
  IsOutOfStock() {
    return this.BuyLimit > 0 && this.BoughtCount === this.BuyLimit || this.EndTime > 0 && this.EndTime < TimeUtil_1.TimeUtil.GetServerTime();
  }
  IsInteractive() {
    return this.IsUnlocked() && !this.IsOutOfStock();
  }
  GetMoneyId() {
    if (this.DefaultPrice) {
      return this.DefaultPrice.CoinId;
    } else {
      return -1;
    }
  }
  GetDefaultPrice() {
    if (this.DefaultPrice) {
      return this.DefaultPrice.CoinPrice;
    } else {
      return -1;
    }
  }
  GetPrice(t) {
    if (this.Price && this.Price.size !== 0) {
      return this.Price.get(t)?.CoinPrice ?? 0;
    } else {
      return -1;
    }
  }
  GetOriginalPrice() {
    if (this.DefaultPrice) {
      return this.DefaultPrice.OriginalPrice;
    } else {
      return -1;
    }
  }
}
exports.ShopItemFullInfo = ShopItemFullInfo;
//# sourceMappingURL=ShopItemFullInfo.js.map