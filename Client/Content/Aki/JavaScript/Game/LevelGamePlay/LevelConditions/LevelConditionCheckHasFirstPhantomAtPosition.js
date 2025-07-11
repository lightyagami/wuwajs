"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckHasFirstPhantomAtPosition = undefined;
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckHasFirstPhantomAtPosition extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    var o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(true);
    if (parseInt(e.LimitParams.get("IsFull")) === 1) {
      for (const t of o) {
        if (ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(t.GetConfigId, 0) === 0) {
          return false;
        }
      }
      return true;
    }
    var n = parseInt(e.LimitParams.get("Position"));
    var e = parseInt(e.LimitParams.get("Available")) === 1;
    if (n > o.length) {
      return false;
    }
    const t = o[n - 1];
    return ControllerHolder_1.ControllerHolder.PhantomBattleController.GetEquipByIndex(t.GetConfigId, 0) !== 0 == e;
  }
}
exports.LevelConditionCheckHasFirstPhantomAtPosition = LevelConditionCheckHasFirstPhantomAtPosition;
//# sourceMappingURL=LevelConditionCheckHasFirstPhantomAtPosition.js.map