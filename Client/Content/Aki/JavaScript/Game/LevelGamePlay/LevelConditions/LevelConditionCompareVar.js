"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCompareVar = undefined;
const LevelGamePlayUtils_1 = require("../LevelGamePlayUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareVar extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r, a) {
    if (!e) {
      return false;
    }
    var t = e.Var1;
    var l = e.Var2;
    if (t.Type !== l.Type) {
      return false;
    }
    var s = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(t, a);
    var n = LevelGamePlayUtils_1.LevelGamePlayUtils.GetVarValue(l, a);
    if (s === undefined || n === undefined) {
      return false;
    }
    switch (e.Compare) {
      case "Eq":
        return s === n;
      case "Ne":
        return s !== n;
      case "Ge":
        return n <= s;
      case "Gt":
        return n < s;
      case "Le":
        return s <= n;
      case "Lt":
        return s < n;
      default:
        return false;
    }
  }
}
exports.LevelConditionCompareVar = LevelConditionCompareVar;
//# sourceMappingURL=LevelConditionCompareVar.js.map