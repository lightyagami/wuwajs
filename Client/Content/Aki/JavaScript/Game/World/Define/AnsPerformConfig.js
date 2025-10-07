"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnsPerformConfig = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const AnsPerformById_1 = require("../../../Core/Define/ConfigQuery/AnsPerformById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const PublicUtil_1 = require("../../Common/PublicUtil");
class AnsPerformConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this._4d = undefined;
  }
  OnInit() {
    this._4d = new Map();
    return true;
  }
  OnClear() {
    return !(this._4d = undefined);
  }
  rTo(e) {
    e = AnsPerformById_1.configAnsPerformById.GetConfig(e, false);
    if (e) {
      return e;
    }
  }
  GetConfigData(e) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      if (!this._4d.get(e)) {
        const r = this.rTo(e);
        if (!r) {
          return;
        }
        this._4d.set(e, r);
      }
      const r = this._4d.get(e);
      if (r) {
        return r;
      } else {
        return undefined;
      }
    }
    this.ver();
    const r = this._4d.get(e);
    if (r) {
      return r;
    }
  }
  ver() {
    let e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.AnsPerformDataPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.AnsPerformDataPath);
    }
    if (UE.BlueprintPathsLibrary.FileExists(e)) {
      var r = (0, puerts_1.$ref)("");
      UE.KuroStaticLibrary.LoadFileToString(r, e);
      r = (0, puerts_1.$unref)(r);
      var r = JSON.parse(r);
      for (const i of r) {
        if (i && !this._4d.has(i.Id)) {
          this._4d.set(i.Id, i);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 50, "[CharacterFlowDynamic] 不存在AnsPerform.json文件。", ["Path", e]);
    }
  }
}
exports.AnsPerformConfig = AnsPerformConfig;
//# sourceMappingURL=AnsPerformConfig.js.map