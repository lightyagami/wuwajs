"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionAnyPhantomCouldUpdate = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionAnyPhantomCouldUpdate extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    for (const n of ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleDataMap()) {
      if (!n[1].IsMax() && ModelManager_1.ModelManager.PhantomBattleModel.GetExpMaterialList(n[1].GetIncrId()).length > 0) {
        return true;
      }
    }
    return false;
  }
}
exports.LevelConditionAnyPhantomCouldUpdate = LevelConditionAnyPhantomCouldUpdate;
//# sourceMappingURL=LevelConditionAnyPhantomCouldUpdate.js.map