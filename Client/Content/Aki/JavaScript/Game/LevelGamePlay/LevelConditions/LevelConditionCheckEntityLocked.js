"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckEntityLocked = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckEntityLocked extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, r) {
    if (!e) {
      return false;
    }
    var n = e;
    for (const a of n.Entities) {
      var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(a);
      if (!t?.Valid) {
        return false;
      }
      t = t.Entity.GetComponent(196);
      if (!t) {
        return false;
      }
      if (t.HasTag(-662723379)) {
        if (!n.IsLocked) {
          return false;
        }
      } else if (n.IsLocked) {
        return false;
      }
    }
    return true;
  }
}
exports.LevelConditionCheckEntityLocked = LevelConditionCheckEntityLocked;
//# sourceMappingURL=LevelConditionCheckEntityLocked.js.map