"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckEntitiesExist = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntitiesExist extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    var a = e;
    if (!a) {
      return false;
    }
    let t = true;
    for (const s of a.EntityIds) {
      var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(s);
      if (((n?.Valid && n?.Entity?.Valid) ?? false) !== a.IsExist) {
        t = false;
        break;
      }
      if (a.IsFinishLoading && !n?.Entity?.IsInit) {
        t = false;
        break;
      }
    }
    return t;
  }
}
exports.LevelConditionCheckEntitiesExist = LevelConditionCheckEntitiesExist;
//# sourceMappingURL=LevelConditionCheckEntitiesExist.js.map