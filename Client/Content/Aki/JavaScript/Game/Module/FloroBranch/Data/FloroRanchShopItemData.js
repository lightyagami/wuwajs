"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchShopItemToyData = exports.FloroRanchShopItemCardGroupData = exports.FloroRanchShopItemCardData = exports.FloroRanchShopItemDataBase = undefined;
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const ModelManager_1 = require("../../../Manager/ModelManager");
class FloroRanchShopItemDataBase {
  constructor(t) {
    this.Id = 0;
    this.Price = 0;
    this.Type = Protocol_1.Aki.Protocol.eou.Gcu;
    this.IsSold = false;
    this.Id = t.s5n;
    this.Price = t.MBs;
    this.Type = t.h5n;
    this.IsSold = t.qbu;
  }
  BuyGoods() {
    this.IsSold ||= true;
  }
  GetToyRaceData() {}
}
class FloroRanchShopItemCardData extends (exports.FloroRanchShopItemDataBase = FloroRanchShopItemDataBase) {
  constructor(t) {
    super(t);
    this.ConfigData = undefined;
    t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    this.ConfigData = t.GetFloroRanchCardData(this.Id);
  }
  GetName() {
    return this.ConfigData.GetName();
  }
  get Desc() {
    return this.ConfigData.Desc;
  }
  GetIcon() {
    return this.ConfigData.GetIcon();
  }
  GetQualityData() {
    return this.ConfigData.GetCardQualityData();
  }
  GetRace() {
    return this.ConfigData.GetCardRace();
  }
  GetEarnCount() {
    return this.ConfigData.GetCardSalary();
  }
}
exports.FloroRanchShopItemCardData = FloroRanchShopItemCardData;
class FloroRanchShopItemCardGroupData extends FloroRanchShopItemDataBase {
  constructor(t) {
    super(t);
    this.ConfigData = undefined;
    this.ConfigData = ModelManager_1.ModelManager.FloroRanchModel.GetFloroRanchCardGroup(this.Id);
  }
  GetName() {
    return this.ConfigData.GetName();
  }
  get Desc() {
    return this.ConfigData.Desc;
  }
  GetIcon() {
    return this.ConfigData.GetIcon();
  }
  GetQualityData() {
    return this.ConfigData.GetQualityData();
  }
  GetRace() {
    return this.ConfigData.GetRaceId();
  }
  GetEarnCount() {
    return 0;
  }
}
exports.FloroRanchShopItemCardGroupData = FloroRanchShopItemCardGroupData;
class FloroRanchShopItemToyData extends FloroRanchShopItemDataBase {
  constructor(t) {
    super(t);
    this.ConfigData = undefined;
    t = ModelManager_1.ModelManager.FloroRanchModel.GetActivityData();
    this.ConfigData = t.GetFloroRanchToyData(this.Id);
  }
  GetName() {
    return this.ConfigData.GetName();
  }
  get Desc() {
    return this.ConfigData.Desc;
  }
  GetIcon() {
    return this.ConfigData.GetIcon();
  }
  GetQualityData() {
    return this.ConfigData.GetToyQualityData();
  }
  GetRace() {
    return 0;
  }
  GetEarnCount() {
    return 0;
  }
  GetToyRaceData() {
    return this.ConfigData.GetToyRaceData();
  }
}
exports.FloroRanchShopItemToyData = FloroRanchShopItemToyData;
//# sourceMappingURL=FloroRanchShopItemData.js.map