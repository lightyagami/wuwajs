"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ReignsCsv = exports.ReignsCsvLoader = void 0;
const CsvLoader_1 = require("./CsvLoader"),
  reignsCsvFields = [(0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Type: "Int",
    Filter: "1",
    Condition: "notEmpty && unique",
    ExportType: "C",
    RenderType: 20
  }), (0, CsvLoader_1.createCsvField)({
    Name: "ReignsName",
    CnName: "玩法名称",
    Type: "String",
    ExportType: "",
    RenderType: 23
  }), (0, CsvLoader_1.createCsvField)({
    Name: "FlowId",
    CnName: "流程Id",
    Type: "Array<String>",
    ExportType: "C",
    RenderType: 57
  }), (0, CsvLoader_1.createCsvField)({
    Name: "EndingList",
    CnName: "结局列表",
    Type: "String",
    ExportType: "C",
    RenderType: 89
  }), (0, CsvLoader_1.createCsvField)({
    Name: "BaseProperty",
    CnName: "基础属性",
    Type: "String",
    ExportType: "C",
    RenderType: 90
  }), (0, CsvLoader_1.createCsvField)({
    Name: "PropertyDownReducePercent",
    CnName: "属性下降减免百分比",
    Type: "Int",
    ExportType: "C",
    RenderType: 20
  })];
class ReignsCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("ReignsCsv", reignsCsvFields)
  }
}
exports.ReignsCsvLoader = ReignsCsvLoader;
class ReignsCsv extends CsvLoader_1.GlobalCsv {}
exports.ReignsCsv = ReignsCsv;
//# sourceMappingURL=ReignsCsv.js.map