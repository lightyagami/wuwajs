"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.AlertAreaCsv = exports.AlertAreaCsvLoader = void 0;
const CsvLoader_1 = require("./CsvLoader"),
  alertAreaCsvFields = [(0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Type: "Int",
    Filter: "1",
    Condition: "notEmpty && unique",
    ExportType: "CS",
    RenderType: 20
  }), (0, CsvLoader_1.createCsvField)({
    Name: "CreatorId",
    CnName: "添加人",
    Type: "Int",
    Condition: "notEmpty",
    CreateType: "scheme",
    RenderType: 45
  }), (0, CsvLoader_1.createCsvField)({
    Name: "Description",
    CnName: "描述",
    Filter: "1",
    Condition: "notEmpty && unique"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "MinValue",
    CnName: "最低警戒值",
    Type: "Float",
    RenderType: 11,
    ExportType: "CS"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "MaxValue",
    CnName: "最高警戒值",
    Type: "Float",
    RenderType: 11,
    Default: "100",
    ExportType: "CS"
  })];
class AlertAreaCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("AlertAreaCsv", alertAreaCsvFields)
  }
}
exports.AlertAreaCsvLoader = AlertAreaCsvLoader;
class AlertAreaCsv extends CsvLoader_1.GlobalCsv {}
exports.AlertAreaCsv = AlertAreaCsv;
//# sourceMappingURL=AlertAreaCsv.js.map