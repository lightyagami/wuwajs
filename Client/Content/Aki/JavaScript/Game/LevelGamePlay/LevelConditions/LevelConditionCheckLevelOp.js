"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckLevelOp = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckLevelOp extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    if (!e.LimitParams) {
      return false;
    }
    var a = e.LimitParams.get("Level");
    if (!a) {
      return false;
    }
    var t = parseInt(a);
    var n = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(0);
    if (!n) {
      return false;
    }
    switch (e.LimitParams.get("Op")) {
      case "Eq":
        return n === t;
      case "Ne":
        return n !== t;
      case "Ge":
        return t <= n;
      case "Gt":
        return t < n;
      case "Le":
        return n <= t;
      case "Lt":
        return n < t;
      default:
        return t <= n;
    }
  }
}
exports.LevelConditionCheckLevelOp = LevelConditionCheckLevelOp;
//# sourceMappingURL=LevelConditionCheckLevelOp.js.map