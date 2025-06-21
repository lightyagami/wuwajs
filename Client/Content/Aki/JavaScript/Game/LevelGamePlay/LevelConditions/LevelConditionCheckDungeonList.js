"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelConditionCheckDungeonList = void 0;
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDungeonList extends LevelGeneralBase_1.LevelConditionBase {
  Check(r, e) {
    if (r) {
      var n = Number(r.LimitParams?.get("DungeonListLength") ?? "0");
      for (let e = 0; e <= n; e++) {
        var a = Number(r.LimitParams?.get("Dungeon" + e) ?? "0"),
          o = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
        if (!o || !a) return !1;
        if (o === a) return !0
      }
    }
    return !1
  }
}
exports.LevelConditionCheckDungeonList = LevelConditionCheckDungeonList;
//# sourceMappingURL=LevelConditionCheckDungeonList.js.map