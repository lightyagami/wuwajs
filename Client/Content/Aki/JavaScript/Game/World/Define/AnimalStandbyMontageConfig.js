"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimalStandbyMontageConfig = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const AnimalStandbyMontageByBp_1 = require("../../../Core/Define/ConfigQuery/AnimalStandbyMontageByBp");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const PublicUtil_1 = require("../../Common/PublicUtil");
class AnimalStandbyMontageConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.sPd = undefined;
  }
  OnInit() {
    this.sPd = new Map();
    return true;
  }
  OnClear() {
    return !(this.sPd = undefined);
  }
  aPd(t, e) {
    t = AnimalStandbyMontageByBp_1.configAnimalStandbyMontageByBp.GetConfigList(t, false);
    if (!t) {
      return false;
    }
    e.length = 0;
    for (const i of t) {
      e.push(i);
    }
    return true;
  }
  GetAnimalStandbyMontageData(t) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      if (!this.sPd.get(t)) {
        var e = [];
        if (!this.aPd(t, e)) {
          return;
        }
        this.sPd.set(t, e);
      }
      const i = this.sPd.get(t);
      if (i) {
        return i;
      } else {
        return undefined;
      }
    }
    this.ver();
    const i = this.sPd.get(t);
    if (i) {
      return i;
    }
  }
  ver() {
    let t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.AnimalStandbyTagPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      t = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.AnimalStandbyTagPath);
    }
    if (UE.BlueprintPathsLibrary.FileExists(t)) {
      var e = (0, puerts_1.$ref)("");
      UE.KuroStaticLibrary.LoadFileToString(e, t);
      e = (0, puerts_1.$unref)(e);
      var e = JSON.parse(e);
      for (const i of e) {
        if (i.Bp && i.Bp !== "") {
          if (!this.sPd.has(i.Bp)) {
            this.sPd.set(i.Bp, []);
          }
          this.sPd.get(i.Bp).push(i);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 50, "不存在AnimalStandbyTag.json文件。", ["Path", t]);
    }
  }
}
exports.AnimalStandbyMontageConfig = AnimalStandbyMontageConfig;
//# sourceMappingURL=AnimalStandbyMontageConfig.js.map