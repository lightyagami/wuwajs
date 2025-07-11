"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeKeyModeGroupData = undefined;
const ChangeKeyModeRowData_1 = require("./ChangeKeyModeRowData");
class ChangeKeyModeGroupData {
  constructor(e) {
    this.GroupName = undefined;
    this.DefaultKeyModeRowIndex = 0;
    this.Kea = [];
    this.GroupName = e.GroupName;
    this.DefaultKeyModeRowIndex = e.DefaultKeyModeRowIndex;
    let t = 0;
    for (const a of e.ChangeKeyModeRowList) {
      var o = new ChangeKeyModeRowData_1.ChangeKeyModeRowData(t, a);
      this.Kea.push(o);
      t++;
    }
  }
  GetChangeKeyModeRowDataList() {
    return this.Kea;
  }
}
exports.ChangeKeyModeGroupData = ChangeKeyModeGroupData;
//# sourceMappingURL=ChangeKeyModeGroupData.js.map