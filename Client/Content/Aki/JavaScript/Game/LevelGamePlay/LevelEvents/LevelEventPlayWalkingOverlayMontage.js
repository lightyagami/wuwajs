"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LevelEventPlayWalkingOverlayMontage = undefined;
const Log_1 = require("../../../Core/Common/Log");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const PlayMontageUtils_1 = require("../../NewWorld/Character/Npc/Logics/PlayMontageUtils");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventPlayWalkingOverlayMontage extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments);
    this.gLe = undefined;
    this.sDe = undefined;
    this.Dud = 0;
    this.zpe = (e, t) => {
      if (this.sDe === t) {
        if (Log_1.Log.CheckInfo()) {
          Log_1.Log.Info("LevelEvent", 26, "实体被移除，PlayRegisteredMontaged保底结束", ["PbDataId", t.PbDataId]);
        }
        if (EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe)) {
          EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe);
        }
        if (this.Dud) {
          PlayMontageUtils_1.PlayMontageUtils.ClearAndStopMontage(this.Dud);
        }
        this.FinishExecute(true);
      }
    };
  }
  ExecuteNew(e, t) {
    this.gLe = e;
    this.CreateWaitEntityTask(e.EntityId);
  }
  ExecuteWhenEntitiesReady() {
    var e;
    var t;
    if (this.gLe && (e = (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.gLe.EntityId))?.Entity?.GetComponent(188), t) && e && (this.sDe = t, t = new PlayMontageUtils_1.PlayMontageConfig(this.gLe.RepeatTimes, this.gLe.LoopDuration), this.Dud = PlayMontageUtils_1.PlayMontageUtils.LoadAndPlayMontageByOverlapId(e, this.gLe.OverlapMontageId, t), Log_1.Log.CheckDebug())) {
      Log_1.Log.Debug("LevelEvent", 42, "[OverlayMontage] 开始播放", ["PbDataId", this.gLe.EntityId], ["Uid", this.Dud]);
    }
    this.FinishExecute(true);
  }
  OnReset() {
    if (this.Dud) {
      PlayMontageUtils_1.PlayMontageUtils.ClearAndEndMontage(this.Dud);
    }
    this.gLe = undefined;
    this.sDe = undefined;
    this.Dud = 0;
  }
}
exports.LevelEventPlayWalkingOverlayMontage = LevelEventPlayWalkingOverlayMontage;
//# sourceMappingURL=LevelEventPlayWalkingOverlayMontage.js.map