"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.ExcelBuffCsvLoader = void 0;
const BranchDefine_1 = require("../BranchDefine"),
  Util_1 = require("../Misc/Util"),
  CsvLoader_1 = require("./CsvLoader"),
  excelBuffCsvFields = [(0, CsvLoader_1.createCsvField)({
    Name: "Id",
    CnName: "Excel BuffId",
    Filter: "1",
    Condition: "notEmpty && unique"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "Start",
    CnName: "开始分支"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "End",
    CnName: "结束分支"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "GeDesc",
    CnName: "备注"
  }), (0, CsvLoader_1.createCsvField)({
    Name: "DurationPolicy",
    CnName: "持续时间类型",
    Type: "Int",
    RenderType: 20
  }), (0, CsvLoader_1.createCsvField)({
    Name: "DurationMagnitude",
    CnName: "持续时间参数1",
    Type: "Array<Int>",
    RenderType: 68
  })];
class ExcelBuffCsvLoader extends CsvLoader_1.CsvLoader {
  constructor() {
    super("ExcelBuffCsvLoader", excelBuffCsvFields)
  }
  static get Instance() {
    return ExcelBuffCsvLoader.m || (ExcelBuffCsvLoader.m = new ExcelBuffCsvLoader), ExcelBuffCsvLoader.m
  }
  get n8() {
    return (0, Util_1.getAkiBaseLocalPath)() + "/Source/Config/Merge/b.Buff.xlsx_Buff.csv"
  }
  async LZa() {
    const s = (0, BranchDefine_1.getAllBranches)(!0);
    return new Promise((e, r) => {
      e(this.TryLoad(this.n8).filter(e => {
        var r = e.Start || s[0],
          a = e.End || s[s.length - 1];
        return !!s.includes(a) && !isNaN(Number(e.Id)) && (0, BranchDefine_1.isBranchInRange)(r, a)
      }))
    })
  }
  async GetDescById(r) {
    this.AZa || (e = await this.LZa(), this.AZa = e);
    var e = this.AZa.find(e => e.Id === r.toString());
    if (e) return e.GeDesc
  }
  GetBuffDurationTypeById(r) {
    if (this.AZa) {
      var e, a = this.AZa.find(e => e.Id === r.toString());
      if (a) return 0 === (e = Number(a.DurationPolicy)) ? {
        Type: 0
      } : 1 === e ? {
        Type: 1
      } : 2 === e ? {
        Type: 2,
        Duration: a.DurationMagnitude[0] ?? 0
      } : void 0
    }
  }
}
exports.ExcelBuffCsvLoader = ExcelBuffCsvLoader;
//# sourceMappingURL=ExcelBuffCsv.js.map