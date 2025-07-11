"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnFishingBackpackQuickSellToggleShow = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnFishingBackpackQuickSellToggleShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, l, ...o) {
    return o.length === 1 && typeof o[0] == "boolean" && ([o] = o, o);
  }
}
exports.LevelConditionOnFishingBackpackQuickSellToggleShow = LevelConditionOnFishingBackpackQuickSellToggleShow;
//# sourceMappingURL=LevelConditionOnFishingBackpackQuickSellToggleShow.js.map