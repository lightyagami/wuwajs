"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckDungeonList = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDungeonList extends LevelGeneralBase_1.LevelConditionBase {
  Check(r, e) {
    if (r) {
      var n = Number(r.LimitParams?.get("DungeonListLength") ?? "0");
      for (let e = 0; e <= n; e++) {
        var a = Number(r.LimitParams?.get("Dungeon" + e) ?? "0");
        var o = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
        if (!o || !a) {
          return false;
        }
        if (o === a) {
          return true;
        }
      }
    }
    return false;
  }
}
exports.LevelConditionCheckDungeonList = LevelConditionCheckDungeonList;
//# sourceMappingURL=LevelConditionCheckDungeonList.js.map