"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionOnHonamiStoryLifeSupportChange = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnHonamiStoryLifeSupportChange extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r, ...o) {
    var n;
    var l;
    return !!e.LimitParams && ([o, n] = o, !!(l = e.LimitParams.get("CheckLower"))) && (l === "TRUE" ? n < o : !!(l = e.LimitParams.get("CheckPercent")) && (o = Number(l), e = ControllerHolder_1.ControllerHolder.FormationAttributeController.GetMax(13), !isNaN(o)) && n / e * 100 < o);
  }
}
exports.LevelConditionOnHonamiStoryLifeSupportChange = LevelConditionOnHonamiStoryLifeSupportChange;
//# sourceMappingURL=LevelConditionOnHonamiStoryLifeSupportChange.js.map