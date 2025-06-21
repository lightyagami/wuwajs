"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ReignsCardCsv = exports.ReignsCardCsvLoader = exports.EReignsCardType = void 0;
const CsvLoader_1 = require("./CsvLoader");
var EReignsCardType;
! function(e) {
  e.OptionResultCard = "OptionCard", e.AchievementResultCard = "AchievementCard"
}(EReignsCardType = exports.EReignsCardType || (exports.EReignsCardType = {}));
const reignsCardCsvFields = [(0, CsvLoader_1.createCsvField)({
  Name: "Id",
  CnName: "Id",
  Type: "Int",
  Filter: "1",
  Condition: "notEmpty && unique",
  ExportType: "C",
  RenderType: 20
}), (0, CsvLoader_1.createCsvField)({
  Name: "CardName",
  CnName: "卡片名称",
  Type: "String",
  ExportType: "",
  RenderType: 23
}), (0, CsvLoader_1.createCsvField)({
  Name: "CardType",
  CnName: "卡片类型",
  Type: "String",
  ExportType: "C",
  RenderType: 91
}), (0, CsvLoader_1.createCsvField)({
  Name: "CardBackground",
  CnName: "卡片背景",
  Type: "String",
  ExportType: "C",
  RenderType: 92
}), (0, CsvLoader_1.createCsvField)({
  Name: "CardIcon",
  CnName: "卡片Icon资源",
  Type: "String",
  ExportType: "C",
  RenderType: 93
}), (0, CsvLoader_1.createCsvField)({
  Name: "CardTitle",
  CnName: "卡片标题",
  Type: "String",
  ExportType: "C",
  RenderType: 23
}), (0, CsvLoader_1.createCsvField)({
  Name: "CardDescription",
  CnName: "卡片正文",
  Type: "String",
  ExportType: "C",
  RenderType: 23
}), (0, CsvLoader_1.createCsvField)({
  Name: "CardHeader",
  CnName: "结构卡片抬头",
  Type: "String",
  ExportType: "C",
  RenderType: 23
})];
class ReignsCardCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("ReignsCardCsv", reignsCardCsvFields)
  }
}
exports.ReignsCardCsvLoader = ReignsCardCsvLoader;
class ReignsCardCsv extends CsvLoader_1.GlobalCsv {}
exports.ReignsCardCsv = ReignsCardCsv;
//# sourceMappingURL=ReignsCardCsv.js.map