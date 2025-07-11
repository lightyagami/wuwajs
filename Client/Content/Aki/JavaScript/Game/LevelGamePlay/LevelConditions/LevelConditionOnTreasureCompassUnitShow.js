"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnTreasureCompassUnitShow = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnTreasureCompassUnitShow extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, s, ...o) {
    return o.length === 1 && typeof o[0] == "boolean" && ([o] = o, o);
  }
}
exports.LevelConditionOnTreasureCompassUnitShow = LevelConditionOnTreasureCompassUnitShow;
//# sourceMappingURL=LevelConditionOnTreasureCompassUnitShow.js.map