"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckDrinksPreferenceLevel = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDrinksPreferenceLevel extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    var a = e;
    if (a) {
      var n = ModelManager_1.ModelManager.DrinksModel.GetCurPreferenceLevel();
      switch (a.Compare) {
        case "Eq":
          return n === a.Level;
        case "Ne":
          return n !== a.Level;
        case "Ge":
          return n >= a.Level;
        case "Gt":
          return n > a.Level;
        case "Le":
          return n <= a.Level;
        case "Lt":
          return n < a.Level;
      }
    }
    return false;
  }
}
exports.LevelConditionCheckDrinksPreferenceLevel = LevelConditionCheckDrinksPreferenceLevel;
//# sourceMappingURL=LevelConditionCheckDrinksPreferenceLevel.js.map