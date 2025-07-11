"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeKeyModeData = undefined;
const ChangeKeyModeGroupData_1 = require("./ChangeKeyModeGroupData");
class ChangeKeyModeData {
  constructor(e) {
    this.TitleName = undefined;
    this.DefaultGroupIndex = 0;
    this.Qea = [];
    this.TitleName = e.TitleName;
    this.DefaultGroupIndex = e.DefaultGroupIndex;
    for (const o of e.ChangeKeyModeGroupList) {
      var t = new ChangeKeyModeGroupData_1.ChangeKeyModeGroupData(o);
      this.Qea.push(t);
    }
  }
  GetChangeKeyModeGroupDataList() {
    return this.Qea;
  }
  GetMaxGroupIndex() {
    return this.GetChangeKeyModeGroupDataList().length - 1;
  }
}
exports.ChangeKeyModeData = ChangeKeyModeData;
//# sourceMappingURL=ChangeKeyModeData.js.map