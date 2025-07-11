"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConditionGroupData = undefined;
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
class ConditionGroupData extends UiPopViewData_1.UiPopViewData {
  constructor(t, i, e, s = false) {
    super();
    this.ConditionGroupId = t;
    this.DataList = i;
    this.TitleId = e;
    this.IsPreOpen = s;
    this.IsMultipleView = false;
    this.u8a = (t, i) => {
      var e = t.IsFinished ? 1 : 0;
      var s = i.IsFinished ? 1 : 0;
      if (e != s) {
        return e - s;
      }
      var o = [];
      for (const r of [t.AccessType, i.AccessType]) {
        let t = 2;
        switch (r) {
          case 7:
            t = 0;
            break;
          case 16:
            t = 1;
        }
        o.push(t);
      }
      return o[0] - o[1];
    };
    this.DataList.sort(this.u8a);
  }
}
exports.ConditionGroupData = ConditionGroupData;
//# sourceMappingURL=ConditionGroupData.js.map