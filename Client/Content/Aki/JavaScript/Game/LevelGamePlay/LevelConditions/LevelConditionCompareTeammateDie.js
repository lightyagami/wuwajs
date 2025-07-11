"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCompareTeammateDie = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCompareTeammateDie extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e) {
    if (!e) {
      return false;
    }
    var r = e;
    let a = 0;
    for (const t of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
      if (t.IsDead()) {
        a++;
      }
    }
    switch (r.Compare) {
      case "Eq":
        return a === r.DieCount;
      case "Ne":
        return a !== r.DieCount;
      case "Ge":
        return a >= r.DieCount;
      case "Gt":
        return a > r.DieCount;
      case "Le":
        return a <= r.DieCount;
      case "Lt":
        return a < r.DieCount;
      default:
        return false;
    }
  }
}
exports.LevelConditionCompareTeammateDie = LevelConditionCompareTeammateDie;
//# sourceMappingURL=LevelConditionCompareTeammateDie.js.map