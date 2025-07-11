"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchCurrencyData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class FloroRanchCurrencyData {
  constructor(t) {
    this.UGe = 0;
    this.qUu = 0;
    this.ConfigData = undefined;
    this.ConfigData = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCurrencyConfig(t);
  }
  ChangeAmount(t) {
    this.UGe += t;
  }
  SetAmount(t) {
    this.UGe = t;
  }
  SetTotal(t) {
    this.qUu = t;
  }
  GetAmount() {
    return this.UGe;
  }
  GetTotalAmount() {
    return this.qUu;
  }
  GetIconPath() {
    return this.ConfigData.GetSmallIcon();
  }
}
exports.FloroRanchCurrencyData = FloroRanchCurrencyData;
//# sourceMappingURL=FloroRanchCurrencyData.js.map