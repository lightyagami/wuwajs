"use strict";
Object.defineProperty(exports, "__esModule", {
  value: !0
}), exports.LevelEventPlayRegisteredMontage = void 0;
const Log_1 = require("../../../Core/Common/Log"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase"),
  KEY = "LevelEventPlayRegisteredMontage";
class LevelEventPlayRegisteredMontage extends LevelGeneralBase_1.LevelEventBase {
  constructor() {
    super(...arguments), this.gLe = void 0, this.sDe = void 0, this.zpe = (e, t) => {
      this.sDe === t && (Log_1.Log.CheckInfo() && Log_1.Log.Info("LevelEvent", 26, "实体被移除，PlayRegisteredMontaged保底结束", ["PbDataId", t.PbDataId]), EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe) && EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe), this.FinishExecute(!0))
    }, this.ej_ = () => {
      EventSystem_1.EventSystem.HasWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe) && EventSystem_1.EventSystem.RemoveWithTarget(this.sDe, EventDefine_1.EEventName.RemoveEntity, this.zpe), (this.sDe?.Entity?.GetComponent(187))?.ResumeAi(KEY), this.FinishExecute(!0)
    }
  }
  ExecuteInGm(e, t) {
    this.FinishExecute(!0)
  }
  ExecuteNew(e, t) {
    this.gLe = e, this.CreateWaitEntityTask(e.EntityId)
  }
  ExecuteWhenEntitiesReady() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(this.gLe.EntityId);
    if (t) {
      (this.sDe = t).Entity.GetComponent(47)?.IsAiDriver && Log_1.Log.CheckDebug() && Log_1.Log.Debug("LevelEvent", 26, "NpcAi与行为并行，将停止Ai，注意表现", ["PbDataId", t.PbDataId]);
      let e = void 0;
      var i = (e = this.gLe.IsAbpMontage ? ModelManager_1.ModelManager.PlotModel.GetAbpMontageConfig(this.gLe.MontageId) : ModelManager_1.ModelManager.PlotModel.GetMontageConfig(this.gLe.MontageId))?.ActionMontage;
      if (StringUtils_1.StringUtils.IsEmpty(i)) this.FinishExecute(!0);
      else {
        var s = t.Entity?.GetComponent(46);
        if (s) {
          var n = {
            InitStateName: e?.InitState,
            EndStateName: e?.EndState
          };
          const v = t.Entity?.GetComponent(187);
          v?.PauseAi(KEY), this.IsAsync ? (s.VolatileMontagePlayByLoad(2, i, n, void 0, () => {
            v?.ResumeAi(KEY)
          }, this.gLe?.LoopDuration, this.gLe?.RepeatTimes, this.gLe?.KeepMontageAfterFlow), this.FinishExecute(!0)) : (EventSystem_1.EventSystem.AddWithTarget(t, EventDefine_1.EEventName.RemoveEntity, this.zpe), s.VolatileMontagePlayByLoad(2, i, n, void 0, this.ej_, this.gLe?.LoopDuration, this.gLe?.RepeatTimes, this.gLe?.KeepMontageAfterFlow))
        } else this.FinishExecute(!0)
      }
    } else this.FinishExecute(!0)
  }
  OnReset() {
    this.gLe = void 0, this.sDe = void 0
  }
}
exports.LevelEventPlayRegisteredMontage = LevelEventPlayRegisteredMontage;
//# sourceMappingURL=LevelEventPlayRegisteredMontage.js.map