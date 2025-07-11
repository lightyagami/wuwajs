"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DockyardCageData = undefined;
const DockyardItemBlockOriginalData_1 = require("../Base/DockyardItemBlockOriginalData");
class DockyardCageData {
  constructor(t) {
    this.Data = undefined;
    this.dgt = new Map();
    for (const r of (this.Data = t).bMs) {
      var a = new DockyardItemBlockOriginalData_1.DockyardItemBlockOriginalData(r);
      this.dgt.set(a.IncId, a);
    }
  }
  GetData(t) {
    return this.dgt.get(t);
  }
  GetDataList() {
    return Array.from(this.dgt.values());
  }
}
exports.DockyardCageData = DockyardCageData;
//# sourceMappingURL=DockyardCageData.js.map