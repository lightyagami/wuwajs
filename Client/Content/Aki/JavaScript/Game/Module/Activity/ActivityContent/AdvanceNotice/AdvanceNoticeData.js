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
    this.DEm = 0;
  }
  PhraseEx(t) {
    t = t.U_m;
    if (t) {
      this.xC = t.mJc;
      this.DEm = MathUtils_1.MathUtils.LongToNumber(t.SMm);
    } else {
      this.xC = false;
      this.DEm = 0;
    }
  }
  GetIsShow() {
    return this.xC;
  }
  CheckIfInShowTime() {
    return this.xC && super.CheckIfInShowTime();
  }
  GetUnlockTimeStamp() {
    return this.DEm;
  }
}
exports.AdvanceNoticeData = AdvanceNoticeData;
//# sourceMappingURL=AdvanceNoticeData.js.map