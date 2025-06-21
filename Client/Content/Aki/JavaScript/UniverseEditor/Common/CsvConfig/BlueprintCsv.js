"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.BlueprintCsv = exports.BlueprintCsvLoader = void 0;
const CsvLoader_1 = require("./CsvLoader"),
  blueprintCsvFields = [(0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Id",
    Filter: "1",
    RenderType: 0
  }), (0, CsvLoader_1.createCsvField)({
    Name: "Desc",
    CnName: "描述"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "BpPath",
    CnName: "蓝图路径",
    RenderType: 5
  }), (0, CsvLoader_1.createCsvField)({
    Name: "Icon",
    CnName: "图标",
    Type: "String",
    RenderType: 24,
    Tip: "图标， 大世界编辑器中使用"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "ZoomType",
    CnName: "放缩类型, 大世界编辑器中使用",
    Type: "String",
    RenderType: 25,
    Tip: "图标， 大世界编辑器中使用"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "EntityType",
    CnName: "组件类型",
    RenderType: 7
  }), (0, CsvLoader_1.createCsvField)({
    Name: "TemplateId",
    CnName: "模板",
    Type: "Int",
    RenderType: 20
  })];
class BlueprintCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("BlueprintCsv", blueprintCsvFields)
  }
}
exports.BlueprintCsvLoader = BlueprintCsvLoader;
class BlueprintCsv extends CsvLoader_1.GlobalCsv {}
exports.BlueprintCsv = BlueprintCsv;
//# sourceMappingURL=BlueprintCsv.js.map