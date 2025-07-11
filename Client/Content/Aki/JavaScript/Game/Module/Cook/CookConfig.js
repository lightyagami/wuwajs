"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CookConfig = undefined;
const Log_1 = require("../../../Core/Common/Log");
const CookFixToolById_1 = require("../../../Core/Define/ConfigQuery/CookFixToolById");
const CookFormulaAll_1 = require("../../../Core/Define/ConfigQuery/CookFormulaAll");
const CookFormulaByFormulaItemId_1 = require("../../../Core/Define/ConfigQuery/CookFormulaByFormulaItemId");
const CookFormulaById_1 = require("../../../Core/Define/ConfigQuery/CookFormulaById");
const CookLevelAll_1 = require("../../../Core/Define/ConfigQuery/CookLevelAll");
const CookLevelById_1 = require("../../../Core/Define/ConfigQuery/CookLevelById");
const CookProcessedAll_1 = require("../../../Core/Define/ConfigQuery/CookProcessedAll");
const CookProcessedById_1 = require("../../../Core/Define/ConfigQuery/CookProcessedById");
const CookProcessMsgById_1 = require("../../../Core/Define/ConfigQuery/CookProcessMsgById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class CookConfig extends ConfigBase_1.ConfigBase {
  GetLocalText(o) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(o) ?? "";
  }
  GetCookFormulaByFormulaItemId(o) {
    var e = CookFormulaByFormulaItemId_1.configCookFormulaByFormulaItemId.GetConfig(o);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Cook", 49, "烹饪配方获取失败，请检查烹饪配方配置表是否正确", ["FormulaItemId=", o]);
      }
    }
    return e;
  }
  GetCookFormula() {
    return CookFormulaAll_1.configCookFormulaAll.GetConfigList();
  }
  GetCookFormulaById(o) {
    var e = CookFormulaById_1.configCookFormulaById.GetConfig(o);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Cook", 49, "烹饪配方获取失败，请检查烹饪配方配置表是否正确", ["Id=", o]);
      }
    }
    return e;
  }
  GetCookProcessedById(o) {
    var e = CookProcessedById_1.configCookProcessedById.GetConfig(o);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Cook", 49, "食材加工获取失败，请检查食材加工配置表是否正确", ["Id=", o]);
      }
    }
    return e;
  }
  GetCookProcessed() {
    var o = CookProcessedAll_1.configCookProcessedAll.GetConfigList();
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Cook", 49, "食材加工列表获取失败，请检查食材加工配置表是否正确");
      }
    }
    return o;
  }
  GetCookProcessMsgById(o) {
    var e = CookProcessMsgById_1.configCookProcessMsgById.GetConfig(o);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Cook", 49, "食材加工获取失败，请检查食材加工配置表是否正确", ["Id=", o]);
      }
    }
    return e;
  }
  GetCookLevel() {
    var o = CookLevelAll_1.configCookLevelAll.GetConfigList();
    if (!o) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Cook", 49, "获取厨师证书相关配置失败");
      }
    }
    return o;
  }
  GetCookLevelByLevel(o) {
    var e = CookLevelById_1.configCookLevelById.GetConfig(o);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Cook", 49, "获取目标等级厨师证书相关配置失败", ["Id=", o]);
      }
    }
    return e;
  }
  GetCookFixToolById(o) {
    var e = CookFixToolById_1.configCookFixToolById.GetConfig(o);
    if (!e) {
      if (Log_1.Log.CheckError()) {
        Log_1.Log.Error("Cook", 49, "食材修理工具获取失败，请检查食材修理工具配置表是否正确", ["Id=", o]);
      }
    }
    return e;
  }
}
exports.CookConfig = CookConfig;
//# sourceMappingURL=CookConfig.js.map