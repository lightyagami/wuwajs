"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchCurrencyConfigData = undefined;
const ModelManager_1 = require("../../../Manager/ModelManager");
class FloroRanchCurrencyConfigData {
  constructor(e) {
    this.Lo = undefined;
    this.Lo = e;
  }
  GetName() {
    return this.Lo.Name;
  }
  GetDesc() {
    return this.Lo.Desc;
  }
  GetIcon() {
    return this.Lo.Icon;
  }
  GetSmallIcon() {
    return this.Lo.SmallIcon;
  }
  GetQualityData() {
    var e = this.Lo.RarityId;
    return ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchRarity(e);
  }
}
exports.FloroRanchCurrencyConfigData = FloroRanchCurrencyConfigData;
//# sourceMappingURL=FloroRanchCurrencyConfigData.js.map