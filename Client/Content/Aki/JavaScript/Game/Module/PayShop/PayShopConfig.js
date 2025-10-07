"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayShopConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const PayShopById_1 = require("../../../Core/Define/ConfigQuery/PayShopById");
const PayShopConditionById_1 = require("../../../Core/Define/ConfigQuery/PayShopConditionById");
const PayShopDirectGoodsByGoodsId_1 = require("../../../Core/Define/ConfigQuery/PayShopDirectGoodsByGoodsId");
const PayShopRecommendById_1 = require("../../../Core/Define/ConfigQuery/PayShopRecommendById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class PayShopConfig extends ConfigBase_1.ConfigBase {
  GetPayShopGoodsLocalText(o) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o);
  }
  GetPayShopConfig(o) {
    var e = PayShopById_1.configPayShopById.GetConfig(o);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 10, "查询商城数据失败,查看商业化商城表格PayShop", ["商城ID", o]);
      }
    }
    return e;
  }
  GetPayShopDirectGoods(o) {
    var e = PayShopDirectGoodsByGoodsId_1.configPayShopDirectGoodsByGoodsId.GetConfig(o);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 10, "查询直购商品ID数据失败,查看商业化商城表格PayShopDirectGoods", ["直购商品ID", o]);
      }
    }
    return e;
  }
  GetPayShopCondition(o) {
    var e = PayShopConditionById_1.configPayShopConditionById.GetConfig(o);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Config", 10, "查询商品条件ID数据失败,查看商业化商城表格PayShopCondition", ["商品条件ID", o]);
      }
    }
    return e;
  }
  GetPayShopConditionLocalText(o) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o);
  }
  GetShopDiscountLabel(o) {
    return "ShopDiscountLabel_" + o;
  }
  GetMonthCardShopId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MonthCardPayItemId");
  }
  GetMonthCardRewardId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MonthCardRewardId");
  }
  GetRecommendRoleSkinIdList() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig("RecommendRoleSkinId");
  }
  GetRecommendDataById(o) {
    return PayShopRecommendById_1.configPayShopRecommendById.GetConfig(o);
  }
  GetBuySkinDetailWeaponCameraId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("BuySkinDetailWeaponCameraId");
  }
  GetBuySkinDetailRoleCameraId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("BuySkinDetailRoleCameraId");
  }
  GetBuySkinDetailRoleCameraConfigId() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("BuySkinDetailRoleCameraConfigId");
  }
  GetBuySkinDetailWeaponCameraConfigId() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("BuySkinDetailWeaponCameraConfigId");
  }
}
exports.PayShopConfig = PayShopConfig;
//# sourceMappingURL=PayShopConfig.js.map