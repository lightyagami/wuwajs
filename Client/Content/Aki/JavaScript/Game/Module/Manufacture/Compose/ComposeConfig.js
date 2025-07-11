"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ComposeConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ConditionGroupById_1 = require("../../../../Core/Define/ConfigQuery/ConditionGroupById");
const MaterialReplaceAll_1 = require("../../../../Core/Define/ConfigQuery/MaterialReplaceAll");
const MaterialReplaceByGroupId_1 = require("../../../../Core/Define/ConfigQuery/MaterialReplaceByGroupId");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const SynthesisFormulaByFormulaItemId_1 = require("../../../../Core/Define/ConfigQuery/SynthesisFormulaByFormulaItemId");
const SynthesisFormulaByFormulaType_1 = require("../../../../Core/Define/ConfigQuery/SynthesisFormulaByFormulaType");
const SynthesisFormulaById_1 = require("../../../../Core/Define/ConfigQuery/SynthesisFormulaById");
const SynthesisLevelAll_1 = require("../../../../Core/Define/ConfigQuery/SynthesisLevelAll");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class ComposeConfig extends ConfigBase_1.ConfigBase {
  GetLocalText(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetSynthesisFormulaByFormulaItemId(e) {
    var o = SynthesisFormulaByFormulaItemId_1.configSynthesisFormulaByFormulaItemId.GetConfig(e);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Compose", 49, "合成配方获取失败，请检查合成配方配置表是否正确", ["FormulaItemId=", e]);
      }
    }
    return o;
  }
  GetSynthesisFormulaById(e) {
    var o = SynthesisFormulaById_1.configSynthesisFormulaById.GetConfig(e);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Compose", 49, "合成配方获取失败，请检查合成配方配置表是否正确", ["Id=", e]);
      }
    }
    return o;
  }
  GetComposeListByType(e) {
    var o = SynthesisFormulaByFormulaType_1.configSynthesisFormulaByFormulaType.GetConfigList(e);
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Compose", 49, "获取对应类型合成数据失败，请检查合成配方配置表是否正确", ["FormulaType=", e]);
      }
    }
    return o;
  }
  GetExchangeList() {
    var e = MaterialReplaceAll_1.configMaterialReplaceAll.GetConfigList();
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Compose", 5, "获取置换数据列表失败，请检查合成表是否正确");
      }
    }
    return e;
  }
  GetComposeLevel() {
    var e = SynthesisLevelAll_1.configSynthesisLevelAll.GetConfigList();
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Compose", 49, "获取制药证书相关配置失败");
      }
    }
    return e;
  }
  GetConditionInfo(e) {
    return ConditionGroupById_1.configConditionGroupById.GetConfig(e);
  }
  GetExchangeByGroupId(e) {
    return MaterialReplaceByGroupId_1.configMaterialReplaceByGroupId.GetConfigList(e);
  }
}
exports.ComposeConfig = ComposeConfig;
//# sourceMappingURL=ComposeConfig.js.map