"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BubbleConfig = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const BubbleDataByActionGuid_1 = require("../../../Core/Define/ConfigQuery/BubbleDataByActionGuid");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const IGlobal_1 = require("../../../UniverseEditor/Interface/IGlobal");
const PublicUtil_1 = require("../../Common/PublicUtil");
class BubbleConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.uvr = undefined;
  }
  OnInit() {
    this.uvr = new Map();
    return true;
  }
  OnClear() {
    return !(this.uvr = undefined);
  }
  cvr(e) {
    e = BubbleDataByActionGuid_1.configBubbleDataByActionGuid.GetConfig(e, false);
    if (e) {
      return e;
    }
  }
  GetBubbleData(e) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      if (!this.uvr.get(e)) {
        const t = this.cvr(e);
        if (!t) {
          return;
        }
        var i = JSON.parse(t.Params);
        this.uvr.set(e, i);
      }
      const t = this.uvr.get(e);
      if (t) {
        return t;
      } else {
        return undefined;
      }
    }
    this.ver();
    const t = this.uvr.get(e);
    if (t) {
      return t;
    }
  }
  ver() {
    let e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.BubbleConfigPath);
    if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
      e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.BubbleConfigPath);
    }
    if (UE.BlueprintPathsLibrary.FileExists(e)) {
      var i;
      var t = (0, puerts_1.$ref)("");
      UE.KuroStaticLibrary.LoadFileToString(t, e);
      t = (0, puerts_1.$unref)(t);
      var t = JSON.parse(t);
      for (const r of t) {
        if (r.ActionGuid && (i = r.Params) && !this.uvr.has(r.ActionGuid)) {
          this.uvr.set(r.ActionGuid, i);
        }
      }
    } else if (Log_1.Log.CheckError()) {
      Log_1.Log.Error("Entity", 50, "[CharacterFlowDynamic] 不存在BubbleConfig.json文件。", ["Path", e]);
    }
  }
}
exports.BubbleConfig = BubbleConfig;
//# sourceMappingURL=BubbleConfig.js.map