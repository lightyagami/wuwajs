"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnPickUpHonamiStoryItem = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnPickUpHonamiStoryItem extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r, ...t) {
    return !!e.LimitParams && (!(e = e.LimitParams.get("HighPrice")) || (e = Number(e), !isNaN(e) && ([t] = t, t.GetSellPrice() >= e)));
  }
}
exports.LevelConditionOnPickUpHonamiStoryItem = LevelConditionOnPickUpHonamiStoryItem;
//# sourceMappingURL=LevelConditionOnPickUpHonamiStoryItem.js.map