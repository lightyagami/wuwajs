"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionDistanceLess = undefined;
const LevelGeneralBase_1 = require("../LevelGeneralBase");
const LevelGeneralCommons_1 = require("../LevelGeneralCommons");
class LevelConditionDistanceLess extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (!e.LimitParams) {
      return false;
    }
    var s = e.LimitParams.get("StartTarget");
    var n = e.LimitParams.get("EndTargetTag");
    var e = e.LimitParams.get("Distance");
    if (!s || !n) {
      return false;
    }
    let a = r;
    return !!(a = s !== "Trigger" ? LevelGeneralCommons_1.LevelGeneralCommons.FindTargetWithTag(s) : a) && !!(r = LevelGeneralCommons_1.LevelGeneralCommons.FindTargetWithTag(n)) && a.GetDistanceTo(r) < parseFloat(e);
  }
}
exports.LevelConditionDistanceLess = LevelConditionDistanceLess;
//# sourceMappingURL=LevelConditionDistanceLess.js.map