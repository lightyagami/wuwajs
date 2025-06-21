"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.SimpleCombatDefineCsv = exports.SimpleCombatDefineCsvLoader = void 0;
const CsvLoader_1 = require("./CsvLoader"),
  simpleCombatDefineFields = [(0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Type: "Int",
    Filter: "1",
    Condition: "notEmpty && unique",
    RenderType: 20,
    ExportType: "CS"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "Name",
    CnName: "名称",
    ExportType: "C"
  })];
class SimpleCombatDefineCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("SimpleCombatDefineCsv", simpleCombatDefineFields)
  }
}
exports.SimpleCombatDefineCsvLoader = SimpleCombatDefineCsvLoader;
class SimpleCombatDefineCsv extends CsvLoader_1.GlobalCsv {}
exports.SimpleCombatDefineCsv = SimpleCombatDefineCsv;
//# sourceMappingURL=SimpleCombatDefineCsv.js.map