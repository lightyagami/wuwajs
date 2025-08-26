"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FloroRanchModel = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const ObjectUtils_1 = require("../../../Core/Utils/ObjectUtils");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const FloroRanchAudioData_1 = require("./Data/FloroRanchAudioData");
const FloroRanchCardGroupData_1 = require("./Data/FloroRanchCardGroupData");
const FloroRanchCurrencyConfigData_1 = require("./Data/FloroRanchCurrencyConfigData");
const FloroRanchRandomEventData_1 = require("./Data/FloroRanchRandomEventData");
const FloroRanchRarityData_1 = require("./Data/FloroRanchRarityData");
const FloroRanchTerrainData_1 = require("./Data/FloroRanchTerrainData");
class FloroRanchModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments);
    this.CNe = undefined;
    this.Rnu = new Map();
    this.wnu = new Map();
    this.zmu = new Map();
    this.DRu = new Map();
    this.vDu = new Map();
    this.yDu = new Map();
    this.bKu = 100000;
  }
  SetActivityData(a) {
    this.CNe = a;
  }
  GetActivityData(a = true) {
    if (this.CNe || !a) {
      return this.CNe;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchActivityData is undefined");
    }
  }
  Anu() {
    this.Rnu.clear();
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchRarityConfigList()) {
      var a = new FloroRanchRarityData_1.FloroRanchRarityData(o);
      this.Rnu.set(o.Id, a);
    }
  }
  GetFloroRanchRarity(a) {
    if (this.Rnu.size <= 0) {
      this.Anu();
    }
    var o = this.Rnu.get(a);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "Invalid FloroRanchRarity", ["id", a]);
    }
  }
  xnu() {
    this.wnu.clear();
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchTerrainConfigList()) {
      var a = new FloroRanchTerrainData_1.FloroRanchTerrainData(o);
      this.wnu.set(o.Id, a);
    }
  }
  GetFloroRanchTerrain(a) {
    if (this.wnu.size <= 0) {
      this.xnu();
    }
    var o = this.wnu.get(a);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "Invalid FloroRanchTerrain", ["id", a]);
    }
  }
  Jmu() {
    this.zmu.clear();
    for (const r of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchAudioConfigList()) {
      var a = new FloroRanchAudioData_1.FloroRanchAudioData(r);
      var o = this.zmu.get(r.Type) ?? [];
      o.push(a);
      this.zmu.set(r.Type, o);
    }
  }
  GetFloroRanchRandomAudioDataByType(a) {
    if (this.zmu.size <= 0) {
      this.Jmu();
    }
    var o = this.zmu.get(a);
    if (o !== undefined) {
      return ObjectUtils_1.ObjectUtils.GetRandomArrayItem(o);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "Invalid FloroRanchAudioType", ["type", a]);
    }
  }
  BRu() {
    this.DRu.clear();
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchCardGroupConfigList()) {
      var a = new FloroRanchCardGroupData_1.FloroRanchCardGroupData(o);
      this.DRu.set(o.Id, a);
    }
  }
  GetFloroRanchCardGroup(a) {
    if (this.DRu.size <= 0) {
      this.BRu();
    }
    var o = this.DRu.get(a);
    if (o === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "Invalid FloroRanchCardGroup", ["id", a]);
    }
    return o;
  }
  SDu() {
    this.vDu.clear();
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchEventConfigList()) {
      var a = new FloroRanchRandomEventData_1.FloroRanchRandomEventData(o);
      this.vDu.set(o.Id, a);
    }
  }
  GetFloroRanchRandomEvent(a) {
    if (this.vDu.size <= 0) {
      this.SDu();
    }
    var o = this.vDu.get(a);
    if (o === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 78, "Invalid FloroRanchRandomEvent", ["id", a]);
    }
    return o;
  }
  MDu() {
    this.yDu.clear();
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchCurrencyConfigList()) {
      var a = new FloroRanchCurrencyConfigData_1.FloroRanchCurrencyConfigData(o);
      this.yDu.set(o.Id, a);
    }
  }
  GetFloroRanchCurrencyConfig(a) {
    if (this.yDu.size <= 0) {
      this.MDu();
    }
    var o = this.yDu.get(a);
    if (o === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 78, "Invalid FloroRanchCurrency", ["currencyType", a]);
    }
    return o;
  }
  GetTaskTabList() {
    var a = [...ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchTaskTabConfigList()];
    a.sort((a, o) => o.Sort - a.Sort);
    return a;
  }
  GetCoinText(a) {
    if (a > this.bKu) {
      return a.toExponential(2);
    } else {
      return a.toString();
    }
  }
}
exports.FloroRanchModel = FloroRanchModel;
//# sourceMappingURL=FloroRanchModel.js.map