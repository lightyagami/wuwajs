"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdvanceNoticeData = undefined;
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ActivityData_1 = require("../../ActivityData");
class AdvanceNoticeData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments);
    this.xC = false;
    this.Tqm = 0;
  }
  PhraseEx(t) {
    t = t.Kfm;
    if (t) {
      this.xC = t.mJc;
      this.Tqm = MathUtils_1.MathUtils.LongToNumber(t.kBm);
    } else {
      this.xC = false;
      this.Tqm = 0;
    }
  }
  GetIsShow() {
    return this.xC;
  }
  SetIsShow(t) {
    this.xC = t;
  }
  CheckIfInShowTime() {
    return (AdvanceNoticeData.DebugFlag || this.xC) && super.CheckIfInShowTime();
  }
  GetUnlockTimeStamp() {
    return this.Tqm;
  }
}
(exports.AdvanceNoticeData = AdvanceNoticeData).DebugFlag = false;
//# sourceMappingURL=AdvanceNoticeData.js.map