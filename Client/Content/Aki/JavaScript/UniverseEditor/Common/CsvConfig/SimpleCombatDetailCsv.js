"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SimpleCombatDetailCsv = exports.SimpleCombatDetailCsvLoader = void 0;
const CsvLoader_1 = require("./CsvLoader"),
  simpleCombatDetailFields = [(0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Filter: "1",
    Condition: "notEmpty && unique",
    Type: "Int",
    RenderType: 20,
    ExportType: "CS"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "SimpleCombatId",
    CnName: "类型",
    Type: "Int",
    RenderType: 95,
    ExportType: "CS"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "SubTypeId",
    CnName: "子类型Id",
    Type: "Int",
    RenderType: 20,
    ExportType: "CS",
    Tip: "用于区分机关配置的类型Id，一般由系统玩法提供，如果不需要留空即可，默认值为0"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "PrefabPath",
    CnName: "机关预制体",
    Type: "String",
    RenderType: 94,
    ExportType: "C"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "DaPath",
    CnName: "DA配置",
    Type: "String",
    RenderType: 96,
    ExportType: "C"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "PropertyId",
    CnName: "属性Id",
    Type: "Int",
    RenderType: 20,
    ExportType: "C",
    Tip: "引用 SimpleCombat 专用的属性表"
  })];
class SimpleCombatDetailCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("SimpleCombatCsv", simpleCombatDetailFields)
  }
}
exports.SimpleCombatDetailCsvLoader = SimpleCombatDetailCsvLoader;
class SimpleCombatDetailCsv extends CsvLoader_1.GlobalCsv {}
exports.SimpleCombatDetailCsv = SimpleCombatDetailCsv;
//# sourceMappingURL=SimpleCombatDetailCsv.js.map