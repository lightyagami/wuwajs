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
    this.tnu = new Map();
    this.rnu = new Map();
    this.mmu = new Map();
    this.uRu = new Map();
    this.NUu = new Map();
    this.VUu = new Map();
    this.IWc = 100000;
  }
  SetActivityData(a) {
    this.CNe = a;
  }
  GetActivityData() {
    if (this.CNe) {
      return this.CNe;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "FloroRanchActivityData is undefined");
    }
  }
  onu() {
    this.tnu.clear();
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchRarityConfigList()) {
      var a = new FloroRanchRarityData_1.FloroRanchRarityData(o);
      this.tnu.set(o.Id, a);
    }
  }
  GetFloroRanchRarity(a) {
    if (this.tnu.size <= 0) {
      this.onu();
    }
    var o = this.tnu.get(a);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "Invalid FloroRanchRarity", ["id", a]);
    }
  }
  snu() {
    this.rnu.clear();
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchTerrainConfigList()) {
      var a = new FloroRanchTerrainData_1.FloroRanchTerrainData(o);
      this.rnu.set(o.Id, a);
    }
  }
  GetFloroRanchTerrain(a) {
    if (this.rnu.size <= 0) {
      this.snu();
    }
    var o = this.rnu.get(a);
    if (o !== undefined) {
      return o;
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "Invalid FloroRanchTerrain", ["id", a]);
    }
  }
  fmu() {
    this.mmu.clear();
    for (const r of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchAudioConfigList()) {
      var a = new FloroRanchAudioData_1.FloroRanchAudioData(r);
      var o = this.mmu.get(r.Type) ?? [];
      o.push(a);
      this.mmu.set(r.Type, o);
    }
  }
  GetFloroRanchRandomAudioDataByType(a) {
    if (this.mmu.size <= 0) {
      this.fmu();
    }
    var o = this.mmu.get(a);
    if (o !== undefined) {
      return ObjectUtils_1.ObjectUtils.GetRandomArrayItem(o);
    }
    if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "Invalid FloroRanchAudioType", ["type", a]);
    }
  }
  cRu() {
    this.uRu.clear();
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchCardGroupConfigList()) {
      var a = new FloroRanchCardGroupData_1.FloroRanchCardGroupData(o);
      this.uRu.set(o.Id, a);
    }
  }
  GetFloroRanchCardGroup(a) {
    if (this.uRu.size <= 0) {
      this.cRu();
    }
    var o = this.uRu.get(a);
    if (o === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 58, "Invalid FloroRanchCardGroup", ["id", a]);
    }
    return o;
  }
  jUu() {
    this.NUu.clear();
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchEventConfigList()) {
      var a = new FloroRanchRandomEventData_1.FloroRanchRandomEventData(o);
      this.NUu.set(o.Id, a);
    }
  }
  GetFloroRanchRandomEvent(a) {
    if (this.NUu.size <= 0) {
      this.jUu();
    }
    var o = this.NUu.get(a);
    if (o === undefined && Log_1.Log.CheckError()) {
      Log_1.Log.Error("FloroRanch", 78, "Invalid FloroRanchRandomEvent", ["id", a]);
    }
    return o;
  }
  HUu() {
    this.VUu.clear();
    for (const o of ConfigManager_1.ConfigManager.FloroRanchConfig.GetFloroRanchCurrencyConfigList()) {
      var a = new FloroRanchCurrencyConfigData_1.FloroRanchCurrencyConfigData(o);
      this.VUu.set(o.Id, a);
    }
  }
  GetFloroRanchCurrencyConfig(a) {
    if (this.VUu.size <= 0) {
      this.HUu();
    }
    var o = this.VUu.get(a);
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
    if (a > this.IWc) {
      return a.toExponential(2);
    } else {
      return a.toString();
    }
  }
}
exports.FloroRanchModel = FloroRanchModel;
//# sourceMappingURL=FloroRanchModel.js.map