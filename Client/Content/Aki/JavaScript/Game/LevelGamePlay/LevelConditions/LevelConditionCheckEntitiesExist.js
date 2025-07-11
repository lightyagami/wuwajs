"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckEntitiesExist = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntitiesExist extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    var t = e;
    if (!t) {
      return false;
    }
    let a = true;
    for (const s of t.EntityIds) {
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
      if (((n?.Valid && n?.Entity?.Valid) ?? false) !== t.IsExist) {
        a = false;
        break;
      }
    }
    return a;
  }
}
exports.LevelConditionCheckEntitiesExist = LevelConditionCheckEntitiesExist;
//# sourceMappingURL=LevelConditionCheckEntitiesExist.js.map