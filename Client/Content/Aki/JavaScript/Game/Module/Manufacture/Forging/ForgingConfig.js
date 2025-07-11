"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ForgingConfig = undefined;
const Log_1 = require("../../../../Core/Common/Log");
const ForgeFormulaAll_1 = require("../../../../Core/Define/ConfigQuery/ForgeFormulaAll");
const ForgeFormulaByFormulaItemId_1 = require("../../../../Core/Define/ConfigQuery/ForgeFormulaByFormulaItemId");
const ForgeFormulaById_1 = require("../../../../Core/Define/ConfigQuery/ForgeFormulaById");
const ForgeFormulaByTypeId_1 = require("../../../../Core/Define/ConfigQuery/ForgeFormulaByTypeId");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class ForgingConfig extends ConfigBase_1.ConfigBase {
  GetLocalText(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetForgeFormulaByFormulaItemId(e) {
    var r = ForgeFormulaByFormulaItemId_1.configForgeFormulaByFormulaItemId.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Forging", 49, "锻造配方获取失败，请检查锻造配方配置表是否正确", ["FormulaItemId=", e]);
      }
    }
    return r;
  }
  GetForgeFormulaById(e) {
    var r = ForgeFormulaById_1.configForgeFormulaById.GetConfig(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Forging", 49, "锻造配方获取失败，请检查锻造配方配置表是否正确", ["Id=", e]);
      }
    }
    return r;
  }
  GetForgeList() {
    var e = ForgeFormulaAll_1.configForgeFormulaAll.GetConfigList();
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Forging", 49, "获取对应类型锻造数据列表失败，请检查锻造配方配置表是否正确");
      }
    }
    return e;
  }
  GetForgeListByType(e) {
    var r = ForgeFormulaByTypeId_1.configForgeFormulaByTypeId.GetConfigList(e);
    if (!r) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Forging", 49, "获取对应类型锻造数据失败，请检查锻造配方配置表是否正确", ["TypeId=", e]);
      }
    }
    return r;
  }
}
exports.ForgingConfig = ForgingConfig;
//# sourceMappingURL=ForgingConfig.js.map