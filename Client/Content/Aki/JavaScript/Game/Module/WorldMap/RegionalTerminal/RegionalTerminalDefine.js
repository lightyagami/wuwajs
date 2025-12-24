"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RegionalTerminalViewParams = exports.RegionalTerminalGroupData = exports.PIN_CD_TIME = undefined;
const UiPopViewData_1 = require("../../../Ui/Define/UiPopViewData");
exports.PIN_CD_TIME = 1000;
class RegionalTerminalGroupData {
  constructor() {
    this.GroupId = 0;
    this.SortId = 0;
    this.GameplayDataList = [];
  }
  IsAvailableShow() {
    for (const e of this.GameplayDataList) {
      if (e.GetShowState()) {
        return true;
      }
    }
    return false;
  }
}
exports.RegionalTerminalGroupData = RegionalTerminalGroupData;
class RegionalTerminalViewParams extends UiPopViewData_1.UiPopViewData {
  constructor() {
    super(...arguments);
    this.GameplayId = 0;
  }
}
exports.RegionalTerminalViewParams = RegionalTerminalViewParams;
//# sourceMappingURL=RegionalTerminalDefine.js.map