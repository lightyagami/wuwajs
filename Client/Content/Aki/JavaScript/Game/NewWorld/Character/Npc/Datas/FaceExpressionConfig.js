"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FaceExpressionConfig = undefined;
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const FaceExpressionDataById_1 = require("../../../../../Core/Define/ConfigQuery/FaceExpressionDataById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
const IGlobal_1 = require("../../../../../UniverseEditor/Interface/IGlobal");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
class FaceExpressionConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments);
    this.fer = undefined;
    this.per = false;
  }
  OnInit() {
    this.fer = new Map();
    return true;
  }
  OnClear() {
    return !(this.fer = undefined);
  }
  GetFaceExpressionConfig(i) {
    if (PublicUtil_1.PublicUtil.UseDbConfig()) {
      var r = FaceExpressionDataById_1.configFaceExpressionDataById.GetConfig(i, false);
      if (!r || !r.FaceExpression) {
        return;
      }
      let e = undefined;
      if (r.MaleVariant) {
        e = JSON.parse(r.MaleVariant);
      }
      return {
        Id: r.Id,
        FaceExpression: JSON.parse(r.FaceExpression),
        MaleVariant: e
      };
    }
    this.ver();
    return this.fer.get(i);
  }
  ver() {
    if (!this.per) {
      this.per = true;
      let e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfig.FaceExpressionConfigPath);
      if (!PublicUtil_1.PublicUtil.IsUseTempData()) {
        e = (0, PublicUtil_1.getConfigPath)(IGlobal_1.globalConfigTemp.FaceExpressionConfigPath);
      }
      if (UE.BlueprintPathsLibrary.FileExists(e)) {
        var i = (0, puerts_1.$ref)("");
        UE.KuroStaticLibrary.LoadFileToString(i, e);
        i = (0, puerts_1.$unref)(i);
        var i = JSON.parse(i);
        for (const r of i) {
          if (r && !this.fer.has(r.Id)) {
            this.fer.set(r.Id, r);
          }
        }
      } else if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("NPC", 50, "[FaceExpressionConfig] 不存在FaceExpressionConfig.json文件。", ["Path", e]);
      }
    }
  }
}
exports.FaceExpressionConfig = FaceExpressionConfig;
//# sourceMappingURL=FaceExpressionConfig.js.map