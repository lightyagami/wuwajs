"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventCloseWalkingOverlayMontage = undefined;
const Log_1 = require("../../../Core/Common/Log");
const ModelManager_1 = require("../../Manager/ModelManager");
const PlayMontageUtils_1 = require("../../NewWorld/Character/Npc/Logics/PlayMontageUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventCloseWalkingOverlayMontage extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, a) {
    var l = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(e.EntityId);
    if (l?.Entity && (l = PlayMontageUtils_1.PlayMontageUtils.EntityIsPlayingMontage(l.Entity.Id)) && (PlayMontageUtils_1.PlayMontageUtils.ClearAndEndMontage(l), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("LevelEvent", 42, "[OverlayMontage] 结束播放", ["PbDataId", e.EntityId], ["Uid", l]);
    }
    this.FinishExecute(true);
  }
}
exports.LevelEventCloseWalkingOverlayMontage = LevelEventCloseWalkingOverlayMontage;
//# sourceMappingURL=LevelEventCloseWalkingOverlayMontage.js.map