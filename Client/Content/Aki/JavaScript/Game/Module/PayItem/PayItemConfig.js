"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PayItemConfig = undefined;
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const PayById_1 = require("../../../Core/Define/ConfigQuery/PayById");
const PayByPayIdAndRegion_1 = require("../../../Core/Define/ConfigQuery/PayByPayIdAndRegion");
const PayByRegion_1 = require("../../../Core/Define/ConfigQuery/PayByRegion");
const PayGiftAll_1 = require("../../../Core/Define/ConfigQuery/PayGiftAll");
const PayItemAll_1 = require("../../../Core/Define/ConfigQuery/PayItemAll");
const PayItemById_1 = require("../../../Core/Define/ConfigQuery/PayItemById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const StringBuilder_1 = require("../../../Core/Utils/StringBuilder");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
class PayItemConfig extends ConfigBase_1.ConfigBase {
  GetPayItemList() {
    return PayItemAll_1.configPayItemAll.GetConfigList();
  }
  GetProductIdByPayId(e) {
    return PayById_1.configPayById.GetConfig(e).ProductId;
  }
  GetProductIdByPayItemId(e) {
    e = PayItemById_1.configPayItemById.GetConfig(e)?.PayId;
    if (e) {
      return PayById_1.configPayById.GetConfig(e)?.ProductId;
    }
  }
  GetPayConf(e) {
    var r = ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectPayServerName();
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk()) {
      const a = PayByPayIdAndRegion_1.configPayByPayIdAndRegion.GetConfigList(e, r);
      if (a !== undefined && a.length > 0) {
        return a[0];
      }
    }
    const a = PayByPayIdAndRegion_1.configPayByPayIdAndRegion.GetConfigList(e, r);
    if (a !== undefined && a.length > 0) {
      return a[0];
    }
  }
  GetCurrentRegionPayConfigList() {
    var e = ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectPayServerName();
    return PayByRegion_1.configPayByRegion.GetConfigList(e);
  }
  GetPayShowCurrency() {
    if (ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk()) {
      return this.GetGlobalCurrencyChar();
    } else {
      return this.GetMainlandCurrencyChar();
    }
  }
  GetPayShow(e) {
    var r;
    var a = ModelManager_1.ModelManager.KuroSdkModel?.GetQueryProductShowPrice(e.toString());
    return a || (a = new StringBuilder_1.StringBuilder(), r = this.GetPayShowCurrency(), a.Append(r), r = ModelManager_1.ModelManager.RechargeModel.GetPayIdAmount(e), a.Append(r), a.ToString());
  }
  GetPayIdByPayItemId(e) {
    return PayItemById_1.configPayItemById.GetConfig(e)?.PayId;
  }
  GetPayItem(e) {
    return PayItemById_1.configPayItemById.GetConfig(e);
  }
  GetWaitPaySuccessTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("MaxWaitSuccessTime");
  }
  GetMainlandCurrencyChar() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("MainlandCurrencyChar");
  }
  GetGlobalCurrencyChar() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("GlobalCurrencyChar");
  }
  GetRechargeGiftConfig(e) {
    for (const r of PayGiftAll_1.configPayGiftAll.GetConfigList()) {
      if (r.Id === e) {
        return r;
      }
    }
  }
  GetRechargeItemRate() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("RechargeItemRate") ?? 0;
  }
  GetRegionMainCurrency() {
    var r = CommonParamById_1.configCommonParamById.GetStringArrayConfig("RegionMainCurrency") ?? [];
    var a = ModelManager_1.ModelManager.LoginServerModel.GetCurrentSelectPayServerName();
    var n = r.length;
    for (let e = 0; e < n; e++) {
      var o = r[e].split(":");
      if (o.length === 2 && o[0] === a) {
        return o[1];
      }
    }
    return "";
  }
}
exports.PayItemConfig = PayItemConfig;
//# sourceMappingURL=PayItemConfig.js.map