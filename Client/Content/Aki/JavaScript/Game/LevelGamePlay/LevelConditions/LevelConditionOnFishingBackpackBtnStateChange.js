"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnFishingBackpackBtnStateChange = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnFishingBackpackBtnStateChange extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n, ...t) {
    return t.length === 1 && typeof t[0] == "boolean" && ([t] = t, t);
  }
}
exports.LevelConditionOnFishingBackpackBtnStateChange = LevelConditionOnFishingBackpackBtnStateChange;
//# sourceMappingURL=LevelConditionOnFishingBackpackBtnStateChange.js.map