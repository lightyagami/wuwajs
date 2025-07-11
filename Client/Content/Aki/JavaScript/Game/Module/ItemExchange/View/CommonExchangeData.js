"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CommonExchangeViewData = exports.CommonExchangeData = exports.ExchangeUnitData = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData");
const ItemDefines_1 = require("../../Item/Data/ItemDefines");
const ItemExchangeDefine_1 = require("../ItemExchangeDefine");
class ExchangeUnitData {
  constructor() {
    this.ItemId = 0;
    this.Name = "";
    this.TotalCount = ItemExchangeDefine_1.MAX_COUNT;
  }
  SetDataByItemId(e, t = undefined) {
    if (ConfigManager_1.ConfigManager.ItemConfig.GetConfig(e)) {
      this.ItemId = e;
      this.Name = ConfigManager_1.ConfigManager.ItemConfig.GetItemName(e);
      this.TotalCount = t || ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(e);
    }
  }
}
exports.ExchangeUnitData = ExchangeUnitData;
class CommonExchangeData extends UiPopViewData_1.UiPopViewData {
  constructor() {
    super(...arguments);
    this.IsMultipleView = true;
    this.Ugi = new ExchangeUnitData();
    this.Agi = new ExchangeUnitData();
    this.CancelCallBack = undefined;
    this.ConfirmNoClose = false;
    this.ShowPayGold = false;
    this.ConfirmCallBack = undefined;
  }
  InitBySrcAndDestItemId(e, t, i = undefined, a = undefined) {
    this.Ugi.SetDataByItemId(e, i);
    this.Agi.SetDataByItemId(t, a);
  }
  InitByItemId(e) {
    var t = ConfigManager_1.ConfigManager.ItemExchangeConfig.GetFirstExChangeConfigList(e);
    if (e === ItemDefines_1.EItemId.BlackCard) {
      this.ShowPayGold = true;
    }
    if (t.Consume.size > 1 && Log_1.Log.CheckError()) {
      Log_1.Log.Error("ItemExchange", 8, "暂不支持消耗数量为1以上的道具兑换, 需要扩展!");
    }
    this.Ugi.SetDataByItemId(t.Consume.keys().next()?.value);
    this.Agi.SetDataByItemId(t.ItemId);
  }
  GetSrcName() {
    return this.Ugi.Name;
  }
  GetSrcItemId() {
    return this.Ugi.ItemId;
  }
  GetSrcTotalCount() {
    return this.Ugi.TotalCount;
  }
  GetDestName() {
    return this.Agi.Name;
  }
  GetDestItemId() {
    return this.Agi.ItemId;
  }
}
exports.CommonExchangeData = CommonExchangeData;
class CommonExchangeViewData {
  constructor() {
    this.MaxExchangeTime = 0;
    this.OwnSrcItemNum = 0;
    this.ExchangeData = undefined;
    this.StartSliderValue = 0;
    this.ShowCurrencyList = [];
    this.GetConsumeCount = (e, t) => 0;
    this.GetConsumeTotalCount = (e, t) => 0;
    this.GetGainCount = (e, t) => 0;
  }
  CreateData(e, t = 0, i = 0) {
    this.MaxExchangeTime = t;
    this.OwnSrcItemNum = i;
    this.ExchangeData = e;
  }
}
exports.CommonExchangeViewData = CommonExchangeViewData;
//# sourceMappingURL=CommonExchangeData.js.map