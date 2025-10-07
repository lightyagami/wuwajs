"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckIsCharacterHoldingHands = undefined;
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckIsCharacterHoldingHands extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e, a) {
    var r;
    return !!e && !!(r = this.m7u(e.Target)) && !!(r = r.Entity?.GetComponent(298)) && e.IsHoldingHands === (r.GetRoleState() !== 0);
  }
  m7u(e) {
    switch (e.Type) {
      case "Entity":
        return ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId);
      case "Player":
        return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
      default:
        return;
    }
  }
}
exports.LevelConditionCheckIsCharacterHoldingHands = LevelConditionCheckIsCharacterHoldingHands;
//# sourceMappingURL=LevelConditionCheckIsCharacterHoldingHands.js.map