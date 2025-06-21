"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.AbpStateCsv = exports.AbpStateCsvLoader = void 0;
const CsvLoader_1 = require("./CsvLoader"),
  abpStateCsvFields = [(0, CsvLoader_1.createCsvField)({
    Name: "Abp",
    CnName: "ABP",
    RenderType: 31,
    Type: "String",
    Filter: "1",
    ExportType: "C",
    Condition: "notEmpty && unique"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "State1",
    CnName: "状态1",
    RenderType: 23,
    Type: "String",
    ExportType: "C"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "State2",
    CnName: "状态2",
    RenderType: 23,
    Type: "String",
    ExportType: "C"
  })];
class AbpStateCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("AbpStateCsv", abpStateCsvFields)
  }
}
exports.AbpStateCsvLoader = AbpStateCsvLoader;
class AbpStateCsv extends CsvLoader_1.GlobalCsv {}
exports.AbpStateCsv = AbpStateCsv;
//# sourceMappingURL=AbpStateCsv.js.map