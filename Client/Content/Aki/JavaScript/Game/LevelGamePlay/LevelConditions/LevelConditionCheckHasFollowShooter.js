"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelConditionCheckHasFollowShooter = undefined;
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckHasFollowShooter extends LevelGeneralBase_1.LevelConditionBase {
  CheckNew(e) {
    var o;
    return !!e && (o = ModelManager_1.ModelManager.CreatureModel.GetPlayerId(), (o = ControllerHolder_1.ControllerHolder.FormationDataController.GetPlayerEntity(o)?.GetComponent(237)?.GetFollowerCreatureDataId(Protocol_1.Aki.Protocol.Summon.tJs.Proto_EPlayerFollowerAuxiliary)) && (o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o))?.Valid ? o.Entity?.GetComponent(0)?.SummonCfgId === e.Id === e.Has : e.Has === false);
  }
}
exports.LevelConditionCheckHasFollowShooter = LevelConditionCheckHasFollowShooter;
//# sourceMappingURL=LevelConditionCheckHasFollowShooter.js.map